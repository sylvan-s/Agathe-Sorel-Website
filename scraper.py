import os
import re
import csv
import json
import time
from urllib.parse import urljoin, urlparse, unquote
import requests
from bs4 import BeautifulSoup

# Configuration
BASE_URL = "http://agathesorel.co.uk/"
WORKSPACE_DIR = "/Users/sylvansitkey/Library/CloudStorage/GoogleDrive-sylvansitkey07@gmail.com/My Drive/Agathe Sorel Website"
IMAGES_DIR = os.path.join(WORKSPACE_DIR, "assets", "images")
DATABASE_DIR = os.path.join(WORKSPACE_DIR, "database")

# Ensure directories exist
os.makedirs(IMAGES_DIR, exist_ok=True)
os.makedirs(DATABASE_DIR, exist_ok=True)

# List of main section index pages and their categories
SEED_PAGES = [
    {
        "url": urljoin(BASE_URL, "Prints/_prints_2011-2016.htm"),
        "category": "Prints",
        "type": "prints"
    },
    {
        "url": urljoin(BASE_URL, "sculptures_installations/_sculpture_2011-2014.htm"),
        "category": "Sculptures & Installations",
        "type": "sculptures"
    },
    {
        "url": urljoin(BASE_URL, "livres_dartiste/_livres_dartiste.htm"),
        "category": "Livres d'artiste",
        "type": "books"
    },
    {
        "url": urljoin(BASE_URL, "watercolours_collages/_watercolours_collages.htm"),
        "category": "Watercolours & Collages",
        "type": "watercolours"
    }
]

# Patterns for parsing metadata
DIMENSION_PATTERN = re.compile(r'\b(\d+(?:\.\d+)?)\s*[xX*×]\s*(\d+(?:\.\d+)?)\s*(mm|cm|in|inch|meters)?\b')
DATE_PATTERN = re.compile(r'\b(19\d{2}|20\d{2})\b')
EDITION_PATTERN = re.compile(r'\b(?:Ed|ed|edition|Edition|Ed\.)\s*[:\.]?\s*(\d+|A/P|AP|H/C|HC|\d+/\d+)\b')
ARTWORK_NUM_PATTERN = re.compile(r'^\b(\d{3})\b')

# Headers to mimic a browser
HEADERS = {
    "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
}

def fetch_page(url):
    """Fetch a web page and return BeautifulSoup object or None."""
    try:
        print(f"Fetching: {url}")
        response = requests.get(url, headers=HEADERS, timeout=15)
        response.raise_for_status()
        # Decode correctly based on windows-1252 or utf-8
        content_type = response.headers.get('Content-Type', '').lower()
        if 'charset' not in content_type:
            response.encoding = 'windows-1252' # Common for older sites
        return BeautifulSoup(response.text, 'html.parser')
    except Exception as e:
        print(f"Error fetching {url}: {e}")
        return None

def resolve_high_res_image(page_url, link_href, img_src):
    """
    Resolve the high-resolution image URL.
    Often, the thumbnail wraps a link to a separate HTML page (e.g. `xxx_jpg.html`)
    which contains the larger image.
    """
    if not link_href:
        return urljoin(page_url, img_src)
        
    resolved_href = urljoin(page_url, link_href)
    
    # If the link is an image, return it directly
    if any(resolved_href.lower().endswith(ext) for ext in ['.jpg', '.jpeg', '.png', '.gif']):
        return resolved_href
        
    # If it's an HTML page, fetch it to find the larger image
    if any(resolved_href.lower().endswith(ext) for ext in ['.html', '.htm']):
        soup = fetch_page(resolved_href)
        if soup:
            # Look for images on this detail page
            images = soup.find_all('img')
            for img in images:
                src = img.get('src', '')
                # Skip navigation or background elements
                if 'header' in src.lower() or 'back' in src.lower() or 'trans.gif' in src.lower():
                    continue
                # The first content image is likely the high-res image
                return urljoin(resolved_href, src)
                
    # Fallback to the thumbnail's src if we can't get anything better
    return urljoin(page_url, img_src)

def download_image(url, category_folder):
    """Download image to the workspace and return local relative path."""
    if not url:
        return ""
    try:
        parsed_url = urlparse(url)
        filename = os.path.basename(unquote(parsed_url.path))
        if not filename or '.' not in filename:
            # Fallback filename
            filename = f"image_{int(time.time())}.jpg"
            
        # Organize images by category folder
        category_dir = os.path.join(IMAGES_DIR, category_folder)
        os.makedirs(category_dir, exist_ok=True)
        
        local_path = os.path.join(category_dir, filename)
        relative_path = os.path.join("assets", "images", category_folder, filename)
        
        # Don't download again if it already exists and is non-empty
        if os.path.exists(local_path) and os.path.getsize(local_path) > 0:
            return relative_path
            
        print(f"Downloading image: {url} -> {local_path}")
        response = requests.get(url, headers=HEADERS, timeout=20, stream=True)
        response.raise_for_status()
        
        with open(local_path, 'wb') as f:
            for chunk in response.iter_content(chunk_size=8192):
                f.write(chunk)
                
        time.sleep(0.2) # Gentle delay between downloads
        return relative_path
    except Exception as e:
        print(f"Failed to download image {url}: {e}")
        return ""

