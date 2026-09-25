"""Render reports/inventory_crosscheck.md from crosscheck.json (run crosscheck.py first)."""
import json, sys
from collections import Counter
OUT = sys.argv[1] if len(sys.argv) > 1 else "."
d = json.load(open(f"{OUT}/crosscheck.json")); rows, site_only = d["rows"], d["site_only"]
m = [r for r in rows if r["match"] != "unmatched"]
sec = lambda r: {"Prints": "Prints", "Watercolours": "Watercolours", "Acrylic": "Sculptures"}[r["inv_section"].split()[0].rstrip(",")]
work = lambda r: (r["inv_section"], str(r["inv_no"]))
esc = lambda s: str(s).replace("|", "\\|")
def table(hdr, data):
    if not data:
        return "_None._"
    out = ["| " + " | ".join(hdr) + " |", "|" + "---|" * len(hdr)]
    out += ["| " + " | ".join(esc(c) for c in row) + " |" for row in data]
    return "\n".join(out)

works = {work(r) for r in rows}
matched_works = {work(r) for r in m}
by_sec = Counter(sec(r) for r in {work(r): r for r in rows}.values())
L = []
L.append("# Inventory cross-check: website database vs 2014-10 inventory\n")
L.append("This compares the **current** `database/artworks.json`, which already has the first round of fixes, with the **complete** `database/inventory_2014-10.json` (all 78 pages). The inventory is the source of truth for **dimensions, technique and date**. Differences from the first round are already fixed and appear here as `ok`. The first round's report is in git history (commit `5ce6b43`), and the changes it led to are in `applied_changes.csv`.\n")
L.append("What's new in this round: watercolours 122–240, the 22 acrylic sculptures and installations, *Divine Proportions* (120b), and three prints/watercolours that now match thanks to better title matching (*Bark*, *Twigs*, *Bathers Famara*). Nothing in `artworks.json` has been changed by this round yet.\n")
L.append("The full row-by-row results are in `inventory_crosscheck.csv`, and website entries with no inventory match are in `site_only_artworks.csv`.\n")
L.append("## Summary\n")
L.append(table(["", "Count"], [
    ["Inventory works compared", f"{len(works)} ({by_sec['Prints']} prints, {by_sec['Watercolours']} watercolours, {by_sec['Sculptures']} sculptures)"],
    ["Inventory works matched to the website", f"{len(matched_works)}, covering {len(m)} website entries"],
    ["Website entries matched: confident / to confirm / manual", f"{sum(r['match']=='exact' for r in m)} / {sum(r['match']=='probable' for r in m)} / {sum(r['match']=='manual' for r in m)}"],
    ["Inventory works not found on the website", len(works) - len(matched_works)],
    ["Website entries not found in the inventory", len(site_only)],
    ["**Date mismatches**", sum(r['date_check']=='MISMATCH' for r in m)],
    ["Date missing on website (inventory has one)", sum(r['date_check']=='missing on site' for r in m)],
    ["**Dimension mismatches**", sum(r['dim_check']=='MISMATCH' for r in m)],
    ["Dimensions same, but width/height swapped", sum(r['dim_check']=='orientation only' for r in m)],
    ["Dimensions missing on website (inventory has them)", sum(r['dim_check']=='missing on site' for r in m)],
]))
L.append("\n## Things to know before applying fixes\n")
L.append("1. **Most sculptures appear on the website more than once.** They're in both the Bradford retrospective list and the 1963–2006 list, and some also have detail shots or exhibition photos (such as the Stockholm shots). One inventory sculpture can therefore match several website entries. The two catalogue entries count as confident matches; details and exhibition photos are marked \"to confirm\".")
L.append("2. **Website sculpture sizes are written into the titles**, for example `(1) Raft 600x360x170 mm`, and the `dimensions` field is empty. The comparison reads the size from the title. Applying fixes would fill in `dimensions` and leave the titles as they are, unless you'd like the sizes taken out of the titles too.")
L.append("3. **Some inventory sculpture sizes may be transcription slips.** *Flywheel* is 990x87x113 in the JSON but 990x870x1130 on the website. The 2013 copy of the inventory splits that number across lines, which is where zeros get lost, so the website is probably right here. *Twigs* (print 222) is 80x620, which looks like a missing digit. The other sculpture differences (Samurai, Welcome Arch, Titania, Grotto for Torus, Icebergs, Moon over Water) are one or two digits apart and could be wrong on either side; they're worth checking against the PDF.")
L.append("4. **Many sculptures in the website's 1963–2006 list are dated 1963.** That looks like a placeholder taken from the list's name rather than a real date. The inventory gives the real year.")
L.append("5. **India watercolour sizes differ a lot.** For several large India watercolours the website's size is much bigger than the inventory's. For example, *The Temple in the Lake* is 1170x860 on the site but 360x540 in the inventory. *Bathing Tent Varanasi* at 8030x6420 mm is clearly a website typo.")
L.append("6. **Some titles appear twice in the inventory, and only one of each pair is matched.** They are *Titania* (sculptures 9 and 17, identical), *Acrobat descending and pink contortionist* (199 and 203) and *Dotty Skulls* (182 and 228).")
L.append("7. **Some pairings are fixed by hand.** The three Cirque du Soleil triptych panels (196–198) are paired manually with the website's *No.1/No.2/No.3 … Triptych*. The watercolour sketch *Macho the Cock* (148) is deliberately left unmatched, so that it isn't paired with the website's 1989 print of the same name.")
L.append("8. **Sculpture 18 may be *Swansong*, not *Fish and Swan*.** The JSON calls it *Fish and Swan* (1989, 1850x640x550). That is exactly the size and year of the website's *Swansong*, and the 2013 copy of the inventory lists *Swansong* between *Titania* and *Grotto for Toros*, which is where item 18 sits. (It mentions *Fish and Swan* only as an installation photo at the Nehru Centre.) As it stands, 18 is paired (to confirm) with the website's *Fish* (1920x880x480), which is probably wrong. It's worth checking the PDF before applying.\n")

