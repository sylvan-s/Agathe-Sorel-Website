# Inventory cross-check: website database vs 2014-10 inventory

This compares the **current** `database/artworks.json`, which already has the first round of fixes, with the **complete** `database/inventory_2014-10.json` (all 78 pages). The inventory is the source of truth for **dimensions, technique and date**. Differences from the first round are already fixed and appear here as `ok`. The first round's report is in git history (commit `5ce6b43`), and the changes it led to are in `applied_changes.csv`.

What's new in this round: watercolours 122–240, the 22 acrylic sculptures and installations, *Divine Proportions* (120b), and three prints/watercolours that now match thanks to better title matching (*Bark*, *Twigs*, *Bathers Famara*). Nothing in `artworks.json` has been changed by this round yet.

The full row-by-row results are in `inventory_crosscheck.csv`, and website entries with no inventory match are in `site_only_artworks.csv`.

## Summary

|  | Count |
|---|---|
| Inventory works compared | 536 (281 prints, 233 watercolours, 22 sculptures) |
| Inventory works matched to the website | 348, covering 371 website entries |
| Website entries matched: confident / to confirm / manual | 303 / 63 / 5 |
| Inventory works not found on the website | 188 |
| Website entries not found in the inventory | 142 |
| **Date mismatches** | 23 |
| Date missing on website (inventory has one) | 55 |
| **Dimension mismatches** | 56 |
| Dimensions same, but width/height swapped | 2 |
| Dimensions missing on website (inventory has them) | 15 |

## Things to know before applying fixes

1. **Most sculptures appear on the website more than once.** They're in both the Bradford retrospective list and the 1963–2006 list, and some also have detail shots or exhibition photos (such as the Stockholm shots). One inventory sculpture can therefore match several website entries. The two catalogue entries count as confident matches; details and exhibition photos are marked "to confirm".
2. **Website sculpture sizes are written into the titles**, for example `(1) Raft 600x360x170 mm`, and the `dimensions` field is empty. The comparison reads the size from the title. Applying fixes would fill in `dimensions` and leave the titles as they are, unless you'd like the sizes taken out of the titles too.
3. **Some inventory sculpture sizes may be transcription slips.** *Flywheel* is 990x87x113 in the JSON but 990x870x1130 on the website. The 2013 copy of the inventory splits that number across lines, which is where zeros get lost, so the website is probably right here. *Twigs* (print 222) is 80x620, which looks like a missing digit. The other sculpture differences (Samurai, Welcome Arch, Titania, Grotto for Torus, Icebergs, Moon over Water) are one or two digits apart and could be wrong on either side; they're worth checking against the PDF.
4. **Many sculptures in the website's 1963–2006 list are dated 1963.** That looks like a placeholder taken from the list's name rather than a real date. The inventory gives the real year.
5. **India watercolour sizes differ a lot.** For several large India watercolours the website's size is much bigger than the inventory's. For example, *The Temple in the Lake* is 1170x860 on the site but 360x540 in the inventory. *Bathing Tent Varanasi* at 8030x6420 mm is clearly a website typo.
6. **Some titles appear twice in the inventory, and only one of each pair is matched.** They are *Titania* (sculptures 9 and 17, identical), *Acrobat descending and pink contortionist* (199 and 203) and *Dotty Skulls* (182 and 228).
7. **Some pairings are fixed by hand.** The three Cirque du Soleil triptych panels (196–198) are paired manually with the website's *No.1/No.2/No.3 … Triptych*. The watercolour sketch *Macho the Cock* (148) is deliberately left unmatched, so that it isn't paired with the website's 1989 print of the same name.
8. **Sculpture 18 may be *Swansong*, not *Fish and Swan*.** The JSON calls it *Fish and Swan* (1989, 1850x640x550). That is exactly the size and year of the website's *Swansong*, and the 2013 copy of the inventory lists *Swansong* between *Titania* and *Grotto for Toros*, which is where item 18 sits. (It mentions *Fish and Swan* only as an installation photo at the Nehru Centre.) As it stands, 18 is paired (to confirm) with the website's *Fish* (1920x880x480), which is probably wrong. It's worth checking the PDF before applying.

## Date mismatches

