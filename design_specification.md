# Web Experience Content & Design Specification
## Project: Agathe Sorel Interactive Legacy Timeline (agathesorel.co.uk)
## Target Audience: Curators, Institutions, Art Historians, and High-End Collectors

---

## Part 1: Architectural & Visual Design Framework
To faithfully translate Agathe Sorel’s published memoirs, *Projections in Space and Time* and *From Darkness to Hope*, into a web environment, the digital design language must directly reflect the physical layout, typographical restraint, and structural themes of the print volumes.

### 1.1 Typographic Hierarchy
The typography must reflect a premium, archival print publication:
* **Primary Display Typography (Headings, Chapter Titles, Era Milestones):** Use an elegant, high-contrast serif font with historical gravure qualities. *Recommendation:* **Playfair Display** or **Cormorant Garamond** (Set with generous letter-spacing for headers, lowercase italics for poetic or contextual annotations).
* **Body & Technical Metadata Typography:** Use a clean, highly legible modern sans-serif that ensures ease of reading for dense historical documentation and technical catalog listings. *Recommendation:* **Inter** or **Helvetica Neue** (Weights: 300 Light for running narrative, 500 Medium for labels and artwork dimensions).

### 1.2 Color Palette & Material Metaphor
The user interface should never compete with the artwork. Instead, it must evoke the raw materials of printmaking (inks, paper stocks, plates) and the transparency of her 3D sculptures:
* **Background (The Canvas):** Soft, non-glare gallery tone (`#FCFCFC` or `#F7F5F0`), mimicking heavyweight, acid-free rag printmaking paper.
* **Primary Ink:** Rich charcoal/etching black (`#1A1A1A`), avoiding pure digital `#000000` to maintain an organic, printed feel.
* **Accent Tones:**
    * *Volcanic Ochre/Terracotta* (`#B45309` / `#854D0E`): Inspired by her Lanzarote studio landscapes; used strictly for structural highlights, links, and timeframe indicators.
    * *Translucent Glass Layeringing* (`rgba(255, 255, 255, 0.65)` with a `backdrop-filter: blur(12px)`): A direct digital translation of her iconic **Perspex "Space Engravings."** Structural blocks, dropdown filters, and modular inquiry forms must slide over text and images like physical overlays.

### 1.3 UI Structural Elements & Line Work
* **The Line Engraving Divider:** Sections must be delineated by ultra-fine, single-pixel borders (`border: 0.5px solid rgba(26,26,26,0.15)`), mimicking the precise paths cut by an engraving burin or drypoint needle. Avoid heavy modern cards or block containers.
* **Asymmetrical Grid:** Layouts should alternate from left-aligned text blocks with right-aligned imagery to open, off-center focal points, directly mirroring the editorial pacing of her art books.

---

## Part 2: Interactive Timeline & Content Specification

This structural framework maps Agathe Sorel's life and artistic evolutionary stages chronologically across Volume A (*From Darkness to Hope*) and Volume B (*Projections in Space and Time*).

### Chronological Phase 1: Origins, Upheaval, & Childhood (1935—1956)
* **Source Material:** Volume A: Chapter 2 (*My Childhood*), Chapter 3 (*The Holocaust Diaries*), Chapter 4 (*1945-1956*)
* **Biographical Context & Narrative Triggers:**
    * Born in Hungary (1935). Childhood fundamentally disrupted by World War II, the rise of the Arrow Cross Party, anti-Jewish laws, and surviving the Holocaust.
    * Liberation by the Russian Army on February 13, 1945, followed by the restrictive post-war Communist regime under Mátyás Rákosi.
    * Early artistic expressions began during these years; her mother, Magda, patiently posed as a model for surreal sketches amidst shortages of paper and pencils.
* **Core Creative Themes:** Raw mark-making, historical testimony, observation as a survival mechanism.
* **Embedded Media References & Placements:**
    * `[Image Reference: Vol A, Ch 2, Page 45]` — Early childhood portraiture / Surreal drawings of nude nuns with large white coifs (evoking a Fellini-esque cinematic quality).
    * `[Image Reference: Vol A, Ch 3, Page 46]` — Original handwritten leaves from *The Holocaust Diaries* (Assembled from scraps of paper in 1945, detailing her walks with her father and his dachshund Csumi).
    * `[Contextual Artist Inset]`: Reference to **Margit Graber**, her foundational mentor in Budapest who guided her early creative principles.

