using System;
using System.Net.Http;
using System.Text;
using System.Threading;
using Microsoft.Xrm.Sdk;
using Microsoft.Xrm.Sdk.Query;
using Newtonsoft.Json.Linq;

namespace MyCompany.Plugins
{
    public class TranslateActionPlugin : IPlugin
    {
        private static readonly HttpClient _httpClient = new HttpClient();

        public void Execute(IServiceProvider serviceProvider)
        {
            var context = (IPluginExecutionContext)serviceProvider.GetService(typeof(IPluginExecutionContext));
            var tracing = (ITracingService)serviceProvider.GetService(typeof(ITracingService));
            var factory = (IOrganizationServiceFactory)serviceProvider.GetService(typeof(IOrganizationServiceFactory));
            var service = factory.CreateOrganizationService(context.UserId);

            try
            {
                tracing.Trace("TranslateActionPlugin: Start execution");

                // Read inputs
                string inputText = context.InputParameters.Contains("InputText") ? context.InputParameters["InputText"] as string : null;
                string fromLang = context.InputParameters.Contains("FromLanguage") ? context.InputParameters["FromLanguage"] as string : "ja";
                string toLang = context.InputParameters.Contains("ToLanguage") ? context.InputParameters["ToLanguage"] as string : "en";

                tracing.Trace("Inputs read successfully.");

                if (string.IsNullOrWhiteSpace(inputText))
                {
                    tracing.Trace("No input text provided.");
                    context.OutputParameters["TranslatedText"] = string.Empty;
                    return;
                }

                // Load environment variables exactly like before
                string subscriptionKey = GetEnvironmentVariableValue(service, "itl_Translation_Key", tracing);
                if (string.IsNullOrEmpty(subscriptionKey))
                {
                    throw new InvalidPluginExecutionException(
                        "Translator key is not configured. Please set the environment variable itl_Translation_Key.");
                }

                string region = GetEnvironmentVariableValue(service, "itl_Translator_region", tracing) ?? "centralindia";
                string endpoint = GetEnvironmentVariableValue(service, "itl_Translator_endpoint", tracing)
                                  ?? "https://api.cognitive.microsofttranslator.com";

                tracing.Trace($"Using Translator endpoint: {endpoint}, region: {region}");

                // Build translator API URL
                string route = $"/translate?api-version=3.0&from={fromLang}&to={toLang}";
                string requestUrl = endpoint.TrimEnd('/') + route;

                // Request body
                var requestBody = new[] { new { Text = inputText } };
                string jsonBody = Newtonsoft.Json.JsonConvert.SerializeObject(requestBody);

                // Prepare HTTP request
                using (var httpRequest = new HttpRequestMessage(HttpMethod.Post, requestUrl))
                {
                    httpRequest.Content = new StringContent(jsonBody, Encoding.UTF8, "application/json");
                    httpRequest.Headers.Add("Ocp-Apim-Subscription-Key", subscriptionKey);
                    httpRequest.Headers.Add("Ocp-Apim-Subscription-Region", region);

                    tracing.Trace("Sending Translator API request...");

                    var cts = new CancellationTokenSource(TimeSpan.FromSeconds(20));
                    var apiResponse = _httpClient.SendAsync(httpRequest, cts.Token).Result;

                    string responseJson = apiResponse.Content.ReadAsStringAsync().Result;

                    if (!apiResponse.IsSuccessStatusCode)
                    {
                        tracing.Trace($"Translation API failure: {responseJson}");
                        throw new InvalidPluginExecutionException("Translation API error: " + apiResponse.StatusCode);
                    }

                    tracing.Trace("Translator API response received.");

                    // Parse translated text
                    var parsed = JArray.Parse(responseJson);
                    string translatedText = parsed?[0]?["translations"]?[0]?["text"]?.ToString() ?? "";

                    tracing.Trace("Translated text: " + translatedText);

                    // Return translation to JS
                    context.OutputParameters["TranslatedText"] = translatedText;
                }
            }
            catch (Exception ex)
            {
                tracing.Trace("Unhandled exception: " + ex.ToString());
                throw new InvalidPluginExecutionException("Translation failed. See plugin trace for details.");
            }
        }

        /// <summary>
        /// Retrieves an environment variable value using correct join logic.
        /// </summary>
        private string GetEnvironmentVariableValue(IOrganizationService service, string schemaName, ITracingService tracing)
        {
            try
            {
                string fetchXml = $@"
                        <fetch top='1'>
                        <entity name='environmentvariablevalue'>
                        <attribute name='value' />
                        <link-entity name='environmentvariabledefinition'
                        from='environmentvariabledefinitionid'
                        to='environmentvariabledefinitionid'
                        link-type='inner'>
                        <filter>
                        <condition attribute='schemaname' operator='eq' value='{schemaName}' />
                        </filter>
                        </link-entity>
                        </entity>
                        </fetch>";

                var result = service.RetrieveMultiple(new FetchExpression(fetchXml));

                if (result.Entities.Count > 0)
                {
                    string value = result.Entities[0].GetAttributeValue<string>("value");
                    tracing.Trace($"Environment Variable '{schemaName}' loaded.");
                    return value;
                }

                tracing.Trace($"Environment Variable '{schemaName}' NOT found.");
                return null;
            }
            catch (Exception ex)
            {
                tracing.Trace("Error in GetEnvironmentVariableValue: " + ex.ToString());
                throw;
            }
        }
    }
}