def parse_artwork_text(text):
    """
    Parse text to extract:
    - title
    - dimensions
    - date
    - edition size
    - technique
    """
    lines = [line.strip() for line in text.split('\n') if line.strip()]
    if not lines:
        return {"artwork_number": "", "title": "Untitled", "dimensions": "", "date": "", "edition": "", "technique": "", "full_text": ""}
        
    full_text = " | ".join(lines)
    
    # Extract artwork number and title
    title = lines[0]
    artwork_num = ""
    num_match = ARTWORK_NUM_PATTERN.search(title)
    if num_match:
        artwork_num = num_match.group(1)
        # Strip number from title
        title = title[num_match.end():].strip().lstrip('K').lstrip('(').rstrip(')').strip()
    
    # Strip common leading punctuation from title
    title = re.sub(r'^[-\.\(\)\sK]+', '', title).strip()
    
    # Parse Dimensions
    dimensions = ""
    dim_match = DIMENSION_PATTERN.search(full_text)
    if dim_match:
        val1, val2, unit = dim_match.groups()
        unit = unit if unit else "mm" # default unit on this site is mm
        dimensions = f"{val1} x {val2} {unit}"
        
    # Parse Date
    date = ""
    date_match = DATE_PATTERN.search(full_text)
    if date_match:
        date = date_match.group(1)
        
    # Parse Edition Size
    edition = ""
    ed_match = EDITION_PATTERN.search(full_text)
    if ed_match:
        edition = ed_match.group(1)
    elif "A/P" in full_text or "AP" in full_text:
        edition = "A/P"
        
    # Extract Technique
    # Often, technique is mentioned in biography/technical terminology or is implicit.
    # Let's extract any potential technique keyword from text
    technique = ""
    techniques_list = ["etching", "engraving", "linocut", "drypoint", "aquatint", "relief", "space engraving", "drawing", "watercolor", "watercolour", "collage", "mixed media", "monoprint", "woodcut", "sculpture", "maquette"]
    found_techs = []
    for tech in techniques_list:
        if re.search(r'\b' + re.escape(tech) + r'\b', full_text.lower()):
            found_techs.append(tech.capitalize())
    if found_techs:
        technique = ", ".join(set(found_techs))
        
    return {
        "artwork_number": artwork_num,
        "title": title or "Untitled",
        "dimensions": dimensions,
        "date": date,
        "edition": edition,
        "technique": technique,
        "full_text": full_text
    }

def get_prints_pages(soup, current_url):
    """Parse footer links to find all print period pages."""
    pages = [current_url]
    # Look for links in the class "footermenu"
    menu = soup.find('p', class_='footermenu')
    if menu:
        for a in menu.find_all('a'):
            href = a.get('href', '')
            if href:
                pages.append(urljoin(current_url, href))
    return list(set(pages))

def get_sculptures_pages(soup, current_url):
    """Parse submenu to find all sculpture period pages."""
    pages = [current_url]
    # Look for div with id "sc2"
    div = soup.find('div', id='sc2')
    if div:
        for a in div.find_all('a'):
            href = a.get('href', '')
            if href:
                pages.append(urljoin(current_url, href))
    return list(set(pages))

def get_watercolour_pages(soup, current_url):
    """Parse links under watercolours to find subpages."""
    pages = [current_url]
    # In watercolours_collages/_watercolours_collages.htm, let's find all links to sub-pages
    # E.g. links starting with _ or containing watercolours, drawings, collages
    for a in soup.find_all('a'):
        href = a.get('href', '')
        if href and (href.startswith('_') or 'watercolours' in href.lower() or 'drawings' in href.lower() or 'collages' in href.lower()):
            # Exclude standard menu links or mailto
            if 'mailto' not in href and '../' not in href:
                pages.append(urljoin(current_url, href))
    return list(set(pages))

