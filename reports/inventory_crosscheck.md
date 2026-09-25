# Inventory cross-check: website database vs 2014-10 inventory

This compares `database/artworks.json` (the website) with `database/inventory_2014-10.json`, which is treated as the source of truth for **dimensions, technique and date**. This is a snapshot taken *before* the fixes were applied. `apply_inventory_fixes.py` then applied the inventory values to the confident matches (listed in `applied_changes.csv`). The probable matches below were then reviewed and applied too. The full row-by-row results are in `inventory_crosscheck.csv`, and website entries with no inventory match are in `site_only_artworks.csv`.

## Summary

|  | Count |
|---|---|
| Inventory items compared (Prints + Watercolours sections) | 395 |
| Matched to a website entry | 254 (233 confident, 19 to confirm) |
| Inventory items not found on the website | 141 |
| Website entries not found in the inventory | 259 |
| **Date mismatches** | 33 |
| Date missing on website (inventory has one) | 15 |
| **Dimension mismatches** | 61 |
| Dimensions same, but width/height swapped | 13 |
| Dimensions missing on website (inventory has them) | 18 |
| **Technique**: website has only a generic label | 249 |

## Things to know before applying fixes

1. **The website doesn't record specific techniques.** Every website entry has a category-level label (`Print`, `Collage, Watercolour`, `Sculpture`…), while the inventory gives the actual process (for example "Deep bite, engraving & drilling. Colour viscosity printed in purple-black, orange & yellow"). Fixing technique therefore means copying the inventory text in for all 249 matched works. It's probably best stored in a new field (say `technique_detail`) so the site's filters keep working on the generic label.
2. **The inventory disagrees with itself on some sizes.** The website sizes (scraped from the old agathesorel.co.uk) often match the sizes written into the inventory's own image filenames, such as `001 Vagabondage 1959 .br.650x600 mm .jpg`, rather than its size column (Vagabondage: size column 500x660, filename 650x600). This was checked against the text of the June 2014 copy of the inventory. Following your instruction, the size column is treated as authoritative below. The Vagabondage/Saule Pleureur/Via Siena and Le Balcon rows are worth a look at the PDF before changing them.
3. **The inventory itself doesn't always say whether a size is image or paper size.** Most prints only fill one of the two columns. The comparison uses whichever one is present.
4. **The JSON may have parsing gaps.** For example, the PDF uses number 120 twice (*Divine Proportions*, 1985, 600x780, and *The Wind*). Only *The Wind* is in the JSON, so *Divine Proportions* shows up as website-only. Pages 59–78 (artist's books, sculptures) are also not in the JSON, which is why most `Sculptures & Installations` and `Livres d'artiste` entries appear as website-only.
5. **Orientation-only differences** (600x780 vs 780x600) are listed separately. The inventory itself isn't consistent on orientation, so these are low priority.

## Date mismatches

| Inv. no | Inventory title | Inventory | Website | Website title | Match |
|---|---|---|---|---|---|
| 27 | Le Balcon by Jean Genet (title page) (K) | 1964 | 1959 | Le Balcon by Jean Genet (Artist's boo title page 1) | exact |
| 35 | Mausoleum for the chief of the secret police (Le Balcon page 9) | 1964 | 1959 | Mausoleum for the chief of the secret police (Le Balcon) | exact |
| 40 | The Artists Skin (K) | 1965 | 1959 | The Artists Skin | exact |
| 116 | Allegory | 1985 | 1976 | Allegory | exact |
| 139 | Pile them High and Sell them Cheap (Deptford Market) (K) | 1996 | 1976 | Pile them High and Sell them Cheep (Deptford Market) | exact |
| 140 | The Reincarnation of a Cactus (Artist's Book - Catalana Blanca, poems by Lorand Gaspar) (K) | 1997 | 1996 | The Reincarnation of a Cactus | exact |
| 152 | In the Patio | 1997 | 2011 | In the Patio | exact |
| 153 | Getting High (kite made of orange peel, wire & rubber band) | 1998 | 1996 | Getting High, (kite made of orange peel, wire & rubber band) | exact |
| 172 | Self defence | 2001 | 2005 | 05 Self defence | probable |
| 181 | Book of Sand Cover (Artist's Book with poems by David Gascoyne) (K) | 2001 | 1996 | Book of Sand Cover (Artists Book with poems by David Gascoyne) | exact |
| 223 | Grunewald | 2003 | 2004 | Grunewald | exact |
| 227 | Stones in sunlight and moonlight | 2006 | 2002 | Stones in Sunlight and Moonlight (Floating World) | exact |
| 228 | The floating world | 2006 | 2002 | The Floating World (Floating World) | exact |
| 229 | Grass | 2006 | 2007 | Grass | exact |
| 230 | Crusade | 2006 | 2002 | Crusade (Floating World) | exact |
| 231 | Walking on water (The Floating World) | 2006 | 2002 | Walking on Water (Floating World) | exact |
| 232 | Mirage (The Floating World) | 2006 | 2002 | Mirage (Floating World) | exact |
| 233 | Engraved sculpture (The Floating World) | 2006 | 2002 | Engraved Sculpture (Floating World) | exact |
| 235 | Sculpture in Grass and Stubble (The Floating World) | 2006 | 2002 | Sculpture in Grass and Stubble (Floating World) | exact |
| 237 | Ragtime 1 | 2005 | 2002 | Ragtime A | probable |
| 238 | Ragtime 2 | 2005 | 2002 | Ragtime B | probable |
| 239 | Ragtime 3 | 2006 | 2002 | Ragtime C | probable |
| 240 | Picnic | 2006 | 2002 | Picnic | exact |
| 241 | The Grand Memorabilia | 2006 | 2002 | The Grand Memorabilia | exact |
| 244 | Amazon (detail) | 2006 | 2007 | Amazon | exact |
| 245 | Tatjana's letter | 2002 | 2011 | Tatjana's Letter | exact |
| 248 | Indian Fabric with yellow edges | 2012 | 2011 | Indian Rug with Yellow Edges | probable |
| 250 | Tissues 2 | 2012 | 2011 | No 2 Tissues | probable |
| 251 | Tissues 3 | 2012 | 2011 | No 3 Tissues | probable |
| 252 | Dotty sculls | 2013 | 2011 | Dotty Sculls | exact |
| 256 | Indian rug with engraved objects | 2008 | 2007 | Indian rug with engraved sculpture | probable |
| 257 | The broken Fence | 2008 | 2007 | The broken fence | exact |
| 73 | The Cockerel Sheherezade | 2002 | 2001 | 23 The Cockerel Sheherezade | exact |

## Dimension mismatches (mm)

| Section | Inv. no | Inventory title | Inventory | Website | Website title | Match |
|---|---|---|---|---|---|---|
| Prints | 1 | Vagabondage | 500x660 | 650 x 600 mm | Vagabondage | exact |
| Prints | 2 | Saule Pleureur | 500x660 | 600 x 500 mm | Saule Pleureur | exact |
| Prints | 3 | Via Siena | 500x660 | 650 x 600 mm | Via Siena | exact |
| Prints | 13 | Troubled Square (K) | 780x600 | 800 x 590 mm | Troubled Square | exact |
| Prints | 14 | Fumée (K) | 500x660 | 800 x 590 mm | Fumee | exact |
| Prints | 16 | Hopfields | 590x410 | 690 x 400 mm | Hopfields | exact |
| Prints | 18 | Petroushka (triptych) (K) | 500x650 | 262 x 251 mm | Petroushka (triptych) | exact |
| Prints | 19 | Electronics for Beginners (K) | 780x600 | 660 x 500 mm | Electronics for Beginners | exact |
| Prints | 21 | Foundry | 390x570 | 300 x 340 mm | Foundry | exact |
| Prints | 23 | Box Shapes | 580x570 | 600 x 780 mm | Box Shapes | exact |
| Prints | 28 | The General (Le Balcon page 2) | 640x500 | 670 x 500 mm | The General (Le Balcon.. page 2) | exact |
| Prints | 29 | The Judge (Le Balcon page 3) (K) | 640x500 | 670 x 500 mm | The Judge (Le Balcon.. page 3) | exact |
| Prints | 30 | Chantal (Le Balcon page 4) | 640x500 | 670 x 500 mm | Chantal (Le Balcon.. page 4) | exact |
| Prints | 31 | Mme. The Queen (Le Balcon page 5) | 640x500 | 670 x 500 mm | Mme. The Queen (Le Balcon.. page 5) | exact |
| Prints | 32 | The Bishop (Le Balcon page 6) | 640x500 | 670 x 500 mm | The Bishop (Le Balcon.. page 6) | exact |
| Prints | 34 | The Queen (Le Balcon page 8) (K) | 640x500 | 670 x 500 mm | The Queen (Le Balcon.. page 8) | exact |
| Prints | 37 | The Fire (Le Balcon page 11) | 640x500 | 670 x 500 mm | The Fire (Le Balcon.. page 11) | exact |
| Prints | 40 | The Artists Skin (K) | 800x600 | 800 x 590 mm | The Artists Skin | exact |
| Prints | 41 | The Miracle Worker | 580x460 | 780 x 600 mm | The Miracle Worker | exact |
| Prints | 42 | Mass Hysteria | 580x460 | 780 x 600 mm | Mass Hysteria | exact |
| Prints | 44 | Melting point | 800x590 | 780 x 600 mm | Meltingpoint | exact |
| Prints | 45 | The Escapist | 800x600 | 780 x 600 mm | The Escapist | exact |
| Prints | 53 | Diver and Dreamer | 800x600 | 780 x 600 mm | Diver and Dreamer | exact |
| Prints | 59 | Green People | 800x600 | 780 x 600 mm | Green People | exact |
| Prints | 70 | Heroes in Perspective | 600x789 | 600 x 780 mm | Heroes in Perspective | exact |
| Prints | 72 | The Sculpture Garden | 600x800 | 600 x 780 mm | The Sculpture Garden | exact |
| Prints | 73 | Possessions | 800x600 | 780 x 600 mm | Posessions | exact |
| Prints | 74 | Shell | 800x600 | 780 x 600 mm | Shell | exact |
| Prints | 75 | New Dove (K) | 800x600 | 780 x 600 mm | New Dove | exact |
| Prints | 76 | The Preservation of Life | 800x600 | 780 x 600 mm | The Preservation of Life | exact |
| Prints | 77 | Starlet (K) | 800x600 | 780 x 600 mm | Starlet | exact |
| Prints | 108 | Weight Watcher | 780x600 | 590 x 800 mm | Weight Watcher | exact |
| Prints | 112 | Hello and Goodbye (K) | 780x108 | 780 x 110 mm | Hello and Goodby | exact |
| Prints | 131 | Ego the Goat | 600x780 | 600 x 800 mm | Ego the Goat | exact |
| Prints | 133 | Titania (from triptych) (K) | 780x600 | 800 x 600 mm | Titania (from triptych) | exact |
| Prints | 154 | Twiggy - Face | 900x680 | 900 x 630 mm | Twiggy - Face | exact |
| Prints | 163 | Figs and Old Rope | 760x560 | 600 x 800 mm | Figs and Old Rope | exact |
| Prints | 172 | Self defence | 530x760 | 560 x 810 mm | 05 Self defence | probable |
| Prints | 179 | Variable Lights (K) | 107x760 | 107 x 60 mm | Variable Lights | exact |
| Prints | 184 | Winged Creatures (The Book of Sand) | 800x530 | 780 x 530 mm | Winged Creatures (The Book of Sand) | exact |
| Prints | 186 | The Janus Gaze (The Book of Sand) | 800x630 | 800 x 590 mm | The Janus Gaze (The Book of Sand) | exact |
| Prints | 199 | No Exit (Shipyard) (K) | 1180x600 | 1180 x 790 mm | No Exit (Shipyard) | exact |
| Prints | 208 | Kabuki (Shipyard) (K) | 850x800 | 880 x 800 mm | Kabuki 1 (Shipyard) | exact |
| Prints | 209 | Odyssey (Shipyard) (K) | 600x900 | 630 x 900 mm | Odyssey (Shipyard) | exact |
| Prints | 216 | The Gates of Hell | 1350x900 | 951 x 820 mm | The Gates of Hell | exact |
| Prints | 232 | Mirage (The Floating World) | 642x514 | 800 x 600 mm | Mirage (Floating World) | exact |
| Prints | 233 | Engraved sculpture (The Floating World) | 750x560 | 870 x 610 mm | Engraved Sculpture (Floating World) | exact |
| Prints | 235 | Sculpture in Grass and Stubble (The Floating World) | 1070x680 | 1005 x 960 mm | Sculpture in Grass and Stubble (Floating World) | exact |
| Prints | 237 | Ragtime 1 | 750x560 | 760 x 560 mm | Ragtime A | probable |
| Prints | 238 | Ragtime 2 | 750x560 | 800 x 600 mm | Ragtime B | probable |
| Prints | 239 | Ragtime 3 | 750x560 | 770 x 560 mm | Ragtime C | probable |
| Prints | 240 | Picnic | 970x1220 | 920 x 1280 mm | Picnic | exact |
| Prints | 241 | The Grand Memorabilia | 550x900 | 330 x 500 mm | The Grand Memorabilia | exact |
| Prints | 244 | Amazon (detail) | 650x760 | 670 x 760 mm | Amazon | exact |
| Prints | 247 | Lorca's Flowers | 300x210 | 300 x 490 mm | Lorca's Flowers | exact |
| Prints | 268b | Old Master | 420x600 | 60 x 620 mm | 07 Old Master 42005 | manual |
| Watercolours | 16 | Arungabad Mill (sketch) | 520x350 | 520 x 380 mm | Aurangabad Mill | probable |
| Watercolours | 30 | The Thorn | 630x480 | 200 x 280 mm | 10 The Thorn | exact |
| Watercolours | 32 | Figures on a cloudy beach | 430x540 | 430 x 590 mm | 18 Figures on a Cloudy Beach | exact |
| Watercolours | 39 | Children with Pet Goats | 480x640 | 490 x 660 mm | Children with Pet Goats Bikaner | probable |
| Watercolours | 73 | The Cockerel Sheherezade | 470x600 | 570 x 450 mm | 23 The Cockerel Sheherezade | exact |

## Missing on the website but present in the inventory

| Inv. no | Title | Missing field | Inventory value |
|---|---|---|---|
| 268b | 07 Old Master 42005 | date | 2005 |
| 15 | Backdrop Aurangabad | date | 2007 |
| 16 | Aurangabad Mill | date | 2007 |
| 17 | Bikaner lake 1 | date | 2007 |
| 18 | Bikaner lake 2 | date | 2007 |
| 19 | Hill Station Aurangabad | date | 2007 |
| 20 | Desert with Trees Bikaner | date | 2007 |
| 21 | Pottery Stall Aurangabad | date | 2007 |
| 22 | Pushkar Sunset | date | 2007 |
| 23 | Taj Garden | date | 2007 |
| 24 | Varanasi Gats | date | 2007 |
| 25 | Pushkar Farmland | date | 2007 |
| 31 | 15 Dotty Women | date | 1998 |
| 39 | Children with Pet Goats Bikaner | date | 2006 |
| 99 | 30 The green Mine | date | 1980 |
| 27 | Le Balcon by Jean Genet (Artist's boo title page 1) | dimensions | 640x500 |
| 33 | The Orator & the Crowd (Le Balcon.. page 7) jpg | dimensions | 640x500 |
| 35 | Mausoleum for the chief of the secret police (Le Balcon) | dimensions | 640x500 |
| 36 | Everyday Irreality (Le Balcon.. page 10) 67 | dimensions | 640x500 |
| 85 | Watching the Garden Grow | dimensions | 780x600 |
| 139 | Pile them High and Sell them Cheep (Deptford Market) | dimensions | 780x600 |
| 142 | The Ghost of el Greco (Catalana Blanca) | dimensions | 780x600 |
| 168 | Sheets with Flowers & Basket (Washday) | dimensions | 630x900 |
| 173 | Dawn (Helios) | dimensions | 680x780 |
| 174 | Morning (Helios) | dimensions | 900x700 |
| 175 | Midday (Helios) | dimensions | 900x640 |
| 176 | Dusk (Helios) | dimensions | 680x780 |
| 177 | The cockerel Sheherezade (Helios) | dimensions | 830x670 |
| 181 | Book of Sand Cover (Artists Book with poems by David Gascoyne) | dimensions | 340x280 |
| 188 | Patterns Flow Like Rivers (The Book of Sand) | dimensions | 900x630 |
| 189 | Women Waiting fot their Lovers (The Book of Sand) | dimensions | 900x630 |
| 191 | Prelimilaries to Farewell (The Book of Sand) | dimensions | 630x900 |
| 194 | Scare Crow and Rabbit Scare (Ghost Stories) | dimensions | 780x600 |

## Width/height swapped only

| Inv. no | Title | Inventory | Website |
|---|---|---|---|
| 56 | Observed in High Spirits (K) | 600x780 | 780 x 600 mm |
| 58 | Discarded Dreams | 600x780 | 780 x 600 mm |
| 79 | Homes | 600x780 | 780 x 600 mm |
| 91 | Knossos | 780x600 | 600 x 780 mm |
| 92 | The Grand Bathroom (K) | 780x600 | 600 x 780 mm |
| 92b | Give & Take | 780x600 | 600 x 780 mm |
| 126 | Step into the Future (K) | 780x600 | 600 x 780 mm |
| 137 | Stallholders (Deptford Market) | 780x600 | 600 x 780 mm |
| 149 | The bowels of the earth | 600x780 | 780 x 600 mm |
| 185 | The Round Dance (The Book of Sand) | 630x900 | 900 x 630 mm |
| 248 | Indian Fabric with yellow edges | 300x210 | 210 x 300 mm |
| 257 | The broken Fence | 1280x920 | 920 x 1280 mm |
| 5 | Banter | 280x200 | 200 x 280 mm |

## Probable matches: please confirm

These pairs were matched on similar titles, or across different categories. The mismatches listed above for these pairs only hold if the pairing is right.

| Inv. no | Inventory title | Website title | Website category | Score |
|---|---|---|---|---|
| 91 | Knossos | nossos | Prints / 1966-1976 | 0.92 |
| 172 | Self defence | 05 Self defence | Watercolours & Collages / Guess who is coming for dinner | 1.00 |
| 237 | Ragtime 1 | Ragtime A | Prints / 2002-2006l | 0.89 |
| 238 | Ragtime 2 | Ragtime B | Prints / 2002-2006l | 0.89 |
| 239 | Ragtime 3 | Ragtime C | Prints / 2002-2006l | 0.89 |
| 248 | Indian Fabric with yellow edges | Indian Rug with Yellow Edges | Prints / 2011-2016 | 0.88 |
| 250 | Tissues 2 | No 2 Tissues | Prints / 2011-2016 | 0.88 |
| 251 | Tissues 3 | No 3 Tissues | Prints / 2011-2016 | 0.88 |
| 256 | Indian rug with engraved objects | Indian rug with engraved sculpture | Prints / 2007-2010 | 0.79 |
| 262b | To Challenge | 01 To challenge.jpg | Livres d'artiste / Dartiste | 0.86 |
| 263b | Chose Life | 02 Choose Life | Livres d'artiste / Dartiste | 0.95 |
| 264b | Music turns back clock | 03 Music Turns Back Clock | Livres d'artiste / Dartiste | 1.00 |
| 265b | Inspire Dreams (v1) | 04 Inspire Dreams | Livres d'artiste / Dartiste | 1.00 |
| 267b | Listen to the heart | 06 Listen to the Heart | Livres d'artiste / Dartiste | 1.00 |
| 269 | Just a new Promise | 08 Just a New Promise | Livres d'artiste / Dartiste | 1.00 |
| 15 | Backdrop to Arungabad | Backdrop Aurangabad | Watercolours & Collages / India small | 0.85 |
| 16 | Arungabad Mill (sketch) | Aurangabad Mill | Watercolours & Collages / India small | 0.90 |
| 20 | Desert with Trees | Desert with Trees Bikaner | Watercolours & Collages / India small | 0.81 |
| 39 | Children with Pet Goats | Children with Pet Goats Bikaner | Watercolours & Collages / India small | 0.85 |

## Inventory works not found on the website

**Prints** (57): 17 Kent (1961); 25 Charm Against Evil (1963); 52 Temple (1967); 54 Jack boot (1976); 55 The Past A/P (1976); 62 Moonshots (1968); 63 Ribs and String (1969); 64 Ideas for an architectural site (1968); 97 Woman at the Edge (1998); 128 Airport beach Sketch (1988); 129 Musicians 1 (1989); 130 Musicians 2 (1989); 151 Seed onions (1997); 156 Twiggy with red lips (1998); 157 Twiggy with Coloured background (1998); 160 The Blue Mine (2000); 161 Mystification (2000); 162 A Knock at the Door (2001); 196 Combat (2001); 200 Clowns (2003); 201 Clowns in Black (2003); 204 Shipyard Aerial View No 2 (Shipyard) (2002); 206 Secret Patterns (2002); 212 Sculpture with grass and stubble (2001); 213 To Catch a Butterfly (colour) (2003); 214 Free (The Gates of Hell - Detail) (2003); 217 Picnic (2005); 220 To Catch a Butterfly (2004); 221 Bark (2003); 222 Twigs (2003); 224 Self defence & Defence (2004); 226 To Challenge (From Text messages) (2005); 234 Engraved stones (The Floating World) (2006); 236 Grass and netting (The Floating World) (2006); 242 Memorabilia (small version) (2006); 243 The Wave; 246 Kabuki (2002); 249 Tissues 1 (2012); 253 Sculls with colours; 255 Sculls in the News (2013); 258 Titania Inverted (2012); 259 Indian rug with roots and dancer (2012); 260 Hand and Eye coordination (2006); 261 Twigs with Purple Sky (2014); 262 Grass and Twigs (2008); 263 The Plastic Fence (2014); 264 Sculls in the News (2014); 265 The Vine Press (2014); 270 Cover (Text Messages) (2005); 271 To challenge (Text Messages) (2005); 272 Choose life (Text Messages) (2005); 273 Music turns back clock (Text Messages) (2005); 274 Inspire dreams (Text Messages) (2005); 275 Finding Reasons (Text Messages) (2005); 276 Listen to the heart (Text Messages) (2005); 277 Old Master (Text Messages) (2005); 278 Just a new promise (Text Messages) (2005)

**Watercolours** (84): 26 Figures on the Beach; 27 Girls at Famara Washing (sketch) (1986); 28 Bathers Famara (1987); 33 Apostle with stone arches (1996); 34 Diver and Dreamer (sketch); 35 Cacti and rocks (2013); 37 Cactus and Hosepipe (2013); 38 Camp fire (1995); 40 Charcoal burner and old iron; 41 Dancer and harpist (1995); 42 Famara Water station with male nude; 43 Family with pregnant woman; 44 Farm buildings and volcano; 45 Figures on a beach towel; 46 Funnel and rock formation; 48 Geometric shapes at night; 49 Gipsies putting up a frame tent; 50 Girls washing their hair (1986); 51 Goat in a Bay with Barges; 52 Goats in a Bay; 53 Headless Woman on the Beach; 54 Hot Landscape with lovers; 55 La Geria with bird scares (1908); 56 Lava flow with sunny background (1908); 57 Lolita and Blue Beard; 58 Mother and baby on the beach; 59 Musicians no 3; 60 Nude in front of mirror; 61 Nude woman with Castle; 62 Old and Young woman at the farmhouse; 63 Pregnant woman with engraved stone; 64 Red Stone at the Bodega; 65 Rocks near Mala; 66 Roped abstract; 67 Ruins in the spring; 68 Seed onions; 69 Ruins with girls; 70 Step into the Future (design for Westminster sculpture competition); 71 Terracotta figurines; 72 The Burial; 74 Funnel and YOYO; 75 Two Figures in the tomato field (1986); 76 Talking of history (1986); 77 Vanity; 78 Woman dressing in the doorway; 79 Annuncios house (1989); 80 Cactus and hose pipe (2013); 81 Descent into the crater (2001); 83 Famara beach purifying station (1982); 84 Femme fatale (1987); 85 Figures with a wind shield (1987); 87 Nude with a castle Lanzarote (1987); 89 From Van Gogh to Einstein (2001); 90 Girls on Famara beach (1989); 91 Hillside with figures; 92 House with Roots Papagayo (1989); 93 Loops (2001); 94 Lunar landscape Lanzarote (2001); 95 Musician and dancer; 96 Rock formation in Mala (1998); 97 Sky Spectacular Lanzarote; 98 Stone steles at Mala (1980); 100 Stone washtub (1980); 101 Hello and Goodbye (1998); 102 Water well with figures (1998); 103 Camel station; 104 Temptations (sketch); 105 Chicken run; 106 Dream horse; 107 Dried plant in a sack; 108 Figures at Famara beach; 109 Flowers and clouds; 110 Garden with dead palm; 111 Guess who is coming for dinner; 112 Geranium in the bay; 113 La Haria with clouds; 114 Hills with agaves; 115 House on top of the hill; 116 Vineyard with Clouds; 117 Vineyard with Red Hill; 118 Landscape with stubble and agaves; 119 Lichen on the rocks; 120 Lichen; 121 Mala

## Website works not found in the inventory

| Category | Count |
|---|---|
| Watercolours & Collages | 114 |
| Sculptures & Installations | 99 |
| Livres d'artiste | 27 |
| Prints | 19 |

Website **Prints** with no inventory match: Clown and twirl geometric with shadow (2011); Flip Flops and Snorkel (2011); No 1 Tissues from triptych (2011); Orange Fencing with Shadows (2011); Popup Book 1 (2011); Sculls near the Volcano (2011); Geometric Display (2011); Grass and Luminous Snakes (2011); Mural Project sketch (2011); Titania at Night (2011); Cheers (1998); Night Drive (1959); Boulders with Orange Fencing (2007); The Indian Rug No.1 (2007); Ship Shapes with Timber (Shipyard) (2002); Bark on Picon (2004); Twigs And Shoots (2004); Divine Proportions (1985); Macho the Cock (1989).

Most of the unmatched Watercolours & Collages (Lanzarote, India, Cirque du Soleil, Fairground series) are simply not listed in the inventory's watercolour section. A few may be the same work under a different title, for example *Cactus and Watering hose* / *Cactus and Hosepipe*, *06 Bathers* / *Bathers Famara*, *Bark on Picon* / *Bark*, and *Twigs And Shoots* / *Twigs*. See `site_only_artworks.csv`.
