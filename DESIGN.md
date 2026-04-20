# Design System Specification: The Curated Monograph

## 1. Overview & Creative North Star: "The Scholarly Archive"
This design system is engineered for intellectual rigor and institutional authority. Moving away from the disposable nature of modern web "templates," our Creative North Star is **The Scholarly Archive**. This aesthetic draws inspiration from high-end university press publications, architectural monographs, and archival curation.

We achieve a premium feel not through decoration, but through **hyper-precision**. We favor intentional asymmetry—using the grid to create "active" white space that directs the eye—and high-contrast typographic scales that signal a clear editorial hierarchy. The goal is a digital experience that feels "printed," permanent, and profoundly professional.

---

## 2. Colors & Tonal Architecture
The palette is rooted in organic, heavy-weight materials: stone, ink, and forest flora. 

### The "No-Line" Rule
To maintain a high-end editorial feel, **1px solid borders are strictly prohibited for sectioning.** Conventional UI relies on lines to separate content; this system relies on **Background Color Shifts**. 
*   Use `surface` (#faf9f7) as your primary canvas.
*   Transition to `surface-container-low` (#f4f3f1) or `surface-container` (#efeeec) to define a new content block.
*   The lack of lines creates a seamless, fluid reading experience that feels sophisticated rather than "boxed in."

### Surface Hierarchy & Nesting
Treat the interface as a series of stacked, premium paper stocks.
*   **Base:** `surface` (#faf9f7)
*   **In-Page Modules:** `surface-container-low` (#f4f3f1)
*   **Interactive Overlays/Menus:** `surface-container-highest` (#e3e2e0)
*   **Signature Accents:** Use `tertiary_fixed_dim` (#ddc490) sparingly for gold accents in iconography or small metadata labels to provide a "foil-stamp" quality.

---

## 3. Typography: Editorial Authority
The typography is the backbone of the system, utilizing a "Swiss-Editorial" approach where the Serif does the "talking" and the Sans-Serif does the "work."

*   **Display & Headlines (Newsreader):** Use for all major entry points. The `display-lg` (3.5rem) should be used with tight letter-spacing and generous leading to create a sense of monumental scale.
*   **Body & Technical Details (Inter):** Use for all long-form reading and data. Inter’s neutral x-height ensures legibility in technical portfolios.
*   **The Hierarchy Rule:** Always pair a `headline-lg` with a `label-md` in all-caps (tracked out +10%) for metadata. This contrast between the fluid serif and the rigid, capitalized sans-serif is the hallmark of institutional design.

---

## 4. Elevation & Depth: Tonal Layering
In a "rigorous" aesthetic, traditional drop shadows are often too "digital." We use **Tonal Layering** to convey importance.

*   **The Layering Principle:** Depth is achieved by placing a `surface-container-lowest` (#ffffff) element on top of a `surface-container` (#efeeec) background. This creates a "soft lift" that mimics natural light hitting a physical page.
*   **Ambient Shadows:** If a floating element (like a modal) is required, use a custom shadow: `0px 20px 40px rgba(26, 28, 27, 0.06)`. It should be barely perceptible, acting more like an ambient occlusion than a shadow.
*   **The "Ghost Border" Fallback:** If a boundary is required for accessibility (e.g., in input fields), use the `outline_variant` (#c3c8c1) at 30% opacity. 

---

## 5. Components & Primitive Styling

### Buttons
Buttons should feel like architectural elements—solid and intentional.
*   **Primary:** `primary_container` (#1b3022) background with `on_primary` (#ffffff) text. Use `DEFAULT` (0.25rem) radius. Sharp corners convey discipline.
*   **Secondary:** `outline` (#737973) ghost button with 1px stroke. 
*   **Tertiary:** Text-only with an underline that appears only on hover.

### Input Fields
*   **Style:** Avoid fully enclosed boxes. Use a "Bottom-Border Only" approach or a very subtle `surface-container-high` fill.
*   **Focus State:** Transition the bottom border to `primary` (#061b0e) with a 2px stroke. No "glow" or outer rings.

### Cards & Lists
*   **The Divider Prohibition:** Never use horizontal lines to separate list items. Use **Vertical White Space**. Use the `1.5rem` to `2rem` spacing tokens to create clear "islands" of information.
*   **Layout:** For technical portfolio items, use an asymmetric 2-column layout within the card: Title/Serif on the left (60%), Metadata/Sans on the right (40%).

### Chips (Labels)
*   **Institutional Styling:** Use `secondary_container` (#e4e2e1) with `on_secondary_container` (#656464). Keep them rectangular with `sm` (0.125rem) rounding to look like archival tags.

---

## 6. Do’s and Don’ts

### Do:
*   **Embrace Asymmetry:** Align text to the left but allow large margins on the right to create an "editorial column" feel.
*   **Use High Contrast Scale:** Jump from a very large headline to very small, well-spaced metadata.
*   **Color as Emphasis:** Use `primary_container` (Forest Green) only for the most important actions or "Success" states.

### Don’t:
*   **No Glassmorphism:** Never use backdrop blurs. This system is about the weight of paper and ink, not the transparency of glass.
*   **No Gradients:** Colors must remain flat and authoritative. Visual interest comes from the *interaction* of colors, not transitions between them.
*   **No Rounded Corners:** Avoid the `full` or `xl` roundedness tokens for structural elements. Keep everything at `none` or `DEFAULT` (0.25rem) to maintain a technical, engineered look.
*   **No Centered Text:** In an institutional system, left-aligned text is the standard for readability and rigor. Avoid centering large blocks of copy.

---

**Director’s Final Note:** 
This design system is about the "space between." Your success as a designer using this system will be measured by how much you *don't* add. Let the typography breathe, let the warm off-white background provide the atmosphere, and let the grid provide the structure. We are building a legacy, not a trend.