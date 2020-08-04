// THIS NEEDS A LOT OF WORK!

const {
  screen,
  getQueriesForElement,
  fireEvent,
  waitFor,
} = require('@testing-library/dom');
const fromHTML = require('from-html/lib/from-html');

class DOM {
  constructor() {
    fromHTML(
      `
                <div class="container" data-testid="Container" ref="container">
                    <div
                        data-generated="false"
                        data-social-icons="wrapper"
                        data-button-type="default"
                        data-testid="SocialIconsWrapper"
                        data-buttons='{"facebook":{},"twitter":{},"email":{}}'
                        ref="wrapper"
                    ></div>
                </div>
            `,
      this,
      'refs'
    );
  }
  mount(target) {
    target.append(this.refs.container);
  }
}

// from-html-testing-library
function render(FromHtmlClass) {
  const instance = new FromHtmlClass();
  const container = document.createElement('div');
  instance.mount(container);
  return {
    container,
    instance,
    ...getQueriesForElement(container),
  };
}

describe(`CBNShareClient`, () => {
  it(`loads without error`, () => {
    const { queryByTestId, container } = render(DOM);
    expect(queryByTestId('SocialIconsWrapper')).toBeTruthy();
    console.log(container.innerHTML);
  });
});