| Section | Inv. no | Inventory title | Inventory | Website | Website title | Match |
|---|---|---|---|---|---|---|
| Prints | 221 | Bark | 2003 | 2004 | Bark on Picon | probable |
| Prints | 222 | Twigs | 2003 | 2004 | Twigs And Shoots | probable |
| Watercolours | 129 | Rust | 2013 | 2011 | Rust | exact |
| Watercolours | 181 | Bikinis drying | 2013 | 2011 | Bikinis drying | exact |
| Watercolours | 184 | Two Skulls in the Lava Field | 2013 | 2011 | Two sculls in the lava field | exact |
| Watercolours | 221 | Lorca's Flowers | 2013 | 2011 | Lorca's flowers | exact |
| Watercolours | 222 | Sexy Flowers in a Bay | 2012 | 2011 | Sexy flowers in a landscape | probable |
| Watercolours | 223 | Katalina's wall flowers | 2013 | 2011 | atalina's wall flowers rev | probable |
| Watercolours | 224 | House with Bougainvillea | 2012 | 2011 | House with burganvillia | probable |
| Watercolours | 226 | Plunging beauty with red flowers | 2012 | 2011 | plunging beauty & red flowers | probable |
| Watercolours | 228 | Dotty skulls | 2013 | 2011 | Dotty sculls | probable |
| Sculptures | 2 | Samurai | 1969 | 1963 | 49 Samurai (Stockholm) | probable |
| Sculptures | 3 | Windows | 1971 | 1969 | 09 Windows 1100x850x150 mm | exact |
| Sculptures | 3 | Windows | 1971 | 1969 | (4) Windows 1100x850x150 mm | exact |
| Sculptures | 3 | Windows | 1971 | 1969 | 10 Windows | exact |
| Sculptures | 7 | Step into the future | 1975 | 1963 | 15 Step into the Future q1975 400x480x300 mm | exact |
| Sculptures | 12 | Hover cube | 1989 | 1963 | 26 Hovercube1989 700x780x300 mm | exact |
| Sculptures | 15 | Ego the Goat | 1987 | 1963 | 52 Ego The Goat (Stockholm) | probable |
| Sculptures | 16 | Woman in Waves | 1989 | 1963 | 28 Woman in Waves 950x600x560 mm | exact |
| Sculptures | 17 | Titania | 1990 | 1963 | 50 Titania (Stockholm) | probable |
| Sculptures | 18 | Fish and Swan | 1989 | 2000 | 38 Fish 1920x880x480 mm | probable |
| Sculptures | 19 | Grotto for Toros | 1989 | 1963 | 37 Grotto for Torus 1430x1350x1350 mm | exact |
| Sculptures | 22 | SPA | 2003 | 1963 | 42 SPA (detail) | probable |

## Dimension mismatches (mm)

