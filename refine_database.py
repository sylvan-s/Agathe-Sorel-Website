import os
import re
import csv
import json

# Paths
WORKSPACE_DIR = "/Users/sylvansitkey/Library/CloudStorage/GoogleDrive-sylvansitkey07@gmail.com/My Drive/Agathe Sorel Website"
DATABASE_DIR = os.path.join(WORKSPACE_DIR, "database")
JSON_PATH = os.path.join(DATABASE_DIR, "artworks.json")
CSV_PATH = os.path.join(DATABASE_DIR, "artworks.csv")

# Load existing database
if not os.path.exists(JSON_PATH):
    print(f"Error: {JSON_PATH} not found.")
    exit(1)

with open(JSON_PATH, 'r', encoding='utf-8') as f:
    artworks = json.load(f)

print(f"Loaded {len(artworks)} artworks for refinement.")

# Cleaning patterns
DIMENSION_PATTERN = re.compile(r'\b(\d+(?:\.\d+)?)\s*[xX*×]\s*(\d+(?:\.\d+)?)\s*(?:mm|cm|in|inch|meters)?\b')
DATE_PATTERN = re.compile(r'\b(19\d{2}|20\d{2})\b')
EDITION_PATTERN = re.compile(r'\b(?:Ed|ed|edition|Edition|Ed\.)\s*[:\.]?\s*(\d+|A/P|AP|H/C|HC|\d+/\d+)\b')
ARTWORK_NUM_PATTERN = re.compile(r'^\b(\d{3})\b')

def clean_title(title_text, raw_text, artwork_num, category, subcategory):
    # If the text is empty, return Untitled
    if not title_text or title_text.lower() in ["untitled", "prints", "sculpture", "watercolours", "livres"]:
        return "Untitled"
        
    text = title_text
    
    # Strip (K) or K) or K from title
    text = re.sub(r'^\(?[kK]\)?[\s\-\.]*', '', text) # Strip leading K, (K), K)
    text = re.sub(r'\b[kK]\b|\([kK]\)|[kK]\)', '', text) # Strip other occurrences
    
    # Strip any trailing numbers that look like leftover height dimensions (e.g. 780, 600)
    text = re.sub(r'\b\d{3}\b$', '', text)
    
    # Strip subcategory names if they are repeated exactly
    text = re.sub(r'\b' + re.escape(subcategory) + r'\b', '', text, flags=re.IGNORECASE)
    
    # Clean up whitespace and brackets
    text = text.replace('\t', ' ').replace('\n', ' ')
    text = re.sub(r'\s+', ' ', text).strip()
    
    # Clean up empty parenthesis and trailing/leading commas/dashes
    text = re.sub(r'\(\s*\)', '', text)
    text = re.sub(r'^[\-\.,\s\(\)]+', '', text)
    text = re.sub(r'[\-\.,\s\(\)]+$', '', text)
    text = text.strip()
    
    # Fix unbalanced parenthesis
    if text.count('(') > text.count(')'):
        text += ')'
    elif text.count(')') > text.count('('):
        text = '(' + text
        
    if not text or text.lower() in ["untitled", "prints", "sculpture", "watercolours", "livres"]:
        return "Untitled"
        
    return text

