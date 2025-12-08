//Clone Opportunity OnClick Custom Button
function cloneOpportunityRecord(primaryContext) {
    try {
        var recordId = primaryContext.data.entity.getId().replace("{", "").replace("}", "");

        Xrm.WebApi.retrieveRecord("opportunity", recordId, "?$select=opportunityid,_accountid_value,_parentaccountid_value,budgetamount,itl_businesstype,itl_clientcode,itl_clienttype,_contactid_value,_parentcontactid_value,itl_description,actualclosedate,estimatedvalue,itl_leadsource,itl_market,itl_nextstep,itl_offerings,name,_ownerid_value,itl_repeatabilitypotential,itl_type,description,estimatedclosedate,itl_estrevenuepotentialfornextfy2").then(
            function success(result) {

                // Show confirmation dialog
                var confirmOptions = {
                    title: "Confirm Clone",
                    text: "Are you sure you want to clone this opportunity?"
                };

                Xrm.Navigation.openConfirmDialog(confirmOptions).then(
                    function (response) {
                        if (response.confirmed) {
                            // Build the new record object
                            var newOpportunity = {
                                "name": result.name,
                                "estimatedclosedate": result.estimatedclosedate,
                                "itl_businesstype": result.itl_businesstype,
                                "itl_clientcode": result.itl_clientcode,
                                "itl_clienttype": result.itl_clienttype,
                                "itl_description": result.itl_description,
                                "itl_estrevenuepotentialfornextfy2": result.itl_estrevenuepotentialfornextfy2,
                                "estimatedvalue": result.estimatedvalue,
                                "itl_leadsource": result.itl_leadsource,
                                "itl_market": result.itl_market,
                                "itl_nextstep": result.itl_nextstep,
                                "itl_offerings": result.itl_offerings,
                                "itl_repeatabilitypotential": result.itl_repeatabilitypotential,
                                "description": result.description,
                                "itl_type": result.itl_type
                            };

                            // Add lookups
                            if (result["_accountid_value"]) {
                                newOpportunity["customerid_account@odata.bind"] = `/accounts(${result["_accountid_value"]})`;
                            }

                            if (result["_contactid_value"]) {
                                newOpportunity["customerid_contact@odata.bind"] = `/contacts(${result["_contactid_value"]})`;
                            }

                            if (result["_ownerid_value"]) {
                                newOpportunity["ownerid@odata.bind"] = `/${result["_ownerid_value@Microsoft.Dynamics.CRM.lookuplogicalname"]}s(${result["_ownerid_value"]})`;
                            }

                            if (result["_parentaccountid_value"]) {
                                newOpportunity["parentaccountid@odata.bind"] = `/accounts(${result["_parentaccountid_value"]})`;
                            }

                            if (result["_parentcontactid_value"]) {
                                newOpportunity["parentcontactid@odata.bind"] = `/contacts(${result["_parentcontactid_value"]})`;
                            }

                            // Create the new record
                            Xrm.WebApi.createRecord("opportunity", newOpportunity).then(
                                function success(newRecord) {
                                    Xrm.Navigation.openForm({
                                        entityName: "opportunity",
                                        entityId: newRecord.id
                                    });
                                    Xrm.Utility.alertDialog("The opportunity has been successfully cloned!");
                                },
                                function (error) {
                                    console.error("Error creating cloned opportunity:", error.message);
                                    Xrm.Navigation.openAlertDialog({ text: error.message });
                                }
                            );
                        }
                        // else, do nothing if the user cancels
                    },
                    function (error) {
                        console.error("Error in confirmation dialog:", error.message);
                        Xrm.Navigation.openAlertDialog({ text: error.message });
                    }
                );
            },
            function (error) {
                console.error("Error retrieving opportunity:", error.message);
                Xrm.Navigation.openAlertDialog({ text: error.message });
            }
        );
    } catch (ex) {
        Xrm.Utility.alertDialog("Unexpected error: " + ex.message);
    }
}



