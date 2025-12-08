//set product related details
function productSetSIDI(executionContext) {
    try {
        debugger;
        var formContext = executionContext.getFormContext();
        var product = formContext.getAttribute("itl_productconfig").getValue();

        if (product !== null) {
            var productId = product[0].id.replace(/[{}]/g, "");    
    Xrm.WebApi.retrieveRecord("itl_marketingsupportconfiguration", productId, "?$select=itl_marketingsupportconfigurationid,itl_batchlotdefinition,itl_batchlotnumberingsystem,itl_bsetsestatement,_itl_categorymanagers_value,itl_commonorusualnameofproduct,itl_continueproductguarantee,itl_etostatement,itl_expirationdatereevaluationinterval,itl_extractratio,itl_foodgrade,itl_generalproductdescription,itl_glutenstatement,_itl_healthcategory_value,importsequencenumber,itl_irradiationstatement,itl_name,itl_otherproductinformation,_ownerid_value,_owningteam_value,_owninguser_value,itl_packaginginformation,itl_pesticidestatement,itl_portfolio,_itl_productcategory_value,itl_productsafetyinformation,itl_recommendedstorageconditions,itl_recommendedtransportconditions,itl_safetydatasheetsdsattached,itl_sapcode,itl_specialsafetyinstructionsformanufacturing,statecode,statuscode,itl_vegetarianstatement,versionnumber").then(
	function success(result) {
		console.log(result);
		// Columns
		var itl_marketingsupportconfigurationid = result["itl_marketingsupportconfigurationid"]; // Guid
		var itl_batchlotdefinition = result["itl_batchlotdefinition"]; // Multiline Text
		var itl_batchlotnumberingsystem = result["itl_batchlotnumberingsystem"]; // Text
		var itl_bsetsestatement = result["itl_bsetsestatement"]; // Text
		var itl_categorymanagers = result["_itl_categorymanagers_value"]; // Lookup
		var itl_categorymanagers_formatted = result["_itl_categorymanagers_value@OData.Community.Display.V1.FormattedValue"];
		var itl_categorymanagers_lookuplogicalname = result["_itl_categorymanagers_value@Microsoft.Dynamics.CRM.lookuplogicalname"];
		var itl_commonorusualnameofproduct = result["itl_commonorusualnameofproduct"]; // Text
		var itl_continueproductguarantee = result["itl_continueproductguarantee"]; // Multiline Text
		var itl_etostatement = result["itl_etostatement"]; // Text
		var itl_expirationdatereevaluationinterval = result["itl_expirationdatereevaluationinterval"]; // Text
		var itl_extractratio = result["itl_extractratio"]; // Text
		var itl_foodgrade = result["itl_foodgrade"]; // Text
		var itl_generalproductdescription = result["itl_generalproductdescription"]; // Multiline Text
		var itl_glutenstatement = result["itl_glutenstatement"]; // Text
		var itl_healthcategory = result["_itl_healthcategory_value"]; // Lookup
		var itl_healthcategory_formatted = result["_itl_healthcategory_value@OData.Community.Display.V1.FormattedValue"];
		var itl_healthcategory_lookuplogicalname = result["_itl_healthcategory_value@Microsoft.Dynamics.CRM.lookuplogicalname"];
		var importsequencenumber = result["importsequencenumber"]; // Whole Number
		var importsequencenumber_formatted = result["importsequencenumber@OData.Community.Display.V1.FormattedValue"];
		var itl_irradiationstatement = result["itl_irradiationstatement"]; // Text
		var itl_name = result["itl_name"]; // Text
		var itl_otherproductinformation = result["itl_otherproductinformation"]; // Text
		var ownerid = result["_ownerid_value"]; // Owner
		var ownerid_formatted = result["_ownerid_value@OData.Community.Display.V1.FormattedValue"];
		var ownerid_lookuplogicalname = result["_ownerid_value@Microsoft.Dynamics.CRM.lookuplogicalname"];
		var owningteam = result["_owningteam_value"]; // Lookup
		var owningteam_formatted = result["_owningteam_value@OData.Community.Display.V1.FormattedValue"];
		var owningteam_lookuplogicalname = result["_owningteam_value@Microsoft.Dynamics.CRM.lookuplogicalname"];
		var owninguser = result["_owninguser_value"]; // Lookup
		var owninguser_formatted = result["_owninguser_value@OData.Community.Display.V1.FormattedValue"];
		var owninguser_lookuplogicalname = result["_owninguser_value@Microsoft.Dynamics.CRM.lookuplogicalname"];
		var itl_packaginginformation = result["itl_packaginginformation"]; // Text
		var itl_pesticidestatement = result["itl_pesticidestatement"]; // Choice
		var itl_pesticidestatement_formatted = result["itl_pesticidestatement@OData.Community.Display.V1.FormattedValue"];
		var itl_portfolio = result["itl_portfolio"]; // Choice
		var itl_portfolio_formatted = result["itl_portfolio@OData.Community.Display.V1.FormattedValue"];
		var itl_productcategory = result["_itl_productcategory_value"]; // Lookup
		var itl_productcategory_formatted = result["_itl_productcategory_value@OData.Community.Display.V1.FormattedValue"];
		var itl_productcategory_lookuplogicalname = result["_itl_productcategory_value@Microsoft.Dynamics.CRM.lookuplogicalname"];
		var itl_productsafetyinformation = result["itl_productsafetyinformation"]; // Text
		var itl_recommendedstorageconditions = result["itl_recommendedstorageconditions"]; // Choices
		var itl_recommendedstorageconditions_formatted = result["itl_recommendedstorageconditions@OData.Community.Display.V1.FormattedValue"];
		var itl_recommendedtransportconditions = result["itl_recommendedtransportconditions"]; // Text
		var itl_safetydatasheetsdsattached = result["itl_safetydatasheetsdsattached"]; // Boolean
		var itl_safetydatasheetsdsattached_formatted = result["itl_safetydatasheetsdsattached@OData.Community.Display.V1.FormattedValue"];
		var itl_sapcode = result["itl_sapcode"]; // Text
		var itl_specialsafetyinstructionsformanufacturing = result["itl_specialsafetyinstructionsformanufacturing"]; // Text
		var statecode = result["statecode"]; // State
		var statecode_formatted = result["statecode@OData.Community.Display.V1.FormattedValue"];
		var statuscode = result["statuscode"]; // Status
		var statuscode_formatted = result["statuscode@OData.Community.Display.V1.FormattedValue"];
		var itl_vegetarianstatement = result["itl_vegetarianstatement"]; // Text
		var versionnumber = result["versionnumber"]; // Big Integer
		var versionnumber_formatted = result["versionnumber@OData.Community.Display.V1.FormattedValue"];
                    // Set product details in SIDI -name
                    formContext.getAttribute("itl_newcolumn").setValue(itl_name);
                    formContext.getAttribute("itl_sapcode").setValue(itl_sapcode);
                    formContext.getAttribute("itl_generalproductdescription").setValue(itl_generalproductdescription);
                    formContext.getAttribute("itl_commonorusualnameofproduct").setValue(itl_commonorusualnameofproduct);
                    formContext.getAttribute("itl_extractratio").setValue(itl_extractratio);
                    formContext.getAttribute("itl_bsetseinformation").setValue(itl_bsetsestatement);
                    formContext.getAttribute("itl_vegetarianstatement").setValue(itl_vegetarianstatement);
                    formContext.getAttribute("itl_glutenstatement").setValue(itl_glutenstatement);
                    formContext.getAttribute("itl_nonirradiationstatement").setValue(itl_irradiationstatement);
                    formContext.getAttribute("itl_etostatement").setValue(itl_etostatement);
                    formContext.getAttribute("itl_pesticidestatement").setValue(itl_pesticidestatement);
                    formContext.getAttribute("itl_foodgrade").setValue(itl_foodgrade);
                    formContext.getAttribute("itl_productguarantee").setValue(itl_continueproductguarantee);
                    formContext.getAttribute("itl_batchlotnumberingsystem").setValue(itl_batchlotnumberingsystem);
                    formContext.getAttribute("itl_batchlotdefinition").setValue(itl_batchlotdefinition);
                    formContext.getAttribute("itl_expirationdaterecommendedreevaluationinterval").setValue(itl_expirationdatereevaluationinterval);
                    formContext.getAttribute("itl_recommendedstorageconditions").setValue(itl_recommendedstorageconditions);
                    formContext.getAttribute("itl_recommendedtransportconditions").setValue(itl_recommendedtransportconditions);
                    formContext.getAttribute("itl_specialsafetyinstructionsformanufacturing").setValue(itl_specialsafetyinstructionsformanufacturing);
                    formContext.getAttribute("itl_packaginginformation").setValue(itl_packaginginformation);
                    formContext.getAttribute("itl_safetydatasheetsdsattached").setValue(itl_safetydatasheetsdsattached);
                    formContext.getAttribute("itl_productsafetyinformation").setValue(itl_productsafetyinformation);
                    formContext.getAttribute("itl_otherproductinformation").setValue(itl_otherproductinformation);
                },
                function (error) {
                    console.log("Error retrieving product: " + error.message);
                }
            );
        }
        if(product === null)
        {
                    formContext.getAttribute("itl_newcolumn").setValue(null);
                     formContext.getAttribute("itl_sapcode").setValue(null);
                    formContext.getAttribute("itl_generalproductdescription").setValue(null);
                    formContext.getAttribute("itl_commonorusualnameofproduct").setValue(null);
                    formContext.getAttribute("itl_extractratio").setValue(null);
                    formContext.getAttribute("itl_bsetseinformation").setValue(null);
                    formContext.getAttribute("itl_vegetarianstatement").setValue(null);
                    formContext.getAttribute("itl_glutenstatement").setValue(null);
                    formContext.getAttribute("itl_nonirradiationstatement").setValue(null);
                    formContext.getAttribute("itl_etostatement").setValue(null);
                    formContext.getAttribute("itl_pesticidestatement").setValue(null);
                    formContext.getAttribute("itl_foodgrade").setValue(null);
                    formContext.getAttribute("itl_productguarantee").setValue(null);
                    formContext.getAttribute("itl_batchlotnumberingsystem").setValue(null);
                    formContext.getAttribute("itl_batchlotdefinition").setValue(null);
                    formContext.getAttribute("itl_expirationdaterecommendedreevaluationinterval").setValue(null);
                    formContext.getAttribute("itl_recommendedstorageconditions").setValue(null);
                    formContext.getAttribute("itl_recommendedtransportconditions").setValue(null);
                    formContext.getAttribute("itl_specialsafetyinstructionsformanufacturing").setValue(null);
                    formContext.getAttribute("itl_packaginginformation").setValue(null);
                    formContext.getAttribute("itl_safetydatasheetsdsattached").setValue(null);
                    formContext.getAttribute("itl_productsafetyinformation").setValue(null);
                    formContext.getAttribute("itl_otherproductinformation").setValue(null);
        }
    } catch (ex) {
        Xrm.Utility.alertDialog("Error in productSetSIDI: " + ex.message);
    }
}

