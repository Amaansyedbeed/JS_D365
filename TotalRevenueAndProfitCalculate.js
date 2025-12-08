//Based on sales stage selection
// function CalculateTotalRevenueAndProfit(primaryControl) {
//     try {
//         debugger;

//         var webResourceName = "itl_SalesStageTotalRevProfitHtml.html"; // ✅ Your Web Resource name

//         // Use getWebResourceUrl to get the correct URL (Cross-solution friendly)
//         var url = Xrm.Utility.getGlobalContext().getClientUrl() + "/WebResources/" + encodeURIComponent(webResourceName);

//         // Open popup window with correct URL
//         var popup = window.open(url, "SalesStageSelection", "width=400,height=300");

//         if (!popup) {
//             Xrm.Navigation.openAlertDialog({ text: "Popup blocked! Please allow popups for this site." });
//             return;
//         }

//         // Add event listener to receive selected sales stage
//         window.addEventListener("message", function (event) {
//             if (!event.data || typeof event.data.stage === "undefined") return;

//             FetchTotalRevenueAndProfit(event.data.stage, event.data.label);
//         }, { once: true });

//     } catch (ex) {
//         console.error("Error in CalculateTotalRevenueAndProfit:", ex);
//         Xrm.Navigation.openAlertDialog({ text: "Error: " + ex.message });
//     }
// }

// // Function to fetch total revenue and profit based on selected Sales Stage
// function FetchTotalRevenueAndProfit(selectedStage, stageLabel) {
//     try {
//         var fetchXml = [
//             "<fetch aggregate='true'>",
//             "  <entity name='opportunity'>",
//             "    <attribute name='ams_revenue' alias='totalRevenue' aggregate='sum' />",
//             "    <attribute name='ams_profit' alias='totalProfit' aggregate='sum' />",
//             "    <filter>",
//             "      <condition attribute='itl_salesstage' operator='eq' value='" + selectedStage + "' />",
//             "    </filter>",
//             "  </entity>",
//             "</fetch>"
//         ].join("");

//         Xrm.WebApi.retrieveMultipleRecords("opportunity", "?fetchXml=" + encodeURIComponent(fetchXml)).then(
//             function (result) {
//                 if (result.entities.length > 0) {
//                     var totalRevenue = result.entities[0].totalRevenue || 0;
//                     var totalProfit = result.entities[0].totalProfit || 0;

//                     var message = `✅ *Total Revenue (${stageLabel}):* ${totalRevenue}\n✅ *Total Profit:* ${totalProfit}`;
//                     Xrm.Navigation.openAlertDialog({ text: message });
//                 } else {
//                     Xrm.Navigation.openAlertDialog({ text: `No matching opportunities found for ${stageLabel}!` });
//                 }
//             },
//             function (error) {
//                 console.error("Fetch Error:", error);
//                 Xrm.Navigation.openAlertDialog({ text: "Error: " + error.message });
//             }
//         );
//     } catch (ex) {
//         console.error("Error in FetchTotalRevenueAndProfit:", ex);
//         Xrm.Navigation.openAlertDialog({ text: "Error: " + ex.message });
//     }
// }





//working
//calculate total revenue and profit for the contract review stage
function CalculateTotalRevenueAndProfit(primaryControl) {
    try {
        debugger;
        var fetchXml = [
            "<fetch aggregate='true'>",
            "  <entity name='opportunity'>",
            "    <attribute name='ams_revenue' alias='totalRevenue' aggregate='sum' />",
            "    <attribute name='ams_profit' alias='totalProfit' aggregate='sum' />",
            "    <filter>",
            "      <condition attribute='itl_stagestatus' operator='eq' value='2' />",
            "      <condition attribute='statecode' operator='eq' value='0' />",
            "    </filter>",
            "  </entity>",
            "</fetch>"
        ].join("");

        Xrm.WebApi.retrieveMultipleRecords("opportunity", "?fetchXml=" + encodeURIComponent(fetchXml)).then(
            function (result) {
                if (result.entities.length > 0) {
                    var totalRevenue = result.entities[0].totalRevenue || 0;
                    var totalProfit = result.entities[0].totalProfit || 0;

                    var message = "Total Revenue: " + totalRevenue + "\nTotal Profit: " + totalProfit;
                    Xrm.Navigation.openAlertDialog({ text: message });
                } else {
                    Xrm.Navigation.openAlertDialog({ text: "No matching opportunities found!" });
                }
            },
            function (error) {
                console.log(error.message);
                Xrm.Utility.alertDialog("Error: " + error.message);
            }
        );

    } catch (ex) {
        Xrm.Utility.alertDialog("Error catch in: " + ex.message);
    }
}


//testv for multple users
// Show/hide tab based on user access
// Show/hide tab based on user access #working
// function UserShowHideOnLoad(executionContext) {
//     try {
//         // Get the execution context
//         var formContext = executionContext.getFormContext();

//         // Get the current user's GUID
//         var userId = Xrm.Utility.getGlobalContext().userSettings.userId;

//         // Define the list of allowed user GUIDs (remove curly braces when comparing)
//         var allowedUserIds = [
//             "f99cd339-316e-ed11-9562-0022482a4db4", 
//             "401da90f-8d5f-ef11-bfe2-000d3a534c31"
//         ];

//         // Compare userId after removing curly braces and converting to lowercase
//         var cleanedUserId = userId.replace(/[{}]/g, "").toLowerCase();

//         // Check if the user is in the allowed list
//         if (allowedUserIds.includes(cleanedUserId)) {
//             formContext.ui.tabs.get("tab_20").setVisible(true);
//         } else {
//             formContext.ui.tabs.get("tab_20").setVisible(false);
//         }
//     } catch (error) {
//         console.error("Error in UserShowHideOnLoad: " + error.message);
//     }
// }


//Show hide tab based on user #working
function UserShowHideOnLoad(executionContext) {
    try {
        // Get the execution context
        var formContext = executionContext.getFormContext();

        // Get the current user's GUID
        var userId = Xrm.Utility.getGlobalContext().userSettings.userId;

        // Define the GUID of the allowed user (remove curly braces to compare properly)
        var allowedUserId = "f99cd339-316e-ed11-9562-0022482a4db4";
        

        // Compare in lowercase to avoid case sensitivity issues
        if (userId.replace(/[{}]/g, "").toLowerCase() === allowedUserId.toLowerCase()) {
            formContext.ui.tabs.get("tab_20").setVisible(true);
        } else {
            formContext.ui.tabs.get("tab_20").setVisible(false);
        }
    } catch (error) {
        console.error("Error in UserShowHideOnLoad: " + error.message);
    }
}

//based on roles
// function UserShowHideOnLoad(executionContext) {
//     try {
//         // Get the execution context
//         var formContext = executionContext.getFormContext();

//         // Get the current user's roles
//         var userRoles = Xrm.Utility.getGlobalContext().userSettings.roles;
        
//         // Define the security role names that should see the section
//         var allowedRoles = ["Contract Manager", "Finance Admin"];

//         // Convert user roles to an array of role names
//         var userRoleNames = [];
//         userRoles.forEach(function (role) {
//             userRoleNames.push(role.name);
//         });

//         // Check if the user has any of the allowed roles
//         var hasAccess = allowedRoles.some(role => userRoleNames.includes(role));

//         // Show or hide the section based on the user's role
//         formContext.ui.tabs.get("General").sections.get("null_section_3").setVisible(hasAccess);

//     } catch (error) {
//         console.error("Error in UserShowHideOnLoad: " + error.message);
//     }
// }
