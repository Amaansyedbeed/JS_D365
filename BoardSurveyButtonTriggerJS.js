function triggerSurveyFlow(primaryControl) {
    var formContext = primaryControl;
    var contactTypeAttr = formContext.getAttribute("ams_contacttype");

    // Check if the contact is a Board Member (contacttype = 1)
    if (!contactTypeAttr || contactTypeAttr.getValue() !== 1) {
        throw new Error("Please check: the contact type must be Board Member.");
    }

    // Set the survey flag to true (will remain unsaved until user saves the form)
    formContext.getAttribute("itl_sentboardsurveyflag").setValue(true);

    Xrm.Utility.alertDialog("Survey has been marked for the board member!");
}




// function triggerSurveyFlow(primaryControl) {
//     var formContext = primaryControl;
//     var contactTypeAttr = formContext.getAttribute("ams_contacttype").getValue();

//     if (!contactTypeAttr || contactTypeAttr !== 1) {
//         throw new Error("Please check: the contact type must be Board Member.");
//     }
//     else{
//         formContext.getAttribute("itl_sentboardsurveyflag").setValue(true);
//         Xrm.Utility.alertDialog("Survey has been sent to the board member");
//     }
// }

//itl_friendlyboardremindercontact //itl_finalboardremindercontact

// function triggerSurveyFlow(primaryControl) {
//     var formContext = primaryControl;
//     var contactId = formContext.data.entity.getId();
//     var contactTypeAttr = formContext.getAttribute("ams_contacttype");

//     if (!contactTypeAttr || contactTypeAttr.getValue() !== 1) {
//         throw new Error("Please check: the contact type must be Board Member.");
//     }

//     var now = new Date().toISOString(); // UTC time
//     var data = {
//         "itl_boardtriggeredon": now
//     };

//     Xrm.WebApi.updateRecord("contact", contactId.replace(/[{}]/g, ""), data).then(
//         function success(result) {
//             Xrm.Utility.alertDialog("Survey trigger initiated.");
//         },
//         function(error) {
//             Xrm.Utility.alertDialog("Error triggering survey: " + error.message);
//         }
//     );
// }
