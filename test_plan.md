# Agathe Sorel Website - Reusable Test Plan

This document details the test plan for verifying the integrity, functionality, and performance of the Agathe Sorel website. It is designed to be executed both manually and via automated verification scripts to ensure that future updates do not introduce regressions.

---

## 1. Scope of Testing

The test plan targets the following areas:
1. **Link & Resource Integrity**: Verification of all images, stylesheets, scripts, and document assets to ensure zero broken links (404s).
2. **DOM Element Alignment**: Validation of interactive elements, tab panels, and forms to ensure semantic HTML, correct accessibilities, and unique, valid IDs.
3. **JS Selector & Binding Integrity**: Automated validation verifying that all elements queried in `app.js` (using `getElementById`, `querySelector`, etc.) exist in `index.html` to avoid uncaught null reference exceptions.
4. **Interactive Form Routing**: Verification of input elements and form submission handlers (Acquisition Inquiries and Curatorial Requests) to ensure routing to `sylvansitkey07@gmail.com` with formatted email bodies.
5. **SEO & Metadata Verification**: Verification of page title, meta description, sitemap references, and JSON-LD schema structure.
6. **Timeline Volume Filtering**: Verification of the Volume A/B toggle selectors and their dynamic rendering behaviors.
7. **Connections Graph (Vis.js)**: Verification of canvas rendering, network stabilization, and side-panel card inspections.

---

## 2. Test Cases & Verification Procedures

### Test Case 1: Link and Resource Integrity
*   **Objective**: Confirm that all internal files referenced in the HTML exist on disk and serve correctly.
*   **Steps**:
    1. Parse `index.html` for all `href` and `src` attributes.
    2. Filter out external links (e.g. Google Fonts, Vis.js CDN).
    3. Verify that each local path (e.g. `style.css`, `app.js`, `Autobiography/images/...`) resolves to a valid file on disk.
*   **Expected Result**: All assets are resolved with no missing resources (0 missing files, 0 broken links).

### Test Case 2: JavaScript DOM Binding Alignment
*   **Objective**: Prevent runtime errors by ensuring all elements that the JS expects to be in the DOM are present.
*   **Steps**:
    1. Parse `app.js` to identify all selectors queried via `document.getElementById` and `document.querySelector`.
    2. Check if those exact elements (by ID or class selector) exist in `index.html`.
*   **Expected Result**: All DOM selectors referenced in `app.js` exist in `index.html`, unless dynamically generated or optional.

### Test Case 3: Inquiry & Contact Form Structure
*   **Objective**: Confirm all form inputs needed for mail routing are present in the HTML.
*   **Steps**:
    1. Locate `#artwork-inquiry-form` and verify fields: `#inquiry-name`, `#inquiry-email`, `#inquiry-phone`, `#inquiry-type`, `#inquiry-message`, `#inquiry-art-id`.
    2. Locate `#curatorial-contact-form` and verify fields: `#curator-name`, `#curator-email`, `#curator-institution`, `#curator-request-type`, `#curator-message`.
*   **Expected Result**: Both forms contain all required inputs with correct IDs.

### Test Case 4: Contact Mailto Target & Draft Generation
*   **Objective**: Verify contact form submissions successfully direct to `sylvansitkey07@gmail.com` with correct metadata.
*   **Steps**:
    1. Fill out the **Acquisition Inquiry** form (opened from an artwork detail modal) and click **Submit**.
    2. Fill out the **Curatorial Inquiry** form (top of Press Room page) and click **Submit**.
    3. Verify that a system-level email draft opens in the default mail client.
    4. Confirm that:
       * The recipient is `sylvansitkey07@gmail.com`.
       * The subject line matches the input format.
       * The body is cleanly formatted with the form field contents.
*   **Expected Result**: Both forms trigger a pre-filled draft to `sylvansitkey07@gmail.com`.

### Test Case 5: SEO & Schema Validation
*   **Objective**: Verify structured data conforms to standard JSON-LD schemas for rich snippet discovery.
*   **Steps**:
    1. Extract the `<script type="application/ld+json">` contents.
    2. Parse the content as valid JSON.
    3. Check that `@type` matches `VisualArtist` and contains relevant attributes (represented collections, biography, etc.).
*   **Expected Result**: JSON-LD is syntactically valid and compiles with correct artist details.

### Test Case 6: Timeline Volume Toggling
*   **Objective**: Verify interactive volume segmentation filters the timeline events dynamically.
*   **Steps**:
    1. Navigate to the **An Artist in Space and Time** page.
    2. Select **Volume A** control and confirm only nodes with `data-volume="A"` are displayed.
    3. Select **Volume B** control and confirm only nodes with `data-volume="B"` are displayed.
*   **Expected Result**: Toggle controls successfully hide/show the correct timeline nodes.

### Test Case 7: Connections Graph UI & Inspected Side-Panel
*   **Objective**: Verify that clicking the Connections tab loads the Vis.js canvas stably and selecting nodes updates details.
*   **Steps**:
    1. Navigate to the **Connections** tab.
    2. Verify Vis.js initializes and stabilizes without wild bouncing.
    3. Select a node (e.g. Agathe Sorel or Atelier 17) and check that the right-hand panel displays details.
*   **Expected Result**: Vis.js canvas loads stably, and node selection updates the details side-panel.

---

## 3. Automated Test Runner (`verify_site.py`)

A Python validation script has been implemented to automate Test Cases 1, 2, 3, and 5. This script can be run locally using the project's virtual environment:

```bash
# To run the automated validation suite:
./.venv/bin/python verify_site.py
```
