//Calculation issue resolving with js / onload and onsave
function countOnchange(executionContext) {
    try {
        debugger;
        var formContext = executionContext.getFormContext();
        var subgridControl = formContext.getControl("Opportunity_Position_SubGrid");

        if (subgridControl && subgridControl.getGrid())
        {
            subgridControl.addOnLoad(function ()
            {
                let filteredRecordCount = subgridControl.getGrid().getTotalRecordCount();
                formContext.getAttribute("ams_currentemployeecost").setValue(parseFloat(filteredRecordCount));
                console.log("Updated count after refresh: " + filteredRecordCount);
                formContext.data.entity.save();
            });

            // Trigger an initial count update (in case subgrid is already loaded)
            let initialCount = subgridControl.getGrid().getTotalRecordCount();
            formContext.getAttribute("ams_currentemployeecost").setValue(parseFloat(initialCount));
            console.log("Initial count: " + initialCount);
        } else {
            console.log("Subgrid is not initialized yet.");
        }
    } catch (ex) {
        Xrm.Utility.alertDialog("Error occurred: " + ex.message);
    }
}


//calculate no of months between two fields *onchange of both date fields
function calculateMonthsbetweenTwoDates(executionContext) {
    try {
        var formContext = executionContext.getFormContext();
        var qualifiedStatus = formContext.getAttribute("ams_qualified").getValue();
        // Stop calculation if Qualified = Former
        if (qualifiedStatus === 5) {
            console.log("Calculation skipped as Qualified status is 'Former'.");
            formContext.getAttribute("itl_monthsactive").setValue(null);
            return;
        }

        var startDate = formContext.getAttribute("itl_originalstartdate").getValue();
        var endDate = formContext.getAttribute("itl_cancellationnoticedate").getValue();

        if (startDate && endDate) {
            // Calculate the difference in months
            var monthsDifference =
                (endDate.getFullYear() - startDate.getFullYear()) * 12 +
                (endDate.getMonth() - startDate.getMonth());

            // Ensure the difference is positive (or handle it as needed)
            if (monthsDifference < 0) {
                monthsDifference = 0;
            }
            formContext.getAttribute("itl_monthsactive").setValue(monthsDifference);
        } else {
            formContext.getAttribute("itl_monthsactive").setValue(null);
        }
    } catch (ex) {
        Xrm.Utility.alertDialog("An error occurred incalculateMonthsbetweenTwoDates : " + ex.message);
    }
}




// function countOnchange(executionContext) {
//     try {
//         debugger;    
//         var formContext = executionContext.getFormContext();
//         var subgridControl = formContext.getControl("Opportunity_Position_SubGrid");

//             if (subgridControl && subgridControl.getGrid()) 
//             {
//                 let filteredRecordCount = subgridControl.getGrid().getTotalRecordCount();

//                 formContext.getAttribute("ams_currentemployeecost").setValue(parseFloat(filteredRecordCount));
//                 alert("count: " + filteredRecordCount);
//             } else {
//                 console.log("Subgrid is not initialized yet.");    
//             }
        
//     } catch (ex) {
//         Xrm.Utility.alertDialog("Error occurred: " + ex.message);    
//     }
// }
