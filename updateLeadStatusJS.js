function updateLeadStatus(executionContext) {
    var formContext = executionContext.getFormContext(); // Get form context

    // Ensure statuscode field exists
    var statusAttr = formContext.getAttribute("statuscode");
    if (!statusAttr) {
        console.log("statuscode attribute is not available.");
        return;
    }

    var statusReason = statusAttr.getValue();
    if (statusReason !== 2) {  
        return;  // Exit if status is not "Completed"
    }

    // Ensure regardingobjectid field exists
    var regardingAttr = formContext.getAttribute("regardingobjectid");
    if (!regardingAttr) {
        console.log("regardingobjectid attribute is not available.");
        return;
    }

    var regardingObject = regardingAttr.getValue();
    if (!regardingObject || regardingObject.length === 0) {
        console.log("Regarding field is empty.");
        return; // Exit if no regarding record is set
    }

    var regardingId = regardingObject[0].id.replace("{", "").replace("}", "");  // Remove curly braces
    var regardingEntityType = regardingObject[0].entityType; // Get entity type (lead, account, etc.)

    if (regardingEntityType !== "lead") {  
        return;  // Exit if Regarding is NOT a Lead
    }

    // Prepare the update payload for the Lead
    var leadUpdateData = {
        "statuscode": 3  // Change status to "Qualified" or "Contacted" (adjust as needed)
    };

    // Call Web API to update the Lead status
    Xrm.WebApi.updateRecord("lead", regardingId, leadUpdateData).then(
        function success(result) {
            console.log("Lead status updated successfully.");
        },
        function error(error) {
            console.log("Error updating lead status: " + error.message);
        }
    );
}
