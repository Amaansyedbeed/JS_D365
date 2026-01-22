//start latest code
using Microsoft.Xrm.Sdk;
using Microsoft.Xrm.Sdk.Query;
using System;
using System.Linq;

namespace Custom.EventManagement.Plugins
{
    public class CreateEventRegistrationLeadPlugin : IPlugin
    {
        public void Execute(IServiceProvider serviceProvider)
        {
            // Tracing service – used for Plugin Trace Log
            ITracingService tracing =
                (ITracingService)serviceProvider.GetService(typeof(ITracingService));

            // Plugin execution context
            IPluginExecutionContext context =
                (IPluginExecutionContext)serviceProvider.GetService(typeof(IPluginExecutionContext));

            // Organization service
            IOrganizationServiceFactory factory =
                (IOrganizationServiceFactory)serviceProvider.GetService(typeof(IOrganizationServiceFactory));
            IOrganizationService service =
                factory.CreateOrganizationService(context.UserId);

            tracing.Trace("CreateEventRegistrationLeadPlugin: Execution started.");

            try
            {
                // Validate Target
                if (!context.InputParameters.Contains("Target") ||
                    !(context.InputParameters["Target"] is Entity registration))
                {
                    tracing.Trace("Target entity missing or invalid.");
                    return;
                }

                // Ensure plugin runs only for Event Registration
                if (registration.LogicalName != "msevtmgt_eventregistration")
                {
                    tracing.Trace("Entity is not msevtmgt_eventregistration.");
                    return;
                }

                tracing.Trace("Processing Event Registration: {0}", registration.Id);

                // Retrieve Contact & Event references from registration
                EntityReference contactRef =
                    registration.GetAttributeValue<EntityReference>("msevtmgt_contactid");
                EntityReference eventRef =
                    registration.GetAttributeValue<EntityReference>("msevtmgt_eventid");

                if (contactRef == null || eventRef == null)
                    throw new InvalidPluginExecutionException(
                        "Contact or Event reference is missing on Event Registration.");

                tracing.Trace("ContactId: {0}, EventId: {1}", contactRef.Id, eventRef.Id);

                // Retrieve Contact record (source for most Lead fields)
                Entity contact = GetContact(service, contactRef.Id);
                if (contact == null)
                    throw new InvalidPluginExecutionException("Contact not found.");

                tracing.Trace("Contact retrieved successfully.");

                // Retrieve Event record
                Entity eventEntity = GetEvent(service, eventRef.Id);
                if (eventEntity == null)
                    throw new InvalidPluginExecutionException("Event not found.");

                tracing.Trace("Event retrieved successfully.");

                // Check if Lead creation is enabled on Event
                bool createLeads =
                    eventEntity.GetAttributeValue<bool>("msevtmgt_createleadsforeventregistrations");

                tracing.Trace("Create Leads Enabled: {0}", createLeads);

                if (!createLeads)
                {
                    tracing.Trace("Lead creation is disabled for this event.");
                    return;
                }

                // Prevent duplicate Lead creation
                if (LeadExists(service, contactRef.Id, eventRef.Id))
                {
                    tracing.Trace("Lead already exists for this Contact & Event.");
                    return;
                }

                // Create Lead
                Guid leadId = CreateLead(
                    service,
                    tracing,
                    contact,
                    registration,
                    eventEntity,
                    contactRef);

                tracing.Trace("Lead created successfully. LeadId: {0}", leadId);
            }
            catch (Exception ex)
            {
                tracing.Trace("Plugin error: {0}", ex.ToString());
                throw;
            }
        }