//last working code
// function productSetSIDI(executionContext) {
//     try {
//         debugger;
//         var formContext = executionContext.getFormContext();
//         var product = formContext.getAttribute("itl_productconfig").getValue();

//         if (product !== null) {
//             var productId = product[0].id.replace(/[{}]/g, "");

//     Xrm.WebApi.retrieveRecord("itl_marketingsupportconfiguration", productId, "?$select=itl_marketingsupportconfigurationid,itl_commonorusualnameofproduct,itl_extractratio,itl_generalproductdescription,itl_name,_itl_productcategory_value,itl_sapcode").then(
// 	function success(result) {
// 		console.log(result);
// 		// Columns
// 		var itl_marketingsupportconfigurationid = result["itl_marketingsupportconfigurationid"]; // Guid
// 		var itl_commonorusualnameofproduct = result["itl_commonorusualnameofproduct"]; // Text
// 		var itl_extractratio = result["itl_extractratio"]; // Text
// 		var itl_generalproductdescription = result["itl_generalproductdescription"]; // Multiline Text
// 		var itl_name = result["itl_name"]; // Text
// 		var itl_productcategory = result["_itl_productcategory_value"]; // Lookup
// 		var itl_productcategory_formatted = result["_itl_productcategory_value@OData.Community.Display.V1.FormattedValue"];
// 		var itl_productcategory_lookuplogicalname = result["_itl_productcategory_value@Microsoft.Dynamics.CRM.lookuplogicalname"];
// 		var itl_sapcode = result["itl_sapcode"]; // Text
//                     // Set product details in SIDI -name
//                     formContext.getAttribute("itl_newcolumn").setValue(itl_name);
//                     formContext.getAttribute("itl_sapcode").setValue(itl_sapcode);
//                     formContext.getAttribute("itl_generalproductdescription").setValue(itl_generalproductdescription);
//                     formContext.getAttribute("itl_commonorusualnameofproduct").setValue(itl_commonorusualnameofproduct);
//                     formContext.getAttribute("itl_extractratio").setValue(itl_extractratio);
//                 },
//                 function (error) {
//                     console.log("Error retrieving product: " + error.message);
//                 }
//             );
//         }
//         if(product === null)
//         {
//                     formContext.getAttribute("itl_newcolumn").setValue(null);
//                      formContext.getAttribute("itl_sapcode").setValue(null);
//                     formContext.getAttribute("itl_generalproductdescription").setValue(null);
//                     formContext.getAttribute("itl_commonorusualnameofproduct").setValue(null);
//                     formContext.getAttribute("itl_extractratio").setValue(null);
//         }
//     } catch (ex) {
//         Xrm.Utility.alertDialog("Error in productSetSIDI: " + ex.message);
//     }
// }


