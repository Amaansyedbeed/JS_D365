//working..js Main form on WhatsApp activity table
function setToFieldOnLoadWa(executionContext) {
    try {
        var formContext = executionContext.getFormContext();
        var regardingObject = formContext.getAttribute("regardingobjectid").getValue();

        if (regardingObject && regardingObject.length > 0) {
            var regardingEntity = regardingObject[0].entityType;
            var regardingId = regardingObject[0].id.replace("{", "").replace("}", "");
            var regardingName = regardingObject[0].name;

            //fetching the related Contact
            if (regardingEntity === "itl_lead") {
                // Fetch related Contact from Lead
                Xrm.WebApi.retrieveRecord("itl_lead", regardingId, "?$select=_itl_contact_value").then(
                    function success(result) {
                        var itl_contact = result["_itl_contact_value"]; // Related Contact GUID
                        var itl_contact_formatted = result["_itl_contact_value@OData.Community.Display.V1.FormattedValue"];
                        var itl_contact_lookuplogicalname = result["_itl_contact_value@Microsoft.Dynamics.CRM.lookuplogicalname"];

                        if (itl_contact && itl_contact_lookuplogicalname === "contact") {
                            // Set the "To" field with the related Contact
                            formContext.getAttribute("to").setValue([{
                                id: itl_contact,
                                name: itl_contact_formatted,
                                entityType: "contact"
                            }]);
                        } else {
                            Xrm.Utility.alertDialog("No related Contact found for the selected Lead.");
                        }
                    },
                    function (error) {
                        console.error("Error fetching related Contact from Lead: " + error.message);
                        Xrm.Utility.alertDialog("Error fetching related Contact from Lead: " + error.message);
                    }
                );
            } else if (regardingEntity === "account") {
                // Fetch primary Contact from Account
                Xrm.WebApi.retrieveRecord("account", regardingId, "?$select=_primarycontactid_value").then(
                    function success(result) {
                        var primarycontactid = result["_primarycontactid_value"];
                        var primarycontactid_formatted = result["_primarycontactid_value@OData.Community.Display.V1.FormattedValue"];
                        var primarycontactid_lookuplogicalname = result["_primarycontactid_value@Microsoft.Dynamics.CRM.lookuplogicalname"];

                        if (primarycontactid && primarycontactid_lookuplogicalname === "contact") {
                            // Set the "To" field with the primary Contact
                            formContext.getAttribute("to").setValue([{
                                id: primarycontactid,
                                name: primarycontactid_formatted,
                                entityType: "contact"
                            }]);
                        } else {
                            Xrm.Utility.alertDialog("No primary Contact found for the selected Account.");
                        }
                    },
                    function (error) {
                        console.error("Error fetching primary Contact from Account: " + error.message);
                        Xrm.Utility.alertDialog("Error fetching primary Contact from Account: " + error.message);
                    }
                );
            } else if (regardingEntity === "contact") {
                // Directly map the Contact to the "To" field
                formContext.getAttribute("to").setValue([{
                    id: regardingId,
                    name: regardingName,
                    entityType: "contact"
                }]);
            } else if (regardingEntity === "itl_case") {
                // Fetch related Contact from Case
                Xrm.WebApi.retrieveRecord("itl_case", regardingId, "?$select=_itl_contactid_value").then(
                    function success(result) {
                        var itl_contactid = result["_itl_contactid_value"]; // Related Contact GUID
                        var itl_contactid_formatted = result["_itl_contactid_value@OData.Community.Display.V1.FormattedValue"];
                        var itl_contactid_lookuplogicalname = result["_itl_contactid_value@Microsoft.Dynamics.CRM.lookuplogicalname"];

                        if (itl_contactid && itl_contactid_lookuplogicalname === "contact") {
                            // Set the "To" field with the related Contact
                            formContext.getAttribute("to").setValue([{
                                id: itl_contactid,
                                name: itl_contactid_formatted,
                                entityType: "contact"
                            }]);
                        } else {
                            Xrm.Utility.alertDialog("No related Contact found for the selected Case.");
                        }
                    },
                    function (error) {
                        console.error("Error fetching related Contact from Case: " + error.message);
                        Xrm.Utility.alertDialog("Error fetching related Contact from Case: " + error.message);
                    }
                );
            } else {
                Xrm.Utility.alertDialog("The selected entity type '" + regardingEntity + "' is not configured to map a Contact.");
            }
        } else {
           console.log("no parent record found");
        }
    } catch (ex) {
        console.error("An unexpected error occurred: " + ex.message);
        Xrm.Utility.alertDialog("An unexpected error occurred: " + ex.message);
    }
}


