//formid = a837e4a7-01b8-4f82-a475-be9abd67e667
//processid = 3E8EBEE6-A2BC-4451-9C5F-B146B085413A
function setDefaultBPFForNewOpportunity() {
    var formGuid = 'a837e4a7-01b8-4f82-a475-be9abd67e667';
    var processGuid = '3E8EBEE6-A2BC-4451-9C5F-B146B085413A';

    if (
        (Xrm.Page.data.entity.getId() == null || Xrm.Page.data.entity.getId() == 'undefined' || Xrm.Page.data.entity.getId() == '') &&
        (Xrm.Page.context.getQueryStringParameters().process == null || Xrm.Page.context.getQueryStringParameters().process != processGuid)
    ) {
        var parameters = {};
        parameters["formid"] = formGuid;
        parameters["process"] = processGuid;
        Xrm.Utility.openEntityForm("opportunity", null, parameters);
    }
}