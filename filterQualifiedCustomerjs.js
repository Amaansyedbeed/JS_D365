//working: Hiding recent record apply the active and qualified customers view on contact
function hideRecentRecordsOnBPFLookup(executionContext) {
    var formContext = executionContext.getFormContext();
    var bpfContactField = formContext.getControl("header_process_primarycontactid");

    if (bpfContactField) {
        //Disable Most Recently Used (MRU) records on BPF Lookup/Column
        bpfContactField.disableMru = true;
        bpfContactField.setDefaultView("{02ddeb25-a89c-ed11-aad0-6045bda8a61b}");
    }
}

function filterContactLookupOnBPF(executionContext) {
    var formContext = executionContext.getFormContext();
    var bpfContactField = formContext.getControl("header_process_primarycontactid"); //primarycontactid header_process_ams_phonetocasedispute

    if (bpfContactField) {
        bpfContactField.addPreSearch(function () {
            var filter = "<filter type='and'>" +
                         "<condition attribute='statecode' operator='eq' value='0' />" +
                         "<condition attribute='parentcustomerid' operator='ne-null' />" +
                         "</filter>";

            var relatedEntityFilter = "<link-entity name='account' from='accountid' to='parentcustomerid' link-type='inner' alias='aa'>" +
                                      "<filter type='and'>" +
                                      "<condition attribute='statecode' operator='eq' value='0' />" +
                                      "<condition attribute='ams_qualified' operator='eq' value='4' />" +
                                      "</filter>" +
                                      "</link-entity>";

            bpfContactField.addCustomFilter(filter + relatedEntityFilter, "contact");
        });
    }
}

//hide create new contact button on case form
function hideCreateNewOptionInBPF(executionContext) {
    var formContext = executionContext.getFormContext();
    var bpfContactField = formContext.getControl("header_process_primarycontactid"); 

    if (bpfContactField) {
        bpfContactField.IsInlineNewEnabled(false);
    }
}

// function hideCreateNewOptionInBPF(executionContext) {
//     var formContext = executionContext.getFormContext();
//     var bpfContactField = formContext.getControl("header_process_primarycontactid");

//     if (bpfContactField) {
//         bpfContactField.addPreSearch(function () {
//             var filter = "<filter type='and'><condition attribute='contactid' operator='not-null' /></filter>";
//             bpfContactField.addCustomFilter(filter, "contact"); // Apply the filter to allow only existing contacts
//         });
//     }
// }

//Xrm.Page.getControl("header_process_primarycontactid").setDefaultView("{02ddeb25-a89c-ed11-aad0-6045bda8a61b}");
//working for view
// function setBPFContactLookupView(executionContext) {
//     var formContext = executionContext.getFormContext();
//     var bpfContactField = formContext.getControl("header_process_primarycontactid");

//     if (bpfContactField) {
//         bpfContactField.setDefaultView("{02ddeb25-a89c-ed11-aad0-6045bda8a61b}");
//     }
// }

// function setBPFContactLookupView(executionContext) {
//     var formContext = executionContext.getFormContext();
//     var bpfContactField = formContext.getControl("header_process_primarycontactid");

//     if (bpfContactField) {
//         // Set default lookup view
//         bpfContactField.setDefaultView("{02ddeb25-a89c-ed11-aad0-6045bda8a61b}");

//         // Add filter to hide Most Recent Records
//         bpfContactField.addPreSearch(function () {
//             var filter = "<filter type='and'><condition attribute='createdon' operator='olderthan-x-months' value='1' /></filter>";
//             bpfContactField.addCustomFilter(filter, "contact");
//         });
//     }
// }


//working test
function customizeBPFContactLookup(executionContext) {
    var formContext = executionContext.getFormContext();
    var bpfContactField = formContext.getControl("header_process_primarycontactid"); // Ensure correct field ID

    if (bpfContactField) {
        // Disable Most Recently Used (MRU) records
        bpfContactField.disableMru = true;

        // Set default lookup view
        bpfContactField.setDefaultView("{02ddeb25-a89c-ed11-aad0-6045bda8a61b}");

        // Apply an empty filter to remove preloaded records
        bpfContactField.addPreSearch(function () {
            var emptyFilter = "<filter type='and'></filter>";
            bpfContactField.addCustomFilter(emptyFilter, "contact");
        });

        // Hide "Create New" button from lookup
        // if (bpfContactField.setShowLookupDialogForNewEntity) {
        //     bpfContactField.setShowLookupDialogForNewEntity(false);
        // }
    }
}

//test 2 hide new button hideCreateNewButton
function disableCreateNewButtonInBPF(executionContext) {
    var formContext = executionContext.getFormContext();
    var lookupControl = formContext.getControl("header_process_primarycontactid"); // Replace with your lookup field's schema name

    if (lookupControl) {
        lookupControl.addPreSearch(function () {
            // Apply an empty filter to remove all records from lookup
            var filter = "<filter type='and'><condition attribute='contactid' operator='ne' value='00000000-0000-0000-0000-000000000000' /></filter>";
            lookupControl.addCustomFilter(filter, "contact");
        });
    }
}


//calculate
function calcRecordrevenue(executionContext){
    try{

    }catch(ex){

    }
}


function test(ExecutionContext)
{
    try{

    var formContext = ExecutionContext.getFormContext();
    var first = formContext.getAttribute("firstname").getValue();


    }catch(ex)
    {
        XPathResultm.Utility.alertDialog("Error Catch..!" + ex.message);
    }
}