        // ===============================
        // Retrieve Contact
        // ===============================
        private Entity GetContact(IOrganizationService service, Guid contactId)
        {
            // Retrieve Contact fields used to populate Lead
            QueryExpression query = new QueryExpression("contact")
            {
                ColumnSet = new ColumnSet(
                    "firstname",
                    "lastname",
                    "emailaddress1",
                    "parentcustomerid",
                    "address1_postalcode",
                    "adx_organizationname",
                    "ams_unitcount",
                    "ams_propertytype" // Required field for Lead
                )
            };

            query.Criteria.AddCondition("contactid", ConditionOperator.Equal, contactId);
            return service.RetrieveMultiple(query).Entities.FirstOrDefault();
        }

        // ===============================
        // Retrieve Event
        // ===============================
        private Entity GetEvent(IOrganizationService service, Guid eventId)
        {
            // Retrieve Event settings related to Lead creation
            QueryExpression query = new QueryExpression("msevtmgt_event")
            {
                ColumnSet = new ColumnSet(
                    "msevtmgt_name",
                    "msevtmgt_createleadsforeventregistrations"
                )
            };

            query.Criteria.AddCondition("msevtmgt_eventid", ConditionOperator.Equal, eventId);
            return service.RetrieveMultiple(query).Entities.FirstOrDefault();
        }

        // ===============================
        // Check Existing Lead
        // ===============================
        private bool LeadExists(
            IOrganizationService service,
            Guid contactId,
            Guid eventId)
        {
            // Prevent duplicate Lead creation
            QueryExpression query = new QueryExpression("lead")
            {
                ColumnSet = new ColumnSet(false),
                TopCount = 1
            };

            query.Criteria.AddCondition("parentcontactid", ConditionOperator.Equal, contactId);
            query.Criteria.AddCondition("msevtmgt_originatingeventid", ConditionOperator.Equal, eventId);

            return service.RetrieveMultiple(query).Entities.Any();
        }

        // ===============================
        // Create Lead
        // ===============================
        private Guid CreateLead(
            IOrganizationService service,
            ITracingService tracing,
            Entity contact,
            Entity registration,
            Entity eventEntity,
            EntityReference contactRef)
        {
            tracing.Trace("Creating Lead record.");

            Entity lead = new Entity("lead");

            // -------- Core Lead fields (from Contact & Event)
            lead["firstname"] = contact.GetAttributeValue<string>("firstname");
            lead["lastname"] = contact.GetAttributeValue<string>("lastname");
            lead["emailaddress1"] = contact.GetAttributeValue<string>("emailaddress1");
            lead["subject"] = eventEntity.GetAttributeValue<string>("msevtmgt_name");
            lead["parentcontactid"] = contactRef;
            lead["msevtmgt_originatingeventid"] =
                new EntityReference("msevtmgt_event", eventEntity.Id);

            tracing.Trace("Core Lead fields populated.");

            // -------- REQUIRED FIELD
            // ams_propertytype is Business Required on Lead
            // Retrieved from Contact
            if (contact.Contains("ams_propertytype"))
            {
                lead["ams_propertytype"] = contact["ams_propertytype"];
                tracing.Trace("ams_propertytype set from Contact.");
            }
            else
            {
                throw new InvalidPluginExecutionException(
                    "Cannot create Lead: Property Type is missing on Contact.");
            }

            // -------- Company Name logic
            // 1. From parent Account
            if (contact.Contains("parentcustomerid"))
            {
                EntityReference parent = contact.GetAttributeValue<EntityReference>("parentcustomerid");
                if (parent?.LogicalName == "account")
                {
                    Entity account = service.Retrieve(
                        "account",
                        parent.Id,
                        new ColumnSet("name"));

                    if (account.Contains("name"))
                    {
                        lead["companyname"] = account["name"];
                        tracing.Trace("Company Name set from Account.");
                    }
                }
            }

            // 2. Fallback to adx_organizationname
            if (!lead.Contains("companyname") &&
                contact.Contains("adx_organizationname"))
            {
                lead["companyname"] = contact["adx_organizationname"];
                tracing.Trace("Company Name set from adx_organizationname.");
            }

            // -------- Optional fields from Event Registration
            CopyIfExists(registration, lead, "ams_region");
            CopyIfExists(registration, lead, "ams_title");
            CopyIfExists(registration, lead, "ams_numberofboardmembers");
            CopyIfExists(registration, lead, "ams_contacttype");

            tracing.Trace("Optional fields copied from Event Registration.");

            // -------- Fields from Contact
            if (contact.Contains("address1_postalcode"))
                lead["address1_postalcode"] = contact["address1_postalcode"];

            if (contact.Contains("ams_unitcount"))
                lead["ams_unitcount"] = contact["ams_unitcount"];

            tracing.Trace("Contact-based fields set.");

            // -------- Static Lead Source
            lead["leadsourcecode"] = new OptionSetValue(1);
            lead["ams_leadsourcename"] = "Event Registration";

            tracing.Trace("Lead Source fields set.");

            // Create Lead record
            return service.Create(lead);
        }

