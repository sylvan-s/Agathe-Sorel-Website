"""Apply 2014-10 inventory values to database/artworks.json and artworks.csv.

Confident ("exact"), "probable" and "manual" matches from crosscheck.py are
applied (probable matches were reviewed and accepted). For each one:
  - technique_detail <- inventory technique (generic `technique` is kept for filters)
  - date             <- inventory year, when the inventory has one
  - dimensions       <- inventory size ("W x H mm"), when the inventory has one

Usage: python3 reports/crosscheck.py reports && python3 reports/apply_inventory_fixes.py reports
"""
import csv, json, os, re, sys

REPO = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
OUT = sys.argv[1] if len(sys.argv) > 1 else "."
JSON_PATH = f"{REPO}/database/artworks.json"
CSV_PATH = f"{REPO}/database/artworks.csv"

site = json.load(open(JSON_PATH))
rows = json.load(open(f"{OUT}/crosscheck.json"))["rows"]


def fmt_dims(s):
    n = re.findall(r"\d+", s or "")
    return f"{n[0]} x {n[1]} mm" if len(n) >= 2 else None


changes = []
for art in site:
    art.setdefault("technique_detail", "")
for r in rows:
    if r["match"] not in ("exact", "probable", "manual"):
        continue
    art = site[r["site_index"]]
    new = {"technique_detail": r["inv_technique"], "date": r["inv_year"], "dimensions": fmt_dims(r["inv_size_mm"])}
    for field, val in new.items():
        if val and art.get(field) != val:
            changes.append([r["site_index"], art["title"], r["match"], field, art.get(field) or "", val])
            art[field] = val

# Keep technique_detail next to technique in both files.
def reorder(d, keys):
    out = {}
    for k in keys:
        out[k] = d.get(k, "")
        if k == "technique":
            out["technique_detail"] = d.get("technique_detail", "")
    return out

json_keys = [k for k in site[0] if k != "technique_detail"]
site = [reorder(a, json_keys) for a in site]
with open(JSON_PATH, "w") as f:
    f.write(json.dumps(site, indent=2, ensure_ascii=False))

with open(CSV_PATH, newline="") as f:
    csv_keys = [k for k in next(csv.reader(f)) if k != "technique_detail"]
fields = list(reorder({}, csv_keys).keys())
with open(CSV_PATH, "w", newline="") as f:
    w = csv.DictWriter(f, fieldnames=fields, extrasaction="ignore")
    w.writeheader()
    w.writerows(site)

with open(f"{OUT}/applied_changes.csv", "w", newline="") as f:
    w = csv.writer(f)
    w.writerow(["site_index", "title", "match", "field", "old", "new"])
    w.writerows(changes)

from collections import Counter
print(len(changes), "field changes:", Counter(c[3] for c in changes))
