function mapContactDetails(executionContext) {
    var formContext = executionContext.getFormContext();
    var contactField = formContext.getAttribute("parentcontactid"); // replace with your actual field name

    if (contactField && contactField.getValue() !== null) {
        var contactId = contactField.getValue()[0].id.replace("{", "").replace("}", "");

        Xrm.WebApi.retrieveRecord("contact", contactId, "?$select=emailaddress1,mobilephone").then(
            function success(result) {
                if (result.emailaddress1) {
                    formContext.getAttribute("emailaddress1").setValue(result.emailaddress1);
                }
                if (result.mobilephone) {
                    formContext.getAttribute("mobilephone").setValue(result.mobilephone);
                }
            },
            function (error) {
                console.log("Error retrieving contact details: " + error.message);
            }
        );
    } else {
        // Clear fields if no contact selected
        formContext.getAttribute("emailaddress1").setValue(null);
        formContext.getAttribute("mobilephone").setValue(null);
    }
}
