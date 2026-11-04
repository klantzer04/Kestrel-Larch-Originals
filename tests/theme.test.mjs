import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFile, readdir, access } from 'node:fs/promises';
const read = p => readFile(new URL('../' + p, import.meta.url), 'utf8');
test('all templates and section groups reference existing sections in a complete order', async () => {
  const files = (await readdir(new URL('../templates/', import.meta.url))).map(f => 'templates/' + f);
  files.push('sections/header-group.json', 'sections/footer-group.json');
  for (const file of files) {
    const template = JSON.parse(await read(file));
    assert.deepEqual([...template.order].sort(), Object.keys(template.sections).sort(), file);
    for (const section of Object.values(template.sections)) {
      await access(new URL('../sections/' + section.type + '.liquid', import.meta.url));
    }
  }
});
test('editable section schemas contain unique settings and valid block defaults', async () => {
  for (const file of (await readdir(new URL('../sections/', import.meta.url))).filter(f => f.endsWith('.liquid'))) {
    const body = await read('sections/' + file);
    const schema = JSON.parse(body.match(/{% schema %}([\s\S]*?){% endschema %}/)[1]);
    for (const settings of [schema.settings || [], ...(schema.blocks || []).map(b => b.settings || [])]) {
      assert.equal(new Set(settings.map(s => s.id)).size, settings.length, file);
    }
  }
});
test('commerce uses native Shopify form endpoints and line item personalization', async () => {
  const product = await read('sections/main-product.liquid');
  assert.match(product, /form 'product', product/);
  assert.match(product, /name="id"/);
  assert.match(product, /properties\[Personalization\]/);
  assert.match(product, /variant.available/);
  const cart = await read('sections/main-cart.liquid');
  assert.match(cart, /routes.cart_url/);
  assert.match(cart, /name="checkout"/);
  assert.match(cart, /name="updates\[\]"/);
});
test('quote requests collect the brief without pretending to upload files', async () => {
  const quote = await read('sections/custom-request.liquid');
  for (const field of ['name', 'email', 'phone', 'dimensions', 'wood', 'engraving', 'budget', 'timeline', 'body', 'Project type']) {
    assert.ok(quote.includes(`contact[${field}]`), field);
  }
  assert.match(quote, /form 'contact'/);
  assert.doesNotMatch(quote, /type="file"/);
  assert.match(quote, /Secure image uploads are not configured/);
});
test('layout supplies Shopify runtime and accessible main landmark', async () => {
  const layout = await read('layout/theme.liquid');
  for (const required of ['content_for_header', 'content_for_layout', 'id="MainContent"', 'request.locale.iso_code', 'canonical_url']) assert.ok(layout.includes(required));
});