//Set temporary address into permanent address onclick checkmark eq yes # Table - account
function setPermanentAddress(executionContext)
{
try
{
 var formContext = executionContext.getFormContext();
 var BillingAddress1 = formContext.getAttribute("address1_name").getValue();
 var BillingAddress2 = formContext.getAttribute("address1_line2").getValue();
 var BillingAddress3 = formContext.getAttribute("address1_city").getValue();
 var BillingPostalCode4 = formContext.getAttribute("address1_postalcode").getValue();
 var BillingState5 = formContext.getAttribute("address1_stateorprovince").getValue();
 var SameasBillingAddress = formContext.getAttribute("itl_sameasbillingaddress").getValue();

 if(SameasBillingAddress == true)
 {
    formContext.getAttribute("address2_name").setValue(BillingAddress1);
    formContext.getAttribute("address2_line2").setValue(BillingAddress2);
    formContext.getAttribute("address2_city").setValue(BillingAddress3);
    formContext.getAttribute("address2_postalcode").setValue(BillingPostalCode4);
    formContext.getAttribute("address2_stateorprovince").setValue(BillingState5);
 }
 else{
    formContext.getAttribute("address2_name").setValue(null);
    formContext.getAttribute("address2_line2").setValue(null);
    formContext.getAttribute("address2_city").setValue(null);
    formContext.getAttribute("address2_postalcode").setValue(null);
    formContext.getAttribute("address2_stateorprovince").setValue(null);
 }
}catch(ex)
{
    Xrm.Utility.alertDialog("Error Catch " + ex.message);
}
}

//Clone Opportunity Record Onclick custom button #working
// function cloneOpportunityRecord(primaryContext)
// {
//     try{
//         var recordId = primaryContext.data.entity.getId().replace("{", "").replace("}", "");
        
//         Xrm.WebApi.retrieveRecord("opportunity", recordId, "?$select=opportunityid,_accountid_value,_parentaccountid_value,budgetamount,itl_businesstype,itl_clientcode,itl_clienttype,_contactid_value,_parentcontactid_value,itl_description,actualclosedate,estimatedvalue,itl_leadsource,itl_market,itl_nextstep,itl_offerings,name,_ownerid_value,itl_repeatabilitypotential,itl_type").then(
//         function success(result) {
//             // Build the new record object
//             var newOpportunity = {
//                 "name": result.name,
//                 "budgetamount": result.budgetamount,
//                 "itl_businesstype": result.itl_businesstype,
//                 "itl_clientcode": result.itl_clientcode,
//                 "itl_clienttype": result.itl_clienttype,
//                 "itl_description": result.itl_description,
//                 "actualclosedate": result.actualclosedate,
//                 "estimatedvalue": result.estimatedvalue,
//                 "itl_leadsource": result.itl_leadsource,
//                 "itl_market": result.itl_market,
//                 "itl_nextstep": result.itl_nextstep,
//                 "itl_offerings": result.itl_offerings,
//                 "itl_repeatabilitypotential": result.itl_repeatabilitypotential,
//                 "itl_type": result.itl_type
//             };

//             // Add lookups
//             if (result["_accountid_value"]) {
//                 newOpportunity["customerid_account@odata.bind"] = `/accounts(${result["_accountid_value"]})`;
//             }

//             if (result["_contactid_value"]) {
//                 newOpportunity["customerid_contact@odata.bind"] = `/contacts(${result["_contactid_value"]})`;
//             }

//             if (result["_ownerid_value"]) {
//                 newOpportunity["ownerid@odata.bind"] = `/${result["_ownerid_value@Microsoft.Dynamics.CRM.lookuplogicalname"]}s(${result["_ownerid_value"]})`;
//             }

//             if (result["_parentaccountid_value"]) {
//                 newOpportunity["parentaccountid@odata.bind"] = `/accounts(${result["_parentaccountid_value"]})`;
//             }

//             if (result["_parentcontactid_value"]) {
//                 newOpportunity["parentcontactid@odata.bind"] = `/contacts(${result["_parentcontactid_value"]})`;
//             }

//             // Create the new record
//             Xrm.WebApi.createRecord("opportunity", newOpportunity).then(
//                 function success(newRecord) {
//                     // Open the new opportunity form
//                     Xrm.Navigation.openForm({
//                         entityName: "opportunity",
//                         entityId: newRecord.id
//                     });
//                         // Show success message
//                         Xrm.Utility.alertDialog("The opportunity has been successfully cloned!");
//                 },
//                 function(error) {
//                     console.error("Error creating cloned opportunity:", error.message);
//                     Xrm.Navigation.openAlertDialog({ text: error.message });
//                 }
//             );
//         },
//         function(error) {
//             console.error("Error retrieving opportunity:", error.message);
//             Xrm.Navigation.openAlertDialog({ text: error.message });
//         }
//     );
//     }catch(ex)
//     {
//         Xrm.Utitilty.alertDialog("Error Catch: " + CloneOpportunity);
//     }
// }



