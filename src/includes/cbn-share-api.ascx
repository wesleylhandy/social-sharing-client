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
<script>
  (function (c,b,n,share) {
    if (c.getElementById(n)) return;
    var s = c.createElement(b);
    s.id = n
    s.type = 'text/javascript';
    s.async = true;
    s.src = '/noindex/scripts/social/cbn-share-api.js?ver=<%=Version%>';
    var x = c.getElementsByTagName('script')[0];
    x.parentNode.insertBefore(s, x);
  })(document,"script","cbn-share-api");
</script>