| Section | Inv. no | Inventory title | Inventory | Website | Website title | Match |
|---|---|---|---|---|---|---|
| Prints | 221 | Bark | 760x550 | 760 x 560 mm | Bark on Picon | probable |
| Prints | 222 | Twigs | 80x620 | 900 x 680 mm | Twigs And Shoots | probable |
| Watercolours | 124 | Prickly pears at la Asomada | 460x600 | 430 x 570 mm | 02 La Asomada | probable |
| Watercolours | 131 | Still life with bucket and gourd | 460x600 | 500 x 700 mm | 21 Still Life With Beans | probable |
| Watercolours | 132 | Still life with shell | 440x640 | 460 x 640 mm | 22 Still life with Shell | exact |
| Watercolours | 133 | Still life with fruit | 450x600 | 450 x 650 mm | 29 Still Life with Birds | probable |
| Watercolours | 135 | View from the Delhi Observatory | 370x500 | 860 x 1170 mm | Views of the Delhi Observatory | probable |
| Watercolours | 143 | Turkey walk | 460x620 | 460 x 600 mm | 26 Turkeywalk | exact |
| Watercolours | 158 | Airing the Family Bed India | 450x560 | 870 x 1040 mm | Airing the Family Bed Aurangabad | probable |
| Watercolours | 159 | At the Delhi Observatory | 390x570 | 1170 x 860 mm | At the Delhi Observatory | exact |
| Watercolours | 160 | Bathing hut Varanasi | 450x590 | 8030 x 6420 mm | Bathing Tent Varanasi | probable |
| Watercolours | 161 | The Temple in the lake | 360x540 | 1170 x 860 mm | The Temple in the Lake | exact |
| Watercolours | 162 | Cotton Traders | 440x630 | 860 x 1170 mm | Cotton Traders, Aurangabad | probable |
| Watercolours | 166 | Holy Cows | 860x1170 | 870 x 1030 mm | Holy cows | exact |
| Watercolours | 167 | Mud house with figures Khajuraho | 490x660 | 450 x 560 mm | Mud House with figures Kujaharo | probable |
| Watercolours | 170 | Painted elephants | 1180x520 | 1170 x 860 mm | The painted Elephants, Jaipur | probable |
| Watercolours | 171 | Watermill Aurangabad | 1180x860 | 1170 x 860 mm | Watermill Aurangabad | exact |
| Watercolours | 173 | Elephant Gate | 1180x860 | 1170 x 860 mm | The Elephant Gate, Jaipur | probable |
| Watercolours | 174 | Blue City | 1180x860 | 500 x 860 mm | The Blue City Jaisalmer | probable |
| Watercolours | 175 | Stained glass reflections | 570x660 | 640 x 538 mm | Stained glass reflections | exact |
| Watercolours | 176 | Stained Glass and roof terraces | 570x660 | 870 x 1020 mm | Stained Glass and Roof Terraces Jodhpur | probable |
| Watercolours | 177 | Pottery village | 440x540 | 676 x 553 mm | Pottery Village, Kujarajo | probable |
| Watercolours | 179 | The Pyre Varanasi | 1017x860 | 1170 x 860 mm | Pyre | probable |
| Watercolours | 180 | The Heritage India | 860x1017 | 860 x 1170 mm | Heritage | probable |
| Watercolours | 186 | Spotlights | 440x380 | 500 x 380 mm | Spotlights | exact |
| Watercolours | 187 | Dolphin ride | 440x380 | 500 x 380 mm | Dolphin Ride | exact |
| Watercolours | 188 | La Movida | 500x300 | 500 x 380 mm | La Movida | exact |
| Watercolours | 189 | Giant projection screen | 300x500 | 380 x 500 mm | Giant Projection Screen | exact |
| Watercolours | 190 | Superwoman Roundabout | 500x300 | 500 x 380 mm | Superwoman roundabout | exact |
| Watercolours | 191 | Spiderman roundabout | 650x330 | 500 x 380 mm | Spiderman Roundabout | exact |
| Watercolours | 192 | Spiderman | 500x300 | 500 x 380 mm | Spiderman | exact |
| Watercolours | 193 | Spiderman and dolphins | 300x500 | 380 x 500 mm | Spiderman & Dolphins | exact |
| Watercolours | 194 | Fairground structures | 500x300 | 500 x 380 mm | Fairground Structures | exact |
| Watercolours | 195 | The bull ride | 300x500 | 380 x 500 mm | The Bull Ride | exact |
| Watercolours | 196 | Triptych no 1 | 1017x860 | 1180 x 870 mm | No.1 dancer & clown Triptych | manual |
| Watercolours | 197 | Triptych no 2 | 1017x860 | 1180 x 870 mm | No.2 Bring in The Clowns Triptych | manual |
| Watercolours | 198 | Triptych no 3 | 1017x860 | 1180 x 870 mm | No.3 The Grand Slide Triptych | manual |
| Watercolours | 203 | Acrobat descending and pink contortionist | 760x570 | 1760 x 1570 mm | Acrobats Descending and Pink Cortortionist | exact |
| Watercolours | 204 | Blue Acrobat with Shadows | 760x570 | 630 x 480 mm | Blue acrobat with shadows | exact |
| Watercolours | 206 | Pink acrobats with poles and ropes | 300x210 | 460 x 560 mm | Pink Acrobats with Poles & Ropes | exact |
| Watercolours | 224 | House with Bougainvillea | 650x850 | 820 x 650 mm | House with burganvillia | probable |
| Sculptures | 2 | Samurai | 1329x500x250 | 1320x550x250 mm | 08 Samurai 1320x550x250 mm | exact |
| Sculptures | 2 | Samurai | 1329x500x250 | 1320x550x250 mm | (3) Samurai 1320x550x250 mm | exact |
| Sculptures | 4 | Welcome Arch | 1800x1120x400 | 1800x1120x100 mm | 11 Welcome Arch 1800x1120x100 mm | exact |
| Sculptures | 4 | Welcome Arch | 1800x1120x400 | 1800x1120x100 mm | (5) Welcome Arch 1800x1120x100 mm | exact |
| Sculptures | 9 | Titania | 2410x180x1120 | 2410x1180x1120 mm | (20) Titania 2410x1180x1120 mm | exact |
| Sculptures | 10 | Fly wheel | 990x87x113 | 990x870x1130 mm | 19 Flywheel 990x870x1130 mm | exact |
| Sculptures | 10 | Fly wheel | 990x87x113 | 990x870x1130 mm | (12) Flywheel 990x870x1130 mm | exact |
| Sculptures | 15 | Ego the Goat | 1300x1070x1067 | 1300 x 1070 mm | 34 Ego the Goat | exact |
| Sculptures | 15 | Ego the Goat | 1300x1070x1067 | 1300 x 1070 mm | (17) Ego the Goat | exact |
| Sculptures | 18 | Fish and Swan | 1850x640x550 | 1920x880x480 mm | 38 Fish 1920x880x480 mm | probable |
| Sculptures | 19 | Grotto for Toros | 1930x1350x1350 | 1430x1350x1350 mm | 37 Grotto for Torus 1430x1350x1350 mm | exact |
| Sculptures | 19 | Grotto for Toros | 1930x1350x1350 | 1430x1350x1350 mm | (21) Grotto for Torus 1430x1350x1350 mm | exact |
| Sculptures | 20 | Icebergs | 300x360x160 | 300x360x170 mm | 29 Icebergs 300x360x170 mm | exact |
| Sculptures | 20 | Icebergs | 300x360x160 | 300x360x170 mm | (22) Icebergs 300x360x170 mm | exact |
| Sculptures | 23 | Moon Over the Water | 810x1100x640 | 890x1100x640 mm | 36 Moon over Water 890x1100x640 mm | probable |