//for Quick Create form working #1
function setToFieldOnLoadQuickCreate(executionContext) {
    try {
        var formContext = executionContext.getFormContext();
        // Add a delay to ensure fields like 'regardingobjectid' are populated
        setTimeout(function () {
            var regardingObject = formContext.getAttribute("regardingobjectid").getValue();

            if (regardingObject && regardingObject.length > 0) {
                var regardingEntity = regardingObject[0].entityType;
                var regardingId = regardingObject[0].id.replace("{", "").replace("}", "");
                var regardingName = regardingObject[0].name;

                if (regardingEntity === "itl_lead") {
                    Xrm.WebApi.retrieveRecord("itl_lead", regardingId, "?$select=_itl_contact_value").then(
                        function success(result) {
                            var itl_contact = result["_itl_contact_value"];
                            var itl_contact_formatted = result["_itl_contact_value@OData.Community.Display.V1.FormattedValue"];
                            var itl_contact_lookuplogicalname = result["_itl_contact_value@Microsoft.Dynamics.CRM.lookuplogicalname"];

                            if (itl_contact && itl_contact_lookuplogicalname === "contact") {
                                formContext.getAttribute("to").setValue([{
                                    id: itl_contact,
                                    name: itl_contact_formatted,
                                    entityType: "contact"
                                }]);
                            } else {
                                Xrm.Utility.alertDialog("No related Contact found for the selected Lead.");
                            }
                        },
                        function (error) {
                            Xrm.Utility.alertDialog("Error fetching related Contact from Lead: " + error.message);
                        }
                    );
                } else if (regardingEntity === "account") {
                    Xrm.WebApi.retrieveRecord("account", regardingId, "?$select=_primarycontactid_value").then(
                        function success(result) {
                            var primarycontactid = result["_primarycontactid_value"];
                            var primarycontactid_formatted = result["_primarycontactid_value@OData.Community.Display.V1.FormattedValue"];
                            var primarycontactid_lookuplogicalname = result["_primarycontactid_value@Microsoft.Dynamics.CRM.lookuplogicalname"];

                            if (primarycontactid && primarycontactid_lookuplogicalname === "contact") {
                                formContext.getAttribute("to").setValue([{
                                    id: primarycontactid,
                                    name: primarycontactid_formatted,
                                    entityType: "contact"
                                }]);
                            } else {
                                Xrm.Utility.alertDialog("No primary Contact found for the selected Account.");
                            }
                        },
                        function (error) {
                            Xrm.Utility.alertDialog("Error fetching primary Contact from Account: " + error.message);
                        }
                    );
                } else if (regardingEntity === "contact") {
                    formContext.getAttribute("to").setValue([{
                        id: regardingId,
                        name: regardingName,
                        entityType: "contact"
                    }]);
                } else if (regardingEntity === "itl_case") {
                    Xrm.WebApi.retrieveRecord("itl_case", regardingId, "?$select=_itl_contactid_value").then(
                        function success(result) {
                            var itl_contactid = result["_itl_contactid_value"];
                            var itl_contactid_formatted = result["_itl_contactid_value@OData.Community.Display.V1.FormattedValue"];
                            var itl_contactid_lookuplogicalname = result["_itl_contactid_value@Microsoft.Dynamics.CRM.lookuplogicalname"];

                            if (itl_contactid && itl_contactid_lookuplogicalname === "contact") {
                                formContext.getAttribute("to").setValue([{
                                    id: itl_contactid,
                                    name: itl_contactid_formatted,
                                    entityType: "contact"
                                }]);
                            } else {
                                Xrm.Utility.alertDialog("No related Contact found for the selected Case.");
                            }
                        },
                        function (error) {
                            Xrm.Utility.alertDialog("Error fetching related Contact from Case: " + error.message);
                        }
                    );
                } else {
                    Xrm.Utility.alertDialog("The selected entity type '" + regardingEntity + "' is not configured to map a Contact.");
                }
            } else {
                Xrm.Utility.alertDialog("No parent record found in the Regarding field. Please associate a record.");
            }
        }, 500); // 500ms delay = 0.5 Second
    } catch (ex) {
        Xrm.Utility.alertDialog("An unexpected error occurred: " + ex.message);
    }
}

