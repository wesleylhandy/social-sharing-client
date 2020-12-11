!(function (global) {
  class SocialShareClient {
    constructor() {
      this.buttons = null;
      this.appId = null;
      this.ogUrl = null;
      this.twitterUrl = null;
      this.title = null;
      this.canonical = null;
      this.facebookSVG = `data:image/svg+xml;base64,${btoa(
        '<svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="-268 359.6 39.7 39.8" style="enable-background:new -268 359.6 39.7 39.8" xml:space="preserve"><style>.st0{fill:#3c5a99}.st1{fill:#fff}</style><path class="st0" d="M-230.5,359.6h-35.3c-1.2,0-2.2,1-2.2,2.2v35.3c0,1.2,1,2.2,2.2,2.2h19V384h-5.2v-6h5.2v-4.4c0-5.1,3.2-7.9,7.7-7.9c2.2,0,4.1,0.2,4.6,0.2v5.3h-3.2c-2.5,0-3,1.2-3,2.9v3.8h5.9l-0.7,6h-5.2v15.4h10.1c1.2,0,2.2-1,2.2-2.2v-35.4C-228.3,360.6-229.3,359.6-230.5,359.6z"/><path class="st1" d="M-235.4,384l0.7-6h-5.9v-3.8c0-1.7,0.5-2.9,3-2.9h3.2v-5.3c-0.5-0.1-2.5-0.2-4.6-0.2c-4.6,0-7.7,2.8-7.7,7.9v4.4h-5.2v6h5.2v15.4h6.2V384H-235.4z"/></svg>'
      )}`;
      this.twitterSVG = `data:image/svg+xml;base64,${btoa(
        '<svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="-260 360.1 39.7 32.2" style="enable-background:new -260 360.1 39.7 32.2" xml:space="preserve"><style>.st0{fill:#09a3d4}</style><path class="st0" d="M-220.3,363.9c-1.5,0.7-3,1.1-4.7,1.3c1.7-1,3-2.6,3.6-4.5c-1.6,1-3.3,1.6-5.2,2c-1.5-1.6-3.6-2.6-5.9-2.6c-4.5,0-8.2,3.6-8.2,8.1c0,0.6,0.1,1.2,0.2,1.9c-6.8-0.4-12.8-3.6-16.8-8.5c-0.7,1.2-1.1,2.6-1.1,4.1c0,2.8,1.5,5.3,3.6,6.8c-1.3,0-2.6-0.4-3.7-1v0.1c0,3.9,2.8,7.3,6.5,8c-0.7,0.2-1.4,0.3-2.2,0.3c-0.5,0-1,0-1.5-0.1c1,3.2,4,5.6,7.6,5.7c-2.7,2.2-6.3,3.5-10.1,3.5c-0.7,0-1.3,0-1.9-0.1c3.6,2.3,7.9,3.7,12.5,3.7c15,0,23.2-12.4,23.2-23.2l0-1.1C-222.8,367-221.4,365.5-220.3,363.9z"/></svg>'
      )}`;
      this.twitterWhiteSVG = `data:image/svg+xml;base64,${btoa(
        '<svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="89.8px" height="72.9px" viewBox="0 0 89.8 72.9" style="enable-background:new 0 0 89.8 72.9" xml:space="preserve"><style></style><path d="M89.8,8.6c-3.3,1.5-6.8,2.5-10.6,2.9c3.8-2.3,6.7-5.9,8.1-10.2C83.7,3.5,79.8,5,75.6,5.8 C72.2,2.2,67.5,0,62.2,0C52,0,43.7,8.2,43.7,18.4c0,1.4,0.2,2.8,0.5,4.2c-15.3-0.8-28.9-8.1-38-19.2c-1.6,2.7-2.5,5.9-2.5,9.3 c0,6.4,3.3,12,8.2,15.3c-3-0.1-5.9-0.9-8.3-2.3v0.2c0,8.9,6.4,16.4,14.8,18.1c-1.5,0.4-3.2,0.6-4.9,0.6c-1.2,0-2.3-0.1-3.5-0.3 c2.3,7.3,9.1,12.6,17.2,12.8C21,62,13,64.9,4.4,64.9c-1.5,0-3-0.1-4.4-0.3c8.2,5.2,17.8,8.3,28.2,8.3c33.9,0,52.4-28.1,52.4-52.4 l-0.1-2.4C84.2,15.6,87.3,12.3,89.8,8.6z" style="fill:#fff"/></svg>'
      )}`;
      this.emailSVG = `data:image/svg+xml;base64,${btoa(
        '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" id="Layer_1" x="0px" y="0px" viewBox="-251 359.8 37.8 26.5" style="enable-background:new -251 359.8 37.8 26.5" xml:space="preserve"><style>.st0{fill:#c7c9ca}</style><path class="st0" d="M-248,361.3l13.6,10.8c0.6,0.5,1.5,0.7,2.3,0.7c0.8,0,1.7-0.2,2.3-0.7l13.6-10.8c1.1-0.8,0.8-1.5-0.6-1.5   h-15.3h-15.4C-248.9,359.8-249.1,360.5-248,361.3z"/><path class="st0" d="M-215.2,364.2l-14.9,11.3c-0.6,0.4-1.3,0.6-2,0.6c-0.7,0-1.4-0.2-2-0.6l-14.9-11.3c-1.1-0.8-2-0.4-2,1v18.5   c0,1.4,1.1,2.5,2.5,2.5h16.4h16.4c1.4,0,2.5-1.1,2.5-2.5v-18.5C-213.2,363.8-214.1,363.4-215.2,364.2z"/></svg>'
      )}`;
      this.emailWhiteSVG = `data:image/svg+xml;base64,${btoa(
        '<svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="107.4px" height="75.2px" viewBox="0 0 107.4 75.2" style="enable-background:new 0 0 107.4 75.2" xml:space="preserve"><style>.st3{fill:#fff}</style><path class="st3" d="M8.5,4.4l38.7,30.6c1.8,1.4,4.2,2,6.5,1.9c2.3,0.1,4.8-0.5,6.5-1.9L98.9,4.4C102,2,101.3,0,97.3,0H53.7H10 C6.1,0,5.4,2,8.5,4.4z"/><path class="st3" d="M101.7,12.5L59.4,44.6c-1.6,1.2-3.7,1.8-5.7,1.7c-2.1,0-4.1-0.6-5.7-1.7L5.7,12.5C2.6,10.1,0,11.4,0,15.4V68 c0,3.9,3.2,7.2,7.2,7.2h46.5h46.5c3.9,0,7.2-3.2,7.2-7.2V15.4C107.4,11.4,104.8,10.1,101.7,12.5z"/></svg>'
      )}`;
      this.handleSharingButtonClick = this.handleSharingButtonClick.bind(this);
    }

    /**
     * Internal Function called on Load to grab metadata and add event listeners
     */
    init() {
      // https://developers.facebook.com/docs/sharing/webmasters/getting-started/versioned-link/
      // https://developer.twitter.com/en/docs/tweets/optimize-with-cards/overview/markup
      const appIdMeta = document.querySelector("[property='fb:app_id']");
      const ogUrlMeta = document.querySelector("[property='og:url']");
      const twitterUrlMeta = document.querySelector("[property='twitter:url']");
      const title = document.querySelector('title');
      const canonical = document.querySelector("[rel='canonical']");

      this.twitterUrl =
        twitterUrlMeta && twitterUrlMeta.getAttribute('content');
      this.ogUrl = ogUrlMeta && ogUrlMeta.getAttribute('content');
      this.appId = appIdMeta && appIdMeta.getAttribute('content');
      this.title = title && title.textContent;
      // canonical links can be relative but href attribute returns the entire URL
      this.canonical = canonical && canonical.href;
      this.generateSharingButtons();
      this.addClickListenerToButtons();
    }

    /**
     * window.SocialShareClient.load()
     * Function to called after sharing buttons are added to the DOM dynamically
     */
    load() {
      this.generateSharingButtons();
      this.addClickListenerToButtons();
    }

    /**
     * Internal Function to add listeners to buttons with data-social attribute
     */
    addClickListenerToButtons() {
      // get all buttons with defined data-social attribute
      this.buttons = document.querySelectorAll('[data-social]');
      // add event listeners
      this.buttons.forEach((btn) =>
        btn.addEventListener('click', this.handleSharingButtonClick, true)
      );
    }

    /**
     * Click Event Listener to grab data from elements and pass to socialShare API
     *
     * Expected:
     *   <button
     *       data-social="facebook|twitter|email"
     *       data-url="optional url to be shared"
     *       data-text="optional text for body of share/tweet/email"
     *       data-subject="optional title for the subject of email, if email"
     *       data-app-id="optional FB APPID if not provided on page"
     *       data-hashtag="optional hashtag for FB share, must INCLUDE prepended '#' character"
     *       data-hashtags="optional comma-separated-list of twitter hashtags, must EXCLUDE prepended '#'"
     *       data-via="optional twitter handle to connect to the share, must EXCLUDE prepended '@' character"
     *       data-related="optional comma-separated-list of additional twitter accounts to suggest for following"
     *   \>\</button>
     *
     *   https://developer.twitter.com/en/docs/twitter-for-websites/tweet-button/guides/web-intent
     *   https://developers.facebook.com/docs/sharing/reference/share-dialog
     *
     *   @param {Event} e - click event on the button
     */
    handleSharingButtonClick(e) {
      e.preventDefault();
      const dataset = e.currentTarget.dataset;
      const social = dataset.social || '';
      const sharingObj = {};
      switch (social.toLowerCase()) {
        case 'facebook':
          sharingObj.service = 'facebook';
          sharingObj.appId = dataset.appId || this.appId;
          sharingObj.url = dataset.url || this.ogUrl || window.location.href;
          sharingObj.text = dataset.text || '';
          sharingObj.hashtag = dataset.hashtag || '';
          break;
        case 'twitter':
          sharingObj.service = 'twitter';
          sharingObj.url =
            dataset.url ||
            this.twitterUrl ||
            this.canonical ||
            window.location.href;
          sharingObj.text = dataset.text || this.title || '';
          sharingObj.hashtags = dataset.hashtags || '';
          sharingObj.via = dataset.via || '';
          sharingObj.related = dataset.related || '';
          break;
        case 'email':
          sharingObj.service = 'email';
          sharingObj.title =
            dataset.subject || 'I found this resource to share with you!';
          sharingObj.url =
            dataset.url || this.canonical || window.location.href;
          sharingObj.text =
            dataset.text || `Here's the link for ${this.title}: `;
          break;
        default:
          console.error('Invalid Service Type');
          break;
      }
      for (const key in sharingObj) {
        if (!sharingObj[key]) {
          delete sharingObj[key];
        }
      }
      if (typeof socialShare === 'function') {
        // consider adding tracking call
        socialShare(sharingObj)
          .then(() => {
            console.log(`Shared to ${social}`);
            try {
              // social Tracking Function for SHARING KPIs
              // add tracking function
            } catch (err) {
              console.error('Unable to Call Tracking Function');
              console.error(err);
            }
          })
          .catch((err) => console.error(err));
      } else {
        // consider an alert here to DOM
        console.error('socialShare is not defined');
      }
    }

    /**
     * Internal Function to Generate Sharing Buttons and Images Where Indicated
     *
     * Expected:
     *   <div
     *       data-social-icons="wrapper"
     *       data-generated="false"
     *       data-button-type="icons-only|text-only|default"
     *       data-buttons="JSON-encoded object"
     *   \>\</div>
     *
     * Example data-buttons:
     *   data-buttons='{"sharing":{"url":"","label":""},"facebook":{"appId":"","url":"","text":"","hashtag":"","text":""},"twitter":{"text":"","url":"","hashtags":"","via":"","related":""},"email":{"title": "", "text": "", "url": ""}}'
     */
    generateSharingButtons() {
      const socialWrappers = document.querySelectorAll(
        "[data-social-icons='wrapper']"
      );
      socialWrappers.forEach((wrapper, wrapperIdx) => {
        const dataset = wrapper.dataset;
        // only load buttons once using generated dataset
        const generated = dataset.generated;
        // add support multiple button styles
        const buttonType = dataset.buttonType;
        if (generated.toString() !== 'true') {
          // JSON.stringify({ facebook: { appId: "", url: "", hashtag: "", text: "" }, twitter: { text: "", url: "", hashtags: "", via: "", related: "" }, email: { title: "", text: "" url: ""}})
          // data-buttons='{"facebook":{"appId":"","url":"","text":"","hashtag":"","text":""},"twitter":{"text":"","url":"","hashtags":"","via":"","related":""},"email":{"title": "", "text": "", "url": ""}}'
          const socialButtons = dataset.buttons
            ? JSON.parse(dataset.buttons)
            : {};
          Object.keys(socialButtons).forEach((socialBtn, socialBtnIdx) => {
            const social = socialBtn.toLowerCase();
            const dataset =
              Object.keys(socialButtons).length > 0
                ? socialButtons[social]
                : {};
            if (social === 'sharing') {
              const shareCount = this.generateShareCount({
                dataset,
                id: `share_count-${wrapperIdx}-${socialBtnIdx}`,
              });
              wrapper.appendChild(shareCount);
            } else {
              const btn = this.generateSharingButton({
                social,
                dataset,
                buttonType,
              });

              wrapper.appendChild(btn);
            }
          });
          dataset.generated = true;
        }
      });
    }

    /**
     * Internal function to generate share counts on a given page
     * @param {Object} param0 - An Object used to generate the share count
     * @param {Object} param0.dataset - values passed to configuration object for sharing
     * @param {String} param0.id - specific id for the like display container
     * @return {String} shareCount -  the textContent for Sharing div
     */
    generateShareCount({ dataset, id }) {
      const shareCount = document.createElement('div');
      shareCount.id = id;
      const sharingUrl =
        dataset.url || this.ogUrl || this.canonical || window.location.href;
      this.getFacebookEngagement(sharingUrl)
        .then((engagement) => {
          console.log(engagement);
          if (engagement && engagement.share_count > 9) {
            shareCount.classList.add('share-count');
            const countValue = document.createElement('div');
            countValue.classList.add('count-value');
            const countLabel = document.createElement('div');
            countLabel.classList.add('count-label');
            countLabel.textContent = dataset.label || 'shares';
            shareCount.appendChild(countValue);
            shareCount.appendChild(countLabel);
            this.animateShareCount({ shareCount: engagement.share_count, id });
          }
        })
        .catch((err) => {
          console.error(err);
          // add tracking function
        });
      return shareCount;
    }

    /**
     * Internal function to recursively animate the share count
     * @param {Object} param0 - An Object used to animate share count
     * @param {Number} param0.shareCount - number received from graph api
     * @param {String} param0.id - specific id for the like display container
     */
    animateShareCount({ shareCount, id }) {
      const countValue = document.querySelector(`#${id} > .count-value`);
      const totalTime = 1500;
      let start = null;

      const formatShareCount = (count) => {
        let shareText = '';

        if (count > 999) {
          const thousandths = Math.floor(count / 1000);
          const remainder = count % 1000;
          const hundredths = Math.floor(remainder / 100);
          shareText = thousandths + '.' + hundredths + 'K';
        } else {
          shareText = parseInt(count);
        }

        return shareText;
      };

      /**
       * Private recursive function scoped to Animate Share Count that calls RAF to update UI with new value
       * @param {Number} time
       */
      const animate = (time) => {
        start = start ? start : time;
        const timeProgress = (time - start) / totalTime;

        if (timeProgress <= 1) {
          const multiplier = Math.sin((timeProgress * Math.PI) / 2.0);
          const shareText = formatShareCount(shareCount * multiplier);
          countValue.textContent = shareText;
          window.requestAnimationFrame(animate);
        } else {
          // in case animate stops short of final count, update to final count
          if (countValue.textContent != shareCount) {
            countValue.textContent = formatShareCount(shareCount);
          }
        }
      };

      window.requestAnimationFrame(animate);
    }

    /**
     * Function that creates a social sharing button based on parameters
     *
     * @param {Object} param0 - An Object used to build an HTMLButtonElement
     * @param {String} param0.social - One of Either "facebook", "twitter", "email"
     * @param {Object} param0.dataset - An object containing data to be mapped to the completed button
     * @param {String} param0.buttonType - One of Either "icons-only", "text-only", "default"
     * @return {HTMLButtonElement}
     */
    generateSharingButton({ social, dataset, buttonType }) {
      // for accessibility, semantic element of button should be used here
      const btn = document.createElement('button');

      btn.setAttribute('role', 'button');
      btn.dataset.social = social; // social will be name of service
      btn.dataset.generated = true;
      btn.setAttribute('aria-label', `Share via ${social}`);
      btn.setAttribute('tabindex', '0');
      btn.classList.add('social', 'button', social);

      // map keys to dataset on button
      Object.keys(dataset).forEach((key) => {
        if (dataset[key]) {
          btn.dataset[key] = dataset[key];
        }
      });

      let img = null;
      switch (buttonType) {
        case 'icons-only':
          btn.classList.add('icons');
          img = document.createElement('img');
          img.setAttribute('height', 30);
          img.setAttribute('width', 30);
          img.src = this[`${social}SVG`];
          break;
        case 'text-only':
          // no image
          break;
        default:
          img = document.createElement('img');
          img.setAttribute('height', 22);
          img.setAttribute('width', 22);
          img.src =
            social === 'facebook'
              ? this[`${social}SVG`]
              : this[`${social}WhiteSVG`];
          break;
      }
      if (img) {
        img.setAttribute('loading', 'lazy');
        img.alt = `Share via ${social}`;
        btn.appendChild(img);
      }
      if (buttonType !== 'icons-only') {
        const span = document.createElement('span');
        switch (social) {
          case 'facebook':
            span.textContent =
              buttonType === 'text-only' ? 'Facebook' : 'Share';
            break;
          case 'twitter':
            span.textContent = buttonType === 'text-only' ? 'Twitter' : 'Tweet';
            break;
          case 'email':
            span.textContent = buttonType === 'text-only' ? 'Email' : 'Email';
            break;
          default:
            console.error('Invalid Share Request');
            break;
        }
        btn.appendChild(span);
      }
      return btn;
    }

    // TO DO: Create Serverless Function to handle FB Engagment API
    getFacebookEngagement(sharingUrl) {
      return new Promise((resolve, reject) =>
        fetch(
          '' +
            encodeURIComponent(sharingUrl),
          { mode: 'cors' }
        )
          .then((res) => {
            if (res.status >= 200 && res.status < 300) {
              return res.json();
            } else {
              return {
                error: { message: 'Invalid Internal API Response' },
              };
            }
          })
          .then((res) => {
            if (res.error) {
              reject(res.error.message);
            } else {
              resolve(res.engagement);
            }
          })
      );
    }
  }

  if (typeof global.socialShareClient !== SocialShareClient) {
    // add this class to the global scope so it can be called from the DOM
    global.socialShareClient = new SocialShareClient();
  }

  // check document.readyState to support asynchronous loading of this script
  switch (document.readyState) {
    case 'loading':
      document.addEventListener('DOMContentLoaded', initSharingClient);
      break;
    default:
      initSharingClient();
      break;
  }

  function initSharingClient() {
    try {
      socialShareClient.init();
    } catch (err) {
      console.error('Unable to Initialize SocialShareClient');
      console.error(err);
    }
  }
})(globalThis || window);