## Missing on the website but present in the inventory

| Section | Inv. no | Website title | Missing field | Inventory value |
|---|---|---|---|---|
| Watercolours | 158 | Airing the Family Bed Aurangabad | date | 2007 |
| Watercolours | 159 | At the Delhi Observatory | date | 2007 |
| Watercolours | 160 | Bathing Tent Varanasi | date | 2007 |
| Watercolours | 161 | The Temple in the Lake | date | 2007 |
| Watercolours | 162 | Cotton Traders, Aurangabad | date | 2007 |
| Watercolours | 163 | Courtyard with Buffalo | date | 2007 |
| Watercolours | 164 | Girls Washing Saris | date | 2007 |
| Watercolours | 165 | Harem | date | 2007 |
| Watercolours | 166 | Holy cows | date | 2007 |
| Watercolours | 167 | Mud House with figures Kujaharo | date | 2007 |
| Watercolours | 168 | Mumbai Harbour | date | 2007 |
| Watercolours | 170 | The painted Elephants, Jaipur | date | 2007 |
| Watercolours | 171 | Watermill Aurangabad | date | 2007 |
| Watercolours | 173 | The Elephant Gate, Jaipur | date | 2007 |
| Watercolours | 174 | The Blue City Jaisalmer | date | 2007 |
| Watercolours | 175 | Stained glass reflections | date | 2007 |
| Watercolours | 176 | Stained Glass and Roof Terraces Jodhpur | date | 2007 |
| Watercolours | 177 | Pottery Village, Kujarajo | date | 2007 |
| Watercolours | 179 | Pyre | date | 2007 |
| Watercolours | 180 | Heritage | date | 2007 |
| Watercolours | 186 | Spotlights | date | 2012 |
| Watercolours | 187 | Dolphin Ride | date | 2012 |
| Watercolours | 188 | La Movida | date | 2012 |
| Watercolours | 189 | Giant Projection Screen | date | 2012 |
| Watercolours | 190 | Superwoman roundabout | date | 2012 |
| Watercolours | 191 | Spiderman Roundabout | date | 2012 |
| Watercolours | 192 | Spiderman | date | 2012 |
| Watercolours | 193 | Spiderman & Dolphins | date | 2012 |
| Watercolours | 194 | Fairground Structures | date | 2012 |
| Watercolours | 195 | The Bull Ride | date | 2012 |
| Watercolours | 196 | No.1 dancer & clown Triptych | date | 2011 |
| Watercolours | 197 | No.2 Bring in The Clowns Triptych | date | 2011 |
| Watercolours | 198 | No.3 The Grand Slide Triptych | date | 2011 |
| Watercolours | 200 | All hanging on Ropes | date | 2011 |
| Watercolours | 201 | Bring in the Clowns sketch | date | 2011 |
| Watercolours | 202 | Acrobat with 4 clowns sketch | date | 2011 |
| Watercolours | 203 | Acrobats Descending and Pink Cortortionist | date | 2011 |
| Watercolours | 204 | Blue acrobat with shadows | date | 2011 |
| Watercolours | 205 | Pink acrobat & audience sketch | date | 2011 |
| Watercolours | 206 | Pink Acrobats with Poles & Ropes | date | 2011 |
| Watercolours | 207 | Dance with red courtains and ropes | date | 2011 |
| Watercolours | 208 | Grand slide sketch | date | 2011 |
| Watercolours | 209 | The big Wheel | date | 2011 |
| Watercolours | 210 | Acrobats & Dancers with yellow spotlights | date | 2011 |
| Watercolours | 211 | Great white Slide | date | 2011 |
| Watercolours | 212 | All on a Rope | date | 2011 |
| Watercolours | 213 | Dancers & Roof stucture light | date | 2011 |
| Watercolours | 214 | Juggler & Pottery Man | date | 2011 |
| Watercolours | 215 | Juggler &Dancer Light | date | 2011 |
| Watercolours | 216 | Net dancer | date | 2011 |
| Watercolours | 217 | Yellow Spotlights & Smoke Black & Colour | date | 2011 |
| Watercolours | 219 | Purple masks, Orange Wings | date | 2011 |
| Sculptures | 12 | (14) Hovercube1989 700x780x300 mm | date | 1989 |
| Sculptures | 16 | (18) Woman in Waves 950x600x560 mm | date | 1989 |
| Sculptures | 19 | (21) Grotto for Torus 1430x1350x1350 mm | date | 1989 |
| Watercolours | 129 | Rust | dimensions | 430x540 |
| Watercolours | 181 | Bikinis drying | dimensions | 860x1017 |
| Watercolours | 184 | Two sculls in the lava field | dimensions | 1170x850 |
| Watercolours | 215 | Juggler &Dancer Light | dimensions | 300x210 |
| Watercolours | 216 | Net dancer | dimensions | 300x210 |
| Watercolours | 219 | Purple masks, Orange Wings | dimensions | 300x210 |
| Watercolours | 221 | Lorca's flowers | dimensions | 380x520 |
| Watercolours | 228 | Dotty sculls | dimensions | 860x1170 |
| Sculptures | 2 | 49 Samurai (Stockholm) | dimensions | 1329x500x250 |
| Sculptures | 3 | 10 Windows | dimensions | 1100x850x150 |
| Sculptures | 14 | 24 Macho the Cock (detail) | dimensions | 1180x1230x1140 |
| Sculptures | 15 | 52 Ego The Goat (Stockholm) | dimensions | 1300x1070x1067 |
| Sculptures | 17 | 32 Titania | dimensions | 2410x180x1120 |
| Sculptures | 17 | 50 Titania (Stockholm) | dimensions | 2410x180x1120 |
| Sculptures | 22 | 42 SPA (detail) | dimensions | 1640x700x700 |

