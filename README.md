# CBN Sharing Client Documentation

The **CBN Sharing Client** provides configurable social sharing functionality for Facebook, Twitter, and/or Email. Built off the `cbnShare API`, this **Client** will either create `click` event handlers for preexisting buttons or generate styled buttons with event handlers to pass social sharing data to the `cbnShare API` which will in turn trigger alternately Facebook, Twitter, or Email shares of the page according to configuration.

## How It Works

The **CBN Sharing Client** should be loaded onto the DOM via asychronous, non-blocking Javascript, as should the `cbnShare API`.

```html
<script async src="/path/to/cbn-share-api.js">
<script async src="/path/to/cbnsharing-client.js">
<link rel="stylesheet" href="path/to/cbn-sharing.css">
```

Once loaded, the **Client** appends the `cbnSharingClient` to the global object, in this case `window`, and then initializes itself. During initialization, the **Client** first looks for `<div>` or other block-level containers, that match the selector `[data-social-icons='wrapper']`, and fills them with sharing buttons with a set of configurations to be discussed below, then it looks for existing html `<button>` elements having `data-social` attributes defined, to attach `click` event listeners. When a matching button is clicked, then the **Client** calls the `cbnShare API` with the relevant data.

Buttons can be configured with custom values, or the **Client** will pull the page from `<meta>` tags defined with `og` and `twitter` sharing attributes. It also will pull from the `<title>` tag, `<link rel="canonical">` tag, and `window.location.href` to fill in any missing attributes.

### Prioritizing Data In Social Shares

As mentioned above, the data used in social shares is prioritized based on how and what is provided. Each button will have a set of data attributes, which are prioritized over defined metadata, which are prioritized over defaults.

#### Facebook Sharing

*For detailed information on how the Facebook Share API works, see https://developers.facebook.com/docs/sharing/reference/share-dialog*

The `cbnShare API` accepts the following sharing object:

```javascript
const sharingObj = {
    service : 'facebook',
    appId : STRING,
    url : STRING,
    text : STRING,
    hashtag : STRING
}
```

The **appId** is an optional attribute. The `cbnShare API` works from a default Facebook App. However, where needed, this value can be passed in through a `data-appId` attribute or derived from a well-defined `<meta>` tag using the property `fb:app_id`.

The **url** can be passed via a `data-url` attribute, be derived from `og:url` meta-tag, or default to `window.location.href`

The **text** is what we are asking the FB share to say. You have to pass this in through the `data-text` attribute, or FB will default to grabbing what it can from meta tags on the page.

The **hashtag** is a single hashtag that *must include* the preceding `#` character to be appended to the body of the share and is passed in through the `data-hashtag` attribute.

#### Twitter Sharing

*For detailed information on how Twitter Intents works, see https://developer.twitter.com/en/docs/twitter-for-websites/tweet-button/guides/web-intent*

The `cbnShare API` accepts the following sharing object:

```javascript
const sharingObj = {
    service : 'twitter',
    url : STRING,
    text : STRING,
    hashtags : STRING,
    via : STRING,
    related: STRING,
}
```

The **url** can be passed via a `data-url` attribute, be derived from `twitter:url` meta-tag, be derived from the `canonical` link, or default to `window.location.href`

The **text** is what we are prefilling as the tweet for the person sharing. This can be passed in through the `data-text` attribute, will be filled with the `<title>` content, or will default to an empty string.

Twitter **hashtags** work differently than facebook. This should be a comma-separated-list of tags that *EXCLUDE* the preceding `#` character. No spaces and a very limited set of non-alphanumeric characters are available. This can be passed in through the `data-hashtags` attribute, or will default to an empty string.

The **via** attribute is the Twitter username (excluding `@` character) of the account associated with the page or article. You can pass this in via the `data-via` attribute, or will default to `CBNOnline`

The **related** attribute is tricky (refer to previously linked documentation on how this should be encoded), but it's basically a urlencoded-comma-separated-pair comma-separated-list of twitter usernames with brief corresponding descriptions of those usernames that Twitter might recommend for a follow when someone opens the share dialog.

***Note**: We currently are not supporting the `in_reply_to` parameter available on the web intent api, which allows tweets to be posted as replies to a pre-existing parent-tweet.*

#### Email Sharing

Rather than hardcoding `mailto` attributes, the `cbnShare API` will trigger the email share much like it does for other services.

The `cbnShare API` accepts the following sharing object:

```javascript
const sharingObj = {
    service : 'email',
    url : STRING,
    subject : STRING,
    text : STRING,
}
```
The **url** can be passed via a `data-url` attribute, be derived from the `canonical` link, or default to `window.location.href`

The **subject** is what will be used for the **Email Subject Line**. This should be passed in via the `data-subject` attribute, or it will default to `"I found this resource to share with you!"`.

