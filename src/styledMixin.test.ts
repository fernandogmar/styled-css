import { test } from 'zora';
import { CSSResult, CSSResultGroup, css, unsafeCSS } from 'lit';
import { styledMixin, styledClass } from './index.js'; // adjust path if needed


test('the returned function applies options and passes selector to template', (t) => {
  const mixColor = styledMixin<{color: string}>((cls, { color }) => css`${cls} { color: ${color}; }`);
  const mixSize = styledMixin<{size: string}>((cls, { size }) => css`${cls} { font-size: ${size}; }`);

  const buttonStyle: CSSResult[] = styledClass('button', [
    mixColor({color: 'red'}),
    mixSize(({size: '12px'}))
  ]);
  t.equal(buttonStyle[0].cssText, '.button { color: red; }', 'setting color red to class .button');
  t.equal(buttonStyle[1].cssText, '.button { font-size: 12px; }', 'setting size 12px to class .button');
});