## Width/height swapped only

| Section | Inv. no | Title | Inventory | Website |
|---|---|---|---|---|
| Prints | 120b | Divine Proportions | 600x780 | 780 x 600 mm |
| Watercolours | 163 | Courtyard with Buffalo | 860x1170 | 1170 x 860 mm |

## Probable matches: please confirm

These pairs were matched on similar titles, on one title containing the other, or on a detail or exhibition photo of a sculpture. The differences listed above for these pairs only hold if the pairing is right.

| Section | Inv. no | Inventory title | Website title | Website category | Score |
|---|---|---|---|---|---|
| Prints | 91 | Knossos | nossos | Prints / 1966-1976 | 0.92 |
| Prints | 172 | Self defence | 05 Self defence | Watercolours & Collages / Guess who is coming for dinner | 1.00 |
| Prints | 221 | Bark | Bark on Picon | Prints / 2002-2006l | 0.80 |
| Prints | 222 | Twigs | Twigs And Shoots | Prints / 2002-2006l | 0.80 |
| Prints | 237 | Ragtime 1 | Ragtime A | Prints / 2002-2006l | 0.89 |
| Prints | 238 | Ragtime 2 | Ragtime B | Prints / 2002-2006l | 0.89 |
| Prints | 239 | Ragtime 3 | Ragtime C | Prints / 2002-2006l | 0.89 |
| Prints | 248 | Indian Fabric with yellow edges | Indian Rug with Yellow Edges | Prints / 2011-2016 | 0.88 |
| Prints | 250 | Tissues 2 | No 2 Tissues | Prints / 2011-2016 | 0.88 |
| Prints | 251 | Tissues 3 | No 3 Tissues | Prints / 2011-2016 | 0.88 |
| Prints | 256 | Indian rug with engraved objects | Indian rug with engraved sculpture | Prints / 2007-2010 | 0.79 |
| Prints | 262b | To Challenge | 01 To challenge.jpg | Livres d'artiste / Dartiste | 0.86 |
| Prints | 263b | Chose Life | 02 Choose Life | Livres d'artiste / Dartiste | 0.95 |
| Prints | 264b | Music turns back clock | 03 Music Turns Back Clock | Livres d'artiste / Dartiste | 1.00 |
| Prints | 265b | Inspire Dreams (v1) | 04 Inspire Dreams | Livres d'artiste / Dartiste | 1.00 |
| Prints | 267b | Listen to the heart | 06 Listen to the Heart | Livres d'artiste / Dartiste | 1.00 |
| Prints | 269 | Just a new Promise | 08 Just a New Promise | Livres d'artiste / Dartiste | 1.00 |
| Watercolours | 15 | Backdrop to Arungabad | Backdrop Aurangabad | Watercolours & Collages / India small | 0.85 |
| Watercolours | 16 | Arungabad Mill (sketch) | Aurangabad Mill | Watercolours & Collages / India small | 0.90 |
| Watercolours | 20 | Desert with Trees | Desert with Trees Bikaner | Watercolours & Collages / India small | 0.81 |
| Watercolours | 28 | Bathers Famara | 06 Bathers | Watercolours & Collages / Lanzarote | 0.80 |
| Watercolours | 39 | Children with Pet Goats | Children with Pet Goats Bikaner | Watercolours & Collages / India small | 0.85 |
| Watercolours | 124 | Prickly pears at la Asomada | 02 La Asomada | Watercolours & Collages / Lanzarote | 0.80 |
| Watercolours | 131 | Still life with bucket and gourd | 21 Still Life With Beans | Watercolours & Collages / Lanzarote | 0.75 |
| Watercolours | 133 | Still life with fruit | 29 Still Life with Birds | Watercolours & Collages / Lanzarote | 0.81 |
| Watercolours | 135 | View from the Delhi Observatory | Views of the Delhi Observatory | Watercolours & Collages / India large | 0.92 |
| Watercolours | 158 | Airing the Family Bed India | Airing the Family Bed Aurangabad | Watercolours & Collages / India large | 0.81 |
| Watercolours | 160 | Bathing hut Varanasi | Bathing Tent Varanasi | Watercolours & Collages / India large | 0.88 |
| Watercolours | 162 | Cotton Traders | Cotton Traders, Aurangabad | Watercolours & Collages / India large | 0.80 |
| Watercolours | 165 | Harem Jodhpur | Harem | Watercolours & Collages / India large | 0.80 |
| Watercolours | 167 | Mud house with figures Khajuraho | Mud House with figures Kujaharo | Watercolours & Collages / India small | 0.89 |
| Watercolours | 170 | Painted elephants | The painted Elephants, Jaipur | Watercolours & Collages / India large | 0.80 |
| Watercolours | 173 | Elephant Gate | The Elephant Gate, Jaipur | Watercolours & Collages / India large | 0.80 |
| Watercolours | 174 | Blue City | The Blue City Jaisalmer | Watercolours & Collages / India small | 0.80 |
| Watercolours | 176 | Stained Glass and roof terraces | Stained Glass and Roof Terraces Jodhpur | Watercolours & Collages / India large | 0.89 |
| Watercolours | 177 | Pottery village | Pottery Village, Kujarajo | Watercolours & Collages / India large | 0.80 |
| Watercolours | 179 | The Pyre Varanasi | Pyre | Watercolours & Collages / India large | 0.80 |
| Watercolours | 180 | The Heritage India | Heritage | Watercolours & Collages / India large | 0.80 |
| Watercolours | 200 | All Hanging From Ropes | All hanging on Ropes | Watercolours & Collages / Albert hall cirque du soliel | 0.90 |
| Watercolours | 202 | Acrobat with Clowns | Acrobat with 4 clowns sketch | Watercolours & Collages / Albert hall cirque du soliel | 0.81 |
| Watercolours | 205 | Pink Acrobat and audience | Pink acrobat & audience sketch | Watercolours & Collages / Albert hall cirque du soliel | 0.88 |
| Watercolours | 207 | Dance with red poles and ropes | Dance with red courtains and ropes | Watercolours & Collages / Albert hall cirque du soliel | 0.84 |
| Watercolours | 208 | Grand Slide | Grand slide sketch | Watercolours & Collages / Albert hall cirque du soliel | 0.80 |
| Watercolours | 211 | The Great white slide | Great white Slide | Watercolours & Collages / Blind drawings albert hall cirque du soliel | 0.89 |
| Watercolours | 212 | All on the ropes | All on a Rope | Watercolours & Collages / Blind drawings albert hall cirque du soliel | 0.83 |
| Watercolours | 213 | Dancers and roof structure | Dancers & Roof stucture light | Watercolours & Collages / Blind drawings albert hall cirque du soliel | 0.88 |
| Watercolours | 215 | Juggler and dancer | Juggler &Dancer Light | Watercolours & Collages / Blind drawings albert hall cirque du soliel | 0.86 |
| Watercolours | 217 | Yellow spotlight and smoke | Yellow Spotlights & Smoke Black & Colour | Watercolours & Collages / Blind drawings albert hall cirque du soliel | 0.74 |
| Watercolours | 219 | Purple Masks and orange wings | Purple masks, Orange Wings | Watercolours & Collages / Blind drawings albert hall cirque du soliel | 0.93 |
| Watercolours | 220 | Acrobats with white slide | Acrobats with White Sheets | Watercolours & Collages / Blind drawings albert hall cirque du soliel | 0.86 |
| Watercolours | 222 | Sexy Flowers in a Bay | Sexy flowers in a landscape | Watercolours & Collages / 2011-2014 | 0.79 |
| Watercolours | 223 | Katalina's wall flowers | atalina's wall flowers rev | Watercolours & Collages / 2011-2014 | 0.90 |
| Watercolours | 224 | House with Bougainvillea | House with burganvillia | Watercolours & Collages / 2011-2014 | 0.89 |
| Watercolours | 226 | Plunging beauty with red flowers | plunging beauty & red flowers | Watercolours & Collages / 2011-2014 | 0.89 |
| Watercolours | 228 | Dotty skulls | Dotty sculls | Watercolours & Collages / 2011-2014 | 0.92 |
| Sculptures | 2 | Samurai | 49 Samurai (Stockholm) | Sculptures & Installations / 1963-2006 | 1.00 |
| Sculptures | 14 | Macho the Cock | 24 Macho the Cock (detail) | Sculptures & Installations / 1963-2006 | 1.00 |
| Sculptures | 15 | Ego the Goat | 52 Ego The Goat (Stockholm) | Sculptures & Installations / 1963-2006 | 1.00 |
| Sculptures | 17 | Titania | 50 Titania (Stockholm) | Sculptures & Installations / 1963-2006 | 1.00 |
| Sculptures | 18 | Fish and Swan | 38 Fish 1920x880x480 mm | Sculptures & Installations / 1963-2006 | 0.80 |
| Sculptures | 21 | Prismatic Space | 40 Prismatic Shapes 420x230x480 mm | Sculptures & Installations / 1963-2006 | 0.84 |
| Sculptures | 22 | SPA | 42 SPA (detail) | Sculptures & Installations / 1963-2006 | 1.00 |
| Sculptures | 23 | Moon Over the Water | 36 Moon over Water 890x1100x640 mm | Sculptures & Installations / 1963-2006 | 0.88 |