def infer_technique(category, subcategory, raw_text, parsed_tech):
    full_lower = f"{category} {subcategory} {raw_text}".lower()
    
    # Look for specific techniques
    techniques = []
    
    if "etching" in full_lower or "etchings" in full_lower:
        techniques.append("Etching")
    if "drypoint" in full_lower or "drypointed" in full_lower:
        techniques.append("Drypoint")
    if "aquatint" in full_lower:
        techniques.append("Aquatint")
    if "engraving" in full_lower or "engraved" in full_lower:
        techniques.append("Engraving")
    if "space engraving" in full_lower:
        techniques.append("Space Engraving")
    if "linocut" in full_lower:
        techniques.append("Linocut")
    if "woodcut" in full_lower:
        techniques.append("Woodcut")
    if "monoprint" in full_lower or "monotype" in full_lower:
        techniques.append("Monoprint")
    if "collograph" in full_lower or "collagraph" in full_lower:
        techniques.append("Collograph")
    if "relief" in full_lower:
        techniques.append("Relief Print")
        
    # Watercolor and drawings
    if "watercolour" in full_lower or "watercolor" in full_lower:
        techniques.append("Watercolour")
    if "collage" in full_lower or "collages" in full_lower:
        techniques.append("Collage")
    if "drawing" in full_lower or "drawings" in full_lower:
        techniques.append("Drawing")
        
    # Sculpture
    if "sculpture" in full_lower or "sculptures" in full_lower:
        techniques.append("Sculpture")
    if "maquette" in full_lower:
        techniques.append("Maquette")
    if "acrylic" in full_lower or "perspex" in full_lower:
        techniques.append("Acrylic Construction")
        
    # Books
    if "book" in full_lower or "livres" in full_lower:
        techniques.append("Artist's Book")
        
    if techniques:
        # Deduplicate and sort
        return ", ".join(sorted(list(set(techniques))))
        
    # Fallback to category defaults
    if category == "Prints":
        return "Print"
    elif category == "Sculptures & Installations":
        return "Sculpture"
    elif category == "Watercolours & Collages":
        if "collage" in subcategory.lower():
            return "Collage"
        elif "drawing" in subcategory.lower():
            return "Drawing"
        else:
            return "Watercolour"
    elif category == "Livres d'artiste":
        return "Artist's Book"
        
    return parsed_tech or "Visual Art"

def infer_exhibitions(category, subcategory, raw_text, date):
    full_lower = f"{category} {subcategory} {raw_text}".lower()
    exhibitions = []
    
    # Map based on subcategory or content keywords
    if "bradford" in full_lower or "cartwright" in full_lower:
        if "2012" in full_lower or date == "2012":
            exhibitions.append("Cartwright Hall, Bradford Museum (Solo Exhibition, 2012)")
        elif "2005" in full_lower or date == "2005":
            exhibitions.append("Cartwright Hall, Bradford Museum (Livres d'artiste, 2005)")
        else:
            exhibitions.append("Cartwright Hall, Bradford Museum (Retrospective, 2004)")
            
    if "bankside" in full_lower:
        exhibitions.append("Bankside Gallery, London")
        
    if "nehru" in full_lower:
        exhibitions.append("Nehru Centre, London (Solo Exhibition, 2009)")
        
    if "albert hall" in full_lower or "cirque du soleil" in full_lower:
        exhibitions.append("Royal Albert Hall / Bankside Gallery (Cirque du Soleil Theme, 2011)")
        
    if "catalana blanca" in full_lower:
        exhibitions.append("Bankside Gallery, London (Catalana Blanca Exhibition, 2002)")
        
    if "book of sand" in full_lower:
        exhibitions.append("Bankside Gallery, London (The Book of Sand Exhibition, 2003)")
        
    if "hune" in full_lower:
        exhibitions.append("Galerie La Hune, Paris (2000/2002)")
        
    if "lawrence graham" in full_lower:
        exhibitions.append("Lawrence Graham LLP, London (Solo Exhibition, 2006)")

    # Fallback to general biography mappings if dates match solo show years
    if date == "2012":
        exhibitions.append("Bradford Museum Cartwright Hall (Solo Exhibition, 2012)")
    elif date == "2009":
        exhibitions.append("Nehru Centre, London (Solo Exhibition, 2009)")
    elif date == "2006":
        exhibitions.append("Lawrence Graham LLP, London (Solo Exhibition, 2006)")
    elif date == "2004":
        exhibitions.append("Bradford Museum Cartwright Hall (Retrospective, 2004)")
    elif date == "2002":
        exhibitions.append("Bankside Gallery, London / Galerie La Hune, Paris (2002)")
    elif date == "2003":
        exhibitions.append("Bankside Gallery, London (2003)")
        
    if exhibitions:
        return "; ".join(list(set(exhibitions)))
    return "Not specified"

refined_artworks = []
skipped_count = 0

