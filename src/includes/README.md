# CBN Social Sharing Library dotNet Controls

This folder includes three separate controls that can be used to place Social Sharing Icons and/or Trigger Social Shares via the `cbnShare API`. Only the `cbn-share-api.ascx` control is required on any page that wishes to use the controls, but the `CBN Share Client` is required to either generate social icons or to hook existing icons into the `cbnShare API`.

## How to Use

For any `dotNet` page, you must register these custom controls at the top of your page:


```csharp
<%@ Page Language="C#" %>
<%@ Register TagPrefix="cc" Src="~/noindex/scripts/social/includes/cbn-share-api.ascx" TagName="CBNShareApi" %>
<%@ Register TagPrefix="cc" Src="~/noindex/scripts/social/includes/cbn-share-client.ascx" TagName="CBNShareClient" %>
<%@ Register TagPrefix="cc" Src="~/noindex/scripts/social/includes/cbn-share-icons.ascx" TagName="CBNShareIcons" %>
```


Within the `<head>` of your `document`, before the closing `</head>` tag, include either, but most likely both, `CBNShareApi` and `CBNShareClient` controls:

```html
<head>
    <!-- all the other tags belonging to the head -->
    <cc:CBNShareApi runat="server"></cc:CBNShareApi> 
    <cc:CBNShareClient runat="server"></cc:CBNShareClient> 
</head>
```

Both controls accept a `Version` attribute, that defaults to `1.0`. It is *highly recommended* to not set the Version attribute on the control to allow that to be managed by the control itself. However, if you must update the version, increment the minor version, not the major version. So, `1.0 => 1.1`, NOT, `1.0 => 2.0`.

Then within the `<body>` tag, wherever you want to have social icons generated, add the `CBNShareIcons` control. Be sure to give a unique `ID` attribute to each instance of this control:

```html
<body>
    <cc:CBNShareIcons id="ShareIcons1" runat="server"/>
</body>
```

The `CBNShareIcons` control takes four optional parameters: `ButtonType`, `ButtonsObject`, `IsAsync`, and `CssClass`.

`ButtonType` defaults to `default` but will accept the values of `icons-only` or `text-only`.

`ButtonsObject` takes a JSON-serialized String. See [JSON-encoded `data-buttons` Object](../../README.md#markdown-header-json-encoded-data-buttons-object) for instructions on how to format this String.

Use `IsAsync` for any controls that will be dynamically-rendered on the page in response to some event. The default value is `false`.

Use `IsCenter` to center horizontally the controls within their container, by setting it's value to `true`. The default value is `false` and the buttons will be left-justified.

Pass in a string of CSS classnames, like you would set the regular HTML `class` attribute, to `CssClass` to add a custom CSS class to the containing div.

```html
<cc:CBNShareIcons 
    ButtonType="icons-only" 
    IsAsync="false" 
    IsCenter="true" 
    id="ShareIcons1" 
    runat="server"
/>
```