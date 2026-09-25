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
    t = re.sub(r"\d+\s*x\s*\d+(\s*x\s*\d+)?\s*mm", " ", t)  # sizes embedded in titles
    t = re.sub(r"q?(19|20)\d\d", " ", t)  # years embedded in titles ("Hovercube1989")
    if drop_paren:
        t = re.sub(r"\([^)]*\)", " ", t)
    t = t.replace("&", " and ")
    t = re.sub(r"^\s*(no\.?\s*)?\d+[a-z]?\.?\s+", " ", t)  # leading catalogue numbers
    t = re.sub(r"[^a-z0-9 ]+", " ", t)
    return re.sub(r"\s+", " ", t).strip()


STOP = {"the", "a", "and", "of", "with", "in"}


def score(a, b, contain=True):
    best = 0.0
    for dp in (False, True):
        x, y = norm(a["title"], dp), norm(b["title"], dp)
        if x and y:
            best = max(best, SequenceMatcher(None, x, y).ratio())
            # One title contained in the other ("Harem" / "Harem Jodhpur"):
            # counts as a probable match when the longer adds at most 3 words
            # and both are in the same category.
            tx, ty = set(x.split()) - STOP, set(y.split()) - STOP
            short, long_ = sorted((tx, ty), key=len)
            if contain and short and short <= long_ and len(long_) - len(short) <= 3:
                best = max(best, 0.8)
    return best


def dims(s):
    if not s:
        return None
    n = [int(v) for v in re.findall(r"\d+", s)]
    if re.search(r"\bcm\b", s):
        n = [v * 10 for v in n]
    return tuple(n[:3]) if len(n) >= 2 else None


def site_dims(s):
    """Website size: the dimensions field, else a size written into the title."""
    if s.get("dimensions"):
        return s["dimensions"], "field"
    m = re.search(r"\d+\s*x\s*\d+(\s*x\s*\d+)?\s*mm", s["title"])
    return (m.group(0), "title") if m else ("", "")


def inv_size(it):
    return it.get("size_mm") or it.get("image_size_mm") or it.get("paper_size_mm")


SECTION_CAT = {
    "Prints & Graphic Works (1959-2005)": "Prints",
    "Watercolours, Sketches and Collages": "Watercolours & Collages",
    "Acrylic Sculpture and installations": "Sculptures & Installations",
}
SCULPTURE = "Acrylic Sculpture and installations"

# Score every pair, then assign greedily one-to-one (highest score first,
# same-category and same-year pairs preferred on ties).
pairs = []
for i, it in enumerate(inv):
    for j, s in enumerate(site):
        # Sculptures only match website sculpture entries, and vice versa.
        if (it["section"] == SCULPTURE) != (s["category"] == SECTION_CAT[SCULPTURE]):
            continue
        sc = score(it, s, contain=SECTION_CAT.get(it["section"]) == s["category"])
        if sc < 0.74:
            continue
        bonus = 0.02 * (SECTION_CAT.get(it["section"]) == s["category"]) + 0.02 * (
            bool(it.get("year")) and it.get("year") == s.get("date"))
        di, ds = dims(inv_size(it)), dims(site_dims(s)[0])
        bonus += 0.05 * bool(di and ds and sorted(di) == sorted(ds))
        pairs.append((sc + bonus, sc, i, j))
pairs.sort(reverse=True)
inv_match, site_used = {}, set()

# Manual pairings ((section, inventory no) -> website title), fixed before
# automatic matching. Numbers restart per section, so the section is part of the key.
MANUAL = {
    # The website's Text Messages entries are the collage originals, not the A4
    # prints. The inventory lists the 600x460 original after "4 Inspire Dreams" as a
    # second "Inspire Dreams" (266b), but it sits in slot 5 and matches Finding
    # Reasons' size.
    ("Prints", "266b"): "05 Finding reasons",
    ("Prints", "268b"): "07 Old Master 42005",
    # Cirque du Soleil triptych: the website titles lead with "No.1" etc.
    ("Watercolours", "196"): "No.1 dancer & clown Triptych",
    ("Watercolours", "197"): "No.2 Bring in The Clowns Triptych",
    ("Watercolours", "198"): "No.3 The Grand Slide Triptych",
}
# Inventory items that must stay unmatched: the watercolour sketch of Macho the
# Cock is not the website's 1989 print of the same name.
NO_MATCH = {("Watercolours", "148")}


def inv_key(it):
    return (it["section"].split()[0].rstrip(","), str(it["no"]))


for i, it in enumerate(inv):
    if inv_key(it) in MANUAL:
        j = next(j for j, s in enumerate(site) if s["title"] == MANUAL[inv_key(it)])
        inv_match[i] = (j, None)
        site_used.add(j)
    elif inv_key(it) in NO_MATCH:
        inv_match[i] = None
for _, sc, i, j in pairs:
    if i in inv_match or j in site_used:
        continue
    inv_match[i] = (j, sc)
    site_used.add(j)

# The website lists most sculptures more than once (the Bradford retrospective
# list, the 1963-2006 list, details, exhibition photos), so a sculpture may
# also claim further website sculpture entries with a near-identical title.
extra = []  # (inventory index, site index, score)
for _, sc, i, j in pairs:
    if (j in site_used or inv[i]["section"] != SCULPTURE or sc < 0.9
            or site[j]["category"] != SECTION_CAT[SCULPTURE]):
        continue
    extra.append((i, j, sc))
    site_used.add(j)
PHOTO_WORDS = re.compile(r"detail|stockholm|geiger|mailar|nehru|bradford|installation", re.I)

def build_row(i, it, match):
    inv_dim_raw = inv_size(it)
    inv_dim = dims(inv_dim_raw)
    r = {
        "inv_section": it["section"], "inv_no": it["no"], "inv_title": it["title"],
        "inv_year": it.get("year") or "", "inv_size_mm": inv_dim_raw or "",
        "inv_technique": it.get("technique") or "",
        "site_index": "", "site_category": "", "site_subcategory": "", "site_title": "",
        "site_date": "", "site_dimensions": "", "site_dims_source": "", "site_technique": "",
        "match": "unmatched", "match_score": "", "date_check": "", "dim_check": "", "technique_check": "",
    }
    if match:
        j, sc = match
        s = site[j]
        sdim, ssrc = site_dims(s)
        exact = (sc is not None and sc >= 0.93 and SECTION_CAT.get(it["section"]) == s["category"]
                 and not (it["section"] == SCULPTURE and PHOTO_WORDS.search(s["title"])))
        r.update(site_index=j, site_category=s["category"], site_subcategory=s["subcategory"],
                 site_title=s["title"], site_date=s.get("date") or "",
                 site_dimensions=sdim, site_dims_source=ssrc, site_technique=s.get("technique") or "",
                 match="manual" if sc is None else "exact" if exact else "probable",
                 match_score="" if sc is None else f"{sc:.2f}")
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
    return r


rows = []
for i, it in enumerate(inv):
    rows.append(build_row(i, it, inv_match.get(i)))
    rows += [build_row(i, it, (j, sc)) for ei, j, sc in extra if ei == i]

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