        // ===============================
        // Helper: Copy attribute safely
        // ===============================
        private void CopyIfExists(Entity source, Entity target, string attributeName)
        {
            // Copies field only if present on source
            if (source.Attributes.ContainsKey(attributeName))
                target[attributeName] = source[attributeName];
        }
    }
}

//End latest code






////start 2 new plugin code
//using Microsoft.Xrm.Sdk;
//using Microsoft.Xrm.Sdk.Query;
//using System;
//using System.Linq;

//namespace Custom.EventManagement.Plugins
//{
//    public class CreateEventRegistrationLeadPlugin : IPlugin
//    {
//        public void Execute(IServiceProvider serviceProvider)
//        {
//            ITracingService tracing =
//                (ITracingService)serviceProvider.GetService(typeof(ITracingService));

//            IPluginExecutionContext context =
//                (IPluginExecutionContext)serviceProvider.GetService(typeof(IPluginExecutionContext));

//            IOrganizationServiceFactory factory =
//                (IOrganizationServiceFactory)serviceProvider.GetService(typeof(IOrganizationServiceFactory));

//            IOrganizationService service =
//                factory.CreateOrganizationService(context.UserId);

//            try
//            {
//                if (!context.InputParameters.Contains("Target") ||
//                    !(context.InputParameters["Target"] is Entity registration))
//                    return;

//                if (registration.LogicalName != "msevtmgt_eventregistration")
//                    return;

//                tracing.Trace("CreateEventRegistrationLeadPlugin started.");

//                var contactRef =
//                    registration.GetAttributeValue<EntityReference>("msevtmgt_contactid");
//                var eventRef =
//                    registration.GetAttributeValue<EntityReference>("msevtmgt_eventid");

//                if (contactRef == null || eventRef == null)
//                    throw new InvalidPluginExecutionException(
//                        "Contact or Event reference missing.");

//                Entity contact = GetContact(service, contactRef.Id);
//                if (contact == null)
//                    throw new InvalidPluginExecutionException("Contact not found.");

//                Entity eventEntity = GetEvent(service, eventRef.Id);
//                if (eventEntity == null)
//                    throw new InvalidPluginExecutionException("Event not found.");

//                if (!eventEntity.GetAttributeValue<bool>(
//                        "msevtmgt_createleadsforeventregistrations"))
//                {
//                    tracing.Trace("Lead creation disabled.");
//                    return;
//                }

//                if (LeadExists(service, contactRef.Id, eventRef.Id))
//                {
//                    tracing.Trace("Lead already exists.");
//                    return;
//                }

//                Guid leadId = CreateLead(
//                    service,
//                    tracing,
//                    contact,
//                    registration,
//                    eventEntity,
//                    contactRef);

//                tracing.Trace($"Lead created successfully. LeadId={leadId}");
//            }
//            catch (Exception ex)
//            {
//                tracing.Trace(ex.ToString());
//                throw;
//            }
//        }