The **text** attribute is the first line of the body of the email. *DO NOT* include the URL as part of this text. The `cbnShare API` will programmatically append the URL to the second line of the email body. Pass this in through the `data-text` attribute or it will default to (where `this.title` is the page `<title>`): 

```javascript
`Here's the link for ${this.title}: `
```

#### Example

```html
<button
    data-social="facebook|twitter|email"
    data-url="optional url to be shared"
    data-text="optional text for body of share/tweet/email"
    data-subject="optional subject of email, if email"
    data-app-id="optional FB APPID if not provided on page"
    data-hashtag="optional hashtag for FB share, must INCLUDE prepended '#' character"
    data-hashtags="optional comma-separated-list of twitter hashtags, must EXCLUDE prepended '#'"
    data-via="optional twitter handle to connect to the share, must EXCLUDE prepended '@' character"
    data-related="optional comma-separated-list of additional twitter accounts to suggest for following"
>
<!--    Some Text, or Image     -->
</button>
```

## How to Use

Load the script and stylesheet onto your page, within your template, or via your custom control. You can do one or both of the following two things:

1. Create Your Own Custom Sharing Buttons
2. Create a Wrapper for Standard CBN Buttons to be Generated

### Creating Your Own Custom Sharing Buttons

For accessibility purposes, it is best practice to use the semantic `<button>` element and style it to suit your needs. On the outermost clickable element that comprises your custom button, you must define at least one `data` attribute: `data-social`.

#### Required Data Attribute - `data-social`

`data-social` should include one of three values, corresponding with the type of share you wish to make:

 * data-social="facebook"
 * data-social="twitter"
 * data-social="email"

This communicates to the `cbnShare API` what type of sharing action will be called. Any other values will be ignored and an error will be logged to the console.

#### Optional Data Attributes

If you are fine with the setup in the metadata, no other data attributes will be necessary. Otherwise, refer to [Prioritizing Data In Social Shares](#markdown-header-prioritizing-data-in-social-shares)

### Creating A Wrapper for Sharing Buttons

This is the easiest way to programmatically include sharing buttons on a page or within a template.

Whereever you want sharing buttons to appear on a page, simply create a block-level container and add the following **REQUIRED** data attributes:

 * data-social-icons="wrapper"
 * data-generated="false"
 * data-buttons="JSON-encoded Object"

The first two attributes should appear just as provided above, the third attribute is where all the magic happens.

#### JSON-encoded `data-buttons` Object

The `data-buttons` attribute will be parsed to generate the social sharing icons. At the minimum, it should include the following information:

```javascript
const buttons = { 
    facebook : OBJECT, 
    twitter : OBJECT, 
    email: OBJECT,
}
```
Each of the three keys, `facebook`, `twitter`, `email`, should be included only if you intend that button to be generated. That means you can include only `facebook`, or only `twitter`, or just `facebook` and `email`, or any combination of the three.

For each key, you must include pass in at least an empty object. If the object is empty, then the page will use default values as discussed previously.

For example, the following is a valid data-structure.

```javascript
const buttons = { 
    facebook : {}, 
    twitter : {}, 
    email: {},
}
```

For each of the keys above, you can pass in sharing attributes within the provided object. 


Thus would produce three buttons with `data` attributes matching the respective object:

```javascript
const buttons = { 
    facebook: { 
        hashtag: "#CBNNewsAlert", 
        text: "Something catchy and important" 
    }, 
    twitter: { 
        via: "CBNNews"
    }, 
    email: { 
        subject: "Do not miss this major CBN News Alert", 
        text: "I think you will find this resource invaluable: "
    }
}
```

##### HTML Example

```html
<div 
    data-generated="false"
    data-social-icons="wrapper" 
    data-buttons='{"facebook":{"text":"Something catchy and important","hashtag":"#CBNNewsAlert"},"twitter":{"via":"CBNNews"},"email":{"subject":"Do not miss this major CBN News Alert","text":"I think you will find this resource invaluable: "}}'
></div>
```

#### Differing Standard Button Types

The final data-attribute that can be added to the sharing container is `data-button-type`. This takes one of three values:

 * icons-only : Will only generate the Icons of the Sharing Media themselves.
 * text-only : Will only generate a text representation, such as "Share", "Tweet", or "Email"
 * default : This will be the value if not provided.

##### HTML Example

```html
<div 
    data-generated="false"
    data-social-icons="wrapper" 
    data-button-type="icons-only"
    data-buttons='{"facebook":{},"twitter":{},"email":{}}'
></div>
```

### Loading Buttons or Button Containers Dynamically

```javascript
cbnSharingClient.load()
```

With any type of asynchronously loading or dynamic rendering of html, there is a need to both generate buttons and attach listeners asynchronously. This is very simple and easy to do.

The **Client** exposes a method on the window that can be called in response to dynamic loading. Once the elements attached to the DOM (even if they are hidden), you can call `cbnSharingClient.load()` and icons will be generated where applicable and listeners attached as well.