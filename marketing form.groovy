<script src='https://cxppusa1formui01cdnsa01-endpoint.azureedge.net/usa/FormCapture/FormCapture.bundle.js'></script>
<script>
    // NOTE: for reference see https://go.microsoft.com/fwlink/?linkid=2250770
 
    d365mktformcapture.waitForElement("Add your wesbite form Id") // example: "#form1" as a selector for form with id="form1"
    .then(form => {
        const mappings = [
            {
                FormFieldName: "Name",
                DataverseFieldName: "firstname",
            },
            {
                FormFieldName: "Lastname",
                DataverseFieldName: "lastname",
            },
            {
                FormFieldName: "emails",
                DataverseFieldName: "emailaddress1",
            },
            {
                FormFieldName: "mobile",
                DataverseFieldName: "mobilephone",
            },
            {
                FormFieldName: "ContactType",
                DataverseFieldName: "ams_contacttype",
                DataverseFieldValue: [
                    { FormValue: "1", DataverseValue: "1" }, // Board Member
                    { FormValue: "2", DataverseValue: "2" }, // Resident
                    { FormValue: "3", DataverseValue: "3" }, // Committee Member
                    { FormValue: "4", DataverseValue: "4" }, // Community Association Manager
                    { FormValue: "5", DataverseValue: "5" }, // Vendor
                    { FormValue: "6", DataverseValue: "6" }, // Developer
                    { FormValue: "7", DataverseValue: "7" }, // Other
                ],
            },
            {
                FormFieldName: "",
                DataverseFieldName: "ams_leadsourcename",
            },
            {
                FormFieldName: "",
                DataverseFieldName: "leadsourcecode",
                DataverseFieldValue: [
                    { FormValue: "", DataverseValue: "12" }, // Blog
                    { FormValue: "", DataverseValue: "10" }, // Board Member Referral
                    { FormValue: "", DataverseValue: "14" }, // Campaign
                    { FormValue: "", DataverseValue: "13" }, // Digital Marketing
                    { FormValue: "", DataverseValue: "4" }, // Direct Mailer
                    { FormValue: "", DataverseValue: "2" }, // Employee Referral
                    { FormValue: "", DataverseValue: "3" }, // External Referral
                    { FormValue: "", DataverseValue: "16" }, // Former Employee
                    { FormValue: "", DataverseValue: "15" }, // Previous Bid
                    { FormValue: "", DataverseValue: "6" }, // Self-Generated
                    { FormValue: "", DataverseValue: "9" }, // Social Media
                    { FormValue: "", DataverseValue: "7" }, // Trade Show
                    { FormValue: "", DataverseValue: "11" }, // Vendor/Networking Referral
                    { FormValue: "", DataverseValue: "5" }, // Web Search
                    { FormValue: "", DataverseValue: "1" }, // Webinar
                    { FormValue: "", DataverseValue: "8" }, // Website
                    { FormValue: "", DataverseValue: "192350000" }, // LinkedIn Sponsored Form
                    { FormValue: "", DataverseValue: "192350100" }, // Landing page
                    { FormValue: "", DataverseValue: "831900000" }, // Journey
                    { FormValue: "", DataverseValue: "749350001" }, // Website: Newsletter
                ],
            },
            {
                FormFieldName: "",
                DataverseFieldName: "companyname",
            },
            {
                FormFieldName: "",
                DataverseFieldName: "ams_propertytype",
                DataverseFieldValue: [
                    { FormValue: "", DataverseValue: "1" }, // HOA
                    { FormValue: "", DataverseValue: "2" }, // Condo
                    { FormValue: "", DataverseValue: "3" }, // Co-Op
                    { FormValue: "", DataverseValue: "4" }, // Multi-family
                    { FormValue: "", DataverseValue: "5" }, // Undefined
                ],
            },
            {
                FormFieldName: "",
                DataverseFieldName: "msdynmkt_purposeid;channels;optinwhenchecked",
                DataverseFieldValue: "2e7d52f2-81f2-ef11-be21-00224823c9d7;Email,Text;true",
            },
 
        ];
 
        form.addEventListener("submit", (e) => {
            const serializedForm = d365mktformcapture.serializeForm(form, mappings);
            // console.log(JSON.stringify(serializedForm)); // NOTE: enable for debugging
            const payload = serializedForm.SerializedForm.build();
 
            const captureConfig = {
                FormId: "06beb3be-567e-f011-b4cc-002248246798",
                FormApiUrl: "https://public-usa.mkt.dynamics.com/api/v1.0/orgs/de9a9b76-68e2-4662-8210-ccc332ba44d6/landingpagef…
            }
            d365mktformcapture.submitForm(captureConfig, payload);
        }, true);
    });
</script>