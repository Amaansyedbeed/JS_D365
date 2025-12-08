//FAQ tab Implementation
function faqTabImplementation(ExecutionContext)
{
    try{
        debugger;
        var formContext = ExecutionContext.getFormContext();
        var accesscontrol = formContext.getAttribute("itl_accesscontrol").getValue();
        var Amenities = formContext.getAttribute("itl_amenities").getValue();
       // var Insurance = formContext.getAttribute("itl_associationinsurance").getValue();
        if(accesscontrol == true)
        {
            formContext.ui.tabs.get("tab_16").sections.get("tab_17_section_1").setVisible(true);
            formContext.ui.tabs.get("tab_16").sections.get("tab_17_section_2").setVisible(true);
            formContext.ui.tabs.get("tab_16").sections.get("tab_17_section_3").setVisible(true);
            formContext.ui.tabs.get("tab_16").sections.get("tab_17_section_4").setVisible(true);
            formContext.ui.tabs.get("tab_16").sections.get("tab_17_section_5").setVisible(true);
            formContext.ui.tabs.get("tab_16").sections.get("tab_17_section_6").setVisible(true);
            formContext.ui.tabs.get("tab_16").sections.get("tab_17_section_7").setVisible(true);
        }
        else if(accesscontrol != true){
            formContext.ui.tabs.get("tab_16").sections.get("tab_17_section_1").setVisible(false);
            formContext.ui.tabs.get("tab_16").sections.get("tab_17_section_2").setVisible(false);
            formContext.ui.tabs.get("tab_16").sections.get("tab_17_section_3").setVisible(false);
            formContext.ui.tabs.get("tab_16").sections.get("tab_17_section_4").setVisible(false);
            formContext.ui.tabs.get("tab_16").sections.get("tab_17_section_5").setVisible(false);
            formContext.ui.tabs.get("tab_16").sections.get("tab_17_section_6").setVisible(false);
            formContext.ui.tabs.get("tab_16").sections.get("tab_17_section_7").setVisible(false);
        }
        if(Amenities == true)
            {
                formContext.ui.tabs.get("tab_16").sections.get("tab_18_section_1").setVisible(true);
                formContext.ui.tabs.get("tab_16").sections.get("tab_18_section_2").setVisible(true);
                formContext.ui.tabs.get("tab_16").sections.get("tab_18_section_3").setVisible(true);
                formContext.ui.tabs.get("tab_16").sections.get("tab_18_section_4").setVisible(true);
                formContext.ui.tabs.get("tab_16").sections.get("tab_18_section_5").setVisible(true);
                formContext.ui.tabs.get("tab_16").sections.get("tab_18_section_6").setVisible(true);
                formContext.ui.tabs.get("tab_16").sections.get("tab_18_section_7").setVisible(true);
                formContext.ui.tabs.get("tab_16").sections.get("tab_18_section_8").setVisible(true);
                formContext.ui.tabs.get("tab_16").sections.get("tab_18_section_9").setVisible(true);
                formContext.ui.tabs.get("tab_16").sections.get("tab_18_section_10").setVisible(true);
                formContext.ui.tabs.get("tab_16").sections.get("tab_18_section_11").setVisible(true);
                formContext.ui.tabs.get("tab_16").sections.get("tab_18_section_12").setVisible(true);
            }
            else if(Amenities != true){
                formContext.ui.tabs.get("tab_16").sections.get("tab_18_section_1").setVisible(false);
                formContext.ui.tabs.get("tab_16").sections.get("tab_18_section_2").setVisible(false);
                formContext.ui.tabs.get("tab_16").sections.get("tab_18_section_3").setVisible(false);
                formContext.ui.tabs.get("tab_16").sections.get("tab_18_section_4").setVisible(false);
                formContext.ui.tabs.get("tab_16").sections.get("tab_18_section_5").setVisible(false);
                formContext.ui.tabs.get("tab_16").sections.get("tab_18_section_6").setVisible(false);
                formContext.ui.tabs.get("tab_16").sections.get("tab_18_section_7").setVisible(false);
                formContext.ui.tabs.get("tab_16").sections.get("tab_18_section_8").setVisible(false);
                formContext.ui.tabs.get("tab_16").sections.get("tab_18_section_9").setVisible(false);
                formContext.ui.tabs.get("tab_16").sections.get("tab_18_section_10").setVisible(false);
                formContext.ui.tabs.get("tab_16").sections.get("tab_18_section_11").setVisible(false);
                formContext.ui.tabs.get("tab_16").sections.get("tab_18_section_12").setVisible(false);
            }
    }catch(ex)
    {
        Xrm.Utility.alertDialog("Error catch in faq!.. " + ex.message);
    }
}


//BPF field mandatory