// Trigger PDF flow - SIDI - Omniactive - #Send-for-approval
function Generate_SIDI_PDF(primaryControl) {
    var formContext = primaryControl;

    Xrm.Navigation.openConfirmDialog({
        title: "Sent For Approval?",
        text: "Do you want to send it for PDF approval?"
    }).then(function (result) {
        if (result.confirmed) {
            var attr = formContext.getAttribute("itl_sentforapproval");
            if (!attr) {
                Xrm.Utility.alertDialog("Trigger field 'itl_sentforapproval' not found.");
                return;
            }

            var current = attr.getValue();
            var newValue = (current === true) ? false : true;

            attr.setValue(newValue);
            formContext.data.entity.save().then(function () {
                Xrm.Utility.showToastNotification("PDF generation triggered.", null, 3000);
            }).catch(function (err) {
                console.error("Save error: ", err.message);
                Xrm.Utility.alertDialog("Failed to trigger PDF generation.");
            });
        } else {
            Xrm.Utility.showToastNotification("PDF generation cancelled.", null, 3000);
        }
    }).catch(function (error) {
        console.error("Dialog error: ", error.message);
    });
}


//test start
// Section - 2 MANUFACTURING INFORMATION - Show/Hide Optionset onChange
function ManufacturingOnchange(executionContext) {
    try {
        var formContext = executionContext.getFormContext();
        var manufactureInfo = formContext.getAttribute("itl_nameandaddressofmanufacturingsites").getValue(); // MultiSelect OptionSet => array

        // Hide all controls first
        formContext.getControl("itl_manufacturingsite").setVisible(false);
        formContext.getControl("itl_nameandaddressoffinalmanufacturingsite").setVisible(false);
        formContext.getControl("itl_intermediatemanufacturingsite").setVisible(false);

        if (manufactureInfo !== null && manufactureInfo.length > 0) {
            manufactureInfo.forEach(function (val) {
                switch (val) {
                    case 1: // Manufacturing site
                        formContext.getControl("itl_manufacturingsite").setVisible(true);
                        break;
                    case 2: // Final manufacturing site
                        formContext.getControl("itl_nameandaddressoffinalmanufacturingsite").setVisible(true);
                        break;
                    case 3: // Intermediate manufacturing site
                        formContext.getControl("itl_intermediatemanufacturingsite").setVisible(true);
                        break;
                }
            });
        }
    } catch (ex) {
        Xrm.Utility.alertDialog("Error in ManufacturingOnchange: " + ex.message);
    }
}

