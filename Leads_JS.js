// Function to display status notification on lead status change (Qualified or Disqualified or BPF stage = Close)
function displayLeadStatusNotification(executionContext) {
    var formContext = executionContext.getFormContext();
    var leadStatus = formContext.getAttribute("statuscode").getValue();
    var BPFstage = formContext.getAttribute("itl_stage").getValue();

    if (leadStatus === 999990002) { // Qualified
        formContext.ui.setFormNotification("Read-only: This record’s status is Qualified.", "INFO", "qualified_notification");
    } else if (leadStatus === 2) { // Disqualified
        formContext.ui.setFormNotification("Read-only: This record’s status is Disqualified.", "INFO", "disqualified_notification");
    }
    else if (BPFstage === "Close")
    {
        formContext.ui.setFormNotification("Read-only: This record’s status is Close.", "INFO", "close_notification");
    }

    makeFieldsReadOnly(formContext, leadStatus, BPFstage);
}

//all fields read-only!
function makeFieldsReadOnly(formContext, leadStatus, BPFstage) {
    try {
        var attributes = formContext.data.entity.attributes;

        attributes.forEach(function (attribute) {
            if (attribute.getSubmitMode() !== "never") {
                var control = formContext.getControl(attribute.getName());
                
                if (control) {
                    if (leadStatus === 999990002 || leadStatus === 2 || BPFstage === "Close") {
                        control.setDisabled(true);  //disabled
                    } else {
                        control.setDisabled(false); //Enable
                    }
                }
            }
        });

        //disable subgrid controls
        disableSubgridControls(formContext, leadStatus);
    } catch (ex) {
        Xrm.Utility.alertDialog("Error in makeFieldsReadOnly: " + ex.message);
    }
}

// Function to disable controls for subgrids
function disableSubgridControls(formContext, leadStatus) {
    // Get all subgrid controls on the form
    var controls = formContext.ui.controls.get();
    
    controls.forEach(function (control) {
        if (control.getControlType() === "Subgrid") {
            if (leadStatus === 999990002 || leadStatus === 2 || BPFstage === "Close") {
                // Disable the subgrid control (make it read-only)
                control.setDisabled(true);
            } else {
                // Enable the subgrid control
                control.setDisabled(false);
            }
        }
    });
}
//end



//Subgrid onload function
function onSubgridLoad(executionContext) {
    var formContext = executionContext.getFormContext();
    var subgrid = formContext.getControl("Product");
    var priceList = formContext.getAttribute("itl_pricelist").getValue();

    // Ensure the subgrid exists before trying to add the event
    if(priceList !== null)
    if (subgrid) {
        subgrid.addOnLoad(function() {
            alert("Subgrid loaded!!");
            calculatePriceSum(formContext);
        });
    }
}

//Calculate the total price amount of product grid on lead table 
function calculatePriceSum(executionContext) {
    var formContext = executionContext.getFormContext();
    var gridControl = formContext.getControl("Product");
    var totalSum = formContext.getAttribute("itl_totalprice").getValue();

    if (gridControl) {
        gridControl.getGrid().getRows().forEach(function (row) {
            var productRecord = row.getData().getEntity();
            var price = productRecord.attributes.getByName("itl_money_listprice") ? productRecord.attributes.getByName("itl_money_listprice").getValue():
            totalSum += price;
        });
        formContext.getAttribute("itl_totalprice").setValue(totalSum);
    }
}

// This function triggers when the subgrid is loaded and will call the price calculation function
function onSubgridLoad(executionContext) {
    var formContext = executionContext.getFormContext();
    var subgrid = formContext.getControl("Product");  // Assuming "Product" is the subgrid name
    var priceList = formContext.getAttribute("itl_pricelist").getValue();  // Assuming "itl_pricelist" is the field for price list

    // Ensure the price list is set and the subgrid exists
    if (priceList !== null && subgrid) {
        subgrid.addOnLoad(function () {
            alert("Subgrid loaded!!");
            calculatePriceSum(formContext);  // Call the function to calculate the total sum
        });
    }
}

// Function to calculate the total price amount of products in the subgrid on the Lead form
function calculatePriceSum(executionContext) {
    var formContext = executionContext.getFormContext();
    var gridControl = formContext.getControl("Product");  // Assuming "Product" is the subgrid name
    var totalSum = 0;  // Initialize total sum to 0

    // Check if the subgrid exists
    if (gridControl) {
        gridControl.getGrid().getRows().forEach(function (row) {
            var productRecord = row.getData().getEntity();
            var price = productRecord.attributes.getByName("itl_money_listprice") ? 
                        productRecord.attributes.getByName("itl_money_listprice").getValue() : 0;  // Fallback to 0 if the price is null
            totalSum += price;  // Add the price to the total sum
        });

        // Set the total sum to the custom field on the form
        formContext.getAttribute("itl_totalprice").setValue(totalSum);  // Assuming "itl_totalprice" is your total price field
    }
}

