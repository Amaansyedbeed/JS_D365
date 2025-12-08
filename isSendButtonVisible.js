function isSendButtonVisible(primaryControl) {
    try {
        var formContext = primaryControl;
        var ActivityType = formContext.getAttribute("statecode").getValue();
        var StatusReason = formContext.getAttribute("statuscode").getValue();

        if (ActivityType != 1 && StatusReason != 999990004) {
            return true; //visible
        }
        return false; //hidden
    } catch (ex) {
        console.error("Error in visibility check: " + ex.message);
        return false;
    }
}
