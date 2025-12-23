# styled-css

![npm](https://img.shields.io/npm/v/styled-css)
![license](https://img.shields.io/npm/l/styled-css)
![downloads](https://img.shields.io/npm/dt/styled-css)

**styled-css** is a **lightweight, powerful library for writing maintainable CSS-in-JS for Lit**. Write real CSS, keep IDE support, and reuse styles effortlessly.

---

## 🚀 Why styled-css?

- **Small and simple**: Just a few helpers to organize your styles.
- **IDE-friendly**: Keep full CSS support and autocompletion.
- **Reusable**: Single source of truth for your classes and styles.
- **Incremental adoption**: Mix with existing CSS and Lit components.
- **Maintainable**: Easily remove dead code and reuse mixins.

---

## ⚡ Quick Start

### Install
```bash
npm install styled-css
```

### Define Styles
```ts
import { css } from 'lit';
import { styledClass, styledGroup, styledMixin } from 'styled-css';

const mixColor = styledMixin<{ color: string }>(
  (cls, { color }) => css`
    ${cls} {
      color: ${color};
    }
  `
);

export const buttonStyles = styledGroup({
  default: styledClass('button-default', [
    (cls) => css`
      ${cls} {
        border: 1px solid gray;
        padding: 0.5rem 1rem;
      }
    `,
    mixColor({ color: 'black' }),
  ]),
  primary: styledClass('button-primary', [
    (cls) => css`
      ${cls} {
        border: 1px solid blue;
        padding: 0.5rem 1rem;
      }
    `,
    mixColor({ color: 'blue' }),
  ]),
});
```

### Use in a Lit Component
```ts
import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { buttonStyles } from './button-styles';

@customElement('my-button')
export class MyButtonElement extends LitElement {
  static styles = [buttonStyles];

  @property({ type: String }) label = 'Button';
  @property({ type: String }) variant?: 'default' | 'primary';

  render() {
    const cls = buttonStyles[this.variant ?? 'default'];
    return html`<button class=${cls}>${this.label}</button>`;
  }
}
```

---

## ✨ Keywords
```
lit, css, styled, web-components, typescript
```

---

## 📜 License
MIT