// Final Manufacturing site : Set Text
function ManufacturingSiteTextSet(executionContext) {
    try {
        var formContext = executionContext.getFormContext();
        var manufacturingSiteTextArr = formContext.getAttribute("itl_nameandaddressofmanufacturingsites").getText(); // returns array of strings

        if (manufacturingSiteTextArr !== null && manufacturingSiteTextArr.length > 0) {
            var optionSetText = manufacturingSiteTextArr.join("; "); // Join with semicolon (or comma if you prefer)
            formContext.getAttribute("itl_manufacturing").setValue(optionSetText);
        } else {
            formContext.getAttribute("itl_manufacturing").setValue(null);
        }
    } catch (ex) {
        Xrm.Utility.alertDialog("Error in ManufacturingSiteTextSet: " + ex.message);
    }
}

//section - 2 showHide Mode of Manufacturing - note based on other option
function showHideModeofManufacturing(executionContext) {
    var formContext = executionContext.getFormContext();
    var modeOfManufacturing = formContext.getAttribute("itl_modeofmanufacturing").getValue();

    // Check if field has any selected values
    if (modeOfManufacturing && modeOfManufacturing.length > 0) {
        // Example: Check if the value 999990010 is included in the multi-select array
        if (modeOfManufacturing.includes(999990010)) {
            formContext.getControl("itl_modeofmanufacturingnote").setVisible(true);
        } else {
            formContext.getControl("itl_modeofmanufacturingnote").setVisible(false);
        }
    } else {
        formContext.getControl("itl_modeofmanufacturingnote").setVisible(false);
    }
}
//end


//Section - 2 - ShowHide Notes - Relationship To manufacturer - Note && Extraction - ShowHide
// Section - 2 - Show/Hide Notes - Relationship to manufacturur && Extraction
function section_2_NotesShowHide(executionContext) {
    var formContext = executionContext.getFormContext();

    // Get attributes safely
    var modeAttr = formContext.getAttribute("itl_relationshiptomanufacturer");
    var extractAttr = formContext.getAttribute("itl_extractionsolvents");

    // Get values
    var modeVal = modeAttr ? modeAttr.getValue() : null;              // single option set (number)
    var extractVals = extractAttr ? extractAttr.getValue() : null;    // multi-select (array or null)

    // Conditions
    var showNote2 = (modeVal === 2);
    var showNote21 = Array.isArray(extractVals) && extractVals.includes(11);

    // Set visibility safely
    var ctlNote2 = formContext.getControl("itl_notesection2");
    var ctlNote21 = formContext.getControl("itl_notesection21");

    if (ctlNote2) ctlNote2.setVisible(showNote2);
    if (ctlNote21) ctlNote21.setVisible(showNote21);
}



//test end

// //Section - 2 MANUFACTURING INFORMATION - Show/Hide Optionset onChange
// function ManufacturingOnchange(executionContext)
// {
//     try
//     {
//      var formContext = executionContext.getFormContext();
//      var manufactureInfo = formContext.getAttribute("itl_nameandaddressofmanufacturingsites").getValue();
     
//      if(manufactureInfo !== null && manufactureInfo == 1)
//      {
//         formContext.getControl("itl_manufacturingsite").setVisible(true);
//         // formContext.getControl("itl_nameandaddressoffinalmanufacturingsite").setVisible(false);
//         // formContext.getControl("itl_intermediatemanufacturingsite").setVisible(false);
//         // formContext.getAttribute("itl_manufacturecombineoptionstext").setValue(null);
//      }
//      else if(manufactureInfo !== null && manufactureInfo == 2)
//      {
//         formContext.getControl("itl_nameandaddressoffinalmanufacturingsite").setVisible(true);
//         // formContext.getControl("itl_manufacturingsite").setVisible(false);
//         // formContext.getControl("itl_intermediatemanufacturingsite").setVisible(false);
//         // formContext.getAttribute("itl_manufacturecombineoptionstext").setValue(null);
//      }
//      else if(manufactureInfo !== null && manufactureInfo == 3)
//      {
//         formContext.getControl("itl_intermediatemanufacturingsite").setVisible(true);
//         // formContext.getControl("itl_manufacturingsite").setVisible(false);
//         // formContext.getControl("itl_nameandaddressoffinalmanufacturingsite").setVisible(false);
//         // formContext.getAttribute("itl_manufacturecombineoptionstext").setValue(null);
//      }
//      else
//      {
//         formContext.getControl("itl_manufacturingsite").setVisible(false);
//         formContext.getControl("itl_nameandaddressoffinalmanufacturingsite").setVisible(false);
//         formContext.getControl("itl_intermediatemanufacturingsite").setVisible(false);
//      }
//     }catch(ex)
//     {
//         Xrm.Utility.alertDialog("Error Catch in! MANUFACTURING INFORMATION" + ex.message);
//     }
// }


// //1) Final Manufacturing site : Set TExt
// function ManufacturingSiteTextSet(executionContext) {
//     var formContext = executionContext.getFormContext();
//     var ManufacturingSite = formContext.getAttribute("itl_nameandaddressofmanufacturingsites").getValue();
//     if (ManufacturingSite !== null) {
//         var optionSetText = formContext.getAttribute("itl_nameandaddressofmanufacturingsites").getText();
//         formContext.getAttribute("itl_manufacturing").setValue(optionSetText);
//     } else {
//         formContext.getAttribute("itl_manufacturing").setValue(null);
//     }
// }

