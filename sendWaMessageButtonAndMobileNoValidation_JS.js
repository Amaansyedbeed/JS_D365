// function sendWaMessageButton(primaryControl) {
//     try {
//         var primaryContext = primaryControl;

//         // Get the related contact from the "to" lookup field
//         var contactLookup = primaryContext.getAttribute("to").getValue();

//         if (contactLookup && contactLookup.length > 0) {
//             var contactId = contactLookup[0].id.replace("{", "").replace("}", ""); // Extract contact GUID

//             // Fetch the contact's mobile number using Web API
//             Xrm.WebApi.retrieveRecord("contact", contactId, "?$select=mobilephone").then(
//                 function success(result) {
//                     var mobileNumber = result["mobilephone"];
//                     var regex = /^\+91[6-9]\d{9}$/; // RegEx for validating mobile number

//                     if (!mobileNumber) {
//                         // Handle null or empty mobile number
//                         Xrm.Utility.alertDialog("The contact does not have a mobile number. Please update the mobile number.");
//                     } else if (!regex.test(mobileNumber)) {
//                         // Handle invalid mobile number
//                         Xrm.Utility.alertDialog("The contact's mobile number is not valid. Please update the mobile number in IND format +91...");
//                     } else {
//                         console.log("Valid mobile number: " + mobileNumber);

//                         // Mobile number is valid, proceed with confirmation dialog
//                         var confirmStrings = {
//                             text: "Are you sure you want to send the WhatsApp Message?",
//                             title: "Send Confirmation",
//                             confirmButtonLabel: "OK",
//                             cancelButtonLabel: "Cancel"
//                         };
//                         var confirmOptions = { height: 200, width: 450 };

//                         Xrm.Navigation.openConfirmDialog(confirmStrings, confirmOptions).then(
//                             function (result) {
//                                 if (result.confirmed) {
//                                     // User clicked "OK"
//                                     primaryContext.getAttribute("statecode").setValue(1);
//                                     primaryContext.getAttribute("statuscode").setValue(999990004);
//                                     primaryContext.data.entity.save();

//                                     var alertStrings = {
//                                         confirmButtonLabel: "OK",
//                                         text: "WhatsApp Text Send Succeed!...Thank You!",
//                                         title: "Success"
//                                     };
//                                     var alertOptions = { height: 200, width: 450 };

//                                     Xrm.Navigation.openAlertDialog(alertStrings, alertOptions);
//                                 } else {
//                                     // User clicked "Cancel"
//                                     console.log("User canceled the send operation.");
//                                 }
//                             },
//                             function (error) {
//                                 console.error("Error displaying confirmation dialog: " + error.message);
//                             }
//                         );
//                     }
//                 },
//                 function (error) {
//                     console.error("Error retrieving contact: " + error.message);
//                     Xrm.Utility.alertDialog("An error occurred while validating the contact's mobile number.");
//                 }
//             );
//         } else {
//             // No contact associated with the WhatsApp activity
//             Xrm.Utility.alertDialog("No contact is associated with this WhatsApp activity.");
//         }
//     } catch (ex) {
//         // Handle errors
//         var alertStrings = {
//             confirmButtonLabel: "OK",
//             text: "Error caught: " + ex.message,
//             title: "Error"
//         };
//         var alertOptions = { height: 200, width: 450 };

//         Xrm.Navigation.openAlertDialog(alertStrings, alertOptions);
//     }
// }
function sendWaMessageButton(primaryControl) {
    try {
        debugger;
        var primaryContext = primaryControl;
        primaryContext.data.entity.save();
        var contactLookup = primaryContext.getAttribute("to").getValue();

        if (contactLookup && contactLookup.length > 0) {
            var contactId = contactLookup[0].id.replace("{", "").replace("}", ""); // Extract contact GUID

            // Fetch the contact's mobile number using Web API
            Xrm.WebApi.retrieveRecord("contact", contactId, "?$select=mobilephone").then(
                function success(result) {
                    var mobileNumber = result["mobilephone"];
                    var regex = /^\+91[6-9]\d{9}$/; // RegEx for validating Indian mobile number

                    if (!mobileNumber) {
                        Xrm.Utility.alertDialog("The contact does not have a mobile number. Please update the mobile number.");
                    } else if (!regex.test(mobileNumber)) {
                        Xrm.Utility.alertDialog("The contact's mobile number is not valid. Please update the mobile number to the format +91XXXXXXXXXX.");
                    } else {
                        console.log("Valid mobile number: " + mobileNumber);
                        primaryContext.getAttribute("statecode").setValue(1);
                        primaryContext.getAttribute("statuscode").setValue(999990004);
                        Xrm.Utility.alertDialog("WhatsApp Text Sent Successfully!..");
                        primaryContext.data.entity.save();
                        // Display success message
                        var alertStrings = {
                            confirmButtonLabel: "OK",
                            text: "WhatsApp Text Sent Successfully! Changes have also been saved.",
                            title: "Success"
                        };
                        var alertOptions = { height: 200, width: 450 };
                        primaryContext.data.entity.save();
                        Xrm.Navigation.openAlertDialog(alertStrings, alertOptions);
                    }
                },
                function (error) {
                    console.error("Error retrieving contact: " + error.message);
                    Xrm.Utility.alertDialog("An error occurred while validating the contact's mobile number.");
                }
            );
        } 
    } catch (ex) {
        var alertStrings = {
            confirmButtonLabel: "OK",
            text: "Error caught: " + ex.message,
            title: "Error"
        };
        var alertOptions = { height: 200, width: 450 };
        Xrm.Navigation.openAlertDialog(alertStrings, alertOptions);
    }
}
