<%@ Language="C#" %>
<script runat="server">
    private string _version = "1.0";
    public string Version {
        get { return _version; }
        set {
            _version = value;
        }
    }
</script>
<link rel="stylesheet" href='/noindex/scripts/social/cbn-share.css?ver=<%=Version%>' />
<script>
  (function (c,b,n,share) {
    if (c.getElementById(n)) return;
    var s = c.createElement(b);
    s.id = n
    s.type = 'text/javascript';
    s.async = true;
    s.src = '/noindex/scripts/social/cbn-share-client.js?ver=<%=Version%>';
    var x = c.getElementsByTagName(b)[0];
    x.parentNode.insertBefore(s, x);
  })(document,"script","cbn-share-client");
</script>