## Inventory works not found on the website

**Prints** (55): 17 Kent (1961); 25 Charm Against Evil (1963); 52 Temple (1967); 54 Jack boot (1976); 55 The Past A/P (1976); 62 Moonshots (1968); 63 Ribs and String (1969); 64 Ideas for an architectural site (1968); 97 Woman at the Edge (1998); 128 Airport beach Sketch (1988); 129 Musicians 1 (1989); 130 Musicians 2 (1989); 151 Seed onions (1997); 156 Twiggy with red lips (1998); 157 Twiggy with Coloured background (1998); 160 The Blue Mine (2000); 161 Mystification (2000); 162 A Knock at the Door (2001); 196 Combat (2001); 200 Clowns (2003); 201 Clowns in Black (2003); 204 Shipyard Aerial View No 2 (Shipyard) (2002); 206 Secret Patterns (2002); 212 Sculpture with grass and stubble (2001); 213 To Catch a Butterfly (colour) (2003); 214 Free (The Gates of Hell - Detail) (2003); 217 Picnic (2005); 220 To Catch a Butterfly (2004); 224 Self defence & Defence (2004); 226 To Challenge (From Text messages) (2005); 234 Engraved stones (The Floating World) (2006); 236 Grass and netting (The Floating World) (2006); 242 Memorabilia (small version) (2006); 243 The Wave; 246 Kabuki (2002); 249 Tissues 1 (2012); 253 Sculls with colours; 255 Sculls in the News (2013); 258 Titania Inverted (2012); 259 Indian rug with roots and dancer (2012); 260 Hand and Eye coordination (2006); 261 Twigs with Purple Sky (2014); 262 Grass and Twigs (2008); 263 The Plastic Fence (2014); 264 Sculls in the News (2014); 265 The Vine Press (2014); 270 Cover (Text Messages) (2005); 271 To challenge (Text Messages) (2005); 272 Choose life (Text Messages) (2005); 273 Music turns back clock (Text Messages) (2005); 274 Inspire dreams (Text Messages) (2005); 275 Finding Reasons (Text Messages) (2005); 276 Listen to the heart (Text Messages) (2005); 277 Old Master (Text Messages) (2005); 278 Just a new promise (Text Messages) (2005)

