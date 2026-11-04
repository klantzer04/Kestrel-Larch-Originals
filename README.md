# Kestrel Larch Originals

Shopify Online Store 2.0 theme, v0.1.0. Initial storefront foundation with an editable homepage, shared navigation and footer, product and collection pages, cart, About, Contact, FAQ, custom inquiry page, completed-project gallery, search, and 404 template.

## Preview locally

Requires Node.js 22.12+ (validated with Node 24), npm, and Shopify store access with theme permissions. Dependencies are development tools only; the storefront uses Liquid, CSS and vanilla JavaScript without a build pipeline.

```sh
cd /workspace/Kestrel-Larch-Originals
npm ci
npm test
npm run check
npm run dev -- --store your-store.myshopify.com
```

Shopify CLI will request authentication. Use a development store and review the development-theme preview printed by the CLI. Theme dev uploads to a development theme; it does not publish the live theme. Native catalog, cart, checkout and contact submission require a Shopify store; static file servers cannot render Liquid. No publish or payment-enable commands are part of setup. Do not publish or enable payments without the owner's approval.

## Configure in Shopify

A sample Shopify import file is provided at `sample-data/products.csv`. Its four products are unpublished drafts with zero inventory; prices are illustrative. Import into a development store only, review the import preview, and replace all specifications before sale. Custom projects use the inquiry page rather than a purchasable sample SKU.

1. Create products for cribbage boards, cutting boards, cheese slicers and coasters, and organize them into collections. Configure variants, prices, inventory tracking, shipping, taxes and fulfillment in Shopify. Theme placeholders are illustrative, with no invented live inventory or prices.
2. In the theme editor, choose the featured collection, upload photography, and link category cards to their real collections. All photo placeholders are explicitly labeled; replace before launch. Brand copy is starter copy to review for accuracy.
3. The header uses plain brand text until the exact approved logo file is supplied. Upload that asset through the header's logo setting; do not redraw or recreate it.
4. Create pages with handles `about`, `contact`, `faq`, `custom-order`, and `completed-projects`. Assign the matching `page.*` template. Supply About content, add FAQ question blocks and project gallery blocks in the theme editor. Gallery placeholders are not completed-project claims.
5. Create navigation menus and select them in the Header/Footer section settings. The fallback links require the page handles above. Nested menus are not rendered; configure a flat navigation menu for this version. Add store policies in Shopify settings.
6. Enable personalization in a dedicated product template only for eligible products. Text is stored as a line item property and shown in the cart. It does not change price or create engraving artwork. Use native priced variants or a configured options app for paid add-ons. Inventory and variant availability are enforced by Shopify; the standard product form uses full-page submission.
7. Configure and verify the store's contact/notification email. Test Contact and custom inquiry delivery, including spam/CAPTCHA behavior. Contact forms send through Shopify; the theme does not maintain a quote database, promise delivery, or track quote status.

## Secure image upload integration (not installed)

The custom inquiry form captures contact details, project type, dimensions, wood preference, engraving, budget, timeline and description through Shopify's native contact form. There is intentionally no file control or fake success handler.

Before adding uploads, select a Shopify form/upload app with private file storage, validation, malware scanning, retention/deletion controls, and authenticated staff access. Alternatively build an app backend with server-issued short-lived upload URLs, strict MIME/size/count limits, rate limits and abuse protection, malware quarantine, and a durable quote record linking uploaded files to the submitted brief. An app proxy or app block must render and submit the integrated form; never embed admin credentials or storage keys in theme JavaScript. Verify actual record creation, delivery, authorization and deletion before enabling uploads or claiming requests are saved. The current theme only supports native contact delivery.

## Validation

`npm test` checks JSON section wiring, schema parsing, core commerce fields, required quote fields, and explicit upload limitations. `npm run check` runs Shopify Theme Check. These are structural checks, not proof of store checkout or email delivery.

Before launch, use a development store to exercise each variant, sold-out products, personalization, quantity updates/removal, checkout handoff, contact success/errors and inquiry email receipt. Review mobile menu keyboard behavior, focus, alt text, contrast, long titles, and imagery on phone/tablet/desktop. Set up and test payments separately only with owner approval. Store-backed validation cannot run until store access is provided.

## Credentials and dependencies

- Pinned `@shopify/cli` in `package.json` and lockfile; no storefront runtime dependencies.
- Shopify development store domain and CLI authentication with theme access (or securely configured Theme Access credentials). No credentials belong in Git or chat.
- Product catalog, photography, exact approved logo, business copy, policies, shipping and tax configuration.
- Valid store contact email for inquiries; optional form/upload app subscription or a separately secured backend for images and quote persistence.
- Network access to npm and Shopify CLI/store endpoints. Do not disable TLS verification to work around access restrictions.

No theme has been published and no payments have been enabled. Use the existing isolated checkout; no additional worktree is needed.

## Supplied logo versions

The four approved versions shown in chat are: stacked wordmark, horizontal wordmark, bird/tree mark, and circular badge. The four originals are now connected using Shopify Files references in `config/settings_data.json`: `Logo_Horizontal.png`, `Logo_Stacked.png`, `Logo.png` (mark), and `Logo_Badge.png`. These references resolve in the Kestrel Larch store; the original image bytes are not bundled in Git. Do not substitute a redraw.

In Shopify’s theme editor, open **Theme settings → Approved brand assets** and upload each original file into its named slot. The horizontal logo automatically appears in the header and the stacked logo in the footer. Existing section logo overrides take priority; clear those to use the shared assets. Add an **Approved brand artwork** section to any compatible JSON page to display the mark, circular badge, or either wordmark. Each placement preserves the entire image, its original colors, aspect ratio, and supplied background. The white backgrounds visible in these supplied versions will remain visible; use a separately approved transparent original if desired. No image is automatically cropped into a favicon.

## Photo-led custom work showcase

The homepage includes **Custom work showcase**, prepared for the supplied Trailside game board and personalized cutting board images. Upload their exact originals in each block’s **Original product photo** field. Images render in full without cropping. Blocks without photos appear only in the theme editor, not as pretend finished products on the public page. Optional Shopify product selectors link to real catalog entries; otherwise links go to the custom inquiry page. Titles and descriptions are editable and make no unverified wood, size, price, or lead-time claims.

For the wider photo set: use single-product photos for product cards and full collages as secondary product media or project-gallery entries. The custom cutting board is suitable for the `product.personalized` template. Create actual products as drafts until prices, dimensions, wood species, inventory and fulfillment details are confirmed. Do not treat third-party branded examples as in-stock catalog products automatically.

To make the chat photos accessible for setup, upload originals to Shopify **Content → Files** and share their public CDN links, or attach a downloadable ZIP of the originals. Inline chat images are visible for reference but are not mounted as asset files in this workspace. No product photo files have been embedded yet. Approved logo Files references are configured separately.

The configured logo files were supplied as public Shopify CDN links for store `1/1096/0112/8817`. Header and footer use the native image-picker references, so merchants can replace them through the theme editor. This execution environment received HTTP 403 when fetching the CDN directly; confirm rendering in Shopify Preview. Existing header/footer section-level overrides still take priority.
