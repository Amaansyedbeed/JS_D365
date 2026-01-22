function sentForApproval(primaryControl) {
    var formContext = primaryControl;
    var approvalStatusAttr = formContext.getAttribute("itl_approvalstatus");

    if (!approvalStatusAttr) return;

    var statusValue = approvalStatusAttr.getValue();

    // Treat NULL as Draft (1)
    if (statusValue !== null && statusValue !== 1 && statusValue !== 5) {
        Xrm.Utility.alertDialog("Approval has already been sent. Please wait for approver response!");
        return;
    }

    var confirmStrings = {
        title: "Send for Approval",
        text: "Are you sure you want to send this claim for approval?",
        confirmButtonLabel: "Send",
        cancelButtonLabel: "Cancel"
    };

    Xrm.Navigation.openConfirmDialog(confirmStrings).then(function (result) {
        if (result.confirmed) {
            approvalStatusAttr.setValue(2); // Pending Approval 1
            approvalStatusAttr.setSubmitMode("always");
            formContext.data.save();

            Xrm.Utility.alertDialog("The approval has been sent!");
        }
    });
}


//Sent for Approval Button Js # working previous
// function sentForApproval(primaryControl) {
//     var formContext = primaryControl;
//     var approvalStatusAttr = formContext.getAttribute("itl_approvalstatus");
//     alert(approvalStatusAttr);
//     // Check if approval status is Draft (1)
//     if (!approvalStatusAttr || approvalStatusAttr.getValue() !== 1) {
//         Xrm.Utility.alertDialog("Approval has already been sent. Please wait for approver response!");
//         return;
//     }

//     var confirmStrings = {
//         title: "Send for Approval",
//         text: "Are you sure you want to send this record for approval?",
//         confirmButtonLabel: "Send",
//         cancelButtonLabel: "Cancel"
//     };

//     var confirmOptions = {
//         height: 200,
//         width: 450
//     };

//     Xrm.Navigation.openConfirmDialog(confirmStrings, confirmOptions).then(
//         function (result) {
//             if (result.confirmed) {
//                 // User clicked Send
//                 approvalStatusAttr.setValue(2); // Sent for Approval
//                 approvalStatusAttr.setSubmitMode("always");
//                 formContext.data.save();

//                 Xrm.Utility.alertDialog("The approval has been sent!");
//             }
//             // If Cancel clicked, do nothing
//         },
//         function (error) {
//             Xrm.Utility.alertDialog(error.message);
//         }
//     );
// }

function approveExpense(primaryControl) {
    var formContext = primaryControl;
    var statusAttr = formContext.getAttribute("itl_approvalstatus");

    if (!statusAttr) return;

    var currentStatus = statusAttr.getValue();
    var now = new Date(); // current date & time

    // current user info
    var userSettings = Xrm.Utility.getGlobalContext().userSettings;
    var userId = userSettings.userId.replace(/[{}]/g, "");
    var userName = userSettings.userName;

    var userLookup = [{
        id: userId,
        name: userName,
        entityType: "systemuser"
    }];

    // ⛔ Final states
    if (currentStatus === 8) {
        Xrm.Utility.alertDialog("This expense has already been approved.");
        return;
    }

    // Pending Approval 1 → Approved Level 1
    if (currentStatus === 2) {
        Xrm.Navigation.openConfirmDialog({
            title: "Approve Expense (Level 1)",
            text: "Are you sure you want to approve this expense?",
            confirmButtonLabel: "Approve",
            cancelButtonLabel: "Cancel"
        }).then(function (result) {
            if (result.confirmed) {
                statusAttr.setValue(7); // Approved Level 1

                // ✅ set approver 1 user
                var appr1User = formContext.getAttribute("itl_approver1");
                if (appr1User) {
                    appr1User.setValue(userLookup);
                    appr1User.setSubmitMode("always");
                }

                // ✅ set approver 1 date
                var appr1Date = formContext.getAttribute("itl_approver1date");
                if (appr1Date) {
                    appr1Date.setValue(now);
                    appr1Date.setSubmitMode("always");
                }

                statusAttr.setSubmitMode("always");
                formContext.data.save();
            }
        });
        return;
    }

    // Approved Level 1 → Approved Level 2 (Final)
    if (currentStatus === 7) {
        Xrm.Navigation.openConfirmDialog({
            title: "Approve Expense (Level 2)",
            text: "Are you sure you want to give final approval?",
            confirmButtonLabel: "Approve",
            cancelButtonLabel: "Cancel"
        }).then(function (result) {
            if (result.confirmed) {
                statusAttr.setValue(4); // Approved Level 2 - Approved

                // ✅ set approver 2 user
                var appr2User = formContext.getAttribute("itl_approver2");
                if (appr2User) {
                    appr2User.setValue(userLookup);
                    appr2User.setSubmitMode("always");
                }

                // ✅ set approver 2 date
                var appr2Date = formContext.getAttribute("itl_approver2date");
                if (appr2Date) {
                    appr2Date.setValue(now);
                    appr2Date.setSubmitMode("always");
                }

                statusAttr.setSubmitMode("always");
                formContext.data.save();
            }
        });
        return;
    }

    // ⛔ Any other state
    Xrm.Utility.alertDialog("This record is not in a valid state for approval.");
}