//working validation on Quick Create form and updating fields #1
function validateContactMobileAndUpdate(executionContext) {
    try {
        debugger;
        var formContext = executionContext.getFormContext();
        var contactLookup = formContext.getAttribute("to").getValue();
        
        if (contactLookup && contactLookup.length > 0) {
            var contactId = contactLookup[0].id.replace("{", "").replace("}", "");
            // Fetch the Contact's mobile number using Web API
            Xrm.WebApi.retrieveRecord("contact", contactId, "?$select=mobilephone").then(
                function success(result) {
                    var mobileNumber = result["mobilephone"];
                    var regex = /^\+91[6-9]\d{9}$/; // RegEx for validating Indian mobile numbers

                    if (!mobileNumber) {
                        Xrm.Utility.alertDialog("The contact does not have a mobile number. Please update the mobile number.");
                      //  executionContext.getEventArgs().preventDefault();
                    } else if (!regex.test(mobileNumber)) {
                        Xrm.Utility.alertDialog("The contact's mobile number is not valid. Please update the mobile number to the format +91XXXXXXXXXX");
                     //   executionContext.getEventArgs().preventDefault();
                    } else {
                        console.log("Valid mobile number: " + mobileNumber);
                        // Use setState to update statecode and statuscode fields
                        var entityId = formContext.data.entity.getId().replace("{", "").replace("}", "");
                        var entityName = formContext.data.entity.getEntityName();

                        var entityRecord = {
                            statecode: 1,
                            statuscode: 999990004 
                        };
                        Xrm.WebApi.updateRecord(entityName, entityId, entityRecord).then(
                            function success() {
                                Xrm.Utility.alertDialog("WhatsApp Text Sent Successfully!..");
                             //   formContext.data.refresh(false); // Refresh the form to reflect changes
                            },
                            function error(error) {
                                console.error("Error updating state and status: " + error.message);
                                Xrm.Utility.alertDialog("Error updating record: " + error.message);
                            }
                        );
                    }
                },
                function (error) {
                    Xrm.Utility.alertDialog("Error fetching mobile number: " + error.message);
                }
            );
        }
    } catch (ex) {
        Xrm.Utility.alertDialog("An unexpected error occurred during mobile number validation: " + ex.message);
       // executionContext.getEventArgs().preventDefault();
    }
}

//commented test for timeout
// function setToFieldOnLoadQuickCreate(executionContext) {
//     try {
//         var formContext = executionContext.getFormContext();
        
//         // Ensure the regardingobjectid field is populated
//         var regardingObjectAttr = formContext.getAttribute("regardingobjectid");

//         // Check if regardingobjectid has already been populated
//         if (regardingObjectAttr.getValue()) {
//             processRegardingObject(formContext, regardingObjectAttr.getValue());
//         } else {
//             // Attach an onchange handler to handle when regardingobjectid is populated
//             regardingObjectAttr.addOnChange(function () {
//                 var regardingObject = regardingObjectAttr.getValue();
//                 if (regardingObject) {
//                     processRegardingObject(formContext, regardingObject);
//                 }
//             });
//         }

//     } catch (ex) {
//         Xrm.Utility.alertDialog("An unexpected error occurred: " + ex.message);
//     }
// }

// function processRegardingObject(formContext, regardingObject) {
//     var regardingEntity = regardingObject[0].entityType;
//     var regardingId = regardingObject[0].id.replace("{", "").replace("}", "");
//     var regardingName = regardingObject[0].name;

//     if (regardingEntity === "itl_lead") {
//         Xrm.WebApi.retrieveRecord("itl_lead", regardingId, "?$select=_itl_contact_value").then(
//             function success(result) {
//                 var itl_contact = result["_itl_contact_value"];
//                 var itl_contact_formatted = result["_itl_contact_value@OData.Community.Display.V1.FormattedValue"];
//                 var itl_contact_lookuplogicalname = result["_itl_contact_value@Microsoft.Dynamics.CRM.lookuplogicalname"];

//                 if (itl_contact && itl_contact_lookuplogicalname === "contact") {
//                     formContext.getAttribute("to").setValue([{
//                         id: itl_contact,
//                         name: itl_contact_formatted,
//                         entityType: "contact"
//                     }]);
//                 } else {
//                     Xrm.Utility.alertDialog("No related Contact found for the selected Lead.");
//                 }
//             },
//             function (error) {
//                 Xrm.Utility.alertDialog("Error fetching related Contact from Lead: " + error.message);
//             }
//         );
//     } else if (regardingEntity === "account") {
//         Xrm.WebApi.retrieveRecord("account", regardingId, "?$select=_primarycontactid_value").then(
//             function success(result) {
//                 var primarycontactid = result["_primarycontactid_value"];
//                 var primarycontactid_formatted = result["_primarycontactid_value@OData.Community.Display.V1.FormattedValue"];
//                 var primarycontactid_lookuplogicalname = result["_primarycontactid_value@Microsoft.Dynamics.CRM.lookuplogicalname"];

