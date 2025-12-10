using Microsoft.Xrm.Sdk;
using Microsoft.Xrm.Sdk.Query;
using System;
using System.Collections.Generic;
using System.Linq;
using System.ServiceModel;
using System.Text;
using System.Threading.Tasks;

//please Note: this code is changing BPF stages based on 2 two optionsets and please modify with one as per the requirement...

namespace OA.MarketingSupportBPF
{
    public class UpdateBPFstage : IPlugin
    {
        public void Execute(IServiceProvider serviceProvider)
        {
            ITracingService tracingService = (ITracingService)serviceProvider.GetService(typeof(ITracingService));
            IPluginExecutionContext context = (IPluginExecutionContext)serviceProvider.GetService(typeof(IPluginExecutionContext));
            IOrganizationServiceFactory serviceFactory = (IOrganizationServiceFactory)serviceProvider.GetService(typeof(IOrganizationServiceFactory));
            IOrganizationService service = serviceFactory.CreateOrganizationService(context.UserId);

            tracingService.Trace("Plugin Execution Started.");

            // Define BPF Stage GUIDs... Note: please replace with BPF stages id
            Guid initialStageGuid = new Guid("8b35cc42-4a53-4778-b64d-be848b31e137");
            Guid wipStageGuid = new Guid("82e3e1fa-dcbd-4f93-a9e5-3abb8a56e95d");
            Guid closeStageGuid = new Guid("b0f98572-4242-4df1-81c2-349fad1ead7b");

            // Ensure the triggering entity is 'itl_marketingsupport'
            if (context.PrimaryEntityName != "itl_marketingsupport") //replace with table schema name
            {
                tracingService.Trace("Skipping execution as the entity is not 'itl_marketingsupport'.");
                return;
            }

            if (context.InputParameters.Contains("Target") && context.InputParameters["Target"] is Entity entity)
            {
                Guid recordId = entity.Id;
                tracingService.Trace($"Processing record: {recordId}");

                // Retrieve the full record including Reopen Case and Working Status
                //Note: please this code is based on two option set! please change with actual option set logical name below to update stages of BPF.
                Entity fullRecord = service.Retrieve("itl_marketingsupport", recordId, new ColumnSet("itl_reopencase", "itl_workingstatus"));

                if (fullRecord == null)
                {
                    tracingService.Trace("Record not found, exiting.");
                    return;
                }

                bool isReopenCaseChanged = entity.Contains("itl_reopencase"); //optionset to update BPF #1
                bool isWorkingStatusChanged = entity.Contains("itl_workingstatus"); ////optionset to update BPF #2

                OptionSetValue reopenCase = fullRecord.GetAttributeValue<OptionSetValue>("itl_reopencase");
                OptionSetValue workingStatus = fullRecord.GetAttributeValue<OptionSetValue>("itl_workingstatus");

                // Retrieve the active BPF instance with name of BPF
                QueryExpression query = new QueryExpression("itl_marketingsupportbpf")
                {
                    ColumnSet = new ColumnSet("businessprocessflowinstanceid", "activestageid"),
                    Criteria =
                {
                    Conditions =
                    {
                        new ConditionExpression("bpf_itl_marketingsupportid", ConditionOperator.Equal, recordId),
                        new ConditionExpression("statecode", ConditionOperator.Equal, 0) // Active BPF
                    }
                }
                };

                EntityCollection results = service.RetrieveMultiple(query);

                if (results.Entities.Count == 0)
                {
                    tracingService.Trace("❌ No Active BPF Instance Found.");
                    return;
                }

                Entity bpfInstance = results.Entities.First();
                Guid bpfInstanceId = bpfInstance.Id;
                tracingService.Trace($"✅ Active BPF Instance Found: {bpfInstanceId}");

                Entity updateBPF = new Entity("itl_marketingsupportbpf", bpfInstanceId);

                // Handle Reopen Case logic
                if (isReopenCaseChanged && reopenCase != null && reopenCase.Value == 1) // 1 = Yes
                {
                    tracingService.Trace("Reopen Case is set to Yes, moving BPF to WIP and clearing Working Status.");

                    updateBPF["activestageid"] = new EntityReference("processstage", initialStageGuid);

                    // Set Working Status to null
                    Entity updateMainRecord = new Entity("itl_marketingsupport", recordId);
                    updateMainRecord["itl_workingstatus"] = null;
                    service.Update(updateMainRecord);

                    service.Update(updateBPF);
                    tracingService.Trace("BPF moved to WIP, Working Status cleared.");
                    return; // Exit to prevent further processing
                }

                // Handle Working Status logic
                if (isWorkingStatusChanged)
                {
                    tracingService.Trace("Processing Working Status changes.");

                    if (workingStatus == null) // No selection
                    {
                        updateBPF["activestageid"] = new EntityReference("processstage", initialStageGuid);
                        tracingService.Trace("No Working Status selected, setting BPF to Initial Stage.");
                    }
                    else if (workingStatus.Value == 1) // Accepted
                    {
                        updateBPF["activestageid"] = new EntityReference("processstage", wipStageGuid);
                        tracingService.Trace("Working Status set to Accepted, moving BPF to WIP.");
                    }
                    else if (workingStatus.Value == 2) // Need more information	
                    {
                        updateBPF["activestageid"] = new EntityReference("processstage", initialStageGuid);
                        tracingService.Trace("Working Status set to Accepted, moving BPF to WIP.");
                    }
                    else if (workingStatus.Value == 3 || workingStatus.Value == 4) // Rejected or Resolved
                    {
                        updateBPF["activestageid"] = new EntityReference("processstage", closeStageGuid);
                        tracingService.Trace("Working Status set to Rejected or Resolved, moving BPF to Close.");

                        /* Set Reopen Case to Again Reopen
                        Entity updateMainRecord = new Entity("itl_marketingsupport", recordId);
                        updateMainRecord["itl_reopencase"] = new OptionSetValue(2); // 2 = No 
                        service.Update(updateMainRecord);
                        tracingService.Trace("Reopen Case set to No."); */
                    }

                    service.Update(updateBPF);
                }
            }

            tracingService.Trace("✅ Plugin Execution Completed.");
        }
    }
}


