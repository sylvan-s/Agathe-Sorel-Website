// Agathe Sorel Website Archive & Portfolio JS Logic (Gallery Paper Theme)

document.addEventListener('DOMContentLoaded', () => {
    // Application State
    let artworks = [];
    let filteredArtworks = [];
    let currentPage = 1;
    const pageSize = 16; // 4x4 grid or responsive rows
    
    const state = {
        searchQuery: '',
        selectedCategories: ['Prints', 'Sculptures & Installations', 'Watercolours & Collages', 'Livres d\'artiste'],
        selectedTechniques: [],
        sortOrder: 'num-asc'
    };

    // DOM Elements
    const tabs = document.querySelectorAll('.nav-tab-btn, .mobile-tab-btn');
    const sections = document.querySelectorAll('.tab-content');
    const mobileToggle = document.getElementById('mobile-toggle');
    const mobileDrawer = document.getElementById('mobile-drawer');
    const logoBtn = document.getElementById('logo-btn');
    
    // Gallery Elements
    const galleryGrid = document.getElementById('gallery-grid');
    const resultsCount = document.getElementById('results-count');
    const paginationControls = document.getElementById('pagination-controls');
    const activeTagsContainer = document.getElementById('active-tags-container');
    const searchInput = document.getElementById('search-input');
    const sortSelect = document.getElementById('sort-select');
    const techniquesFilterList = document.getElementById('techniques-filter-list');
    const clearFiltersBtn = document.getElementById('clear-filters');
    
    // Highlight elements
    const highlightsGrid = document.getElementById('featured-highlights-grid');
    
    // Modals
    const artworkModal = document.getElementById('artwork-modal');
    const inquiryModal = document.getElementById('inquiry-modal');
    const closeArtworkModalBtn = document.getElementById('close-artwork-modal');
    const closeInquiryModalBtn = document.getElementById('close-inquiry-modal');
    const inquireArtworkBtn = document.getElementById('inquire-artwork-btn');
    
    // Modal Details Panel
    const modalArtImage = document.getElementById('modal-art-image');
    const modalArtCategory = document.getElementById('modal-art-category');
    const modalArtTitle = document.getElementById('modal-art-title');
    const modalArtId = document.getElementById('modal-art-id');
    const modalArtDate = document.getElementById('modal-art-date');
    const modalArtDimensions = document.getElementById('modal-art-dimensions');
    const modalArtEdition = document.getElementById('modal-art-edition');
    const modalArtTechnique = document.getElementById('modal-art-technique');
    const modalArtExhibitions = document.getElementById('modal-art-exhibitions');
    const modalArtCollections = document.getElementById('modal-art-collections');
    const modalArtMetadataTable = document.getElementById('modal-art-metadata-table');
    const modalArtQuoteContainer = document.getElementById('modal-art-quote-container');
    const modalArtQuote = document.getElementById('modal-art-quote');
    
    // Context Inquiry fields
    const inquiryPreviewImg = document.getElementById('inquiry-preview-img');
    const inquiryPreviewTitle = document.getElementById('inquiry-preview-title');
    const inquiryPreviewMeta = document.getElementById('inquiry-preview-meta');
    const inquiryArtId = document.getElementById('inquiry-art-id');
    const inquiryArtTitleField = document.getElementById('inquiry-art-title-field');
    const artworkInquiryForm = document.getElementById('artwork-inquiry-form');
    
    // Curatorial form
    const curatorialContactForm = document.getElementById('curatorial-contact-form');
    
    // Press Room Navigation / Actions
    const pressToCuratorBtn = document.getElementById('press-to-curator-btn');
    const dlExhibitions = document.getElementById('dl-exhibitions');
    const dlMediaKit = document.getElementById('dl-media-kit');
    const dlEssayGuide = document.getElementById('dl-essay-guide');
    
    // Toast Notification
    const toast = document.getElementById('toast-notification');
    const toastMsg = document.getElementById('toast-message');

    // Currently focused artwork for inquiries
    let activeArtwork = null;

    // Carousel States (for the 3 rotating showcases on Agathe Home)
    const carouselStates = {
        prints: { items: [], currentIndex: 0, intervalId: null },
        sculptures: { items: [], currentIndex: 0, intervalId: null },
        watercolours: { items: [], currentIndex: 0, intervalId: null }
    };

    // ==========================================================================
    // 1. APPLICATION INITS & DATA FETCHING
    // ==========================================================================

    async function init() {
        try {
            const response = await fetch('database/artworks.json');
            if (!response.ok) throw new Error('Network response was not ok');
            artworks = await response.json();
            
            // Re-order index starting numbers
            artworks = artworks.map((art, idx) => ({
                ...art,
                // Ensure every artwork has a unique fallback ID if artwork_number is blank
                uid: art.artwork_number || `AS-${100 + idx}`
            }));
            
            filteredArtworks = [...artworks];
            
            // Build dynamic filters
            buildTechniqueFilters();
            

            
            // Initialize Homepage Carousels
            initCarousels();
            
            // Initial Gallery Render
            updateActiveTags();
            filterAndRenderGallery();
            
            // Attach event listeners
            setupEventListeners();

            // Initialize Connections Network Graph
            initConnectionsGraph();

            // Handle initial deep-linked tab
            handleInitialHash();
        } catch (error) {
            console.error('Failed to load artwork database:', error);
            if (galleryGrid) {
                galleryGrid.innerHTML = `<div class="gallery-loader">Error loading archival database. Please check console.</div>`;
            }
        }
    }

    // Extract techniques dynamically
    function buildTechniqueFilters() {
        const techniquesSet = new Set();
        artworks.forEach(art => {
            if (art.technique) {
                art.technique.split(',').forEach(tech => {
                    techniquesSet.add(tech.trim());
                });
            }
        });
        
        const sortedTechniques = Array.from(techniquesSet).sort();
        
        if (techniquesFilterList) {
            techniquesFilterList.innerHTML = sortedTechniques.map(tech => `
                <label class="filter-checkbox-label">
                    <input type="checkbox" name="technique" value="${tech}">
                    <span>${tech}</span>
                </label>
            `).join('');
            
            // Bind listeners to new checkboxes
            document.querySelectorAll('input[name="technique"]').forEach(cb => {
                cb.addEventListener('change', (e) => {
                    if (e.target.checked) {
                        state.selectedTechniques.push(e.target.value);
                    } else {
                        state.selectedTechniques = state.selectedTechniques.filter(t => t !== e.target.value);
                    }
                    currentPage = 1;
                    updateActiveTags();
                    filterAndRenderGallery();
                });
            });
        }
    }

    // ==========================================================================
    // 2. TIMELINE NARRATIVE
    // ==========================================================================

    // ==========================================================================
    // 2.5 HOMEPAGE SHOWCASE CAROUSELS
    // ==========================================================================

    function getRandomSelection(arr, count) {
        const shuffled = [...arr].sort(() => 0.5 - Math.random());
        return shuffled.slice(0, count);
    }

    function initCarousels() {
        // Filter out works with images
        const worksWithImages = artworks.filter(art => art.local_image_path && art.local_image_path !== "");
        
        // Prints
        const printsList = worksWithImages.filter(art => art.category === 'Prints');
        carouselStates.prints.items = getRandomSelection(printsList, 5);
        
        // Sculptures
        const sculpturesList = worksWithImages.filter(art => art.category === 'Sculptures & Installations');
        carouselStates.sculptures.items = getRandomSelection(sculpturesList, 5);
        
        // Watercolours
        const watercoloursList = worksWithImages.filter(art => art.category === 'Watercolours & Collages');
        carouselStates.watercolours.items = getRandomSelection(watercoloursList, 5);
        
        // Render and setup listeners
        ['prints', 'sculptures', 'watercolours'].forEach(key => {
            renderCarouselSlide(key);
            setupCarouselListeners(key);
            startCarouselTimer(key);
        });
    }

    function renderCarouselSlide(key) {
        const container = document.querySelector(`#carousel-${key} .carousel-slide-active`);
        const dotsContainer = document.querySelector(`#carousel-${key} .carousel-dots`);
        if (!container) return;
        
        const carousel = carouselStates[key];
        if (carousel.items.length === 0) {
            container.innerHTML = '<div class="gallery-loader">No artworks found.</div>';
            return;
        }
        
        const art = carousel.items[carousel.currentIndex];
        const hasImage = art.local_image_path && art.local_image_path !== "";
        
        const wrapper = container.querySelector('.carousel-image-wrapper');
        const metaContent = container.querySelector('.carousel-meta-content');
        
        if (wrapper && metaContent) {
            // Fade out the old metadata
            metaContent.style.opacity = '0';
            
            // Select existing images and fallbacks
            const oldImgs = wrapper.querySelectorAll('.carousel-img:not(.outgoing)');
            const fallbackEl = wrapper.querySelector('.art-image-fallback');
            
            // Remove any other loading images that haven't finished loading yet
            wrapper.querySelectorAll('.carousel-img[data-loading="true"]').forEach(img => {
                img.remove();
            });
            
            let newImg = null;
            if (hasImage) {
                // Create a new image for the incoming slide
                newImg = document.createElement('img');
                newImg.className = 'carousel-img';
                newImg.style.transition = 'opacity 0.8s ease-in-out';
                newImg.style.opacity = '0';
                newImg.dataset.loading = 'true';
                
                // Set up handlers before setting src
                newImg.onload = function() {
                    // Start cross-fade
                    delete newImg.dataset.loading;
                    newImg.style.opacity = '1';
                    
                    oldImgs.forEach(img => {
                        img.style.opacity = '0';
                        img.classList.add('outgoing');
                    });
                    
                    if (fallbackEl) {
                        fallbackEl.style.opacity = '0';
                        setTimeout(() => {
                            if (fallbackEl.style.opacity === '0') {
                                fallbackEl.style.display = 'none';
                            }
                        }, 800);
                    }
                    
                    // Clean up outgoing after fade completes
                    setTimeout(() => {
                        wrapper.querySelectorAll('.carousel-img.outgoing').forEach(img => {
                            img.remove();
                        });
                    }, 850);
                };
                
                newImg.onerror = function() {
                    delete newImg.dataset.loading;
                    this.style.display = 'none';
                    if (fallbackEl) {
                        fallbackEl.style.display = 'flex';
                        fallbackEl.offsetHeight; // trigger reflow
                        fallbackEl.style.opacity = '1';
                    }
                    // Fade out old images anyway
                    oldImgs.forEach(img => {
                        img.style.opacity = '0';
                        img.classList.add('outgoing');
                    });
                    setTimeout(() => {
                        wrapper.querySelectorAll('.carousel-img.outgoing').forEach(img => {
                            img.remove();
                        });
                    }, 850);
                };
                
                // Set source to trigger loading
                newImg.src = art.local_image_path;
                newImg.alt = art.title;
                
                // Append new image to the wrapper
                wrapper.appendChild(newImg);
            } else {
                // No image, transition to fallback
                if (fallbackEl) {
                    fallbackEl.style.display = 'flex';
                    fallbackEl.offsetHeight; // reflow
                    fallbackEl.style.opacity = '1';
                }
                oldImgs.forEach(img => {
                    img.style.opacity = '0';
                    img.classList.add('outgoing');
                });
                setTimeout(() => {
                    wrapper.querySelectorAll('.carousel-img.outgoing').forEach(img => {
                        img.remove();
                    });
                }, 850);
            }
            
            // Wait for metadata to fade out (e.g. 300ms) before updating texts
            setTimeout(() => {
                // Update text elements inside metaContent
                const catEl = metaContent.querySelector('.art-category');
                const titleEl = metaContent.querySelector('h4');
                const descEl = metaContent.querySelector('p');
                const viewBtn = metaContent.querySelector('.carousel-view-btn');
                
                if (catEl) catEl.innerText = `${art.category} • ${art.date || 'n.d.'}`;
                if (titleEl) titleEl.innerText = art.title;
                if (descEl) descEl.innerText = `${art.dimensions || 'Dimensions variable'} • ${art.technique || 'Medium not specified'}`;
                
                if (viewBtn) {
                    viewBtn.setAttribute('data-uid', art.uid);
                    // Rebind click listener
                    const newBtn = viewBtn.cloneNode(true);
                    viewBtn.parentNode.replaceChild(newBtn, viewBtn);
                    newBtn.addEventListener('click', (e) => {
                        e.stopPropagation();
                        openArtworkLightbox(art);
                    });
                }
                
                // Fade metadata back in
                metaContent.style.opacity = '1';
            }, 300);
        } else {
            // First render: build full layout
            const imageHtml = hasImage 
                ? `<img src="${art.local_image_path}" alt="${art.title}" class="carousel-img" style="transition: opacity 0.8s ease-in-out; opacity: 1;" onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';">`
                : '';
                
            container.innerHTML = `
                <div class="carousel-image-wrapper">
                    ${imageHtml}
                    <div class="art-image-fallback" style="${hasImage ? 'display:none;' : 'display:flex;'}; transition: opacity 0.8s ease-in-out; opacity: 1;">
                        <span class="fallback-icon">✦</span>
                        <p>Artwork Showcase</p>
                    </div>
                </div>
                <div class="carousel-meta-content" style="transition: opacity 0.5s ease-in-out; opacity: 1;">
                    <span class="art-category">${art.category} • ${art.date || 'n.d.'}</span>
                    <h4>${art.title}</h4>
                    <p>${art.dimensions || 'Dimensions variable'} • ${art.technique || 'Medium not specified'}</p>
                    <div class="carousel-slide-footer">
                        <button class="carousel-view-btn" data-uid="${art.uid}">View Details</button>
                    </div>
                </div>
            `;
            
            // Attach click listener for detail view
            container.querySelector('.carousel-view-btn').addEventListener('click', (e) => {
                e.stopPropagation();
                openArtworkLightbox(art);
            });
        }

        // Update dots
        if (dotsContainer) {
            dotsContainer.innerHTML = carousel.items.map((_, idx) => `
                <div class="carousel-dot ${idx === carousel.currentIndex ? 'active' : ''}" data-idx="${idx}"></div>
            `).join('');
            
            // Dot clicks
            dotsContainer.querySelectorAll('.carousel-dot').forEach(dot => {
                dot.addEventListener('click', (e) => {
                    const targetIdx = parseInt(e.target.getAttribute('data-idx'));
                    carousel.currentIndex = targetIdx;
                    renderCarouselSlide(key);
                    resetCarouselTimer(key);
                });
            });
        }
    }

    function setupCarouselListeners(key) {
        const prevBtn = document.querySelector(`#carousel-${key} .prev`);
        const nextBtn = document.querySelector(`#carousel-${key} .next`);
        
        if (prevBtn) {
            prevBtn.addEventListener('click', () => {
                const carousel = carouselStates[key];
                carousel.currentIndex = (carousel.currentIndex - 1 + carousel.items.length) % carousel.items.length;
                renderCarouselSlide(key);
                resetCarouselTimer(key);
            });
        }
        
        if (nextBtn) {
            nextBtn.addEventListener('click', () => {
                const carousel = carouselStates[key];
                carousel.currentIndex = (carousel.currentIndex + 1) % carousel.items.length;
                renderCarouselSlide(key);
                resetCarouselTimer(key);
            });
        }
    }

    function startCarouselTimer(key) {
        const carousel = carouselStates[key];
        carousel.intervalId = setInterval(() => {
            carousel.currentIndex = (carousel.currentIndex + 1) % carousel.items.length;
            renderCarouselSlide(key);
        }, 5000); // Rotate every 5 seconds
    }

    function resetCarouselTimer(key) {
        const carousel = carouselStates[key];
        if (carousel.intervalId) {
            clearInterval(carousel.intervalId);
        }
        startCarouselTimer(key);
    }

    // ==========================================================================
    // 3. ARCHIVE FILTERING & RENDERING
    // ==========================================================================

    function filterAndRenderGallery() {
        // Apply Filters
        filteredArtworks = artworks.filter(art => {
            // Search query matches title, subcategory, date, or artwork ID
            const matchesSearch = state.searchQuery === '' || 
                art.title.toLowerCase().includes(state.searchQuery) ||
                art.subcategory.toLowerCase().includes(state.searchQuery) ||
                (art.date && art.date.includes(state.searchQuery)) ||
                (art.artwork_number && art.artwork_number.includes(state.searchQuery));
                
            // Category filter
            const matchesCategory = state.selectedCategories.includes(art.category);
            
            // Technique filter
            let matchesTechnique = true;
            if (state.selectedTechniques.length > 0) {
                if (!art.technique) {
                    matchesTechnique = false;
                } else {
                    const artTechs = art.technique.split(',').map(t => t.trim());
                    matchesTechnique = state.selectedTechniques.some(t => artTechs.includes(t));
                }
            }
            
            return matchesSearch && matchesCategory && matchesTechnique;
        });

        // Apply Sorting
        filteredArtworks.sort((a, b) => {
            if (state.sortOrder === 'title-asc') {
                return a.title.localeCompare(b.title);
            } else if (state.sortOrder === 'date-desc') {
                const dateA = parseInt(a.date) || 0;
                const dateB = parseInt(b.date) || 0;
                return dateB - dateA;
            } else if (state.sortOrder === 'date-asc') {
                const dateA = parseInt(a.date) || 9999;
                const dateB = parseInt(b.date) || 9999;
                return dateA - dateB;
            } else if (state.sortOrder === 'num-desc') {
                const numA = parseInt(a.artwork_number) || 0;
                const numB = parseInt(b.artwork_number) || 0;
                return numB - numA;
            } else { // default: num-asc
                const numA = parseInt(a.artwork_number) || 9999;
                const numB = parseInt(b.artwork_number) || 9999;
                return numA - numB;
            }
        });

        // Update counters
        resultsCount.innerText = filteredArtworks.length;
        
        // Render current page
        renderGalleryPage();
    }

    function renderGalleryPage() {
        if (!galleryGrid) return;
        
        if (filteredArtworks.length === 0) {
            galleryGrid.innerHTML = `
                <div class="gallery-loader">
                    <p>No artworks match your selected filters.</p>
                </div>
            `;
            paginationControls.innerHTML = '';
            return;
        }

        const startIndex = (currentPage - 1) * pageSize;
        const endIndex = startIndex + pageSize;
        const pageItems = filteredArtworks.slice(startIndex, endIndex);

        galleryGrid.innerHTML = pageItems.map(art => {
            const hasImage = art.local_image_path && art.local_image_path !== "";
            const imageHtml = hasImage 
                ? `<img src="${art.local_image_path}" alt="${art.title}" loading="lazy" onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';">`
                : '';
                
            return `
                <article class="art-card glassmorphic" data-uid="${art.uid}">
                    <div class="art-card-image-wrapper">
                        ${imageHtml}
                        <div class="art-image-fallback" style="${hasImage ? 'display:none;' : 'display:flex;'}">
                            <span class="fallback-icon">⧉</span>
                            <p>Space Engraving</p>
                            <small>${art.dimensions || 'No Dimensions'}</small>
                        </div>
                    </div>
                    <div class="art-card-content">
                        <span class="art-card-meta">${art.subcategory} • ${art.date || 'n.d.'}</span>
                        <h3 class="art-card-title">${art.title}</h3>
                        <p class="art-card-specs">${art.technique || 'Medium not specified'}</p>
                        <div class="art-card-actions">
                            <button class="art-card-btn-view" data-action="view" data-uid="${art.uid}">View Details</button>
                            <button class="art-card-btn-inquire" data-action="inquire" data-uid="${art.uid}" aria-label="Inquire about ${art.title}">Inquire via Estate</button>
                        </div>
                    </div>
                </article>
            `;
        }).join('');

        // Rebind card button listeners
        galleryGrid.querySelectorAll('button').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                const action = e.target.getAttribute('data-action');
                const uid = e.target.getAttribute('data-uid');
                const artwork = artworks.find(art => art.uid === uid);
                
                if (artwork) {
                    if (action === 'view') {
                        openArtworkLightbox(artwork);
                    } else if (action === 'inquire') {
                        openInquiryModal(artwork);
                    }
                }
            });
        });

        // Clicking card opens lightbox
        galleryGrid.querySelectorAll('.art-card').forEach(card => {
            card.addEventListener('click', () => {
                const uid = card.getAttribute('data-uid');
                const artwork = artworks.find(art => art.uid === uid);
                if (artwork) openArtworkLightbox(artwork);
            });
        });

        renderPaginationControls();
    }

    function renderPaginationControls() {
        if (!paginationControls) return;
        
        const totalPages = Math.ceil(filteredArtworks.length / pageSize);
        if (totalPages <= 1) {
            paginationControls.innerHTML = '';
            return;
        }

        let html = '';
        
        // Prev button
        html += `<button class="pg-btn ${currentPage === 1 ? 'disabled' : ''}" data-page="${currentPage - 1}" aria-label="Previous Page">&lt;</button>`;
        
        // Page numbers
        const range = 2;
        for (let i = 1; i <= totalPages; i++) {
            if (i === 1 || i === totalPages || (i >= currentPage - range && i <= currentPage + range)) {
                html += `<button class="pg-btn ${i === currentPage ? 'active' : ''}" data-page="${i}">${i}</button>`;
            } else if (i === currentPage - range - 1 || i === currentPage + range + 1) {
                html += `<span class="pg-info">...</span>`;
            }
        }
        
        // Next button
        html += `<button class="pg-btn ${currentPage === totalPages ? 'disabled' : ''}" data-page="${currentPage + 1}" aria-label="Next Page">&gt;</button>`;
        
        paginationControls.innerHTML = html;
        
        // Bind click events
        paginationControls.querySelectorAll('.pg-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const targetPage = parseInt(e.target.getAttribute('data-page'));
                if (targetPage && targetPage !== currentPage) {
                    currentPage = targetPage;
                    renderGalleryPage();
                    document.getElementById('archive-tab').scrollIntoView({ behavior: 'smooth' });
                }
            });
        });
    }

    // Active Tags
    function updateActiveTags() {
        if (!activeTagsContainer) return;
        
        let tags = [];
        
        if (state.searchQuery) {
            tags.push(`<div class="filter-tag">Search: "${state.searchQuery}" <button data-type="search">&times;</button></div>`);
        }
        
        if (state.selectedCategories.length < 4) {
            state.selectedCategories.forEach(cat => {
                tags.push(`<div class="filter-tag">${cat} <button data-type="category" data-val="${cat}">&times;</button></div>`);
            });
        }
        
        state.selectedTechniques.forEach(tech => {
            tags.push(`<div class="filter-tag">${tech} <button data-type="technique" data-val="${tech}">&times;</button></div>`);
        });
        
        activeTagsContainer.innerHTML = tags.join('');
        
        // Bind tag close events
        activeTagsContainer.querySelectorAll('button').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const type = e.target.getAttribute('data-type');
                const val = e.target.getAttribute('data-val');
                
                if (type === 'search') {
                    state.searchQuery = '';
                    searchInput.value = '';
                } else if (type === 'category') {
                    state.selectedCategories = state.selectedCategories.filter(c => c !== val);
                    const checkbox = document.querySelector(`input[name="category"][value="${val}"]`);
                    if (checkbox) checkbox.checked = false;
                } else if (type === 'technique') {
                    state.selectedTechniques = state.selectedTechniques.filter(t => t !== val);
                    const checkbox = document.querySelector(`input[name="technique"][value="${val}"]`);
                    if (checkbox) checkbox.checked = false;
                }
                
                currentPage = 1;
                updateActiveTags();
                filterAndRenderGallery();
            });
        });
    }

    // ==========================================================================
    // 4. MODALS & INQUIRIES FLOW
    // ==========================================================================

    function openArtworkLightbox(artwork) {
        activeArtwork = artwork;
        
        const hasImage = artwork.local_image_path && artwork.local_image_path !== "";
        modalArtImage.src = hasImage ? artwork.local_image_path : '';
        modalArtImage.alt = artwork.title;
        modalArtImage.style.display = hasImage ? 'block' : 'none';
        
        modalArtCategory.innerText = `${artwork.category} • ${artwork.subcategory}`;
        modalArtTitle.innerText = artwork.title;
        
        modalArtId.innerText = artwork.artwork_number || '-';
        modalArtDate.innerText = artwork.date || 'Not specified';
        modalArtDimensions.innerText = artwork.dimensions || 'Dimensions variable';
        modalArtEdition.innerText = artwork.edition || 'Unique Work / Unknown';
        modalArtTechnique.innerText = artwork.technique || 'Medium not specified';
        modalArtExhibitions.innerText = artwork.exhibition_locations || 'Not specified';
        modalArtCollections.innerText = artwork.represented_in_public_collections || 'Estate Archive';
        
        // Hide metadata table & inquiry button and display autobiography quotes for memoir illustrations
        if (artwork.category === 'Autobiography Illustration') {
            modalArtMetadataTable.style.display = 'none';
            inquireArtworkBtn.style.display = 'none';
            if (artwork.quote) {
                modalArtQuote.innerText = artwork.quote;
                modalArtQuoteContainer.style.display = 'block';
            } else {
                modalArtQuote.innerText = '';
                modalArtQuoteContainer.style.display = 'none';
            }
        } else {
            modalArtMetadataTable.style.display = '';
            inquireArtworkBtn.style.display = '';
            modalArtQuoteContainer.style.display = 'none';
            modalArtQuote.innerText = '';
        }
        
        artworkModal.classList.add('open');
        document.body.style.overflow = 'hidden';
    }

    function closeArtworkModal() {
        artworkModal.classList.remove('open');
        document.body.style.overflow = '';
    }

    function openInquiryModal(artwork) {
        activeArtwork = artwork;
        
        const hasImage = artwork.local_image_path && artwork.local_image_path !== "";
        inquiryPreviewImg.src = hasImage ? artwork.local_image_path : '';
        inquiryPreviewImg.style.display = hasImage ? 'block' : 'none';
        
        inquiryPreviewTitle.innerText = artwork.title;
        inquiryPreviewMeta.innerText = `${artwork.category} • ${artwork.dimensions || 'Dimensions variable'}`;
        
        inquiryArtId.value = artwork.uid;
        inquiryArtTitleField.value = artwork.title;
        
        // Pre-fill message details
        document.getElementById('inquiry-message').value = `Hello, I would like to inquire via Estate Administration regarding the acquisition status, provenance, and condition reports of the artwork: "${artwork.title}" (ID: ${artwork.artwork_number || 'N/A'}). Thank you.`;
        
        closeArtworkModal();
        
        inquiryModal.classList.add('open');
        document.body.style.overflow = 'hidden';
    }

    function closeInquiryModal() {
        inquiryModal.classList.remove('open');
        document.body.style.overflow = '';
    }

    // Toast triggers
    function showToast(message) {
        toastMsg.innerText = message;
        toast.classList.add('active');
        
        setTimeout(() => {
            toast.classList.remove('active');
        }, 5000);
    }

    // SPA Tab Switching & Deep Linking
    function switchTab(targetTab, updateHash = true) {
        // Clear active states
        tabs.forEach(t => t.classList.remove('active'));
        sections.forEach(s => s.classList.remove('active'));
        
        // Set new active state
        document.querySelectorAll(`[data-tab="${targetTab}"]`).forEach(t => t.classList.add('active'));
        const targetSection = document.getElementById(`${targetTab}-tab`);
        if (targetSection) targetSection.classList.add('active');

        // Refresh Vis.js Network Graph if switching to connections tab (prevents 0-width/0-height canvas initialization bug)
        if (targetTab === 'connections' && typeof window.refreshConnectionsGraph === 'function') {
            window.refreshConnectionsGraph();
        }
        
        // Close mobile menu drawer if open
        if (mobileDrawer) mobileDrawer.classList.remove('open');
        if (mobileToggle) mobileToggle.classList.remove('active');
        
        // Scroll to top of content
        window.scrollTo({ top: 0, behavior: 'smooth' });
        
        // Update URL hash to enable bookmarking & deep-linking
        if (updateHash && window.location.hash !== `#${targetTab}`) {
            window.location.hash = targetTab;
        }
    }

    function handleInitialHash() {
        const hash = window.location.hash.substring(1);
        const validTabs = ['home', 'projections', 'archive', 'innovations', 'connections', 'press'];
        if (validTabs.includes(hash)) {
            switchTab(hash, false);
        } else {
            switchTab('home', false);
        }
    }

    // ==========================================================================
    // 5. EVENT HANDLERS & BINDINGS
    // ==========================================================================

    function setupEventListeners() {
        // Tab switching logic (SPA)
        tabs.forEach(tab => {
            tab.addEventListener('click', (e) => {
                const targetTab = e.currentTarget.getAttribute('data-tab') || e.target.getAttribute('data-tab');
                if (targetTab) {
                    if (window.location.hash === `#${targetTab}` || (!window.location.hash && targetTab === 'home')) {
                        // Already on this tab, just scroll to top and close drawer
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                        if (mobileDrawer) mobileDrawer.classList.remove('open');
                        if (mobileToggle) mobileToggle.classList.remove('active');
                    } else {
                        window.location.hash = targetTab;
                    }
                }
            });
        });

        // Handle browser navigation (back/forward)
        window.addEventListener('hashchange', () => {
            const hash = window.location.hash.substring(1);
            const validTabs = ['home', 'projections', 'archive', 'innovations', 'connections', 'press'];
            if (validTabs.includes(hash)) {
                switchTab(hash, false);
            } else if (!hash) {
                switchTab('home', false);
            }
        });

        // Logo click goes to Home tab
        if (logoBtn) {
            logoBtn.addEventListener('click', (e) => {
                e.preventDefault();
                document.querySelector('.nav-tab-btn[data-tab="home"]').click();
            });
        }

        // Mobile drawer toggle
        if (mobileToggle) {
            mobileToggle.addEventListener('click', () => {
                mobileToggle.classList.toggle('active');
                mobileDrawer.classList.toggle('open');
            });
        }

        // Hero actions redirection buttons
        document.getElementById('explore-archive-btn').addEventListener('click', () => {
            document.querySelector('.nav-tab-btn[data-tab="archive"]').click();
        });
        
        document.getElementById('read-bio-btn').addEventListener('click', () => {
            document.querySelector('.nav-tab-btn[data-tab="projections"]').click();
        });
        


        // Search listener
        if (searchInput) {
            searchInput.addEventListener('input', (e) => {
                state.searchQuery = e.target.value.toLowerCase().trim();
                currentPage = 1;
                updateActiveTags();
                filterAndRenderGallery();
            });
        }

        // Sort select listener
        if (sortSelect) {
            sortSelect.addEventListener('change', (e) => {
                state.sortOrder = e.target.value;
                currentPage = 1;
                filterAndRenderGallery();
            });
        }

        // Category checkboxes listener
        document.querySelectorAll('input[name="category"]').forEach(cb => {
            cb.addEventListener('change', (e) => {
                if (e.target.checked) {
                    state.selectedCategories.push(e.target.value);
                } else {
                    state.selectedCategories = state.selectedCategories.filter(c => c !== e.target.value);
                }
                currentPage = 1;
                updateActiveTags();
                filterAndRenderGallery();
            });
        });

        // Clear filters button
        if (clearFiltersBtn) {
            clearFiltersBtn.addEventListener('click', () => {
                state.searchQuery = '';
                state.selectedCategories = ['Prints', 'Sculptures & Installations', 'Watercolours & Collages', 'Livres d\'artiste'];
                state.selectedTechniques = [];
                state.sortOrder = 'num-asc';
                
                searchInput.value = '';
                sortSelect.value = 'num-asc';
                
                document.querySelectorAll('input[name="category"]').forEach(cb => {
                    cb.checked = true;
                });
                
                document.querySelectorAll('input[name="technique"]').forEach(cb => {
                    cb.checked = false;
                });
                
                currentPage = 1;
                updateActiveTags();
                filterAndRenderGallery();
            });
        }

        // Modals overlay clicks to close
        [artworkModal, inquiryModal].forEach(modal => {
            modal.addEventListener('click', (e) => {
                if (e.target === modal) {
                    closeArtworkModal();
                    closeInquiryModal();
                }
            });
        });

        // Modal close button bindings
        closeArtworkModalBtn.addEventListener('click', closeArtworkModal);
        closeInquiryModalBtn.addEventListener('click', closeInquiryModal);
        
        // Inquire button inside artwork detail lightbox opens inquiry modal
        inquireArtworkBtn.addEventListener('click', () => {
            if (activeArtwork) {
                openInquiryModal(activeArtwork);
            }
        });

        // Collector Form Submit Handler (Acquisition lead)
        if (artworkInquiryForm) {
            artworkInquiryForm.addEventListener('submit', (e) => {
                e.preventDefault();
                const clientName = document.getElementById('inquiry-name').value;
                const clientEmail = document.getElementById('inquiry-email').value;
                const clientPhone = document.getElementById('inquiry-phone').value;
                const inquiryTypeSelect = document.getElementById('inquiry-type');
                const inquiryType = inquiryTypeSelect ? inquiryTypeSelect.options[inquiryTypeSelect.selectedIndex].text : '';
                const message = document.getElementById('inquiry-message').value;
                const artTitle = inquiryArtTitleField.value;
                const artId = document.getElementById('inquiry-art-id').value;
                
                const emailTo = 'sylvansitkey07@gmail.com';
                const subject = `Agathe Sorel Estate Inquiry: ${artTitle} (${artId})`;
                const body = `Agathe Sorel Estate - Artwork Inquiry\n\n` +
                             `Artwork: ${artTitle} (${artId})\n` +
                             `Inquirer Name/Institution: ${clientName}\n` +
                             `Email: ${clientEmail}\n` +
                             `Phone: ${clientPhone}\n` +
                             `Inquiry Type: ${inquiryType}\n\n` +
                             `Message Details:\n${message}`;

                const mailtoUrl = `mailto:${emailTo}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
                
                closeInquiryModal();
                showToast(`Acquisition inquiry draft created. Opening mail client...`);
                
                // Open mailto link
                window.location.href = mailtoUrl;
                artworkInquiryForm.reset();
            });
        }

        // Institutional Form Submit Handler (Curatorial request)
        if (curatorialContactForm) {
            curatorialContactForm.addEventListener('submit', (e) => {
                e.preventDefault();
                const curatorName = document.getElementById('curator-name').value;
                const curatorEmail = document.getElementById('curator-email').value;
                const institution = document.getElementById('curator-institution').value;
                const requestTypeSelect = document.getElementById('curator-request-type');
                const requestType = requestTypeSelect ? requestTypeSelect.options[requestTypeSelect.selectedIndex].text : '';
                const message = document.getElementById('curator-message').value;
                
                const emailTo = 'sylvansitkey07@gmail.com';
                const subject = `Curatorial Inquiry: ${requestType} - ${institution}`;
                const body = `Agathe Sorel Estate - Curatorial / Institutional Request\n\n` +
                             `Name: ${curatorName}\n` +
                             `Email: ${curatorEmail}\n` +
                             `Institution: ${institution}\n` +
                             `Request Type: ${requestType}\n\n` +
                             `Request Details:\n${message}`;

                const mailtoUrl = `mailto:${emailTo}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
                
                showToast(`Curatorial inquiry draft created. Opening mail client...`);
                
                // Open mailto link
                window.location.href = mailtoUrl;
                curatorialContactForm.reset();
            });
        }

        // Curatorial Hub Collection Tabs switching
        const collectionBtns = document.querySelectorAll('.collections-tab-btn');
        const collectionPanes = document.querySelectorAll('.collections-tab-pane');
        
        collectionBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                const targetPane = e.target.getAttribute('data-col');
                
                collectionBtns.forEach(b => b.classList.remove('active'));
                collectionPanes.forEach(p => p.classList.remove('active'));
                
                e.target.classList.add('active');
                const target = document.getElementById(`col-${targetPane}`);
                if (target) target.classList.add('active');
            });
        });

        // Press Room download trigger simulators
        if (dlExhibitions) {
            dlExhibitions.addEventListener('click', () => {
                showToast('Exhibition Histories PDF download initiated.');
            });
        }
        if (dlMediaKit) {
            dlMediaKit.addEventListener('click', () => {
                showToast('Press Photograph ZIP kit download initiated.');
            });
        }
        if (dlEssayGuide) {
            dlEssayGuide.addEventListener('click', () => {
                showToast('Historical Essays & Curation Guide PDF download initiated.');
            });
        }
        if (pressToCuratorBtn) {
            pressToCuratorBtn.addEventListener('click', () => {
                const formCard = document.querySelector('.curatorial-card');
                if (formCard) {
                    formCard.scrollIntoView({ behavior: 'smooth' });
                }
            });
        }
        
        // Initialize Technical Innovations page widgets
        initTechnicalInnovations();

        // Initialize Timeline illustration click-to-lightbox actions
        initTimelineImages();

        // Initialize Timeline volume switching toggles & inquiry hook
        initTimelineVolumeToggle();
    }

    // ==========================================================================
    // 6. TECHNICAL INNOVATIONS PAGE WIDGETS
    // ==========================================================================
    function initTechnicalInnovations() {
        const hotspots = document.querySelectorAll('#innovations-tab .hotspot-marker');
        const tooltipBox = document.getElementById('hotspot-tooltip-box');
        
        if (hotspots.length > 0 && tooltipBox) {
            // Set first hotspot active by default on load
            const firstHotspot = hotspots[0];
            if (firstHotspot) {
                firstHotspot.classList.add('active');
                tooltipBox.innerText = firstHotspot.getAttribute('data-tooltip');
            }
            
            hotspots.forEach(marker => {
                const showTooltip = () => {
                    hotspots.forEach(m => m.classList.remove('active'));
                    marker.classList.add('active');
                    tooltipBox.innerText = marker.getAttribute('data-tooltip');
                };
                
                marker.addEventListener('mouseover', showTooltip);
                marker.addEventListener('click', showTooltip);
            });
        }
        
        const shadowContainer = document.getElementById('welcome-arch-shadow-container');
        const shadowImg = shadowContainer ? shadowContainer.querySelector('.shadow-background-img') : null;
        
        if (shadowContainer && shadowImg) {
            shadowContainer.addEventListener('mousemove', (e) => {
                const rect = shadowContainer.getBoundingClientRect();
                const x = e.clientX - rect.left - rect.width / 2;
                const y = e.clientY - rect.top - rect.height / 2;
                
                // Shift shadow in opposite direction of cursor (light source simulation)
                const dx = -x * 0.12; 
                const dy = -y * 0.12;
                
                shadowImg.style.transform = `translate(calc(-50% + ${dx}px), calc(-50% + ${dy}px)) scale(1.02)`;
                shadowImg.style.opacity = '0.35';
                shadowImg.style.filter = 'brightness(0) blur(6px)';
            });
            
            shadowContainer.addEventListener('mouseleave', () => {
                shadowImg.style.transform = 'translate(-50%, -50%) scale(1.02)';
                shadowImg.style.opacity = '0.25';
                shadowImg.style.filter = 'brightness(0) blur(4px)';
            });
        }
    }

    // ==========================================================================
    // 7. TIMELINE MEMOIR IMAGES LIGHTBOX
    // ==========================================================================
    function initTimelineImages() {
        const timelineImgs = document.querySelectorAll('#projections-tab .timeline-img');
        timelineImgs.forEach(img => {
            img.addEventListener('click', (e) => {
                const target = e.target;
                const mockArtwork = {
                    local_image_path: target.getAttribute('src'),
                    title: target.getAttribute('data-title'),
                    category: 'Autobiography Illustration',
                    subcategory: `${target.getAttribute('data-vol')} • ${target.getAttribute('data-sec')}`,
                    artwork_number: `${target.getAttribute('data-vol')} ${target.getAttribute('data-page')}`,
                    date: target.getAttribute('data-date') || 'n.d.',
                    dimensions: 'Memoir Page Illustration',
                    edition: 'Documentary Record',
                    technique: target.getAttribute('data-tech') || 'Illustration',
                    exhibition_locations: 'Published in Agathe Sorel Memoirs',
                    represented_in_public_collections: 'Estate of Agathe Sorel Archive',
                    quote: target.getAttribute('data-quote')
                };
                openArtworkLightbox(mockArtwork);
            });
        });
    }

    // ==========================================================================
    // 8. TIMELINE VOLUME TOGGLING & MEMOIR INQUIRY
    // ==========================================================================
    function initTimelineVolumeToggle() {
        const volBtns = document.querySelectorAll('.volume-select-btn');
        const nodes = document.querySelectorAll('.timeline-node');
        const memoirInquiryBtn = document.getElementById('memoir-inquiry-btn');
        
        function updateTimelineVisibility(activeVol) {
            nodes.forEach(node => {
                const nodeVol = node.getAttribute('data-volume');
                if (nodeVol === activeVol) {
                    node.style.display = '';
                } else {
                    node.style.display = 'none';
                }
            });
        }
        
        if (volBtns.length > 0) {
            // Set Volume A active by default on load
            updateTimelineVisibility('A');
            
            volBtns.forEach(btn => {
                btn.addEventListener('click', () => {
                    volBtns.forEach(b => b.classList.remove('active'));
                    btn.classList.add('active');
                    
                    const selectedVol = btn.getAttribute('data-volume') === 'vol-a' ? 'A' : 'B';
                    updateTimelineVisibility(selectedVol);
                });
            });
        }
        
        // Memoir Inquiry CTA click handler
        if (memoirInquiryBtn) {
            memoirInquiryBtn.addEventListener('click', (e) => {
                e.preventDefault();
                
                // Navigate to the Press Room tab (which now contains the Curatorial Hub content)
                const pressTabBtn = document.querySelector('.nav-tab-btn[data-tab="press"]');
                if (pressTabBtn) {
                    pressTabBtn.click();
                }
                
                // Pre-populate curatorial request details
                const requestTypeSelect = document.getElementById('curator-request-type');
                if (requestTypeSelect) {
                    requestTypeSelect.value = 'acquisition';
                }
                
                const messageTextarea = document.getElementById('curator-message');
                if (messageTextarea) {
                    messageTextarea.value = "Hello, I am interested in securing a copy of Agathe Sorel's two-volume autobiography, comprising 'From Darkness to Hope' and 'Projections in Space and Time'. Please provide me with more details on how to order this publication. Thank you.";
                }
                
                // Smooth scroll to form
                const formCard = document.querySelector('.curatorial-card');
                if (formCard) {
                    formCard.scrollIntoView({ behavior: 'smooth' });
                }
            });
        }
    }

    // ==========================================================================
    // 9. INTERACTIVE CONNECTIONS (KNOWLEDGE GRAPH)
    // ==========================================================================
    function initConnectionsGraph() {
        const container = document.getElementById("graph-canvas");
        if (!container) return;

        const searchInput = document.getElementById("node-search");
        const resetBtn = document.getElementById("reset-view");
        const detailsPlaceholder = document.getElementById("details-placeholder");
        const detailContent = document.getElementById("detail-content");
        const detailType = document.getElementById("detail-type");
        const detailTitle = document.getElementById("detail-title");
        const detailMeta = document.getElementById("detail-meta");
        const detailDesc = document.getElementById("detail-desc");
        const detailConnections = document.getElementById("detail-connections");

        // Ensure KNOWLEDGE_GRAPH_DATA is accessible on window object if defined in global scope
        if (typeof KNOWLEDGE_GRAPH_DATA !== 'undefined' && !window.KNOWLEDGE_GRAPH_DATA) {
            window.KNOWLEDGE_GRAPH_DATA = KNOWLEDGE_GRAPH_DATA;
        }

        if (!window.vis || !window.KNOWLEDGE_GRAPH_DATA) {
            console.error("vis-network or KNOWLEDGE_GRAPH_DATA is not loaded.");
            return;
        }

        // State Variables
        let network = null;
        let activeFilter = "all";
        let activeNarrative = null;
        let currentSearchQuery = "";
        let selectedNodeId = null;

        // Datasets for Vis.js
        let visNodes = new vis.DataSet([]);
        let visEdges = new vis.DataSet([]);

        // Gallery Paper Theme Colors
        const colors = {
            Artist: { 
                background: "#E8F5E9", // soft sage green
                border: "#2E7D32",     // forest green
                highlight: { background: "#C8E6C9", border: "#1B5E20" } 
            },
            Institution_Studio: { 
                background: "#F3E8FF", // soft lavender
                border: "#7C3AED",     // deep purple
                highlight: { background: "#E9D5FF", border: "#581C87" } 
            },
            Technique: { 
                background: "#FFF8E1", // soft warm gold
                border: "#B45309",     // volcanic ochre
                highlight: { background: "#FFEFC2", border: "#854D0E" } 
            },
            dimmed: { 
                background: "#F1F0EA", // soft gray-paper
                border: "#D5D2C9", 
                highlight: { background: "#E5E2D9", border: "#C9C5BC" } 
            }
        };

        const shapes = {
            Artist: "dot",
            Institution_Studio: "square",
            Artwork: "triangle",
            Technique: "diamond"
        };

        // Edge Styling Constants
        const edgeColors = {
            STUDIED_UNDER: { color: "#7C3AED", highlight: "#a78bfa", hover: "#7C3AED" },
            INFLUENCED_MATERIAL_TECHNIQUE: { color: "#B45309", highlight: "#fb923c", hover: "#B45309" },
            CO_FOUNDED: { color: "#C2410C", highlight: "#fb923c", hover: "#C2410C" },
            WORKED_AT: { color: "#1E3A8A", highlight: "#3b82f6", hover: "#1E3A8A" },
            EXHIBITED_WITH: { color: "#5A5A62", highlight: "#94a3b8", hover: "#5A5A62" },
            dimmed: { color: "#E5E2D9", highlight: "#C9C5BC", hover: "#E5E2D9" }
        };

        // Preset narrative themes matching volcanic/paper styles
        const narrativeThemes = {
            translucency: {
                accentColor: "#B45309",
                nodes: ["agathe_sorel", "philadelphia_print_club", "sam_maitin", "mauricio_lasansky", "space_engraving_totem", "bertha_von_moschzisker", "acrylic_engraving"],
                edges: ["e6", "e7", "e22", "e17", "e_tech_sorel_acrylic"]
            },
            atelier17: {
                accentColor: "#2E7D32",
                nodes: ["sw_hayter", "atelier_17", "krishna_reddy", "kaiko_moti", "agathe_sorel", "jennifer_dickson", "valerie_thornton", "gabor_peterdi", "minna_citron", "helen_phillips", "jackson_pollock", "louise_bourgeois", "joan_miro", "robert_motherwell", "max_ernst", "john_buckland_wright", "karl_schrag", "sue_fuller", "viscosity_printing", "soft_ground_collage"],
                edges: ["e1", "e_studied_reddy", "e_studied_moti", "e_studied_thornton", "e_studied_dickson", "e_studied_fuller", "e_inf_reddy_hayter", "e_inf_hayter_thornton", "e_inf_hayter_pollock", "e_inf_hayter_fuller", "e_inf_miro_hayter", "e_work_miro_a17", "e_work_bourgeois_a17", "e_work_pollock_a17", "e_work_motherwell_a17", "e_work_ernst_a17", "e_work_buckland_wright_a17", "e_work_schrag_a17", "e_work_fuller_a17", "e_tech_sorel_viscosity", "e_tech_hayter_viscosity", "e_tech_hayter_soft_ground", "e_tech_a17_viscosity", "e_tech_a17_soft_ground", "e_tech_reddy_viscosity"]
            },
            goldsmiths: {
                accentColor: "#854D0E",
                nodes: ["stanley_anderson", "goldsmiths_college", "evelyn_gibbs", "paul_drury", "graham_sutherland", "robin_tanner", "anthony_gross", "agathe_sorel", "david_ferry", "stanley_jones", "peter_daglish", "slade_school", "camberwell_school", "curwen_studio", "curwen_print_study_centre", "line_engraving", "stone_lithography", "relief_printing", "john_buckland_wright", "michael_rothenstein", "bernard_cheese"],
                edges: ["e3", "e4", "e_studied_sutherland_goldsmiths", "e_studied_sutherland_anderson", "e_studied_drury_goldsmiths", "e_studied_drury_anderson", "e_studied_tanner_goldsmiths", "e_studied_tanner_anderson", "e_work_drury_goldsmiths", "e_work_anderson_goldsmiths", "e_work_gibbs_goldsmiths", "e_work_martin_goldsmiths", "e_work_sorel_goldsmiths", "e_studied_ferry_slade", "e_studied_ferry_jones", "e_studied_ferry_daglish", "e_work_daglish_slade", "e_work_ferry_curwen_centre", "e_inf_jones_ferry", "e_inf_daglish_ferry", "e_inf_anderson_sutherland", "e_inf_anderson_drury", "e_inf_anderson_tanner", "e_tech_anderson_line", "e_tech_sutherland_line", "e_tech_drury_line", "e_tech_goldsmiths_line", "e_tech_gibbs_relief", "e_tech_goldsmiths_relief", "e_tech_ferry_lithography", "e_tech_ferry_acrylic", "e_tech_jones_lithography", "e_tech_curwen_lithography", "e_work_jones_curwen", "e_cofound_jones_studio", "e_cofound_jones_centre", "e_work_cheese_camberwell", "e_tech_camberwell_acrylic", "e_tech_camberwell_viscosity", "e_tech_camberwell_line", "e_tech_camberwell_relief", "e_tech_camberwell_litho", "e_tech_buckland_wright_line", "e_tech_rothenstein_relief", "e_tech_cheese_litho"]
            },
            london: {
                accentColor: "#C2410C",
                nodes: ["david_bomberg", "borough_polytechnic", "frank_auerbach", "leon_kossoff", "lucian_freud", "rb_kitaj", "marc_balakjian", "studio_prints", "terry_willson", "palm_tree_studios", "marlborough_graphics", "joe_tilson", "marlborough_college", "william_morris_artist", "richard_shirley_smith", "victor_pasmore", "francis_bacon", "paula_rego", "henry_moore", "barbara_hepworth", "elisabeth_frink", "curwen_studio"],
                edges: ["e_studied_auerbach_bomberg", "e_work_bomberg_borough", "e_studied_kossoff_bomberg", "e_work_balakjian_studio", "e_work_kossoff_studio_prints", "e_work_freud_studio_prints", "e_work_auerbach_studio_prints", "e_work_auerbach_palm_tree", "e_work_willson_palm_tree", "e_work_auerbach_marlborough", "e_work_pasmore_marlborough", "e_work_bacon_marlborough", "e_work_rego_marlborough", "e_work_moore_marlborough", "e_work_hepworth_marlborough", "e_inf_bomberg_auerbach", "e_inf_balakjian_auerbach", "e_inf_tilson_auerbach", "e_inf_willson_auerbach", "e_inf_balakjian_freud", "e_inf_balakjian_kossoff", "e_inf_auerbach_kossoff", "e_work_moore_curwen", "e_work_hepworth_curwen", "e_work_frink_curwen", "e_work_rego_curwen", "e_inf_jones_moore", "e_inf_jones_hepworth", "e_inf_jones_rego", "e_inf_jones_frink"]
            },
            autonomy: {
                accentColor: "#7C3AED",
                nodes: [
                    "agathe_sorel", "michael_rothenstein", "julian_trevelyan", "anthony_gross", 
                    "printmakers_council", "ecole_beaux_arts", "violent_dialogue", 
                    "bernard_cheese", "merlyn_evans", "birgit_skiold", "stanley_jones", 
                    "alistair_grant", "gertrude_hermes", "graham_sutherland", "john_piper", 
                    "jennifer_dickson", "harry_eccleston"
                ],
                edges: [
                    "e9", "e10", "e11", "e12", "e21", "e15", 
                    "e_cofound_cheese", "e_cofound_evans", "e_cofound_skiold", "e_cofound_jones", 
                    "e_cofound_grant", "e_cofound_hermes", "e_cofound_dickson", "e_cofound_eccleston",
                    "e_work_eccleston_pmc"
                ]
            }
        };

        // Calculate badges on load
        function updateBadges() {
            const totalNodes = KNOWLEDGE_GRAPH_DATA.nodes.filter(n => n.type !== "Artwork").length;
            const badgeAll = document.getElementById("badge-all");
            if (badgeAll) badgeAll.innerText = totalNodes;

            const studiedCount = KNOWLEDGE_GRAPH_DATA.edges.filter(e => e.type === "STUDIED_UNDER").length;
            const badgeStudied = document.getElementById("badge-studied");
            if (badgeStudied) badgeStudied.innerText = studiedCount;

            const influenceCount = KNOWLEDGE_GRAPH_DATA.edges.filter(e => e.type === "INFLUENCED_MATERIAL_TECHNIQUE").length;
            const badgeInfluence = document.getElementById("badge-influence");
            if (badgeInfluence) badgeInfluence.innerText = influenceCount;

            const cofoundedCount = KNOWLEDGE_GRAPH_DATA.edges.filter(e => e.type === "CO_FOUNDED").length;
            const badgeCofounded = document.getElementById("badge-cofounded");
            if (badgeCofounded) badgeCofounded.innerText = cofoundedCount;

            const workedCount = KNOWLEDGE_GRAPH_DATA.edges.filter(e => e.type === "WORKED_AT").length;
            const badgeWorked = document.getElementById("badge-worked");
            if (badgeWorked) badgeWorked.innerText = workedCount;
        }

        // Generate nodes list with appropriate styling and state
        function getStyledNodes() {
            const visibleNodes = KNOWLEDGE_GRAPH_DATA.nodes.filter(node => node.type !== "Artwork");
            return visibleNodes.map(node => {
                let isDimmed = false;

                // 1. Search Query Dimming
                if (currentSearchQuery) {
                    const query = currentSearchQuery.toLowerCase();
                    const labelMatch = node.label.toLowerCase().includes(query);
                    const typeMatch = node.type.toLowerCase().includes(query);
                    const bioMatch = node.properties.bio ? node.properties.bio.toLowerCase().includes(query) : false;
                    
                    let mediumMatch = false;
                    if (node.properties.primary_mediums) {
                        mediumMatch = node.properties.primary_mediums.some(m => m.toLowerCase().includes(query));
                    }

                    if (!labelMatch && !typeMatch && !bioMatch && !mediumMatch) {
                        isDimmed = true;
                    }
                }

                // 2. Narrative Dimming
                if (activeNarrative) {
                    const theme = narrativeThemes[activeNarrative];
                    if (!theme.nodes.includes(node.id)) {
                        isDimmed = true;
                    }
                }

                // 3. Filter Dimming
                if (activeFilter !== "all" && !activeNarrative) {
                    const hasMatchingEdge = KNOWLEDGE_GRAPH_DATA.edges.some(edge => {
                        return edge.type === activeFilter && (edge.from === node.id || edge.to === node.id);
                    });
                    if (!hasMatchingEdge) {
                        isDimmed = true;
                    }
                }

                const style = isDimmed ? colors.dimmed : colors[node.type];
                const fontColor = isDimmed ? "#CBD5E1" : "#1A1A1A";
                
                return {
                    id: node.id,
                    label: node.label,
                    shape: shapes[node.type],
                    size: node.type === "Artist" ? 22 : node.type === "Institution_Studio" ? 25 : node.type === "Technique" ? 20 : 18,
                    color: {
                        background: style.background,
                        border: style.border,
                        highlight: style.highlight
                    },
                    font: {
                        color: fontColor,
                        size: 13,
                        face: "Inter",
                        strokeWidth: 2,
                        strokeColor: "#FCFCFC"
                    },
                    borderWidth: 1.5,
                    shadow: !isDimmed,
                    title: `<b>${node.label}</b> (${node.type.replace(/_/g, ' ')})<br>${node.properties.bio ? node.properties.bio.substring(0, 120) + '...' : ''}`
                };
            });
        }

        // Generate edges list with appropriate styling
        function getStyledEdges() {
            let filteredEdges = KNOWLEDGE_GRAPH_DATA.edges;

            if (activeFilter !== "all" && !activeNarrative) {
                filteredEdges = KNOWLEDGE_GRAPH_DATA.edges.filter(edge => edge.type === activeFilter);
            }

            filteredEdges = filteredEdges.filter(edge => {
                const fromNode = KNOWLEDGE_GRAPH_DATA.nodes.find(n => n.id === edge.from);
                const toNode = KNOWLEDGE_GRAPH_DATA.nodes.find(n => n.id === edge.to);
                return fromNode && fromNode.type !== "Artwork" && toNode && toNode.type !== "Artwork";
            });

            return filteredEdges.map(edge => {
                let isDimmed = false;

                if (activeNarrative) {
                    const theme = narrativeThemes[activeNarrative];
                    if (!theme.edges.includes(edge.id)) {
                        isDimmed = true;
                    }
                }

                if (currentSearchQuery) {
                    const styledNodes = getStyledNodes();
                    const fromNode = styledNodes.find(n => n.id === edge.from);
                    const toNode = styledNodes.find(n => n.id === edge.to);
                    if ((fromNode && fromNode.color.background === colors.dimmed.background) || 
                        (toNode && toNode.color.background === colors.dimmed.background)) {
                        isDimmed = true;
                    }
                }

                const style = isDimmed ? edgeColors.dimmed : edgeColors[edge.type];
                const dashes = edge.type === "INFLUENCED_MATERIAL_TECHNIQUE" || edge.type === "EXHIBITED_WITH";
                
                let edgeLabel = edge.type.replace(/_/g, " ");
                let edgeTitle = `<b>${edgeLabel}</b>`;
                if (edge.properties.years) edgeTitle += ` (${edge.properties.years})`;
                if (edge.properties.year) edgeTitle += ` (${edge.properties.year})`;
                if (edge.properties.technique) edgeTitle += `<br>Technique: <i>${edge.properties.technique}</i>`;
                if (edge.properties.details) edgeTitle += `<br><span style="font-size:0.75rem; color:#ccc;">${edge.properties.details}</span>`;

                return {
                    id: edge.id,
                    from: edge.from,
                    to: edge.to,
                    color: {
                        color: style.color,
                        highlight: style.highlight,
                        hover: style.hover,
                        opacity: isDimmed ? 0.12 : 0.8
                    },
                    width: isDimmed ? 0.75 : 2.0,
                    arrows: edge.type === "EXHIBITED_WITH" ? "" : "to",
                    dashes: dashes,
                    title: edgeTitle,
                    smooth: {
                        enabled: true,
                        type: "curvedCW",
                        roundness: 0.15
                    }
                };
            });
        }

        function initNetwork() {
            visNodes.clear();
            visEdges.clear();
            
            visNodes.add(getStyledNodes());
            visEdges.add(getStyledEdges());

            const data = {
                nodes: visNodes,
                edges: visEdges
            };

            const options = {
                physics: {
                    solver: "barnesHut",
                    barnesHut: {
                        gravitationalConstant: -2000,
                        centralGravity: 0.3,
                        springLength: 140,
                        springConstant: 0.04,
                        damping: 0.5,        // high damping slows down node movements to prevent wild jiggling
                        avoidOverlap: 0.5    // moderate avoidOverlap force to prevent oscillations
                    },
                    stabilization: {
                        enabled: true,
                        iterations: 1000,    // stabilize thoroughly in the background before showing
                        fit: true
                    },
                    timestep: 0.35,          // lower timestep runs the physics engine with smaller increments for stability
                    minVelocity: 0.75        // freeze nodes as soon as velocity drops below this to stop jittering
                },
                interaction: {
                    hover: true,
                    tooltipDelay: 150,
                    selectable: true,
                    selectConnectedEdges: true
                },
                edges: {
                    font: {
                        size: 9,
                        face: "Inter"
                    }
                }
            };

            network = new vis.Network(container, { nodes: [], edges: [] }, options);

            // Once stabilized, turn off the physics engine entirely to freeze the layout and prevent any jittering
            network.on("stabilizationIterationsDone", () => {
                network.setOptions({ physics: { enabled: false } });
            });

            // Also bind stabilized event as a fallback
            network.on("stabilized", () => {
                network.setOptions({ physics: { enabled: false } });
            });

            network.setData(data);

            network.on("selectNode", (params) => {
                const nodeId = params.nodes[0];
                showNodeDetails(nodeId);
            });

            network.on("selectEdge", (params) => {
                if (params.nodes.length === 0 && params.edges.length === 1) {
                    const edgeId = params.edges[0];
                    showEdgeDetails(edgeId);
                }
            });

            network.on("deselectNode", () => {
                hideDetails();
            });

            network.on("deselectEdge", () => {
                hideDetails();
            });
        }

        function updateStyles() {
            if (!network) return;
            
            const updatedNodes = getStyledNodes();
            const updatedEdges = getStyledEdges();

            updatedNodes.forEach(node => {
                visNodes.update(node);
            });

            visEdges.clear();
            visEdges.add(updatedEdges);
        }

        function showNodeDetails(nodeId) {
            selectedNodeId = nodeId;
            const node = KNOWLEDGE_GRAPH_DATA.nodes.find(n => n.id === nodeId);
            if (!node) return;

            if (detailsPlaceholder) detailsPlaceholder.style.display = "none";
            if (detailContent) detailContent.style.display = "flex";

            if (detailType) {
                detailType.className = `detail-type-badge ${node.type}`;
                detailType.innerText = node.type.replace(/_/g, " ");
                detailType.style.background = "";
                detailType.style.color = "";
                detailType.style.border = "";
            }

            if (detailTitle) detailTitle.innerText = node.label;
            if (detailDesc) detailDesc.innerText = node.properties.bio || "No details available.";

            if (detailMeta) {
                detailMeta.innerHTML = "";
                if (node.type === "Artist") {
                    const yearsText = node.properties.death_year 
                        ? `${node.properties.birth_year}–${node.properties.death_year}`
                        : `Born ${node.properties.birth_year}`;
                    
                    detailMeta.innerHTML += `<div class="detail-meta-item">${yearsText}</div>`;
                    
                    if (node.properties.primary_mediums) {
                        node.properties.primary_mediums.forEach(medium => {
                            detailMeta.innerHTML += `<div class="detail-meta-item">${medium}</div>`;
                        });
                    }
                } else if (node.type === "Institution_Studio") {
                    detailMeta.innerHTML += `<div class="detail-meta-item">${node.properties.city}, ${node.properties.country}</div>`;
                    detailMeta.innerHTML += `<div class="detail-meta-item">${node.properties.type}</div>`;
                } else if (node.type === "Technique") {
                    detailMeta.innerHTML += `<div class="detail-meta-item">${node.properties.classification}</div>`;
                }
            }

            if (detailConnections) {
                detailConnections.innerHTML = "";
                let relatedEdges = KNOWLEDGE_GRAPH_DATA.edges.filter(edge => edge.from === nodeId || edge.to === nodeId);
                
                relatedEdges = relatedEdges.filter(edge => {
                    const fromNode = KNOWLEDGE_GRAPH_DATA.nodes.find(n => n.id === edge.from);
                    const toNode = KNOWLEDGE_GRAPH_DATA.nodes.find(n => n.id === edge.to);
                    return fromNode && fromNode.type !== "Artwork" && toNode && toNode.type !== "Artwork";
                });
                
                if (relatedEdges.length === 0) {
                    detailConnections.innerHTML = `<div style="font-size:0.75rem; color:var(--text-muted)">No direct connections recorded.</div>`;
                    return;
                }

                relatedEdges.forEach(edge => {
                    const isFromMe = edge.from === nodeId;
                    const targetId = isFromMe ? edge.to : edge.from;
                    const targetNode = KNOWLEDGE_GRAPH_DATA.nodes.find(n => n.id === targetId);
                    if (!targetNode) return;

                    let directionSymbol = "↔";
                    let relationshipLabel = edge.type.replace(/_/g, " ");
                    
                    if (edge.type === "STUDIED_UNDER") directionSymbol = isFromMe ? "studied under ↗" : "taught ↙";
                    else if (edge.type === "INFLUENCED_MATERIAL_TECHNIQUE") directionSymbol = isFromMe ? "influenced technique ↗" : "technique influenced by ↙";
                    else if (edge.type === "CO_FOUNDED") directionSymbol = "co-founded ↗";
                    else if (edge.type === "WORKED_AT") directionSymbol = isFromMe ? "worked at ↗" : "employed ↙";
                    else if (edge.type === "EXHIBITED_WITH") directionSymbol = "exhibited with ↔";

                    let contextInfo = "";
                    if (edge.properties.years) contextInfo = edge.properties.years;
                    if (edge.properties.year) contextInfo = edge.properties.year.toString();
                    if (edge.properties.technique) contextInfo += ` (using ${edge.properties.technique})`;
                    if (edge.properties.exhibition) contextInfo += ` (at ${edge.properties.exhibition})`;

                    const connItem = document.createElement("div");
                    connItem.className = "connection-item";
                    connItem.innerHTML = `
                        <div class="connection-rel-type">${relationshipLabel} ${directionSymbol}</div>
                        <div class="connection-target-name">${targetNode.label}</div>
                        ${contextInfo ? `<div class="connection-context">${contextInfo}</div>` : ""}
                    `;
                    
                    connItem.addEventListener("click", (e) => {
                        e.stopPropagation();
                        focusOnNode(targetId);
                    });

                    detailConnections.appendChild(connItem);
                });
            }
        }

        function showEdgeDetails(edgeId) {
            const edge = KNOWLEDGE_GRAPH_DATA.edges.find(e => e.id === edgeId);
            if (!edge) return;

            const fromNode = KNOWLEDGE_GRAPH_DATA.nodes.find(n => n.id === edge.from);
            const toNode = KNOWLEDGE_GRAPH_DATA.nodes.find(n => n.id === edge.to);

            if (detailsPlaceholder) detailsPlaceholder.style.display = "none";
            if (detailContent) detailContent.style.display = "flex";

            if (detailType) {
                detailType.className = `detail-type-badge`;
                detailType.style.background = "rgba(180, 83, 9, 0.08)";
                detailType.style.color = "var(--accent-ochre)";
                detailType.style.border = "0.5px solid rgba(180, 83, 9, 0.15)";
                detailType.innerText = "Relationship";
            }

            if (detailTitle) detailTitle.innerText = `${fromNode.label} ➔ ${toNode.label}`;
            
            if (detailMeta) {
                detailMeta.innerHTML = "";
                detailMeta.innerHTML += `<div class="detail-meta-item">${edge.type.replace(/_/g, " ")}</div>`;
                if (edge.properties.years) detailMeta.innerHTML += `<div class="detail-meta-item">Years: ${edge.properties.years}</div>`;
                if (edge.properties.year) detailMeta.innerHTML += `<div class="detail-meta-item">Year: ${edge.properties.year}</div>`;
                if (edge.properties.technique) detailMeta.innerHTML += `<div class="detail-meta-item">Medium: ${edge.properties.technique}</div>`;
                if (edge.properties.exhibition) detailMeta.innerHTML += `<div class="detail-meta-item">Exhibition: ${edge.properties.exhibition}</div>`;
            }

            if (detailDesc) detailDesc.innerText = edge.properties.details || "This relationship represents a documented art-historical connection or dialogue.";
            
            if (detailConnections) {
                detailConnections.innerHTML = `
                    <div class="connection-item" id="btn-from-node">
                        <div class="connection-rel-type">Source Entity</div>
                        <div class="connection-target-name">${fromNode.label} (${fromNode.type.replace(/_/g, ' ')})</div>
                    </div>
                    <div class="connection-item" id="btn-to-node" style="margin-top: 8px;">
                        <div class="connection-rel-type">Target Entity</div>
                        <div class="connection-target-name">${toNode.label} (${toNode.type.replace(/_/g, ' ')})</div>
                    </div>
                `;

                const btnFrom = document.getElementById("btn-from-node");
                const btnTo = document.getElementById("btn-to-node");
                if (btnFrom) btnFrom.addEventListener("click", () => focusOnNode(fromNode.id));
                if (btnTo) btnTo.addEventListener("click", () => focusOnNode(toNode.id));
            }
        }

        function hideDetails() {
            selectedNodeId = null;
            if (detailContent) detailContent.style.display = "none";
            if (detailsPlaceholder) detailsPlaceholder.style.display = "flex";
        }

        function focusOnNode(nodeId) {
            if (!network) return;
            network.selectNodes([nodeId]);
            showNodeDetails(nodeId);
            network.focus(nodeId, {
                scale: 1.15,
                animation: {
                    duration: 800,
                    easingFunction: "easeInOutQuad"
                }
            });
        }

        if (searchInput) {
            searchInput.addEventListener("input", (e) => {
                currentSearchQuery = e.target.value;
                updateStyles();
            });
        }

        const filterButtons = document.querySelectorAll("#connections-tab .filter-btn");
        filterButtons.forEach(btn => {
            btn.addEventListener("click", () => {
                clearNarrativeModes();
                
                filterButtons.forEach(b => b.classList.remove("active"));
                btn.classList.add("active");

                activeFilter = btn.getAttribute("data-type");
                updateStyles();
                
                setTimeout(() => {
                    network.fit({ animation: { duration: 600 } });
                }, 100);
            });
        });

        const narratives = {
            translucency: document.getElementById("narrative-translucency"),
            atelier17: document.getElementById("narrative-atelier17"),
            goldsmiths: document.getElementById("narrative-goldsmiths"),
            london: document.getElementById("narrative-london"),
            autonomy: document.getElementById("narrative-autonomy")
        };

        Object.entries(narratives).forEach(([key, card]) => {
            if (!card) return;
            card.addEventListener("click", () => {
                const isAlreadyActive = card.classList.contains("active");
                
                clearNarrativeModes();
                
                if (!isAlreadyActive) {
                    card.classList.add("active");
                    activeNarrative = key;
                    
                    filterButtons.forEach(b => b.classList.remove("active"));
                    const filterAll = document.getElementById("filter-all");
                    if (filterAll) filterAll.classList.add("active");
                    activeFilter = "all";

                    updateStyles();
                    
                    const focalNodes = {
                        translucency: "agathe_sorel",
                        atelier17: "atelier_17",
                        goldsmiths: "goldsmiths_college",
                        london: "frank_auerbach",
                        autonomy: "printmakers_council"
                    };
                    
                    setTimeout(() => {
                        focusOnNode(focalNodes[key]);
                    }, 150);
                } else {
                    updateStyles();
                    hideDetails();
                }
            });
        });

        function clearNarrativeModes() {
            activeNarrative = null;
            Object.values(narratives).forEach(card => {
                if (card) card.classList.remove("active");
            });
        }

        if (resetBtn) {
            resetBtn.addEventListener("click", () => {
                clearNarrativeModes();
                if (searchInput) searchInput.value = "";
                currentSearchQuery = "";
                
                filterButtons.forEach(b => b.classList.remove("active"));
                const filterAll = document.getElementById("filter-all");
                if (filterAll) filterAll.classList.add("active");
                activeFilter = "all";

                updateStyles();
                hideDetails();

                if (network) {
                    // Re-enable physics to let the layout settle, which triggers background stabilization and freezes again
                    network.setOptions({ physics: { enabled: true } });
                    network.stabilize();
                    network.fit({
                        animation: {
                            duration: 1000,
                            easingFunction: "easeInOutQuad"
                        }
                    });
                }
            });
        }

        // Global hook to refresh network canvas layout when tab becomes active
        window.refreshConnectionsGraph = function() {
            if (network) {
                setTimeout(() => {
                    network.setSize('100%', '100%');
                    network.redraw();
                    network.fit();
                }, 50);
            }
        };

        updateBadges();
        initNetwork();
    }

    // Kick off the application
    init();
});
