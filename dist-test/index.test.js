import { test } from 'zora';
import { css } from 'lit';
import { styledClass, styledElement, styledMixin } from './index.js';
test('styledClass generates unique class names', async (t) => {
    const className1 = styledClass `color: red;`;
    const className2 = styledClass `color: blue;`;
    t.ok(className1.startsWith('styled-'), 'className starts with styled-');
    t.ok(className2.startsWith('styled-'), 'className2 starts with styled-');
    t.ok(className1 !== className2, 'different styles generate different class names');
});
test('styledClass works with CSS template literal', async (t) => {
    const styles = css `
    background-color: yellow;
    padding: 10px;
  `;
    const className = styledClass(styles);
    t.ok(className.startsWith('styled-'), 'works with CSSResult');
    t.ok(typeof className === 'string', 'returns a string');
});
test('styledClass generates same class name for identical styles', async (t) => {
    const className1 = styledClass `font-size: 16px;`;
    const className2 = styledClass `font-size: 16px;`;
    t.equal(className1, className2, 'identical styles generate same class name');
});
test('styledElement generates class names with tag prefix', async (t) => {
    const className = styledElement('button', css `color: white;`);
    t.ok(className.startsWith('styled-button-'), 'includes tag name in class');
    t.ok(typeof className === 'string', 'returns a string');
});
test('styledElement works with template strings', async (t) => {
    const className1 = styledElement('div', css `margin: 20px;`);
    const className2 = styledElement('span', css `margin: 20px;`);
    t.ok(className1.includes('div'), 'div element class includes "div"');
    t.ok(className2.includes('span'), 'span element class includes "span"');
    t.ok(className1 !== className2, 'different tags generate different classes');
});
test('styledMixin returns CSSResult', async (t) => {
    const mixin = styledMixin `
    display: flex;
    align-items: center;
  `;
    t.ok('cssText' in mixin, 'returns object with cssText property');
    t.ok(typeof mixin.cssText === 'string', 'cssText is a string');
    t.ok(mixin.cssText.includes('display'), 'contains style declarations');
});
test('styledMixin passes through existing CSSResult', async (t) => {
    const originalStyles = css `border: 1px solid black;`;
    const mixin = styledMixin(originalStyles);
    t.equal(mixin, originalStyles, 'returns same CSSResult object');
});
test('styledMixin can be composed', async (t) => {
    const baseMixin = styledMixin `
    padding: 8px;
    margin: 4px;
  `;
    const composedStyles = css `
    ${baseMixin}
    color: green;
  `;
    t.ok(composedStyles.cssText.includes('padding'), 'mixin can be composed in css template');
    t.ok(composedStyles.cssText.includes('color'), 'composed styles include new declarations');
});
test('all methods handle interpolated values', async (t) => {
    const size = 24;
    const className = styledClass `
    color: purple;
    font-size: ${size}px;
  `;
    t.ok(typeof className === 'string', 'styledClass handles interpolation');
    const elementStyles = css `color: red;`;
    const elementClass = styledElement('p', elementStyles);
    t.ok(typeof elementClass === 'string', 'styledElement works with CSSResult');
    const mixin = styledMixin `font-size: ${size}px;`;
    t.ok('cssText' in mixin, 'styledMixin handles interpolation');
});
//# sourceMappingURL=index.test.js.map