//GMP Compliance (If yes the Attached file option visible) #Section - 2
function GMPFileAttached(executionContext)
{
    var formContext = executionContext.getFormContext();
    var GMPCompliance = formContext.getAttribute("itl_gmpcompliance").getValue();
    if(GMPCompliance == true)
    {
        formContext.getControl("itl_gmpcertified").setVisible(true);
    }
    else{
        formContext.getControl("itl_gmpcertified").setVisible(false);
    }
}


//GMO Status - Set TExt
function GMOStatusTextSet(executionContext) {
    var formContext = executionContext.getFormContext();
    var GmoStatus = formContext.getAttribute("itl_gmostatuspleasecheckone").getValue();
    if (GmoStatus !== null) {
        var optionSetText = formContext.getAttribute("itl_gmostatuspleasecheckone").getText();
        formContext.getAttribute("itl_gmo").setValue(optionSetText);
    } else {
        formContext.getAttribute("itl_gmo").setValue(null);
    }
}



//Section - 4 LABELING INFORMATION
function NutritionInfoOnchange(executionContext)
{
    try
    {
     var formContext = executionContext.getFormContext();
     var nutritionInfo = formContext.getAttribute("itl_nutritioninformation").getValue();
     
     if(nutritionInfo !== null && nutritionInfo == 1)
     {
        formContext.getControl("itl_composition").setVisible(true);
        formContext.getControl("itl_quantityper100gm").setVisible(false);
     }
     else if(nutritionInfo !== null && nutritionInfo == 2)
     {
        formContext.getControl("itl_quantityper100gm").setVisible(true);
        formContext.getControl("itl_composition").setVisible(false);
     }
     else
     {
        formContext.getControl("itl_composition").setVisible(false);
        formContext.getControl("itl_quantityper100gm").setVisible(false);
     }
    }catch(ex)
    {
        Xrm.Utility.alertDialog("Error Catch in! MANUFACTURING INFORMATION" + ex.message);
    }
}

////3 multiselect optionset field and set selected optionset from 3 fields into a text field by comma seperated for each option
function combineMultiSelectFields(executionContext) {
    var formContext = executionContext.getFormContext();

    var fields = [
        "itl_manufacturingsite",
        "itl_nameandaddressoffinalmanufacturingsite",
        "itl_intermediatemanufacturingsite"
    ];

    var allLabels = [];
    var count = 1;

    fields.forEach(function (fieldName) {
        var attribute = formContext.getAttribute(fieldName);
        if (attribute) {
            var selectedValues = attribute.getValue();
            var options = attribute.getOptions();

            if (selectedValues && selectedValues.length > 0) {
                selectedValues.forEach(function (val) {
                    var option = options.find(o => o.value === val);
                    if (option && option.text) {
                        allLabels.push(count + ") " + option.text);
                        count++;
                    }
                });
            }
        }
    });

    var combinedText = allLabels.join("\n");
    formContext.getAttribute("itl_manufacturecombineoptionstext").setValue(combinedText);
}

//TEST Hyper
function AllergensHypersensitivitiesSet(executionContext) {
    var formContext = executionContext.getFormContext();
    var selectedValue = formContext.getAttribute("itl_allergenshypersensitivities").getValue();

    var fieldMap = {
        1: "itl_dairymilkproteinlactose",
        2: "itl_eggoreggderivatives",
        3: "itl_wheatorwheatderivatives",
        4: "itl_soyorsoyderivatives",
        5: "itl_peanuts",
        6: "itl_nutsincludingalltreenutsspecifytype",
        7: "itl_fishspecifyspecies",
        8: "itl_shellfishmolluscancrustaceansspecifyspec",
        9: "itl_sesameseedsandderivatives",
        10: "itl_mustard",
        11: "itl_celery",
        12: "itl_lupin",
        13: "itl_sulfurdioxidesulfitesifyesprovideamount",
        14: "itl_grapefruit",
        15: "itl_starch",
        16: "itl_yeastoryeastderivatives",
        17: "itl_salt",
        18: "itl_colorantsartificialcolor",
        19: "itl_artificialflavor",
        20: "itl_artificialpreservatives",
        21: "itl_glutenifyesprovideamountmgkg",
        22: "itl_cornorcornderivatives",
        23: "itl_sweetenersartificialornatural",
        24: "itl_sugaralcohols",
        25: "itl_porcineporkpig",
        26: "itl_riceorricederivatives",
        27: "itl_ryebarleyoatsorderivativesthereof",
        28: "itl_fruitorfruitderivativesspecifytype",
        29: "itl_monosodiumglutamatemsg"
    };

    // Hide and clear all allergen fields
    for (var key in fieldMap) {
        var field = fieldMap[key];
        var control = formContext.getControl(field);
        var attribute = formContext.getAttribute(field);
        if (control) control.setVisible(false);
        if (attribute) attribute.setValue(null);
    }

    // Clear the summary text field
    var summaryField = formContext.getAttribute("itl_selectedallergensoption");
    if (summaryField) summaryField.setValue(null);

    // Show only selected allergen field and set default option
    if (selectedValue !== null && fieldMap[selectedValue]) {
        var selectedFieldName = fieldMap[selectedValue];
        var selectedControl = formContext.getControl(selectedFieldName);
        var selectedAttr = formContext.getAttribute(selectedFieldName);

        if (selectedControl) selectedControl.setVisible(true);

        if (selectedAttr) {
            var allOptions = selectedAttr.getOptions();
            var freeOption = allOptions.find(opt => opt.text.toLowerCase() === "free" || opt.value === 1);
            if (freeOption) {
                selectedAttr.setValue([freeOption.value]); // Set the "Free" option

                // ✅ Also set the summary text field to "Free"
                if (summaryField) summaryField.setValue("Free");
            }
        }
    }
}

