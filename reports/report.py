"""Render reports/inventory_crosscheck.md from crosscheck.json (run crosscheck.py first)."""
import json, sys
from collections import Counter
OUT = sys.argv[1] if len(sys.argv) > 1 else "."
d = json.load(open(f"{OUT}/crosscheck.json")); rows, site_only = d["rows"], d["site_only"]
m = [r for r in rows if r["match"] != "unmatched"]
sec = lambda r: "Prints" if r["inv_section"].startswith("Prints") else "Watercolours"
esc = lambda s: str(s).replace("|", "\\|")
def table(hdr, data):
    out = ["| " + " | ".join(hdr) + " |", "|" + "---|" * len(hdr)]
    out += ["| " + " | ".join(esc(c) for c in row) + " |" for row in data]
    return "\n".join(out)
L = []
L.append("# Inventory cross-check: website database vs 2014-10 inventory\n")
L.append("This compares `database/artworks.json` (the website) with `database/inventory_2014-10.json`, which is treated as the source of truth for **dimensions, technique and date**. This is a snapshot taken *before* the fixes were applied. `apply_inventory_fixes.py` then applied the inventory values to the confident matches (listed in `applied_changes.csv`). The probable matches below were then reviewed and applied too. The full row-by-row results are in `inventory_crosscheck.csv`, and website entries with no inventory match are in `site_only_artworks.csv`.\n")
L.append("## Summary\n")
L.append(table(["", "Count"], [
    ["Inventory items compared (Prints + Watercolours sections)", len(rows)],
    ["Matched to a website entry", f"{len(m)} ({sum(r['match']=='exact' for r in m)} confident, {sum(r['match']=='probable' for r in m)} to confirm)"],
    ["Inventory items not found on the website", len(rows) - len(m)],
    ["Website entries not found in the inventory", len(site_only)],
    ["**Date mismatches**", sum(r['date_check']=='MISMATCH' for r in m)],
    ["Date missing on website (inventory has one)", sum(r['date_check']=='missing on site' for r in m)],
    ["**Dimension mismatches**", sum(r['dim_check']=='MISMATCH' for r in m)],
    ["Dimensions same, but width/height swapped", sum(r['dim_check']=='orientation only' for r in m)],
    ["Dimensions missing on website (inventory has them)", sum(r['dim_check']=='missing on site' for r in m)],
    ["**Technique**: website has only a generic label", sum(r['technique_check']=='site generic' for r in m)],
]))
L.append("\n## Things to know before applying fixes\n")
L.append("1. **The website doesn't record specific techniques.** Every website entry has a category-level label (`Print`, `Collage, Watercolour`, `Sculpture`…), while the inventory gives the actual process (for example \"Deep bite, engraving & drilling. Colour viscosity printed in purple-black, orange & yellow\"). Fixing technique therefore means copying the inventory text in for all 249 matched works. It's probably best stored in a new field (say `technique_detail`) so the site's filters keep working on the generic label.")
L.append("2. **The inventory disagrees with itself on some sizes.** The website sizes (scraped from the old agathesorel.co.uk) often match the sizes written into the inventory's own image filenames, such as `001 Vagabondage 1959 .br.650x600 mm .jpg`, rather than its size column (Vagabondage: size column 500x660, filename 650x600). This was checked against the text of the June 2014 copy of the inventory. Following your instruction, the size column is treated as authoritative below. The Vagabondage/Saule Pleureur/Via Siena and Le Balcon rows are worth a look at the PDF before changing them.")
L.append("3. **The inventory itself doesn't always say whether a size is image or paper size.** Most prints only fill one of the two columns. The comparison uses whichever one is present.")
L.append("4. **The JSON may have parsing gaps.** For example, the PDF uses number 120 twice (*Divine Proportions*, 1985, 600x780, and *The Wind*). Only *The Wind* is in the JSON, so *Divine Proportions* shows up as website-only. Pages 59–78 (artist's books, sculptures) are also not in the JSON, which is why most `Sculptures & Installations` and `Livres d'artiste` entries appear as website-only.")
L.append("5. **Orientation-only differences** (600x780 vs 780x600) are listed separately. The inventory itself isn't consistent on orientation, so these are low priority.\n")

L.append("## Date mismatches\n")
L.append(table(["Inv. no", "Inventory title", "Inventory", "Website", "Website title", "Match"],
    [[r["inv_no"], r["inv_title"], r["inv_year"], r["site_date"], r["site_title"], r["match"]] for r in m if r["date_check"]=="MISMATCH"]))
L.append("\n## Dimension mismatches (mm)\n")
L.append(table(["Section", "Inv. no", "Inventory title", "Inventory", "Website", "Website title", "Match"],
    [[sec(r), r["inv_no"], r["inv_title"], r["inv_size_mm"], r["site_dimensions"], r["site_title"], r["match"]] for r in m if r["dim_check"]=="MISMATCH"]))
L.append("\n## Missing on the website but present in the inventory\n")
L.append(table(["Inv. no", "Title", "Missing field", "Inventory value"],
    [[r["inv_no"], r["site_title"], "date", r["inv_year"]] for r in m if r["date_check"]=="missing on site"] +
    [[r["inv_no"], r["site_title"], "dimensions", r["inv_size_mm"]] for r in m if r["dim_check"]=="missing on site"]))
L.append("\n## Width/height swapped only\n")
L.append(table(["Inv. no", "Title", "Inventory", "Website"],
    [[r["inv_no"], r["inv_title"], r["inv_size_mm"], r["site_dimensions"]] for r in m if r["dim_check"]=="orientation only"]))
L.append("\n## Probable matches: please confirm\n")
L.append("These pairs were matched on similar titles, or across different categories. The mismatches listed above for these pairs only hold if the pairing is right.\n")
L.append(table(["Inv. no", "Inventory title", "Website title", "Website category", "Score"],
    [[r["inv_no"], r["inv_title"], r["site_title"], f'{r["site_category"]} / {r["site_subcategory"]}', r["match_score"]] for r in m if r["match"]=="probable"]))
L.append("\n## Inventory works not found on the website\n")
for s in ("Prints", "Watercolours"):
    items = [r for r in rows if r["match"]=="unmatched" and sec(r)==s]
    L.append(f"**{s}** ({len(items)}): " + "; ".join(f'{r["inv_no"]} {r["inv_title"]}' + (f' ({r["inv_year"]})' if r["inv_year"] else "") for r in items) + "\n")
L.append("## Website works not found in the inventory\n")
L.append(table(["Category", "Count"], [[k, v] for k, v in Counter(x["category"] for x in site_only).most_common()]))
L.append("\nWebsite **Prints** with no inventory match: " + "; ".join(f'{x["title"]} ({x["date"]})' for x in site_only if x["category"]=="Prints") + ".\n")
L.append("Most of the unmatched Watercolours & Collages (Lanzarote, India, Cirque du Soleil, Fairground series) are simply not listed in the inventory's watercolour section. A few may be the same work under a different title, for example *Cactus and Watering hose* / *Cactus and Hosepipe*, *06 Bathers* / *Bathers Famara*, *Bark on Picon* / *Bark*, and *Twigs And Shoots* / *Twigs*. See `site_only_artworks.csv`.")
open(f"{OUT}/inventory_crosscheck.md", "w").write("\n".join(L) + "\n")
