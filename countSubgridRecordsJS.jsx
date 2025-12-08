function setSubgridCount(ExecutionContext){
    try{
    var formContext = ExecutionContext.getFormContext();
    var Input = formContext.getAttribute("ams_currentemployeecost").getValue();
    if(Input == true)
    {
    //Get Grid Context
    var gridContext = formContext.getControl("Opportunity_Position"); //Sub-Grid Name
    //Getting Grid Row Count
    let filteredRecordCount = gridContext.getGrid().getTotalRecordCount(); // Collect Total Row Count
    formContext.getAttribute("cc_displaytotalcount").setValue(filteredRecordCount);
    formContext.getAttribute("cc_calculaterecordcount").setValue(false);
    }
    
    }catch(ex)
    {
        Xrm.Utility.alertDialog("Error Catch!.." + ex.message);
    }
}

function countSubgridRecords () {
    setTimeout(function () {
    if (Xrm.Page.getControl("Opportunity_Position") != undefined) {
    var leadCount = Xrm.Page.getControl("Opportunity_Position").getGrid().getTotalRecordCount();
    alert(leadCount);// This is to see if the count is accurate or not. Once you’re done with the code just comment this line.
    var x = parseInt(leadCount);//parseInt() function parses a string and returns an integer.
    Xrm.Page.getAttribute("ams_currentemployeecost").setValue(x);
    Xrm.Page.getAttribute("ams_currentemployeecost").setSubmitMode("always");
    };
    }, 2000);
    }