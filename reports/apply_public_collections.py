"""Set per-work public collection data in database/artworks.json and artworks.csv.

Replaces the blanket "Yes (Tate, British Museum, Victoria & Albert Museum, etc.)"
note with the holdings in database/public_collections.json, and adds a
public_collection_sources column with the catalogue URLs.
"""
import csv, json, os

REPO = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
JSON_PATH = f"{REPO}/database/artworks.json"
CSV_PATH = f"{REPO}/database/artworks.csv"
COLLECTIONS_PATH = f"{REPO}/database/public_collections.json"

FIELD = "represented_in_public_collections"
SOURCES = "public_collection_sources"

collections = json.load(open(COLLECTIONS_PATH))
by_title = {w["site_title"]: w["holdings"] for w in collections["works"]}


def describe(h):
    text = h["institution"]
    if h["accession"]:
        text += f" ({h['accession']})"
    if h["match"] == "probable":
        text += f" - probably this work, catalogued as \"{h['catalogued_as']}\""
    return text


# Put the sources column straight after the collections column.
def reorder(d, keys):
    out = {}
    for k in keys:
        out[k] = d.get(k, "")
        if k == FIELD:
            out[SOURCES] = d.get(SOURCES, "")
    return out


site = json.load(open(JSON_PATH))
matched = set()
for a in site:
    holdings = by_title.get(a["title"])
    if holdings:
        matched.add(a["title"])
        a[FIELD] = "; ".join(describe(h) for h in holdings)
        a[SOURCES] = " ".join(h["url"] for h in holdings)
    else:
        a[FIELD] = collections["default_text"]
        a[SOURCES] = ""

missing = set(by_title) - matched
if missing:
    raise SystemExit(f"No website artwork found for: {sorted(missing)}")

json_keys = [k for k in site[0] if k != SOURCES]
site = [reorder(a, json_keys) for a in site]
with open(JSON_PATH, "w") as f:
    f.write(json.dumps(site, indent=2, ensure_ascii=False))

with open(CSV_PATH, newline="") as f:
    csv_keys = [k for k in next(csv.reader(f)) if k != SOURCES]
fields = list(reorder({}, csv_keys).keys())
with open(CSV_PATH, "w", newline="") as f:
    w = csv.DictWriter(f, fieldnames=fields, extrasaction="ignore")
    w.writeheader()
    w.writerows(site)

n = sum(1 for a in site if a[SOURCES])
print(f"{n} artworks with identified holdings, {len(site) - n} set to default text")
