
//Calculate Months bewteen two dates and stop calculating when qualified moves to 'former'
// function calculateMonthDifference(startDate, endDate) {
//     if (!startDate || !endDate) {
//         console.error("Both dates are required");
//         return 0;
//     }

//     var start = new Date(startDate);
//     var end = new Date(endDate);
    
//     var yearDiff = end.getFullYear() - start.getFullYear();
//     var monthDiff = end.getMonth() - start.getMonth();
    
//     return yearDiff * 12 + monthDiff;
// }

// function setMonthDifference(executionContext) {
//     var formContext = executionContext.getFormContext();
//     var startDate = formContext.getAttribute("itl_originalstartdate").getValue();
//     var endDate = formContext.getAttribute("itl_lastdateofservice").getValue();
//     var customer = formContext.getAttribute("ams_qualified").getValue();
    
//     if (customer === 5) {
//         return;
//     }

//     if (startDate && endDate) {
//         var months = calculateMonthDifference(startDate, endDate);
//         formContext.getAttribute("itl_monthsactive").setValue(months);
//     }
// }
//above working script


// Calculate Months between two dates and stop calculating when qualified moves to 'former'
function calculateMonthDifference(startDate, endDate) {
    if (!startDate) {
        console.error("Start date is required");
        return 0;
    }

    var start = new Date(startDate);
    var end = endDate ? new Date(endDate) : new Date(); // If endDate is null, use the current date

    var yearDiff = end.getFullYear() - start.getFullYear();
    var monthDiff = end.getMonth() - start.getMonth();
    
    return yearDiff * 12 + monthDiff;
}

function setMonthDifference(executionContext) {
    var formContext = executionContext.getFormContext();
    var startDate = formContext.getAttribute("itl_originalstartdate").getValue();
    var endDate = formContext.getAttribute("itl_lastdateofservice").getValue();
    var customer = formContext.getAttribute("ams_qualified").getValue();
    
    if (customer === 5) {
        return;
    }

    if (startDate) {
        var months = calculateMonthDifference(startDate, endDate);
        formContext.getAttribute("itl_monthsactive").setValue(months);
    }
}



// function calculateMonthDifference(startDate, endDate) {
//     if (!startDate || !endDate) {
//         console.error("Both dates are required");
//         return 0;
//     }

//     var start = new Date(startDate);
//     var end = new Date(endDate);

//     var yearDiff = end.getFullYear() - start.getFullYear();
//     var monthDiff = end.getMonth() - start.getMonth();

//     return yearDiff * 12 + monthDiff;
// }

// function setMonthDifference(executionContext) {
//     var formContext = executionContext.getFormContext();
    
//     var startDate = formContext.getAttribute("itl_originalstartdate").getValue();
//     var endDate = formContext.getAttribute("itl_lastdateofservice").getValue();
//     var customer = formContext.getAttribute("ams_qualified").getValue();

//     if (startDate && endDate) {
//         var months = calculateMonthDifference(startDate, endDate);
//         formContext.getAttribute("itl_monthsactive").setValue(months);
//     } else {
//         formContext.getAttribute("itl_monthsactive").setValue(null);
//     }
// }