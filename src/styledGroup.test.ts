import { test } from 'zora';
import { css } from 'lit';
import { styledClass, styledGroup } from './index.js'; // adjust path if needed

test('styledGroup returns an array of styles', (t) => {
  const button = styledClass('button', (cls) =>
    css`${cls} { color: red; }`
  );
  const card = styledClass('card', (cls) =>
    css`${cls} { padding: 8px; }`
  );

  const styles = styledGroup({ button, card });

  t.ok(Array.isArray(styles), 'result is an array');
  t.equal(styles.length, 2, 'array contains all styles');
});

test('styledGroup exposes class names as properties', (t) => {
  const button = styledClass('button', (cls) =>
    css`${cls} { color: red; }`
  );
  const card = styledClass('card', (cls) =>
    css`${cls} { padding: 8px; }`
  );

  const styles = styledGroup({ button, card });

  t.equal(styles.button, 'button', 'button key maps to button className');
  t.equal(styles.card, 'card', 'card key maps to card className');
});

test('styledGroup array contains the same style objects', (t) => {
  const button = styledClass('button', (cls) =>
    css`${cls} { color: red; }`
  );
  const card = styledClass('card', (cls) =>
    css`${cls} { padding: 8px; }`
  );

  const styles = styledGroup({ button, card });

  t.equal(styles[0], button, 'first item is the button style');
  t.equal(styles[1], card, 'second item is the card style');
});

test('styledGroup preserves className values from styledClass', (t) => {
  const alert = styledClass('.alert', (cls) =>
    css`${cls} { background: yellow; }`
  );

  const styles = styledGroup({ alert });
  t.equal(styles.alert, 'alert', 'leading dot is removed');
});