// Xrm.WebApi.retrieveRecord("opportunity", "0ca3e9e7-e52a-4f53-bbb4-3a71b601b800", "?$select=opportunityid,_accountid_value,_parentaccountid_value,budgetamount,itl_businesstype,itl_clientcode,itl_clienttype,_contactid_value,_parentcontactid_value,itl_description,actualclosedate,estimatedvalue,itl_leadsource,itl_market,itl_nextstep,itl_offerings,name,_ownerid_value,itl_probability,itl_repeatabilitypotential,itl_type").then(
// 	function success(result) {
// 		console.log(result);
// 		// Columns
// 		var opportunityid = result["opportunityid"]; // Guid
// 		var accountid = result["_accountid_value"]; // Lookup
// 		var accountid_formatted = result["_accountid_value@OData.Community.Display.V1.FormattedValue"];
// 		var accountid_lookuplogicalname = result["_accountid_value@Microsoft.Dynamics.CRM.lookuplogicalname"];
// 		var parentaccountid = result["_parentaccountid_value"]; // Lookup
// 		var parentaccountid_formatted = result["_parentaccountid_value@OData.Community.Display.V1.FormattedValue"];
// 		var parentaccountid_lookuplogicalname = result["_parentaccountid_value@Microsoft.Dynamics.CRM.lookuplogicalname"];
// 		var budgetamount = result["budgetamount"]; // Currency
// 		var itl_businesstype = result["itl_businesstype"]; // Choice
// 		var itl_businesstype_formatted = result["itl_businesstype@OData.Community.Display.V1.FormattedValue"];
// 		var itl_clientcode = result["itl_clientcode"]; // Text
// 		var itl_clienttype = result["itl_clienttype"]; // Choice
// 		var itl_clienttype_formatted = result["itl_clienttype@OData.Community.Display.V1.FormattedValue"];
// 		var contactid = result["_contactid_value"]; // Lookup
// 		var contactid_formatted = result["_contactid_value@OData.Community.Display.V1.FormattedValue"];
// 		var contactid_lookuplogicalname = result["_contactid_value@Microsoft.Dynamics.CRM.lookuplogicalname"];
// 		var parentcontactid = result["_parentcontactid_value"]; // Lookup
// 		var parentcontactid_formatted = result["_parentcontactid_value@OData.Community.Display.V1.FormattedValue"];
// 		var parentcontactid_lookuplogicalname = result["_parentcontactid_value@Microsoft.Dynamics.CRM.lookuplogicalname"];
// 		var itl_description = result["itl_description"]; // Multiline Text
// 		var actualclosedate = result["actualclosedate"]; // Date Time
// 		var actualclosedate_formatted = result["actualclosedate@OData.Community.Display.V1.FormattedValue"];
// 		var estimatedvalue = result["estimatedvalue"]; // Currency
// 		var itl_leadsource = result["itl_leadsource"]; // Choice
// 		var itl_leadsource_formatted = result["itl_leadsource@OData.Community.Display.V1.FormattedValue"];
// 		var itl_market = result["itl_market"]; // Choice
// 		var itl_market_formatted = result["itl_market@OData.Community.Display.V1.FormattedValue"];
// 		var itl_nextstep = result["itl_nextstep"]; // Text
// 		var itl_offerings = result["itl_offerings"]; // Choice
// 		var itl_offerings_formatted = result["itl_offerings@OData.Community.Display.V1.FormattedValue"];
// 		var name = result["name"]; // Text
// 		var ownerid = result["_ownerid_value"]; // Owner
// 		var ownerid_formatted = result["_ownerid_value@OData.Community.Display.V1.FormattedValue"];
// 		var ownerid_lookuplogicalname = result["_ownerid_value@Microsoft.Dynamics.CRM.lookuplogicalname"];
// 		var itl_probability = result["itl_probability"]; // Choice
// 		var itl_probability_formatted = result["itl_probability@OData.Community.Display.V1.FormattedValue"];
// 		var itl_repeatabilitypotential = result["itl_repeatabilitypotential"]; // Choice
// 		var itl_repeatabilitypotential_formatted = result["itl_repeatabilitypotential@OData.Community.Display.V1.FormattedValue"];
// 		var itl_type = result["itl_type"]; // Choice
// 		var itl_type_formatted = result["itl_type@OData.Community.Display.V1.FormattedValue"];
// 	},
// 	function(error) {
// 		console.log(error.message);
// 	}
// );