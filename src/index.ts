import { css, CSSResult, unsafeCSS } from 'lit';

// StyledClass type (unchanged)
export type StyledClass = CSSResult[] & { className: string };

// Generic template type, T represents the options object
export type StyledTemplate<T extends Record<string, CSSResult> = {}> =
  (cls: CSSResult, options: T) => CSSResult;

export type StyledTemplateNoOptions = (cls: CSSResult) => CSSResult;

// --- styledClass ---
export function styledClass(
  className: string,
  templateFn: StyledTemplateNoOptions | StyledTemplateNoOptions[]
) {
  const fns = Array.isArray(templateFn) ? templateFn : [templateFn];

  const classSelector = toClsSelector(className);
  const style = fns.map(fn => fn(classSelector)) as StyledClass;
  style.className = removeLeadingDot(className);
  return style;
}

// --- styledGroup ---
export type StyledGroup<TProps extends Record<string, StyledClass>> = 
  StyledClass[] & { [K in keyof TProps]: StyledClass['className'] };

  export function styledGroup<TProps extends Record<string, StyledClass>>(
    group: TProps
  ) {
    const styles = Object.values(group) as StyledGroup<TProps>;
    for (const key in group) {
      styles[key] = group[key].className as any;
    }
  
    return styles;
  }
  

// --- styledMixin ---
export function styledMixin<T extends Record<string, string | number>>(
  templateFn: StyledTemplate<{ [K in keyof T]: CSSResult }>
) {
  return (options: T) => (cls: CSSResult | string) => {
    const styledOptions = Object.fromEntries(
      Object.entries(options).map(([key, value]) => [key, unsafeCSS(value)])
    ) as {[K in keyof T]: CSSResult };

    return templateFn(toClsSelector(cls), styledOptions);
  };
}

// --- helpers ---
function toClsSelector(className: CSSResult | string) {
  return className instanceof CSSResult ? className : unsafeCSS(`.${removeLeadingDot(className)}`);
}

function removeLeadingDot(value: string): string {
  return value.replace(/^\./, '');
}