//approved button with date and validation logic ##Existing working js without user lookup fields
// function approveExpense(primaryControl) {
//     var formContext = primaryControl;
//     var statusAttr = formContext.getAttribute("itl_approvalstatus");

//     if (!statusAttr) return;

//     var currentStatus = statusAttr.getValue();
//     var now = new Date(); // current date & time

//     // ⛔ Final states
//     if (currentStatus === 8) {
//         Xrm.Utility.alertDialog("This expense has already been approved.");
//         return;
//     }

//     // Pending Approval 1 → Approved Level 1
//     if (currentStatus === 2) {
//         Xrm.Navigation.openConfirmDialog({
//             title: "Approve Expense (Level 1)",
//             text: "Are you sure you want to approve this expense?",
//             confirmButtonLabel: "Approve",
//             cancelButtonLabel: "Cancel"
//         }).then(function (result) {
//             if (result.confirmed) {
//                 statusAttr.setValue(7); // Approved Level 1

//                 // ✅ set approver 1 date
//                 var appr1Date = formContext.getAttribute("itl_approver1date");
//                 if (appr1Date) {
//                     appr1Date.setValue(now);
//                     appr1Date.setSubmitMode("always");
//                 }

//                 statusAttr.setSubmitMode("always");
//                 formContext.data.save();
//             }
//         });
//         return;
//     }

//     // Approved Level 1 → Approved Level 2 (Final)
//     if (currentStatus === 7) {
//         Xrm.Navigation.openConfirmDialog({
//             title: "Approve Expense (Level 2)",
//             text: "Are you sure you want to give final approval?",
//             confirmButtonLabel: "Approve",
//             cancelButtonLabel: "Cancel"
//         }).then(function (result) {
//             if (result.confirmed) {
//                 statusAttr.setValue(8); // Approved Level 2

//                 // ✅ set approver 2 date
//                 var appr2Date = formContext.getAttribute("itl_approver2date");
//                 if (appr2Date) {
//                     appr2Date.setValue(now);
//                     appr2Date.setSubmitMode("always");
//                 }

//                 statusAttr.setSubmitMode("always");
//                 formContext.data.save();
//             }
//         });
//         return;
//     }

//     // ⛔ Any other state
//     Xrm.Utility.alertDialog("This record is not in a valid state for approval.");
// }



// REJECT
function rejectExpense(primaryControl) {
    var formContext = primaryControl;
    var statusAttr = formContext.getAttribute("itl_approvalstatus");

    if (!statusAttr) return;

    var currentStatus = statusAttr.getValue();

    // ⛔ Already processed
    if (currentStatus === 5) {
        Xrm.Utility.alertDialog("This expense has already been rejected.");
        return;
    }

    Xrm.Navigation.openConfirmDialog({
        title: "Reject Expense",
        text: "Are you sure you want to reject this expense?",
        confirmButtonLabel: "Reject",
        cancelButtonLabel: "Cancel"
    }).then(function (result) {
        if (result.confirmed) {
            statusAttr.setValue(5); // Rejected
            statusAttr.setSubmitMode("always");
            formContext.data.save();
        }
    });
}


//show hide button based on security roles
// function userHasApproverRole() {
//     var userRoles = Xrm.Utility.getGlobalContext().userSettings.roles.getAll();
    
//     // Replace these with the actual GUIDs of your roles
//     var approver1RoleId = "df08b031-ecf5-f011-8406-6045bdce19f9".toLowerCase();
//     var approver2RoleId = "1d9d6648-f1f4-f011-8406-6045bdce19f9".toLowerCase();
    
//     for (var i = 0; i < userRoles.length; i++) {
//         var role = userRoles[i];
//         var id = role.id.replace("{", "").replace("}", "").toLowerCase();
        
//         if (id === approver1RoleId || id === approver2RoleId) {
//             return true;
//         }
//     }
//     return false;
// }

//loggin test 2
function userHasApproverRole() {
    var userRoles = Xrm.Utility.getGlobalContext().userSettings.roles.getAll();
    console.log("User Roles:", userRoles);

    var approver1RoleId = "df08b031-ecf5-f011-8406-6045bdce19f9";
    var approver2RoleId = "1d9d6648-f1f4-f011-8406-6045bdce19f9";

    for (var i = 0; i < userRoles.length; i++) {
        var id = userRoles[i].id.replace(/[{}]/g, "").toLowerCase();
        console.log("Checking role:", id);

        if (
            id === approver1RoleId.toLowerCase() ||
            id === approver2RoleId.toLowerCase()
        ) {
            console.log("Approver role found");
            return true;
        }
    }
    console.log("Approver role NOT found");
    return false;
}
