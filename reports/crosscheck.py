"""Cross-check database/artworks.json against database/inventory_2014-10.json."""
import csv, json, os, re, sys, unicodedata
from difflib import SequenceMatcher
from collections import Counter

REPO = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
OUT = sys.argv[1] if len(sys.argv) > 1 else "."

site = json.load(open(f"{REPO}/database/artworks.json"))
inv_doc = json.load(open(f"{REPO}/database/inventory_2014-10.json"))

inv = []
for sec in inv_doc["sections"]:
    for it in sec["items"]:
        if isinstance(it, dict) and "title" in it and "no" in it:
            inv.append({**it, "section": sec["section_name"]})


def norm(t, drop_paren=False):
    t = unicodedata.normalize("NFKD", t or "").encode("ascii", "ignore").decode().lower()
    t = t.replace("(k)", " ")
    if drop_paren:
        t = re.sub(r"\([^)]*\)", " ", t)
    t = t.replace("&", " and ")
    t = re.sub(r"^\s*(no\.?\s*)?\d+[a-z]?\.?\s+", " ", t)  # leading catalogue numbers
    t = re.sub(r"[^a-z0-9 ]+", " ", t)
    return re.sub(r"\s+", " ", t).strip()


def score(a, b):
    best = 0.0
    for dp in (False, True):
        x, y = norm(a["title"], dp), norm(b["title"], dp)
        if x and y:
            best = max(best, SequenceMatcher(None, x, y).ratio())
    return best


def dims(s):
    if not s:
        return None
    n = [int(v) for v in re.findall(r"\d+", s)]
    return tuple(n[:2]) if len(n) >= 2 else None


SECTION_CAT = {
    "Prints & Graphic Works (1959-2005)": "Prints",
    "Watercolours, Sketches and Collages": "Watercolours & Collages",
}

# Score every pair, then assign greedily one-to-one (highest score first,
# same-category and same-year pairs preferred on ties).
pairs = []
for i, it in enumerate(inv):
    for j, s in enumerate(site):
        sc = score(it, s)
        if sc < 0.74:
            continue
        bonus = 0.02 * (SECTION_CAT.get(it["section"]) == s["category"]) + 0.02 * (
            bool(it.get("year")) and it.get("year") == s.get("date"))
        di, ds = dims(it.get("image_size_mm") or it.get("paper_size_mm")), dims(s.get("dimensions"))
        bonus += 0.05 * bool(di and ds and sorted(di) == sorted(ds))
        pairs.append((sc + bonus, sc, i, j))
pairs.sort(reverse=True)
inv_match, site_used = {}, set()
for _, sc, i, j in pairs:
    if i in inv_match or j in site_used:
        continue
    inv_match[i] = (j, sc)
    site_used.add(j)

rows = []
for i, it in enumerate(inv):
    inv_dim_raw = it.get("image_size_mm") or it.get("paper_size_mm")
    inv_dim = dims(inv_dim_raw)
    r = {
        "inv_section": it["section"], "inv_no": it["no"], "inv_title": it["title"],
        "inv_year": it.get("year") or "", "inv_size_mm": inv_dim_raw or "",
        "inv_technique": it.get("technique") or "",
        "site_index": "", "site_category": "", "site_subcategory": "", "site_title": "",
        "site_date": "", "site_dimensions": "", "site_technique": "",
        "match": "unmatched", "match_score": "", "date_check": "", "dim_check": "", "technique_check": "",
    }
    if i in inv_match:
        j, sc = inv_match[i]
        s = site[j]
        r.update(site_index=j, site_category=s["category"], site_subcategory=s["subcategory"],
                 site_title=s["title"], site_date=s.get("date") or "",
                 site_dimensions=s.get("dimensions") or "", site_technique=s.get("technique") or "",
                 match="exact" if sc >= 0.93 and SECTION_CAT.get(it["section"]) == s["category"] else "probable", match_score=f"{sc:.2f}")
        # date
        iy, sy = r["inv_year"], r["site_date"]
        r["date_check"] = ("ok" if iy == sy else "inventory has no year" if not iy
                           else "missing on site" if not sy else "MISMATCH")
        # dimensions
        sd = dims(r["site_dimensions"])
        if not inv_dim:
            r["dim_check"] = "inventory has no size"
        elif not sd:
            r["dim_check"] = "missing on site"
        elif sd == inv_dim:
            r["dim_check"] = "ok"
        elif sorted(sd) == sorted(inv_dim):
            r["dim_check"] = "orientation only"
        else:
            r["dim_check"] = "MISMATCH"
        # technique
        it_t = r["inv_technique"]
        r["technique_check"] = ("inventory has no technique" if not it_t
                                else "ok" if norm(it_t) == norm(r["site_technique"])
                                else "site generic" if r["site_technique"] in (
                                    "Print", "Collage, Watercolour", "Collage, Drawing, Watercolour",
                                    "Sculpture", "Artist's Book", "")
                                else "MISMATCH")
    rows.append(r)

site_only = [
    {"site_index": j, "category": s["category"], "subcategory": s["subcategory"], "title": s["title"],
     "date": s.get("date") or "", "dimensions": s.get("dimensions") or ""}
    for j, s in enumerate(site) if j not in site_used
]

with open(f"{OUT}/inventory_crosscheck.csv", "w", newline="") as f:
    w = csv.DictWriter(f, fieldnames=list(rows[0].keys()))
    w.writeheader()
    w.writerows(rows)
with open(f"{OUT}/site_only_artworks.csv", "w", newline="") as f:
    w = csv.DictWriter(f, fieldnames=list(site_only[0].keys()))
    w.writeheader()
    w.writerows(site_only)

m = [r for r in rows if r["match"] != "unmatched"]
print("inventory items:", len(inv), "| matched:", len(m),
      Counter(r["match"] for r in rows))
print("date:", Counter(r["date_check"] for r in m))
print("dims:", Counter(r["dim_check"] for r in m))
print("tech:", Counter(r["technique_check"] for r in m))
print("site-only:", len(site_only), Counter(x["category"] for x in site_only))
json.dump({"rows": rows, "site_only": site_only}, open(f"{OUT}/crosscheck.json", "w"), indent=1)