def parse_artwork_cells(soup, page_url, category, subcategory):
    """
    Scan all tables in the page, finding cells containing images and description text.
    Returns a list of parsed artwork dictionaries.
    """
    artworks = []
    # Find all table cells (td)
    tds = soup.find_all('td')
    
    print(f"Scanning {len(tds)} table cells on page: {page_url}")
    
    for td in tds:
        # Check if cell has an image
        img = td.find('img')
        if not img:
            continue
            
        img_src = img.get('src', '')
        if not img_src or 'trans.gif' in img_src or 'header.gif' in img_src or 'menu' in img_src or 'background' in img_src or 'studio_h.gif' in img_src:
            # Skip layout assets
            continue
            
        # Get link wrapping the image (if any)
        a = td.find('a')
        link_href = a.get('href', '') if a else None
        
        # Get description text inside this td (excluding the image and links)
        # Standardize formatting by replacing <br> with newlines
        for br in td.find_all('br'):
            br.replace_with('\n')
            
        # Extract text content, stripping html tags
        text_content = td.get_text()
        
        # Parse text metadata
        meta = parse_artwork_text(text_content)
        
        # If title is empty or just whitespace/punctuation, let's see if we can use filename as fallback
        if not meta["title"] or meta["title"].lower() == "untitled":
            # Extract from img_src
            base_img_name = os.path.splitext(os.path.basename(img_src))[0]
            # Replace underscores/dashes with spaces
            meta["title"] = unquote(base_img_name).replace('_', ' ').replace('-', ' ').strip()
            
        # Resolve high resolution image
        high_res_img_url = resolve_high_res_image(page_url, link_href, img_src)
        
        # Build entry
        entry = {
            "category": category,
            "subcategory": subcategory,
            "artwork_number": meta["artwork_number"],
            "title": meta["title"],
            "dimensions": meta["dimensions"],
            "date": meta["date"],
            "edition": meta["edition"],
            "technique": meta["technique"],
            "source_page": page_url,
            "original_image_url": high_res_img_url,
            "thumbnail_image_url": urljoin(page_url, img_src),
            "raw_text": meta["full_text"]
        }
        
        artworks.append(entry)
        
    return artworks

def main():
    print("Starting Agathe Sorel artwork scraper...")
    all_artworks = []
    visited_pages = set()
    
    # 1. Expand list of pages to crawl
    pages_to_crawl = []
    
    for seed in SEED_PAGES:
        url = seed["url"]
        soup = fetch_page(url)
        if not soup:
            continue
            
        subpages = [url]
        if seed["type"] == "prints":
            subpages = get_prints_pages(soup, url)
        elif seed["type"] == "sculptures":
            subpages = get_sculptures_pages(soup, url)
        elif seed["type"] == "watercolours":
            subpages = get_watercolour_pages(soup, url)
            
        for page in subpages:
            pages_to_crawl.append({
                "url": page,
                "category": seed["category"],
                "type": seed["type"]
            })
            
    print(f"Identified {len(pages_to_crawl)} pages to crawl.")
    
    # 2. Crawl each page and extract artworks
    for idx, page_info in enumerate(pages_to_crawl):
        url = page_info["url"]
        if url in visited_pages:
            continue
        visited_pages.add(url)
        
        soup = fetch_page(url)
        if not soup:
            continue
            
        # Extract subcategory name from the filename or header
        filename = os.path.basename(urlparse(url).path)
        subcategory = filename.replace('_', ' ').replace('.htm', '').replace('.html', '').strip()
        # Clean up common subcategory names
        subcategory = re.sub(r'^(prints|sculpture|watercolours|livres)\s*', '', subcategory, flags=re.IGNORECASE)
        subcategory = subcategory.capitalize()
        
        print(f"[{idx+1}/{len(pages_to_crawl)}] Parsing page: {url} (Category: {page_info['category']}, Subcategory: {subcategory})")
        
        page_artworks = parse_artwork_cells(soup, url, page_info["category"], subcategory)
        
        # Download images and update database entries
        for artwork in page_artworks:
            category_slug = page_info["category"].lower().replace(' ', '_').replace('&', 'and')
            local_img_path = download_image(artwork["original_image_url"], category_slug)
            
            # If download of original fails, try the thumbnail
            if not local_img_path and artwork["thumbnail_image_url"] != artwork["original_image_url"]:
                print(f"Fallback to thumbnail for {artwork['title']}")
                local_img_path = download_image(artwork["thumbnail_image_url"], category_slug)
                
            artwork["local_image_path"] = local_img_path
            all_artworks.append(artwork)
            
        print(f"Found {len(page_artworks)} artworks on this page.")
        time.sleep(0.5) # Be nice to the server
        
    # Remove duplicates based on original_image_url or local_image_path and title
    unique_artworks = []
    seen_artworks = set()
    for art in all_artworks:
        key = (art["title"].lower(), art["local_image_path"])
        if key not in seen_artworks:
            seen_artworks.add(key)
            unique_artworks.append(art)
            
    print(f"Total unique artworks scraped: {len(unique_artworks)}")
    
    # 3. Write database files
    json_path = os.path.join(DATABASE_DIR, "artworks.json")
    with open(json_path, 'w', encoding='utf-8') as f:
        json.dump(unique_artworks, f, indent=2, ensure_ascii=False)
    print(f"Saved JSON database to {json_path}")
    
    csv_path = os.path.join(DATABASE_DIR, "artworks.csv")
    csv_fields = [
        "category", "subcategory", "artwork_number", "title", 
        "dimensions", "date", "edition", "technique", 
        "local_image_path", "original_image_url", "source_page"
    ]
    with open(csv_path, 'w', encoding='utf-8', newline='') as f:
        writer = csv.DictWriter(f, fieldnames=csv_fields, extrasaction='ignore')
        writer.writeheader()
        for art in unique_artworks:
            writer.writerow(art)
    print(f"Saved CSV database to {csv_path}")

if __name__ == "__main__":
    main()
