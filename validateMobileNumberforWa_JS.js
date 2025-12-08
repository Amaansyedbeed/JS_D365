function validateContactMobileNumberforWa(ExecutionContext) {
    try {
        var formContext = ExecutionContext.getFormContext();
        var contactLookup = formContext.getAttribute("to").getValue();

        if (contactLookup && contactLookup.length > 0) {
            var contactId = contactLookup[0].id.replace("{", "").replace("}", "");

            // Fetch the contact's mobile number using Web API
            Xrm.WebApi.retrieveRecord("contact", contactId, "?$select=mobilephone").then(
                function success(result) {
                    console.log(result);
                  //var mobileNumber = contact.mobilephone;
		            var mobileNumber = result["mobilephone"];

                    var regex = /^\+91[6-9]\d{9}$/;
                    if (mobileNumber && regex.test(mobileNumber)) {
                        console.log("Valid mobile number: " + mobileNumber);
                    } else {
                        // Invalid mobile number - show alert and prevent save
                        Xrm.Utility.alertDialog("The contact's mobile number is not valid!!!. Please check the mobile number.");
                        ExecutionContext.getEventArgs().preventDefault(); //Prevent the save operation
                    }
                },
                function (error) {
                    console.error("Error retrieving contact: " + error.message);
                    Xrm.Utility.alertDialog("An error occurred while validating the contact's mobile number.");
                }
            );
        } else {
            Xrm.Utility.alertDialog("No contact is associated with this WhatsApp activity.");
            ExecutionContext.getEventArgs().preventDefault(); // Prevent the save operation
        }
    } catch (ex) {
        console.error("Error: " + ex.message);
        Xrm.Utility.alertDialog("An error occurred: " + ex.message);
    }
}
