//Set Probability by sales stage
function setAndValidateProbability(executionContext) {
    var formContext = executionContext.getFormContext();
    
    // Get Stage and Probability fields
    var stage = formContext.getAttribute("itl_stagestatus").getValue();
    var probabilityField = formContext.getAttribute("closeprobability").getValue();

    if (stage === 0) { // Discovery stage
        formContext.getAttribute("closeprobability").setValue(25);
        alert(stage + "Discovery");
    } 
    else if (stage === 1) { // Proposal stage
        formContext.getAttribute("closeprobability").setValue(50);
        alert(stage + "Proposal");
    } 
    else if (stage === 2) { // Contract stage
        alert(stage + "Contract");
        var enteredValue = probabilityField.getValue();
        if (enteredValue !== null && !allowedValues.includes(enteredValue)) {
            alert("Please enter a valid Probability: 65, 75, 85, or 95%");
            probabilityField.setValue(null); // Reset invalid value
        }
    }
}

//sales stage updating
function setProbability(executionContext)
{
    try{
        debugger;
        var formContext = executionContext.getFormContext();
        var salesStage = formContext.getAttribute("itl_stagestatus").getValue();
     // var probability = formContext.getAttribute("closeprobability").getValue();

        if(salesStage == 2)
        {
            formContext.getAttribute("closeprobability").setValue(75);
        }
    }catch(ex){
        Xrm.Utility.alertDialog("Error catch!" + ex.message);
    }
}