### Chronological Phase 2: Fleeing to the West & Arrival in London (1956—1958)
* **Source Material:** Volume B: Chapter 1 (*Fleeing to the West*)
* **Biographical Context & Narrative Triggers:**
    * Escaping Hungary in mid-November 1956 during the political chaos of the Hungarian Uprising.
    * Journey via ambulance to Vrbas (Northern Yugoslavia) to stay with grandparents, followed by a train to Vienna, where the Austrian government welcomed refugees.
    * Arrival in London with airline tickets provided by her guarantors (Uncle and Aunt Klári). Moving from temporary housing in Coventry to her mother’s new home in the East End (Brick Lane).
    * Formal education in England; navigating the transition to British life, culminating in becoming a naturalized British citizen in 1961.
* **Core Creative Themes:** Displacement, cross-border transition, line as a universal language across changing geographic spaces.
* **Embedded Media References & Placements:**
    * `[Image Reference: Vol B, Ch 1, Page 21]` — **Michael Rothenstein**, *Seven Colors Boxes* & *Moonscape Boxes* (Key historical modern works illustrating the artistic circle influencing her arrival in London).

### Chronological Phase 3: Paris — Dreams Fulfilled at Atelier 17 (1958—1960)
* **Source Material:** Volume B: Chapter 2 (*Paris - Dreams Fulfilled*)
* **Biographical Context & Narrative Triggers:**
    * Awarded a highly competitive, prestigious scholarship by the Gulbenkian Foundation, orchestrated by Director Ian Sanderson.
    * Arrival in Paris (Autumn 1958). Enrolling in the École des Beaux-Arts, but finding its academic approaches restrictive.
    * Finding her true intellectual home at **Atelier 17**, recommended by Michael Rothenstein and Julian Trevelyan. Working closely under the visionary printmaker **S.W. Hayter**.
    * Concurrently studied modern French literature at the Sorbonne to steep herself in the local intellectual climate.