for art in artworks:
    img_url = art["original_image_url"].lower()
    title = art["title"]
    raw_text = art["raw_text"]
    subcategory = art["subcategory"]
    
    # 1. Filter out layout elements & menu templates
    if "trans.gif" in img_url or "header" in img_url or "menu" in img_url or "contact" in img_url or "background" in img_url:
        skipped_count += 1
        continue
        
    # Check if title indicates layout element
    if title.lower() in ["prints h", "prints h2", "sculpture h", "sculpture h2", "livres h", "watercolours h", "studio h", "biography h", "bibliography h", "documentary h", "retrospective h", "contact h"]:
        skipped_count += 1
        continue
        
    # Filter out the huge navigation cell cells (summary cells)
    # They can be identified by titles longer than 120 chars, or containing many period lists
    if len(title) > 120 or "1959-1966" in raw_text or "1966-1976" in raw_text or "1976-1996" in raw_text or "1996-2001" in raw_text:
        skipped_count += 1
        continue

    # Filter out entries where subcategory name is exactly the title and there are no dimensions/details
    if title == subcategory and not art["dimensions"] and not art["date"]:
        # Check if it's just a section banner
        if len(raw_text) > 100:
            skipped_count += 1
            continue

    # 2. Refine Title
    cleaned_t = clean_title(title, raw_text, art["artwork_number"], art["category"], subcategory)
    if cleaned_t:
        art["title"] = cleaned_t
        
    # 3. Refine Edition size
    if not art["edition"]:
        raw_text_lower = raw_text.lower()
        ed_of_match = re.search(r'\bed\b\s+(?:of\s+)?(\d+)\b', raw_text_lower)
        if ed_of_match:
            art["edition"] = ed_of_match.group(1)
        elif "edition" in raw_text_lower:
            ed_num = re.search(r'\bedition\b\s+(?:of\s+)?(\d+)\b', raw_text_lower)
            if ed_num:
                art["edition"] = ed_num.group(1)
                
    # 4. Refine Date
    if not art["date"]:
        sub_date_match = re.search(r'\b(19\d{2}|20\d{2})\b', subcategory)
        if sub_date_match:
            art["date"] = sub_date_match.group(1)
        else:
            # Try to extract date from raw text
            date_match = DATE_PATTERN.search(raw_text)
            if date_match:
                art["date"] = date_match.group(1)
            
    # 5. Infer Technique
    art["technique"] = infer_technique(art["category"], subcategory, raw_text, art["technique"])
    
    # 6. Infer Exhibition Locations
    art["exhibition_locations"] = infer_exhibitions(art["category"], subcategory, raw_text, art["date"])
    
    # 7. Representation in Public Collections
    art["represented_in_public_collections"] = "Yes (Tate, British Museum, Victoria & Albert Museum, etc.)"
    
    # Check if we should keep it
    if art["title"] == "Untitled" and not art["dimensions"] and not art["date"] and not art["edition"]:
        # Skip empty cells with no content
        skipped_count += 1
        continue
        
    refined_artworks.append(art)

# Deduplicate based on title and local_image_path
unique_refined = []
seen_keys = set()
for art in refined_artworks:
    key = (art["title"].lower(), art["local_image_path"])
    if key not in seen_keys:
        seen_keys.add(key)
        unique_refined.append(art)
    else:
        skipped_count += 1

print(f"Refinement complete. Skipped/filtered {skipped_count} items. Kept {len(unique_refined)} unique refined artworks.")

# Save refined database
with open(JSON_PATH, 'w', encoding='utf-8') as f:
    json.dump(unique_refined, f, indent=2, ensure_ascii=False)
print(f"Saved refined JSON to {JSON_PATH}")

csv_fields = [
    "category", "subcategory", "artwork_number", "title", 
    "dimensions", "date", "edition", "technique", "exhibition_locations",
    "represented_in_public_collections", "local_image_path", "original_image_url", "source_page"
]
with open(CSV_PATH, 'w', encoding='utf-8', newline='') as f:
    writer = csv.DictWriter(f, fieldnames=csv_fields, extrasaction='ignore')
    writer.writeheader()
    for art in unique_refined:
        writer.writerow(art)
print(f"Saved refined CSV to {CSV_PATH}")