//        // ============================
//        // Retrieve Contact
//        // ============================
//        private Entity GetContact(IOrganizationService service, Guid contactId)
//        {
//            QueryExpression query = new QueryExpression("contact")
//            {
//                ColumnSet = new ColumnSet(
//                    "firstname",
//                    "lastname",
//                    "emailaddress1",
//                    "parentcustomerid",
//                    "address1_postalcode",
//                    "adx_organizationname",
//                    "ams_unitcount",
//                    "ams_propertytype" // REQUIRED FIELD SOURCE
//                )
//            };

//            query.Criteria.AddCondition("contactid", ConditionOperator.Equal, contactId);
//            return service.RetrieveMultiple(query).Entities.FirstOrDefault();
//        }

//        // ============================
//        // Retrieve Event
//        // ============================
//        private Entity GetEvent(IOrganizationService service, Guid eventId)
//        {
//            QueryExpression query = new QueryExpression("msevtmgt_event")
//            {
//                ColumnSet = new ColumnSet(
//                    "msevtmgt_name",
//                    "msevtmgt_createleadsforeventregistrations"
//                )
//            };

//            query.Criteria.AddCondition("msevtmgt_eventid", ConditionOperator.Equal, eventId);
//            return service.RetrieveMultiple(query).Entities.FirstOrDefault();
//        }

//        // ============================
//        // Duplicate Lead Check
//        // ============================
//        private bool LeadExists(
//            IOrganizationService service,
//            Guid contactId,
//            Guid eventId)
//        {
//            QueryExpression query = new QueryExpression("lead")
//            {
//                ColumnSet = new ColumnSet(false),
//                TopCount = 1
//            };

//            query.Criteria.AddCondition("parentcontactid", ConditionOperator.Equal, contactId);
//            query.Criteria.AddCondition("msevtmgt_originatingeventid", ConditionOperator.Equal, eventId);

//            return service.RetrieveMultiple(query).Entities.Any();
//        }

//        // ============================
//        // Create Lead (MANDATORY SAFE)
//        // ============================
//        private Guid CreateLead(
//            IOrganizationService service,
//            ITracingService tracing,
//            Entity contact,
//            Entity registration,
//            Entity eventEntity,
//            EntityReference contactRef)
//        {
//            Entity lead = new Entity("lead");

//            // Core
//            lead["firstname"] = contact.GetAttributeValue<string>("firstname");
//            lead["lastname"] = contact.GetAttributeValue<string>("lastname");
//            lead["emailaddress1"] = contact.GetAttributeValue<string>("emailaddress1");
//            lead["subject"] = eventEntity.GetAttributeValue<string>("msevtmgt_name");
//            lead["parentcontactid"] = contactRef;
//            lead["msevtmgt_originatingeventid"] =
//                new EntityReference("msevtmgt_event", eventEntity.Id);

//            // ============================
//            // REQUIRED FIELD: ams_propertytype
//            // ============================
//            if (contact.Contains("ams_propertytype"))
//            {
//                lead["ams_propertytype"] = contact["ams_propertytype"];
//            }
//            else
//            {
//                throw new InvalidPluginExecutionException(
//                    "Cannot create Lead because 'Property Type' is missing on Contact.");
//            }

//            // Company Name
//            if (contact.Contains("parentcustomerid"))
//            {
//                var parent = contact.GetAttributeValue<EntityReference>("parentcustomerid");
//                if (parent?.LogicalName == "account")
//                {
//                    var account = service.Retrieve(
//                        "account",
//                        parent.Id,
//                        new ColumnSet("name"));
//                    if (account.Contains("name"))
//                        lead["companyname"] = account["name"];
//                }
//            }

//            if (!lead.Contains("companyname") &&
//                contact.Contains("adx_organizationname"))
//            {
//                lead["companyname"] = contact["adx_organizationname"];
//            }

//            // Other Lead fields (from registration if present)
//            CopyIfExists(registration, lead, "ams_region");
//            CopyIfExists(registration, lead, "ams_title");
//            CopyIfExists(registration, lead, "ams_numberofboardmembers");
//            CopyIfExists(registration, lead, "ams_contacttype");