* **Core Creative Themes:** Fluid line engraving, viscosity printing, technical breakthroughs in dynamic plate textures.
* **Embedded Media References & Placements:**
    * `[Image Reference: Vol B, Ch 2, Page 24]` — Agathe Sorel, *Hand and Eye Coordination* (1959 engraving showcasing early command of line work and structural composition under Hayter's guidance).
    * `[Image Reference: Vol B, Ch 2, Page 53]` — Agathe Sorel, *The Wise and Foolish Virgin* (1966 Triptych print combining line engraving, aquatint, an engraved acrylic set square, photogravure, and a hammered bronze relief plate). Shown at the First International Print Biennale in Bradford (1969).
    * `[Inspirational Iconography]`: Photographic/artistic callouts highlighting **S.W. Hayter’s** influential studio layout and experimental philosophies.

### Chronological Phase 4: Setting Up the Studio & Institutional Leadership (1960—1970s)
* **Source Material:** Volume B: Chapter 3 (*Setting up a Studio*)
* **Biographical Context & Narrative Triggers:**
    * Return to London in Autumn 1960. Defying contemporary systemic barriers facing single women by independently securing a 25-year mortgage from the Fulham Borough Council based on a robust studio business plan.
    * Establishing the **Studio of Contemporary Art** in a modest former migrant hostel in Fulham.
    * Secured teaching positions at Camberwell, Goldsmiths, and Maidstone College of Art. Co-founded the **Printmakers Council** to provide independent infrastructure for British print artists.
    * Met and married her husband, fellow artist Gabor; birth of her son in 1970.
* **Core Creative Themes:** Artistic independence, scaling institutional networks, moving from individual plates to architectural layouts.
* **Embedded Media References & Placements:**
    * `[Image Reference: Vol B, Ch 3, Page 54]` — Agathe Sorel, Selected Early Architectural Prints & Studio Layouts.
    * `[Image Reference: Vol B, Ch 3, Page 97]` — Agathe Sorel, *The Visionaries* (2016 Print pairing portraits of William Shakespeare and Sam Wanamaker, exhibited at the Shakespeare's Globe Museum exhibition).

### Chronological Phase 5: North American Dialogues & The Translucency Breakthrough (1960—1990)
* **Source Material:** Volume B: Chapter 4 (*America*), Chapter 5 (*Career 1967-1990*)
* **Biographical Context & Narrative Triggers:**
    * Annual travels across the United States from 1960-1975, bolstered by a grant from the Winston Churchill Memorial Trust (1965-1966).
    * Deep creative exchanges with prominent curators and directors, starting with Bertha von Moschizker at the Philadelphia Print Club.
    * Traveled across New Orleans, Grand Canyon, Los Angeles, Iowa, and New York, lecturing at major institutions and interacting with leading figures like **Mauricio Lasansky**.
    * Developing her legendary **Perspex plates and 3D acrylic "Space Engravings."** She independently unlocked methods of engraving plastic plates to achieve pure color without chemical metal interaction, a technique closely guarded by the Royal Mint.
    * Served on prestigious international art panels, including the Atlantic City Sidewalk Show jury (1967) alongside Sam Maitin.
* **Core Creative Themes:** Transparency, three-dimensional engraving depth, refraction of ambient light.
* **Embedded Media References & Placements:**
    * `[Image Reference: Vol B, Ch 4, Page 98]` — Agathe Sorel, *To Challenge* (Digital print and woodcut in color, 2005 / variant engraving concepts).
    * `[Image Reference: Vol B, Ch 4, Page 126]` — Structural drawings or video links showcasing her groundbreaking interaction with **Mauricio Lasansky** and his *Nazi Drawings* series (1916-1966).
    * `[Image Reference: Vol B, Ch 5, Page 128]` — Agathe Sorel, *Welcome Arch* (Sculpture with silkscreen, 1971; a masterpiece demonstrating her seamless merge of print and freestanding form).
    * `[Image Reference: Vol B, Ch 5, Page 159]` — **David Ferry**, *Connected Forms* (White marble resin and paint, 2015; illustrating modern dialogues with her peers).

---

## Part 3: Curator Navigation & Lead-Generation Functional Specifications

To maximize the commercial and institutional utility of agathesorel.co.uk, specific UX components must be mapped directly to the timeline sections.

### 3.1 Advanced Curator Filtering Controls
Each artwork entry displayed on the timeline or within the unified Archive tab must contain a structured metadata schema available for quick filtering:

[ Filter by Medium ] ---> [ Printmaking (Etching / Aquatint / Viscosity) ]
[ Space Engravings (Acrylic / Perspex Sculpture) ]
[ Watercolours & Drawings ]
[ Livres d'Artiste / Fine Press Books ]

[ Filter by Period ] ---> [ 1950s: Paris Exploration ]
[ 1960s-70s: Studio Foundation & Acrylic Breakthrough ]
[ 1980s-90s: International Retrospectives ]
[ 2000s+: Contemporary Digital & Multi-Media Works ]

### 3.2 High-Intent Collector Lead Flow
* **Contextual CTAs:** Every prominent artwork asset must display an elegant, understated text button: `Inquire via Estate Administration`.
* **Interactive Overlay:** Clicking the trigger must invoke an overlay utilizing the **Material Metaphor** (semi-transparent blurred panel). The form must auto-populate with the specific artwork title, creation year, and unique identification number to eliminate catalog errors.
* **Lead Capturing Fields Required:**
    1. Full Name / Institutional Representation (e.g., Museum Acquisition Board, Private Gallery).
    2. Secure Contact Coordinates (Email and Direct Phone).
    3. Type of Inquiry Dropdown: `[Private Collection Purchase | Museum Loan Request | Academic Research Publication Request]`.
    4. Free-Text Message Box for Provenance or Condition Report Requests.

### 3.3 Institutional "Press Room" & Media Portal
Directly linked from the global footer and main navigational overlay:
* A dedicated, password-optional asset download zone for museum curators.
* **Downloadable Deliverables:** Complete Exhibition Histories (PDF formatted using the Playfair Display typographic standard), a high-resolution Press Photograph kit with standardized copyright tags, and sample essays from art historians such as Professor David Ferry and Julia Weiner.