// Section - 4 - show notes on select itl_nutritioninfo
function showHideNotes4(ExecutionContext) {
    var formContext = ExecutionContext.getFormContext();
    var Nutritioninfo = formContext.getAttribute("itl_nutritioninfo").getValue();

    if (Nutritioninfo == 1 || Nutritioninfo == 2) {
        formContext.getControl("itl_notesection4").setVisible(true);
    } else {
        formContext.getControl("itl_notesection4").setVisible(false);
    }
}

//#2nd function to update selected option into text //call 29 field optionsets
function UpdateSelectedAllergenText(executionContext) {
    var formContext = executionContext.getFormContext();

    // Get selected allergen type (1-29)
    var selectedAllergen = formContext.getAttribute("itl_allergenshypersensitivities").getValue();
    if (!selectedAllergen) return;

    var fieldMap = {
        1: "itl_dairymilkproteinlactose",
        2: "itl_eggoreggderivatives",
        3: "itl_wheatorwheatderivatives",
        4: "itl_soyorsoyderivatives",
        5: "itl_peanuts",
        6: "itl_nutsincludingalltreenutsspecifytype",
        7: "itl_fishspecifyspecies",
        8: "itl_shellfishmolluscancrustaceansspecifyspec",
        9: "itl_sesameseedsandderivatives",
        10: "itl_mustard",
        11: "itl_celery",
        12: "itl_lupin",
        13: "itl_sulfurdioxidesulfitesifyesprovideamount",
        14: "itl_grapefruit",
        15: "itl_starch",
        16: "itl_yeastoryeastderivatives",
        17: "itl_salt",
        18: "itl_colorantsartificialcolor",
        19: "itl_artificialflavor",
        20: "itl_artificialpreservatives",
        21: "itl_glutenifyesprovideamountmgkg",
        22: "itl_cornorcornderivatives",
        23: "itl_sweetenersartificialornatural",
        24: "itl_sugaralcohols",
        25: "itl_porcineporkpig",
        26: "itl_riceorricederivatives",
        27: "itl_ryebarleyoatsorderivativesthereof",
        28: "itl_fruitorfruitderivativesspecifytype",
        29: "itl_monosodiumglutamatemsg"
    };

    var fieldName = fieldMap[selectedAllergen];
    if (!fieldName) return;

    var attr = formContext.getAttribute(fieldName);
    if (!attr) return;

    var selectedValues = attr.getValue(); // Array of selected option values
    var allOptions = attr.getOptions();   // Full list of options

    var selectedLabels = [];

    if (selectedValues && selectedValues.length > 0) {
        selectedValues.forEach(function (val) {
            var option = allOptions.find(opt => opt.value === val);
            if (option) selectedLabels.push(option.text);
        });
    }

    // Join selected labels into comma-separated string
    var labelText = selectedLabels.join(", ");

    // Set to the text field
    var summaryField = formContext.getAttribute("itl_selectedallergensoption");
    if (summaryField) summaryField.setValue(labelText);
}


//BPF stages on Change show Hide Related Tabs--
function showHideTabsOnchangeBPF(ExecutionContext)
{
    try
    {
      var formContext = ExecutionContext.getFormContext();
      var BPFStage = formContext.getAttribute("itl_sidistage").getValue();

      if(BPFStage === 2)
      {
        formContext.ui.tabs.get("tab_3").setVisible(true);
      }
      else if(BPFStage === 3)
      {
        formContext.ui.tabs.get("tab_3").setVisible(true);
        formContext.ui.tabs.get("tab_4").setVisible(true);
      }
      else if(BPFStage === 4)
      {
        formContext.ui.tabs.get("tab_3").setVisible(true);
        formContext.ui.tabs.get("tab_4").setVisible(true);
        formContext.ui.tabs.get("tab_5").setVisible(true);
      }
    }catch(ex)
    {
        Xrm.Utility.alertDialog("Error Cathc in! " + showHideTabsOnchangeBPF.message );
    }
}

//Read-Only Mode
function lockAllFields(executionContext) {
    var formContext = executionContext.getFormContext();

    // Don't lock if it's a new record
    if (formContext.ui.getFormType() === 1) return;

    // Lock all fields except status (optional)
    formContext.ui.controls.forEach(function (control) {
        if (control.getControlType() !== "subgrid" && control.setDisabled) {
            control.setDisabled(true);
        }
    });
}

//Onclick Send Update Request Button
function requestFieldUpdate(executionContext) {
    var formContext = executionContext.getFormContext();

    var fieldName = prompt("Enter the logical name of the field you want to update (e.g., itl_fieldName):");
    if (!fieldName || !formContext.getAttribute(fieldName)) {
        alert("Invalid field name.");
        return;
    }

    var newValue = prompt("Enter the new value for the field:");
    if (newValue === null || newValue === "") {
        alert("Value is required.");
        return;
    }

    var jsonRequest = {
        field: fieldName,
        value: newValue
    };

    formContext.getAttribute("itl_pendingrequest").setValue(JSON.stringify(jsonRequest));
    formContext.getAttribute("itl_pendingrequest").setSubmitMode("always");

    formContext.data.save().then(function() {
        alert("Update request submitted for approval.!!!");
    });
}

