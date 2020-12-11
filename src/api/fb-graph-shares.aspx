<%@ Page Language="C#" AutoEventWireup="true"%>
<%@ Import Namespace="System"%>
<%@ Import Namespace="System.Collections.Generic"%>
<%@ Import Namespace="System.Net"%>
<%@ Import Namespace="System.IO"%>
<%@ Import Namespace="System.Web"%>
<%@ Import Namespace=" CBN.Web.Utilities"%>
<script runat="server">

    protected string appId = "";
    protected string appSecret = "";

    protected void Page_Load(object sender, EventArgs e)
    {
        if (!IsPostBack)
        {
            string originValue = Request.Url.DnsSafeHost.ToLower();
            String[] validOrigins = new String[] { "localhost" };
            if ( Array.IndexOf(validOrigins, originValue) > -1 )
            {
                Response.AppendHeader("Access-Control-Allow-Origin", "*");
            }
            string sharingUrl = !String.IsNullOrEmpty(Request.Url.Query) && Request.Url.Query.ToLower().Contains("sharing_url=") ? Request.QueryString["sharing_url"].ToLower() : "";
            string serviceUrl = "https://graph.facebook.com/v8.0/?access_token=" + appId + "|" + appSecret + "&fields=engagement&id=" + sharingUrl;
            string result = string.Empty; 
            string error_result = string.Empty;
            HttpWebRequest http_request = (HttpWebRequest)WebRequest.Create(serviceUrl);
            http_request.KeepAlive = false;
            http_request.Method = "GET"; 
            try {
                HttpWebResponse http_response = (HttpWebResponse)http_request.GetResponse();
                Stream stream = http_response.GetResponseStream();
                StreamReader streamReader = new StreamReader(stream);
                result = streamReader.ReadToEnd();
                streamReader.Close();
                stream.Close();
                http_response.Close();
                Response.Write(result);
            } 
            catch (WebException wex) {
                if (wex.Response != null)
                {
                    var error_response = (HttpWebResponse)wex.Response;
                    Stream error_stream = error_response.GetResponseStream();
                    StreamReader errorStreamReader = new StreamReader(error_stream);
                    error_result = errorStreamReader.ReadToEnd();
                    errorStreamReader.Close();
                    error_stream.Close();
                    error_response.Close();
                    Response.Write(error_result);
                }
            }
        }
    }

</script>