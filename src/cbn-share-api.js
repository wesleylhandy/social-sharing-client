!(function (global) {
  const serviceDefaults = {
    facebook: {
      appId: '1502252596761352',
      autoLogAppEvents: true,
      xfbml: true,
      version: 'v5.0',
    },
    twitter: {
      text: '',
      url: '',
      hashtags: '',
      via: 'CBNonline',
    },
    email: {
      subject: '',
      body: '',
      url: '',
    },
  };

  const facebookShare = (options, resolve, reject) => {
    const share = () => {
      try {
        FB.ui(
          {
            method: 'share',
            href: options.url,
            hashtag: options.hashtag || '',
            quote: options.text || '',
          },
          (response) => {
            if (response && !response.error_message) {
              resolve();
            } else if (response && response.error_message) {
              reject(`Facebook SDK: ${response.error_message}`);
            } else {
              reject('Unable to share via Facebook SDK');
            }
          }
        );
      } catch (error) {
        reject(`Facebook SDK share error occured: ${error}`);
      }
    };

    if (!global.FB) {
      if (!global.fbAsyncInit) {
        global.fbAsyncInit = () => {
          try {
            FB.init(Object.assign({}, serviceDefaults.facebook, options));
            FB.AppEvents.logPageView();

            share();
          } catch (error) {
            reject(error);
          }
        };
      } else {
        const currentFbAsyncInit = global.fbAsyncInit;
        global.fbAsyncInit = () => {
          try {
            currentFbAsyncInit();
            share();
          } catch (error) {
            reject(error);
          }
        };
      }

      const body = document.querySelector('body');
      const currentFBLibraryScript = document.querySelector(
        'script[src="https://connect.facebook.net/en_US/sdk.js"]'
      );
      if (!currentFBLibraryScript) {
        const fbScript = document.createElement('script');
        fbScript.src = 'https://connect.facebook.net/en_US/sdk.js';
        fbScript.async = true;
        body.appendChild(fbScript);
      }
    } else if (global.FB && global.FB.ui) {
      share();
    } else {
      reject(
        'A Facebook SDK library was loaded but a sharing interface was not detected'
      );
    }
  };

  const twitterShare = (options, resolve, reject) => {
    const defaults = Object.assign({}, serviceDefaults.twitter);
    Object.keys(defaults).forEach((key) => {
      defaults[key] = options[key] || defaults[key];
    });

    const parameters = new URLSearchParams(defaults);
    const windowProxy = window.open(
      `https://twitter.com/intent/tweet?${parameters.toString()}`
    );

    if (windowProxy) {
      resolve();
    } else {
      reject('Was unable to open Twitter web intent');
    }
  };

  const emailShare = (options, resolve, reject) => {
    const defaults = Object.assign({}, serviceDefaults.email, {
      subject: options.title,
      body: options.text,
      url: options.url,
    });

    const bodyString = defaults.body + ' ' + defaults.url;
    const mailtoURL =
      'mailto:?subject=' +
      encodeURIComponent(defaults.subject) +
      '&body=' +
      encodeURIComponent(bodyString);

    const windowProxy = window.open(mailtoURL);

    if (windowProxy) {
      resolve();
    } else {
      reject("Was unable to send email message through user's mail client");
    }
  };

  global.cbnShare = function (options) {
    return new Promise((resolve, reject) => {
      switch (options.service) {
        case 'facebook':
          facebookShare(options, resolve, reject);
          break;

        case 'twitter':
          twitterShare(options, resolve, reject);
          break;

        case 'email':
          emailShare(options, resolve, reject);
          break;
        default:
          reject(`Service ${options.service} is not a valid sharing service`);
      }
    });
  };
})(globalThis || window);