//PROP 65 URL and Note Value
function onCreateSIDI(executionContext)
{
    var formContext = executionContext.getFormContext();
    
    if (formContext.ui.getFormType() === 1)
    {
        formContext.getAttribute("itl_countryoforigin").setValue("INDIA");
        formContext.getAttribute("itl_prop65").setValue("http://oehha.ca.gov/prop65/prop65_list/Newlist.html");
        formContext.getAttribute("itl_notesection4").setValue("These values are calculated based on contribution of ingredients making up the Product");
        formContext.getAttribute("itl_assumptions").setValue("Capsicum concentrate does not give any calorific value");
        formContext.getAttribute("itl_note").setValue("*Provide for Botanical component only, *For Botanical components, provide country(s) of harvesting or processing.^Provide for non-botanical component only (e.g . Synthetic, animal sourced, vegetable sourced, mineral based or product of fermentation).");
    }
}

//section test 6
// function AllergensTESTESTHypersensitivitiesSetTESTTEST(executionContext) {
//     var formContext = executionContext.getFormContext();
//     var selectedValue = formContext.getAttribute("itl_allergenshypersensitivities").getValue();

//     // Map each option set value to its matching field name
//     var fieldMap = {
//         1: "itl_dairymilkproteinlactose",
//         2: "itl_eggoreggderivatives",
//         3: "itl_wheatorwheatderivatives",
//         4: "itl_soyorsoyderivatives",
//         5: "itl_peanuts",
//         6: "itl_nutsincludingalltreenutsspecifytype",
//         7: "itl_fishspecifyspecies",
//         8: "itl_shellfishmolluscancrustaceansspecifyspec",
//         9: "itl_sesameseedsandderivatives",
//         10: "itl_mustard",
//         11: "itl_celery",
//         12: "itl_lupin",
//         13: "itl_sulfurdioxidesulfitesifyesprovideamount",
//         14: "itl_grapefruit",
//         15: "itl_starch",
//         16: "itl_yeastoryeastderivatives",
//         17: "itl_salt",
//         18: "itl_colorantsartificialcolor",
//         19: "itl_artificialflavor",
//         20: "itl_artificialpreservatives",
//         21: "itl_glutenifyesprovideamountmgkg",
//         22: "itl_cornorcornderivatives",
//         23: "itl_sweetenersartificialornatural",
//         24: "itl_sugaralcohols",
//         25: "itl_porcineporkpig",
//         26: "itl_riceorricederivatives",
//         27: "itl_ryebarleyoatsorderivativesthereof",
//         28: "itl_fruitorfruitderivativesspecifytype",
//         29: "itl_monosodiumglutamatemsg"
//     };

//     // First, hide all and clear their values
//     for (var key in fieldMap) {
//         var fieldName = fieldMap[key];
//         var control = formContext.getControl(fieldName);
//         var attribute = formContext.getAttribute(fieldName);

//         if (control) control.setVisible(false);
//         if (attribute) attribute.setValue(null); // Clear value
//     }

//     // Show the selected field
//     if (selectedValue !== null && fieldMap[selectedValue]) {
//         var selectedField = fieldMap[selectedValue];
//         var selectedControl = formContext.getControl(selectedField);
//         if (selectedControl) selectedControl.setVisible(true);
//     }
// }


//Section 6 - Allergens / Hypersensitivities table
// function AllergenTESTESTsHypersensitivitiesSetTESTEST22(executionContext)
// {
//     var formContext = executionContext.getFormContext();
//     var allergensHyperOption = formContext.getAttribute("itl_allergenshypersensitivities").getValue();
//     if(allergensHyperOption !== null && allergensHyperOption == 1)
//         {
//             formContext.getControl("itl_dairymilkproteinlactose").setVisible(true);
//         }
//         else if(allergensHyperOption !== null && allergensHyperOption == 2)
//         {
//             formContext.getControl("itl_eggoreggderivatives").setVisible(true);
//         }
//         else if(allergensHyperOption !== null && allergensHyperOption == 2)
//         {
//             formContext.getControl("itl_eggoreggderivatives").setVisible(true);
//         }
//         else if(allergensHyperOption !== null && allergensHyperOption == 2)
//         {
//             formContext.getControl("itl_eggoreggderivatives").setVisible(true);
//         }
//         else if(allergensHyperOption !== null && allergensHyperOption == 2)
//         {
//             formContext.getControl("itl_eggoreggderivatives").setVisible(true);
//         }
//         else if(allergensHyperOption !== null && allergensHyperOption == 2)
//         {
//             formContext.getControl("itl_eggoreggderivatives").setVisible(true);
//         }
//         else if(allergensHyperOption !== null && allergensHyperOption == 2)
//         {
//             formContext.getControl("itl_eggoreggderivatives").setVisible(true);
//         }
//         else if(allergensHyperOption !== null && allergensHyperOption == 2)
//         {
//             formContext.getControl("itl_eggoreggderivatives").setVisible(true);
//         }
//         else if(allergensHyperOption !== null && allergensHyperOption == 2)
//         {
//             formContext.getControl("itl_eggoreggderivatives").setVisible(true);
//         }
//         else if(allergensHyperOption !== null && allergensHyperOption == 2)
//         {
//             formContext.getControl("itl_eggoreggderivatives").setVisible(true);
//         }
//         else if(allergensHyperOption !== null && allergensHyperOption == 2)
//         {
//             formContext.getControl("itl_eggoreggderivatives").setVisible(true);
//         }
//         else if(allergensHyperOption !== null && allergensHyperOption == 2)
//         {
//             formContext.getControl("itl_eggoreggderivatives").setVisible(true);
//         }
//         else if(allergensHyperOption !== null && allergensHyperOption == 2)
//         {
//             formContext.getControl("itl_eggoreggderivatives").setVisible(true);
//         }
//         else if(allergensHyperOption !== null && allergensHyperOption == 2)
//         {
//             formContext.getControl("itl_eggoreggderivatives").setVisible(true);
//         }
//         else{
//             formContext.getControl("itl_dairymilkproteinlactose").setVisible(false);
//             formContext.getControl("itl_eggoreggderivatives").setVisible(false);
//         }
// }

