function sendWaMessageButton(primaryControl)
{
  try{
  var primaryContext = primaryControl;
   
    primaryContext.data.entity.save();
    primaryContext.getAttribute("statecode").setValue(1);
    primaryContext.getAttribute("statuscode").setValue(999990004);
    Xrm.Utility.alertDialog("WhatsApp Text Send Succeed!...");

}catch(ex)
{
    Xrm.Utility.alertDialog("Error catch!.." + ex.message);
}
}