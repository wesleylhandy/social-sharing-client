<%@ Language="C#" %>
<%@ Import Namespace="Newtonsoft.Json"%>
<%@ Import Namespace="Newtonsoft.Json.Linq"%>
<%@ Import Namespace="Newtonsoft.Json.Schema"%>
<script runat="server">
    private bool _isAsync = false;
    public bool IsAsync {
        get { return _isAsync; }
        set {
            _isAsync = value;
        }
    }
    private string _buttonType = "default";
    public string ButtonType {
        get { return _buttonType; }
        set {
            _buttonType = value;
        }
    }
    // for object validation, currently not in use
    private string jsonSchema = @"{
        description: 'buttons', 
        'type': 'object',
        'properties':
        {
            'facebook': 
            {
                'type': 'object',
                'properties': 
                {
                    'appId' : { 'type' : 'string' },
                    'url' : { 'type' : 'string' },
                    'text' : { 'type' : 'string' },
                    'hashtag' : { 'type' : 'string' }
                }
            },
            'twitter': 
            {
                'type': 'object',
                'properties': 
                {
                    'url' : { 'type' : 'string' },
                    'text' : { 'type' : 'string' },
                    'hashtags' : { 'type' : 'string' },
                    'via' : { 'type' : 'string' },
                    'related' : { 'type' : 'string' }
                }
            },
            'email': 
            {
                'type': 'object',
                'properties':
                {
                    'subject' : { 'type' : 'string' },
                    'url' : { 'type' : 'string' },
                    'text' : { 'type' : 'string' }
                }
            }
        }
    }";
    private string _buttonsObject = "{\"facebook\":{},\"twitter\":{},\"email\":{}}";
    public string ButtonsObject {
        get { return _buttonsObject; }
        set {
            // parse and serialize data to ensure proper json formatting
            var parsed = JObject.Parse(value);
            _buttonsObject = JsonConvert.SerializeObject(parsed);
        }
    }
    private string cssClass = "";
    public string CssClass {
        get { return cssClass; }
        set {
            cssClass = value;
        }
    }
</script>
<div
    class="<%=CssClass%>"
    data-generated="false"
    data-social-icons="wrapper"
    data-button-type="<%=ButtonType%>"
    data-buttons='<%=ButtonsObject%>'
></div>
<%
if (IsAsync)
{
%>
<script>
try{
    cbnShareClient.load()
} catch(e) {
    console.error(e)
    console.error("Unable to load CBNShareClient Asynchronously")
}
</script>
<%
}
%>