//                 if (primarycontactid && primarycontactid_lookuplogicalname === "contact") {
//                     formContext.getAttribute("to").setValue([{
//                         id: primarycontactid,
//                         name: primarycontactid_formatted,
//                         entityType: "contact"
//                     }]);
//                 } else {
//                     Xrm.Utility.alertDialog("No primary Contact found for the selected Account.");
//                 }
//             },
//             function (error) {
//                 Xrm.Utility.alertDialog("Error fetching primary Contact from Account: " + error.message);
//             }
//         );
//     } else if (regardingEntity === "contact") {
//         formContext.getAttribute("to").setValue([{
//             id: regardingId,
//             name: regardingName,
//             entityType: "contact"
//         }]);
//     } else if (regardingEntity === "itl_case") {
//         Xrm.WebApi.retrieveRecord("itl_case", regardingId, "?$select=_itl_contactid_value").then(
//             function success(result) {
//                 var itl_contactid = result["_itl_contactid_value"];
//                 var itl_contactid_formatted = result["_itl_contactid_value@OData.Community.Display.V1.FormattedValue"];
//                 var itl_contactid_lookuplogicalname = result["_itl_contactid_value@Microsoft.Dynamics.CRM.lookuplogicalname"];

//                 if (itl_contactid && itl_contactid_lookuplogicalname === "contact") {
//                     formContext.getAttribute("to").setValue([{
//                         id: itl_contactid,
//                         name: itl_contactid_formatted,
//                         entityType: "contact"
//                     }]);
//                 } else {
//                     Xrm.Utility.alertDialog("No related Contact found for the selected Case.");
//                 }
//             },
//             function (error) {
//                 Xrm.Utility.alertDialog("Error fetching related Contact from Case: " + error.message);
//             }
//         );
//     } else {
//         Xrm.Utility.alertDialog("The selected entity type '" + regardingEntity + "' is not configured to map a Contact.");
//     }
// }

        //check test
        // function validateContactMobileAndUpdate(executionContext) {
        //     try {
        //         debugger;
        //         var formContext = executionContext.getFormContext();
        //         var contactLookup = formContext.getAttribute("to").getValue();
        
        //         if (contactLookup && contactLookup.length > 0) {
        //             var contactId = contactLookup[0].id.replace("{", "").replace("}", "");
        //         // Fetch the Contact's mobile number using Web API
        //         Xrm.WebApi.retrieveRecord("contact", contactId, "?$select=mobilephone").then(
        //             function success(result) {
        //                 var mobileNumber = result["mobilephone"];
        //                 var regex = /^\+91[6-9]\d{9}$/; // RegEx for validating Indian mobile numbers
        
        //                 if (!mobileNumber) {
        //                     Xrm.Utility.alertDialog("The contact does not have a mobile number. Please update the mobile number.");
        //                 } else if (!regex.test(mobileNumber)) {
        //                     Xrm.Utility.alertDialog("The contact's mobile number is not valid. Please update the mobile number to the format +91XXXXXXXXXX.");
        //                 } else {
        //                     alert("validation Succeed!..");
        //                     console.log("Valid mobile number: " + mobileNumber);
        //                     formContext.getAttribute("statecode").setValue(1);
        //                     formContext.getAttribute("statuscode").setValue(999990004);
        //                     formContext.data.entity.save();
        //                     Xrm.Utility.alertDialog("WhatsApp Text Sent Successfully and record updated!");
        //                 }
        //             },
        //             function (error) {
        //                 Xrm.Utility.alertDialog("Error fetching mobile number: " + error.message);
        //             }
        //         );
        //     }
        // } catch (ex) {
        //         Xrm.Utility.alertDialog("An unexpected error occurred during mobile number validation: " + ex.message);
        //     }
        // }
        // function mapToField(formContext, contactId, contactName, entityType) {
        //     formContext.getAttribute("to").setValue([{
        //         id: contactId,
        //         name: contactName,
        //         entityType: entityType
        //     }]);
        // }