//calling above function to clear previous optionsets values
// function handleMultiSelectChange(executionContext) {
//     var formContext = executionContext.getFormContext();

//     var fields = [
//         "itl_manufacturingsite",
//         "itl_nameandaddressoffinalmanufacturingsite",
//         "itl_intermediatemanufacturingsite"
//     ];

//     var changedControl = executionContext.getEventSource();
//     var changedAttribute = changedControl.getAttribute();
//     if (!changedAttribute) return;

//     var changedField = changedAttribute.getName();

//     // Clear other fields
//     fields.forEach(function (field) {
//         if (field !== changedField) {
//             formContext.getAttribute(field).setValue(null);
//         }
//     });

//     // Recombine updated values
//     combineMultiSelectFields(executionContext);
// }


//sections
// function hideSectionControls(formContext, tabName, sectionName) {
//    var tab = formContext.ui.tabs.get(tabName);
//    if (tab) {
//        var section = tab.sections.get(sectionName);
//        if (section) {
//            section.controls.forEach(function (control) {
//                control.setVisible(false);
//            });
//        }
//    }
// }

// #2 APproval
// function sendForApproval(primaryControl) {
//     var confirmMessage = {
//         title: "Send for Approval",
//         text: "Are you sure you want to send the document for approval? Please confirm to proceed."
//     };

//     Xrm.Navigation.openConfirmDialog(confirmMessage).then(function (result) {
//         if (result.confirmed) {
//             var flagAttr = primaryControl.getAttribute("itl_sendapprovalglag");
//             if (flagAttr) {
//                 flagAttr.setValue(true);
//                 primaryControl.data.save().then(function () {
//                     Xrm.Navigation.openAlertDialog({ text: "The approval request has been submitted successfully." });
//                 }, function (error) {
//                     Xrm.Navigation.openErrorDialog({ message: "Error while sending for approval: " + error.message });
//                 });
//             } else {
//                 Xrm.Navigation.openErrorDialog({ message: "Approval flag field 'itl_sendapprovalglag' not found on the form." });
//             }
//         }
//     });
// }

//section 6 - customization and optionset visibility onchange ###1 Working //Table - Hypersensitives
// function AllergensHypersensitivitiesSet(executionContext) {
//     var formContext = executionContext.getFormContext();
//     var selectedValue = formContext.getAttribute("itl_allergenshypersensitivities").getValue();

//     var fieldMap = {
//         1: "itl_dairymilkproteinlactose",
//         2: "itl_eggoreggderivatives",
//         3: "itl_wheatorwheatderivatives",
//         4: "itl_soyorsoyderivatives",
//         5: "itl_peanuts",
//         6: "itl_nutsincludingalltreenutsspecifytype",
//         7: "itl_fishspecifyspecies",
//         8: "itl_shellfishmolluscancrustaceansspecifyspec",
//         9: "itl_sesameseedsandderivatives",
//         10: "itl_mustard",
//         11: "itl_celery",
//         12: "itl_lupin",
//         13: "itl_sulfurdioxidesulfitesifyesprovideamount",
//         14: "itl_grapefruit",
//         15: "itl_starch",
//         16: "itl_yeastoryeastderivatives",
//         17: "itl_salt",
//         18: "itl_colorantsartificialcolor",
//         19: "itl_artificialflavor",
//         20: "itl_artificialpreservatives",
//         21: "itl_glutenifyesprovideamountmgkg",
//         22: "itl_cornorcornderivatives",
//         23: "itl_sweetenersartificialornatural",
//         24: "itl_sugaralcohols",
//         25: "itl_porcineporkpig",
//         26: "itl_riceorricederivatives",
//         27: "itl_ryebarleyoatsorderivativesthereof",
//         28: "itl_fruitorfruitderivativesspecifytype",
//         29: "itl_monosodiumglutamatemsg"
//     };

//     // Hide and clear all 29 allergen fields
//     for (var key in fieldMap) {
//         var field = fieldMap[key];
//         var control = formContext.getControl(field);
//         var attribute = formContext.getAttribute(field);
//         if (control) control.setVisible(false);
//         if (attribute) attribute.setValue(null);
//     }

//     // Clear the summary text field
//     var summaryField = formContext.getAttribute("itl_selectedallergensoption");
//     if (summaryField) summaryField.setValue(null);

//     // Show only selected allergen field
//     if (selectedValue !== null && fieldMap[selectedValue]) {
//         var selectedField = fieldMap[selectedValue];
//         var selectedControl = formContext.getControl(selectedField);
//         if (selectedControl) selectedControl.setVisible(true);
//     }
// }