//            // Contact-based
//            if (contact.Contains("address1_postalcode"))
//                lead["address1_postalcode"] = contact["address1_postalcode"];

//            if (contact.Contains("ams_unitcount"))
//                lead["ams_unitcount"] = contact["ams_unitcount"];

//            // Static
//            lead["leadsourcecode"] = new OptionSetValue(1);
//            lead["ams_leadsourcename"] = "Event Registration";

//            return service.Create(lead);
//        }

//        // ============================
//        // Helper
//        // ============================
//        private void CopyIfExists(Entity source, Entity target, string attributeName)
//        {
//            if (source.Attributes.ContainsKey(attributeName))
//                target[attributeName] = source[attributeName];
//        }
//    }
//}


//end new code


//Working code without ams_unitcount
//using Microsoft.Xrm.Sdk;
//using Microsoft.Xrm.Sdk.Query;
//using System;
//using System.Linq;

//namespace Custom.EventManagement.Plugins
//{
//    public class CreateEventRegistrationLeadPlugin : IPlugin
//    {
//        public void Execute(IServiceProvider serviceProvider)
//        {
//            ITracingService tracing =
//                (ITracingService)serviceProvider.GetService(typeof(ITracingService));

//            IPluginExecutionContext context =
//                (IPluginExecutionContext)serviceProvider.GetService(typeof(IPluginExecutionContext));

//            IOrganizationServiceFactory factory =
//                (IOrganizationServiceFactory)serviceProvider.GetService(typeof(IOrganizationServiceFactory));

//            IOrganizationService service =
//                factory.CreateOrganizationService(context.UserId);

//            try
//            {
//                if (!context.InputParameters.Contains("Target") ||
//                    !(context.InputParameters["Target"] is Entity registration))
//                    return;

//                if (registration.LogicalName != "msevtmgt_eventregistration")
//                    return;

//                tracing.Trace("CreateEventRegistrationLeadPlugin started.");

//                var contactRef =
//                    registration.GetAttributeValue<EntityReference>("msevtmgt_contactid");
//                var eventRef =
//                    registration.GetAttributeValue<EntityReference>("msevtmgt_eventid");

//                if (contactRef == null || eventRef == null)
//                    throw new InvalidPluginExecutionException(
//                        "Contact or Event reference missing.");

//                Entity contact = GetContact(service, contactRef.Id);
//                if (contact == null)
//                    throw new InvalidPluginExecutionException("Contact not found.");

//                Entity eventEntity = GetEvent(service, eventRef.Id);
//                if (eventEntity == null)
//                    throw new InvalidPluginExecutionException("Event not found.");

//                if (!eventEntity.GetAttributeValue<bool>(
//                        "msevtmgt_createleadsforeventregistrations"))
//                {
//                    tracing.Trace("Lead creation disabled for this event.");
//                    return;
//                }

//                if (LeadExists(service, contactRef.Id, eventRef.Id))
//                {
//                    tracing.Trace("Lead already exists.");
//                    return;
//                }

//                Guid leadId = CreateLead(
//                    service,
//                    tracing,
//                    contact,
//                    registration,
//                    eventEntity,
//                    contactRef);

//                tracing.Trace($"Lead created successfully. LeadId={leadId}");
//            }
//            catch (Exception ex)
//            {
//                tracing.Trace(ex.ToString());
//                throw;
//            }
//        }

//        // ============================
//        // Contact (ONLY VALID FIELDS)
//        // ============================
//        private Entity GetContact(IOrganizationService service, Guid contactId)
//        {
//            QueryExpression query = new QueryExpression("contact")
//            {
//                ColumnSet = new ColumnSet(
//                    "firstname",
//                    "lastname",
//                    "emailaddress1",
//                    "parentcustomerid",
//                    "address1_postalcode",
//                    "adx_organizationname"
//                )
//            };

