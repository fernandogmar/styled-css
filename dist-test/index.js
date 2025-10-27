import { css } from 'lit';
export function styledClass(styles, ...values) {
    const cssResult = typeof styles === 'object' && 'cssText' in styles
        ? styles
        : css(styles, ...values);
    const className = `styled-${generateHash(cssResult.cssText)}`;
    injectStyles(className, cssResult.cssText);
    return className;
}
export function styledElement(tagName, styles, ...values) {
    const cssResult = typeof styles === 'object' && 'cssText' in styles
        ? styles
        : css(styles, ...values);
    const className = `styled-${tagName}-${generateHash(cssResult.cssText)}`;
    injectStyles(className, cssResult.cssText, tagName);
    return className;
}
export function styledMixin(styles, ...values) {
    if (typeof styles === 'object' && 'cssText' in styles) {
        return styles;
    }
    return css(styles, ...values);
}
function generateHash(str) {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
        const char = str.charCodeAt(i);
        hash = ((hash << 5) - hash) + char;
        hash = hash & hash;
    }
    return Math.abs(hash).toString(36);
}
function injectStyles(className, cssText, tagName) {
    if (typeof document === 'undefined') {
        return;
    }
    const styleId = `styled-css-${className}`;
    if (document.getElementById(styleId)) {
        return;
    }
    const styleElement = document.createElement('style');
    styleElement.id = styleId;
    const selector = tagName ? `${tagName}.${className}` : `.${className}`;
    styleElement.textContent = `${selector} { ${cssText} }`;
    document.head.appendChild(styleElement);
}
//# sourceMappingURL=index.js.map