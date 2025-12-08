function sendWaMessageButton(primaryControl) {
    try {
        var primaryContext = primaryControl;
        var confirmStrings = {
            text: "Are you sure you want to send the WhatsApp Message?",
            title: "Send Confirmation",
            confirmButtonLabel: "OK",
            cancelButtonLabel: "Cancel"
        };
        var confirmOptions = { height: 200, width: 450 };

        // Open the confirmation dialog
        Xrm.Navigation.openConfirmDialog(confirmStrings, confirmOptions).then(
            function (result) {
                if (result.confirmed) {
                    // User clicked "OK"
                    primaryContext.getAttribute("statecode").setValue(1);
                    primaryContext.getAttribute("statuscode").setValue(999990004);
                    primaryContext.data.entity.save();

                    var alertStrings = {
                        confirmButtonLabel: "OK",
                        text: "WhatsApp Text Send Succeed!...Thank You!",
                        title: "Success"
                    };
                    var alertOptions = { height: 200, width: 450 };

                    Xrm.Navigation.openAlertDialog(alertStrings, alertOptions);
                } else {
                    // User clicked "Cancel"
                    console.log("User canceled the send operation.");
                }
            },
            function (error) {
                console.error("Error displaying confirmation dialog: " + error.message);
            }
        );
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