**Watercolours** (133): 25 Pushkar Farmland (2007); 26 Figures on the Beach; 27 Girls at Famara Washing (sketch) (1986); 33 Apostle with stone arches (1996); 34 Diver and Dreamer (sketch); 35 Cacti and rocks (2013); 37 Cactus and Hosepipe (2013); 38 Camp fire (1995); 40 Charcoal burner and old iron; 41 Dancer and harpist (1995); 42 Famara Water station with male nude; 43 Family with pregnant woman; 44 Farm buildings and volcano; 45 Figures on a beach towel; 46 Funnel and rock formation; 48 Geometric shapes at night; 49 Gipsies putting up a frame tent; 50 Girls washing their hair (1986); 51 Goat in a Bay with Barges; 52 Goats in a Bay; 53 Headless Woman on the Beach; 54 Hot Landscape with lovers; 55 La Geria with bird scares (1908); 56 Lava flow with sunny background (1908); 57 Lolita and Blue Beard; 58 Mother and baby on the beach; 59 Musicians no 3; 60 Nude in front of mirror; 61 Nude woman with Castle; 62 Old and Young woman at the farmhouse; 63 Pregnant woman with engraved stone; 64 Red Stone at the Bodega; 65 Rocks near Mala; 66 Roped abstract; 67 Ruins in the spring; 68 Seed onions; 69 Ruins with girls; 70 Step into the Future (design for Westminster sculpture competition); 71 Terracotta figurines; 72 The Burial; 74 Funnel and YOYO; 75 Two Figures in the tomato field (1986); 76 Talking of history (1986); 77 Vanity; 78 Woman dressing in the doorway; 79 Annuncios house (1989); 80 Cactus and hose pipe (2013); 81 Descent into the crater (2001); 83 Famara beach purifying station (1982); 84 Femme fatale (1987); 85 Figures with a wind shield (1987); 87 Nude with a castle Lanzarote (1987); 89 From Van Gogh to Einstein (2001); 90 Girls on Famara beach (1989); 91 Hillside with figures; 92 House with Roots Papagayo (1989); 93 Loops (2001); 94 Lunar landscape Lanzarote (2001); 95 Musician and dancer; 96 Rock formation in Mala (1998); 97 Sky Spectacular Lanzarote; 98 Stone steles at Mala (1980); 100 Stone washtub (1980); 101 Hello and Goodbye (1998); 102 Water well with figures (1998); 103 Camel station; 104 Temptations (sketch); 105 Chicken run; 106 Dream horse; 107 Dried plant in a sack; 108 Figures at Famara beach; 109 Flowers and clouds; 110 Garden with dead palm; 111 Guess who is coming for dinner; 112 Geranium in the bay; 113 La Haria with clouds; 114 Hills with agaves; 115 House on top of the hill; 116 Vineyard with Clouds; 117 Vineyard with Red Hill; 118 Landscape with stubble and agaves; 119 Lichen on the rocks; 120 Lichen; 121 Mala; 122 Organic abstract; 123 Playing football in the clearing; 125 Red hill with farm; 126 Rockface; 127 Rock formations; 128 Roots and Lichen; 130 Spring shower; 134 The big Fish; 137 The Hopoo bird; 138 The horses own Patio; 139 Tomato Crop; 140 The orange House; 141 Waterman's yard; 142 The Wheelbarrow; 144 Turkeys Marching Home; 145 Twist; 146 Two nudes; 147 Landscape with yellow sky (1985); 148 Macho the Cock (Sketch) (1985); 149 Vineyard at the volcano (2012); 150 Volcano, wheelbarrow and cooking pot; 151 Volcano & Stone formation; 152 Volcano and see of lava; 153 Volcano and succulents; 154 Wild flowers at the Caves; 155 The Wild ones (Sketch); 156 Wild Flowers with Castle; 157 Yellow flowers, Orange cloud; 172 The Noria (2007); 178 Pushkar with Red Background (2007); 182 Dotty Skulls (2013); 183 Drying the Cloth on the Ground (2009); 185 Spotty Skulls (2013); 199 Acrobat descending and pink contortionist (2011); 218 Smoke (2011); 225 Sexy Flowers red and orange (2012); 227 White and yellow flowers (2012); 229 Sculls in the lava field (2013); 230 Two sculls with coloured background (2013); 231 Interchange (2014); 232 Succulents (2014); 233 Butterfly (2014); 234 Butterfly in Patio (2014); 235 Plants and butterfly (2014); 236 Hibiscus and the moon (2014); 237 Pond 1 (2014); 238 Pond 2 (2014); 239 Twigs and Plumbago (2014); 240 The grand hibiscus (2014)

