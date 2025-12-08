function Click4SendSMS(primaryControl) {
    var formContext = primaryControl;
    var EnterText = formContext.getAttribute("itl_entertexttosendsms").getValue();

    // Check if the Enter Text is Not Empty/Null
    if (EnterText == null) {
        Xrm.Utility.alertDialog("Please check: Enter Text To Send SMS is not Empty!");
        throw new Error("Please check: Enter Text To Send SMS is not Empty!.");
    }

    // Set the Click 4 Send SMS to true (will remain unsaved until user saves the form)
    formContext.getAttribute("itl_click4sendsms").setValue(true);

    Xrm.Utility.alertDialog("Text SMS Sent Successfully!");
}