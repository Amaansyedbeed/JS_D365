//Set wa Subject 
function setSubject(ExecutionContext){
    debugger;
    var formContext = ExecutionContext.getFormContext();
    var Description = formContext.getAttribute("description").getValue();
    try{
       if(Description != null)
       {
        formContext.getAttribute("subject").setValue(Description);
       }
    }catch(ex){
        Xrm.Utility.alertDialog("Error catch! setSubject: " + ex.message);
    }
}