import { test } from 'zora';
import { CSSResult, css } from 'lit';
import { styledClass } from './index.js';

test('styledClass creates a CSSResult using the provided class name', (t) => {
  const style = styledClass('button', (cls) =>
    css`${cls} { color: red; }`
  );

  t.equal(style.length, 1, 'returns one CSSResult');
  t.ok(style[0].cssText.includes('.button'), 'uses class selector');
  t.ok(style[0].cssText.includes('color: red'), 'contains styles');
});

test('styledClass sets className without a leading dot', (t) => {
  const style = styledClass('.button', (cls) =>
    css`${cls} { color: blue; }`
  );

  t.equal(style.className, 'button', 'className is cleaned');
});

test('styledClass supports multiple template functions', (t) => {
  const style = styledClass('card', [
    (cls) => css`${cls} { padding: 8px; }`,
    (cls) => css`${cls} { border: 1px solid black; }`,
  ]);

  t.equal(style.length, 2, 'returns multiple CSSResults');
  t.ok(style[0].cssText.includes('.card { padding: 8px; }'), 'first template uses class');
  t.ok(style[1].cssText.includes('.card { border: 1px solid black; }'), 'second template uses class');
});

test('styledClass returns an array with a className property', (t) => {
  const style = styledClass('alert', (cls) =>
    css`${cls} { background: yellow; }`
  );

  t.ok(Array.isArray(style), 'result is an array');
  t.equal(style.className, 'alert', 'className is exposed');
});

test('styledClass passes a selector into the template function', (t) => {
  let receivedSelector: CSSResult;

  styledClass('test', (cls) => {
    receivedSelector = cls;
    t.equal(receivedSelector.cssText, '.test', 'template received a selector');
    return css``;
  });
 
});