**Sculptures** (0): none

## Website works not found in the inventory

| Category | Count |
|---|---|
| Sculptures & Installations | 54 |
| Watercolours & Collages | 45 |
| Livres d'artiste | 27 |
| Prints | 16 |

Website **Sculptures & Installations** with no inventory match: (2) Helios 240x800x480 mm; (6) Inner Lights 340x180x180 mm; (11) Oyster 2200x1240x700 mm; (16) Embrace 1080x780x300 mm; (19) Swansong 1850x640x550 mm; (23) Fish 1920x880x480 mm; (24) Moon over Water 890x1100x640 mm; (25) Prismatic Shapes 420x230x480 mm; (26) SPA Detail 1640x700x700mm; (27) Installation Nehru Center; (28) Installation Bradford Cartwright Hall; (29) Arch of Swan Nehru Center; Sculpture - Arch of Swan Bradford Photo AS Figure with Swan Fish1 Nehru Centre; Arch of Swan; Bradford Photo AS; Figure with Swan; Fish1 Nehru Centre; 0.1 Dorrell Hall Studio; 0.2 Wilton Row Studio; Space Engravings Catalogue Cover; 01 Silo 600x210x180 mm; 02 Silo Detail; 03 Helios 240x800x480 mm; 04 Helios detail; 06 Hephaistos 900x250x250 mm; 07 Aerodinamic Shapes; 12 Inner Lights 340x180x180 mm; 13 Line in Space 930x560x210 mm; 16 Courtship Dance 2000x2000x2000 mm; 18 Oyster 2200x1240x700 mm; 23 Cockrel (detail); 25 Embrace 1080x780x300 mm; 27 Venus Flytrap; 30 Swansong 1850x640x550 mm; 33 Titania D; 35 King & Queen 450x450x290 mm; 43 INST. Stuttgart Geiger; 44 AS. With Frink; 45 Geiger Flywheel; 46 Geiger- Stuttgart - Titania; 47 Mailar galleriet - Lost Cultures; 48 Mailar galleriet; 51 AS. Paul Kovesdy Gal NY; Untitled; Untitled; Untitled; Untitled; Untitled; Untitled; Untitled; Untitled; Untitled; Untitled; Untitled.

Most of these are studio photos, exhibition views and installation shots, or sculptures the inventory doesn't list (such as *Helios*, *Silo*, *Oyster*, *Embrace* and *King & Queen*). A few unmatched watercolours may be the same work under a different title, for example *The Noria* / *The Water Wheel Rajastan* and *Drying the Cloth on the Ground* / *Dying the cloth*. See `site_only_artworks.csv`.