//            query.Criteria.AddCondition("contactid", ConditionOperator.Equal, contactId);
//            return service.RetrieveMultiple(query).Entities.FirstOrDefault();
//        }

//        // ============================
//        // Event
//        // ============================
//        private Entity GetEvent(IOrganizationService service, Guid eventId)
//        {
//            QueryExpression query = new QueryExpression("msevtmgt_event")
//            {
//                ColumnSet = new ColumnSet(
//                    "msevtmgt_name",
//                    "msevtmgt_createleadsforeventregistrations"
//                )
//            };

//            query.Criteria.AddCondition("msevtmgt_eventid", ConditionOperator.Equal, eventId);
//            return service.RetrieveMultiple(query).Entities.FirstOrDefault();
//        }

//        // ============================
//        // Duplicate Lead Check
//        // ============================
//        private bool LeadExists(
//            IOrganizationService service,
//            Guid contactId,
//            Guid eventId)
//        {
//            QueryExpression query = new QueryExpression("lead")
//            {
//                ColumnSet = new ColumnSet(false),
//                TopCount = 1
//            };

//            query.Criteria.AddCondition("parentcontactid", ConditionOperator.Equal, contactId);
//            query.Criteria.AddCondition("msevtmgt_originatingeventid", ConditionOperator.Equal, eventId);

//            return service.RetrieveMultiple(query).Entities.Any();
//        }

//        // ============================
//        // Create Lead (FINAL SAFE)
//        // ============================
//        private Guid CreateLead(
//            IOrganizationService service,
//            ITracingService tracing,
//            Entity contact,
//            Entity registration,
//            Entity eventEntity,
//            EntityReference contactRef)
//        {
//            Entity lead = new Entity("lead");

//            // Core fields
//            lead["firstname"] = contact.GetAttributeValue<string>("firstname");
//            lead["lastname"] = contact.GetAttributeValue<string>("lastname");
//            lead["emailaddress1"] = contact.GetAttributeValue<string>("emailaddress1");
//            lead["subject"] = eventEntity.GetAttributeValue<string>("msevtmgt_name");
//            lead["parentcontactid"] = contactRef;
//            lead["msevtmgt_originatingeventid"] =
//                new EntityReference("msevtmgt_event", eventEntity.Id);

//            // Company Name (VALID)
//            if (contact.Contains("parentcustomerid"))
//            {
//                var parent = contact.GetAttributeValue<EntityReference>("parentcustomerid");
//                if (parent?.LogicalName == "account")
//                {
//                    var account = service.Retrieve(
//                        "account",
//                        parent.Id,
//                        new ColumnSet("name"));

//                    if (account.Contains("name"))
//                        lead["companyname"] = account["name"];
//                }
//            }

//            if (!lead.Contains("companyname") &&
//                contact.Contains("adx_organizationname"))
//            {
//                lead["companyname"] = contact["adx_organizationname"];
//            }

//            // Lead custom fields (copied from registration ONLY)
//            CopyIfExists(registration, lead, "ams_propertytype");
//            CopyIfExists(registration, lead, "ams_region");
//            CopyIfExists(registration, lead, "ams_title");
//            CopyIfExists(registration, lead, "ams_numberofboardmembers");
//            CopyIfExists(registration, lead, "ams_contacttype");

//            // Postal Code
//            if (contact.Contains("address1_postalcode"))
//                lead["address1_postalcode"] = contact["address1_postalcode"];

//            // Static values
//            lead["leadsourcecode"] = new OptionSetValue(1); // adjust value
//            lead["ams_leadsourcename"] = "Event Registration";

//            return service.Create(lead);
//        }

//        // ============================
//        // Safe Copy Helper
//        // ============================
//        private void CopyIfExists(Entity source, Entity target, string attributeName)
//        {
//            if (source.Attributes.ContainsKey(attributeName))
//                target[attributeName] = source[attributeName];
//        }
//    }
//}