diff = lambda r: r["date_check"] in ("MISMATCH", "missing on site") or r["dim_check"] in ("MISMATCH", "missing on site", "orientation only")
L.append("## Date mismatches\n")
L.append(table(["Section", "Inv. no", "Inventory title", "Inventory", "Website", "Website title", "Match"],
    [[sec(r), r["inv_no"], r["inv_title"], r["inv_year"], r["site_date"], r["site_title"], r["match"]] for r in m if r["date_check"]=="MISMATCH"]))
L.append("\n## Dimension mismatches (mm)\n")
L.append(table(["Section", "Inv. no", "Inventory title", "Inventory", "Website", "Website title", "Match"],
    [[sec(r), r["inv_no"], r["inv_title"], r["inv_size_mm"], r["site_dimensions"], r["site_title"], r["match"]] for r in m if r["dim_check"]=="MISMATCH"]))
L.append("\n## Missing on the website but present in the inventory\n")
L.append(table(["Section", "Inv. no", "Website title", "Missing field", "Inventory value"],
    [[sec(r), r["inv_no"], r["site_title"], "date", r["inv_year"]] for r in m if r["date_check"]=="missing on site"] +
    [[sec(r), r["inv_no"], r["site_title"], "dimensions", r["inv_size_mm"]] for r in m if r["dim_check"]=="missing on site"]))
L.append("\n## Width/height swapped only\n")
L.append(table(["Section", "Inv. no", "Title", "Inventory", "Website"],
    [[sec(r), r["inv_no"], r["inv_title"], r["inv_size_mm"], r["site_dimensions"]] for r in m if r["dim_check"]=="orientation only"]))
L.append("\n## Probable matches: please confirm\n")
L.append("These pairs were matched on similar titles, on one title containing the other, or on a detail or exhibition photo of a sculpture. The differences listed above for these pairs only hold if the pairing is right.\n")
L.append(table(["Section", "Inv. no", "Inventory title", "Website title", "Website category", "Score"],
    [[sec(r), r["inv_no"], r["inv_title"], r["site_title"], f'{r["site_category"]} / {r["site_subcategory"]}', r["match_score"]] for r in m if r["match"]=="probable"]))
L.append("\n## Inventory works not found on the website\n")
for s in ("Prints", "Watercolours", "Sculptures"):
    items = [r for r in rows if r["match"]=="unmatched" and sec(r)==s]
    L.append(f"**{s}** ({len(items)}): " + ("; ".join(f'{r["inv_no"]} {r["inv_title"]}' + (f' ({r["inv_year"]})' if r["inv_year"] else "") for r in items) or "none") + "\n")
L.append("## Website works not found in the inventory\n")
L.append(table(["Category", "Count"], [[k, v] for k, v in Counter(x["category"] for x in site_only).most_common()]))
L.append("\nWebsite **Sculptures & Installations** with no inventory match: " + "; ".join(x["title"] for x in site_only if x["category"]=="Sculptures & Installations") + ".\n")
L.append("Most of these are studio photos, exhibition views and installation shots, or sculptures the inventory doesn't list (such as *Helios*, *Silo*, *Oyster*, *Embrace* and *King & Queen*). A few unmatched watercolours may be the same work under a different title, for example *The Noria* / *The Water Wheel Rajastan* and *Drying the Cloth on the Ground* / *Dying the cloth*. See `site_only_artworks.csv`.")
open(f"{OUT}/inventory_crosscheck.md", "w").write("\n".join(L) + "\n")
