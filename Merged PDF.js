function mergePDF(primaryControl) {
    var formContext = primaryControl.getFormContext();
    alert("PDF Merged!");
    formContext.getAttribute("itl_mergepdf").setValue(true);
    //formContext.data.entity.save(); // Optional: Save the form automatically
    Xrm.Utility.alertDialog("PDF has been Merged!");
}
