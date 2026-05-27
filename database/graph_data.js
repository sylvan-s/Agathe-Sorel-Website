const KNOWLEDGE_GRAPH_DATA = {
  nodes: [
    // 1-10 Original Artists
    {
      id: "agathe_sorel",
      label: "Agathe Sorel",
      type: "Artist",
      properties: {
        name: "Agathe Sorel",
        birth_year: 1935,
        death_year: 2020,
        primary_mediums: ["Perspex Drypoint", "Viscosity Print", "Space Engraving", "Collage", "Linocut"],
        bio: "Hungarian-born British printmaker, sculptor, and educator. After escaping Hungary in 1956, she studied at Camberwell, won a Gulbenkian Scholarship to study under S.W. Hayter at Atelier 17, and pioneered 3D 'Space Engravings' on Perspex. She was a co-founder and later Chairman of the Printmakers Council."
      }
    },
    {
      id: "sw_hayter",
      label: "S.W. Hayter",
      type: "Artist",
      properties: {
        name: "Stanley William Hayter",
        birth_year: 1901,
        death_year: 1988,
        primary_mediums: ["Viscosity Print", "Etching", "Engraving", "Soft-ground Etching"],
        bio: "Legendary English painter and printmaker associated with Surrealism and Abstract Expressionism. Founder of Atelier 17 in Paris, he developed simultaneous multi-color printing (viscosity printing) and mentored generations of international printmakers."
      }
    },
    {
      id: "michael_rothenstein",
      label: "Michael Rothenstein",
      type: "Artist",
      properties: {
        name: "Michael Rothenstein",
        birth_year: 1908,
        death_year: 1993,
        primary_mediums: ["Woodcut", "Linocut", "Monoprint", "Relief Printing"],
        bio: "Influential English printmaker, teacher, and writer. A key instigator of the post-war British printmaking renaissance, he co-founded the Printmakers Council and encouraged Sorel to study at Atelier 17."
      }
    },
    {
      id: "mauricio_lasansky",
      label: "Mauricio Lasansky",
      type: "Artist",
      properties: {
        name: "Mauricio Lasansky",
        birth_year: 1914,
        death_year: 2012,
        primary_mediums: ["Intaglio", "Drypoint", "Engraving", "Etching"],
        bio: "Argentine-American printmaker, often called the 'Father of Modern American Printmaking.' He studied at Atelier 17 in New York and established the influential print program at the University of Iowa, engaging in technical exchanges on synthetic plates."
      }
    },
    {
      id: "david_ferry",
      label: "David Ferry",
      type: "Artist",
      properties: {
        name: "David Ferry",
        birth_year: 1957,
        death_year: null,
        primary_mediums: ["Collage", "Linocut", "Artist's Books", "Photomontage"],
        bio: "Leading contemporary British printmaker and academic. He studied under Agathe Sorel at Camberwell, incorporating her three-dimensional approach and sense of structure into his own print assemblages and artist's books."
      }
    },
    {
      id: "margit_graber",
      label: "Margit Gráber",
      type: "Artist",
      properties: {
        name: "Margit Gráber",
        birth_year: 1895,
        death_year: 1993,
        primary_mediums: ["Painting", "Drawing", "Lithography"],
        bio: "Hungarian modernist painter associated with the École de Paris and the Szentendre artists' colony. She provided early mentorship and social-realist training to Sorel in Budapest before the 1956 revolution."
      }
    },
    {
      id: "julian_trevelyan",
      label: "Julian Trevelyan",
      type: "Artist",
      properties: {
        name: "Julian Trevelyan",
        birth_year: 1910,
        death_year: 1988,
        primary_mediums: ["Etching", "Lithography"],
        bio: "British artist and printmaker, active member of the Surrealist group. He worked at Atelier 17 in the 1930s, taught printmaking at the Royal College of Art, and co-founded the Printmakers Council."
      }
    },
    {
      id: "anthony_gross",
      label: "Anthony Gross",
      type: "Artist",
      properties: {
        name: "Anthony Gross",
        birth_year: 1905,
        death_year: 1984,
        primary_mediums: ["Etching", "Engraving", "Illustration"],
        bio: "Renowned English printmaker, illustrator, and painter. He taught Sorel at Camberwell, urged her to pursue Atelier 17, and co-founded the Printmakers Council to establish printing as a major fine art discipline."
      }
    },
    {
      id: "sam_maitin",
      label: "Sam Maitin",
      type: "Artist",
      properties: {
        name: "Samuel Maitin",
        birth_year: 1928,
        death_year: 2004,
        primary_mediums: ["Serigraph", "Collage", "Watercolor", "Mural Design"],
        bio: "Philadelphia-based printmaker, painter, and graphic activist. A key figure in Philadelphia's printmaking community, he engaged in close artistic and material dialogue with Sorel during her North American visits."
      }
    },
    {
      id: "bertha_von_moschzisker",
      label: "Bertha von Moschzisker",
      type: "Artist",
      properties: {
        name: "Bertha von Moschzisker",
        birth_year: 1904,
        death_year: 1996,
        primary_mediums: ["Art Administration", "Curating"],
        bio: "Legendary Director of the Philadelphia Print Club (1944–1969). She transformed the club into a global hub, introducing European printmakers like Agathe Sorel to American collectors and artists."
      }
    },

    // 11-20 Camberwell circle & Atelier 17 peers
    {
      id: "gabor_sitkey",
      label: "Gabor Sitkey",
      type: "Artist",
      properties: {
        name: "Gabor Sitkey",
        birth_year: 1935,
        death_year: 2022,
        primary_mediums: ["Painting", "Textile Design"],
        bio: "Hungarian-born painter and designer who fled Hungary in 1956. He met Agathe Sorel at Camberwell School of Art (where he studied textile design) and married her in 1961, maintaining a close artistic dialogue."
      }
    },
    {
      id: "robert_medley",
      label: "Robert Medley",
      type: "Artist",
      properties: {
        name: "Robert Medley",
        birth_year: 1905,
        death_year: 1994,
        primary_mediums: ["Painting", "Theatre Design"],
        bio: "Influential British painter and teacher. As Head of Painting and Sculpture at Camberwell (1958–1965), he was a major educator for Sorel, Sitkey, and R.B. Kitaj, advocating modernist synthesis."
      }
    },
    {
      id: "heinz_inlander",
      label: "Heinz Inlander",
      type: "Artist",
      properties: {
        name: "Heinz Inlander",
        birth_year: 1925,
        death_year: 1994,
        primary_mediums: ["Painting", "Drawing"],
        bio: "Austrian-born British painter of Jewish heritage. He fled Vienna in 1938 and later taught at Camberwell School of Art (1957–1963), mentoring Sorel in post-war expressionism."
      }
    },
    {
      id: "rb_kitaj",
      label: "R.B. Kitaj",
      type: "Artist",
      properties: {
        name: "Ronald Brooks Kitaj",
        birth_year: 1932,
        death_year: 2007,
        primary_mediums: ["Painting", "Screenprinting", "Lithography"],
        bio: "Acclaimed American painter who spent most of his life in England. He studied at Camberwell (1958-1959) under Robert Medley alongside Sorel, and went on to pioneer figurative narration in printmaking."
      }
    },
    {
      id: "frank_auerbach",
      label: "Frank Auerbach",
      type: "Artist",
      properties: {
        name: "Frank Auerbach",
        birth_year: 1931,
        death_year: 2024,
        primary_mediums: ["Painting", "Etching", "Drawing"],
        bio: "German-born British painter and printmaker, known for his heavily worked impasto paintings and expressive etchings. Part of the post-war London artistic circle."
      }
    },
    {
      id: "krishna_reddy",
      label: "Krishna Reddy",
      type: "Artist",
      properties: {
        name: "Krishna Reddy",
        birth_year: 1925,
        death_year: 2018,
        primary_mediums: ["Viscosity Print", "Sculpture", "Intaglio"],
        bio: "Indian master printmaker and sculptor. He worked at Atelier 17 in Paris under Hayter in the 1950s and co-developed the simultaneous multi-color viscosity printing process."
      }
    },
    {
      id: "kaiko_moti",
      label: "Kaiko Moti",
      type: "Artist",
      properties: {
        name: "Kaiko Moti",
        birth_year: 1921,
        death_year: 1989,
        primary_mediums: ["Viscosity Print", "Aquatint", "Etching"],
        bio: "Indian-born artist who spent his career in Paris. Studied at Atelier 17 under Hayter, pioneering early applications of simultaneous multi-color rollings."
      }
    },
    {
      id: "gabor_peterdi",
      label: "Gabor Peterdi",
      type: "Artist",
      properties: {
        name: "Gabor Peterdi",
        birth_year: 1915,
        death_year: 2001,
        primary_mediums: ["Etching", "Engraving", "Intaglio"],
        bio: "Hungarian-born American printmaker, worked at Atelier 17 in Paris and NY. He wrote the influential book 'Printmaking' and established the print program at Yale."
      }
    },
    {
      id: "minna_citron",
      label: "Minna Citron",
      type: "Artist",
      properties: {
        name: "Minna Citron",
        birth_year: 1896,
        death_year: 1991,
        primary_mediums: ["Etching", "Lithography", "Collage"],
        bio: "American modernist printmaker and painter associated with the New York School. She worked extensively at Atelier 17 in both New York and Paris."
      }
    },
    {
      id: "helen_phillips",
      label: "Helen Phillips",
      type: "Artist",
      properties: {
        name: "Helen Phillips",
        birth_year: 1913,
        death_year: 1995,
        primary_mediums: ["Sculpture", "Engraving"],
        bio: "American sculptor and printmaker. Worked at Atelier 17, marrying Stanley William Hayter. Her sculptural concerns with line and volume mirrored the printmaking dialogues."
      }
    },

    // 21-31 Printmakers Council founders and leaders
    {
      id: "bernard_cheese",
      label: "Bernard Cheese",
      type: "Artist",
      properties: {
        name: "Bernard Cheese",
        birth_year: 1925,
        death_year: 2013,
        primary_mediums: ["Lithography", "Watercolor"],
        bio: "British printmaker and teacher. Taught at Chelsea and St Martin's. Served as the first Vice Chairman of the Printmakers Council in 1965."
      }
    },
    {
      id: "merlyn_evans",
      label: "Merlyn Evans",
      type: "Artist",
      properties: {
        name: "Merlyn Evans",
        birth_year: 1910,
        death_year: 1973,
        primary_mediums: ["Etching", "Aquatint", "Mezzotint"],
        bio: "Welsh painter and printmaker, known for his abstract, sculptural forms. Served on the inaugural committee of the Printmakers Council."
      }
    },
    {
      id: "birgit_skiold",
      label: "Birgit Skiöld",
      type: "Artist",
      properties: {
        name: "Birgit Skiöld",
        birth_year: 1923,
        death_year: 1982,
        primary_mediums: ["Lithography", "Etching", "Artist's Books"],
        bio: "Swedish-born British printmaker who established the first open-access print workshop in London at Adrian Street (1958). A co-founder of the Printmakers Council."
      }
    },
    {
      id: "stanley_jones",
      label: "Stanley Jones",
      type: "Artist",
      properties: {
        name: "Stanley Jones",
        birth_year: 1933,
        death_year: 2023,
        primary_mediums: ["Lithography", "Etching"],
        bio: "Master lithographer and educator. Co-founder of the Printmakers Council, he directed the Curwen Studio in London, assisting artists like John Piper and Henry Moore."
      }
    },
    {
      id: "alistair_grant",
      label: "Alistair Grant",
      type: "Artist",
      properties: {
        name: "Alistair Grant",
        birth_year: 1925,
        death_year: 1997,
        primary_mediums: ["Lithography", "Screenprinting", "Etching"],
        bio: "British painter and printmaker. He taught at the Royal College of Art and served on the founding committee of the Printmakers Council."
      }
    },
    {
      id: "gertrude_hermes",
      label: "Gertrude Hermes",
      type: "Artist",
      properties: {
        name: "Gertrude Hermes",
        birth_year: 1901,
        death_year: 1983,
        primary_mediums: ["Wood Engraving", "Linocut", "Sculpture"],
        bio: "Major British wood engraver and sculptor. Elected to the Royal Academy in 1971, she served on the first committee of the Printmakers Council in 1965."
      }
    },
    {
      id: "graham_sutherland",
      label: "Graham Sutherland",
      type: "Artist",
      properties: {
        name: "Graham Sutherland",
        birth_year: 1903,
        death_year: 1980,
        primary_mediums: ["Etching", "Lithography", "Painting"],
        bio: "Highly acclaimed British painter and printmaker. He was an honorary early member of the Printmakers Council, bringing prestige to the organization."
      }
    },
    {
      id: "john_piper",
      label: "John Piper",
      type: "Artist",
      properties: {
        name: "John Piper",
        birth_year: 1903,
        death_year: 1992,
        primary_mediums: ["Lithography", "Screenprinting", "Stained Glass"],
        bio: "Famous British artist, printmaker, and designer. Known for his architectural and landscape prints. He was an early honorary member of the Printmakers Council."
      }
    },
    {
      id: "valerie_thornton",
      label: "Valerie Thornton",
      type: "Artist",
      properties: {
        name: "Valerie Thornton",
        birth_year: 1931,
        death_year: 1991,
        primary_mediums: ["Etching", "Aquatint"],
        bio: "British printmaker, studied under S.W. Hayter at Atelier 17 in Paris (1954). Her textured, architectural etchings were regularly shown at early Printmakers Council exhibitions."
      }
    },
    {
      id: "jennifer_dickson",
      label: "Jennifer Dickson",
      type: "Artist",
      properties: {
        name: "Jennifer Dickson",
        birth_year: 1936,
        death_year: null,
        primary_mediums: ["Photographic Etching", "Color Intaglio"],
        bio: "South African-born British-Canadian artist. Studied under S.W. Hayter at Atelier 17 (1960–1965) and was a co-founder of the Printmakers Council."
      }
    },
    {
      id: "harry_eccleston",
      label: "Harry Eccleston",
      type: "Artist",
      properties: {
        name: "Harry Eccleston",
        birth_year: 1923,
        death_year: 2010,
        primary_mediums: ["Etching", "Engraving"],
        bio: "First President of the Printmakers Council (1965). Famous as the Bank of England's first artist-in-residence and designer of the first pictorial banknotes."
      }
    },

    // 32-39 Newly Researched Atelier 17 Artists
    {
      id: "joan_miro",
      label: "Joan Miró",
      type: "Artist",
      properties: {
        name: "Joan Miró",
        birth_year: 1893,
        death_year: 1983,
        primary_mediums: ["Etching", "Lithography", "Painting"],
        bio: "Acclaimed Spanish Surrealist painter and sculptor. Worked extensively at Atelier 17 in Paris and New York, collaborating with Hayter on complex multi-plate color prints that pushed abstract printing technique boundaries."
      }
    },
    {
      id: "louise_bourgeois",
      label: "Louise Bourgeois",
      type: "Artist",
      properties: {
        name: "Louise Bourgeois",
        birth_year: 1911,
        death_year: 2010,
        primary_mediums: ["Etching", "Drypoint", "Sculpture"],
        bio: "Legendary French-American sculptor and printmaker. Worked at Atelier 17 in New York in the 1940s (making prints like 'He Disappeared into Complete Silence'), where she refined her linear vocabulary."
      }
    },
    {
      id: "jackson_pollock",
      label: "Jackson Pollock",
      type: "Artist",
      properties: {
        name: "Jackson Pollock",
        birth_year: 1912,
        death_year: 1956,
        primary_mediums: ["Engraving", "Etching", "Painting"],
        bio: "Pioneer of Abstract Expressionism. Visited and engraved 11 plates at Atelier 17 in New York in 1944–1945, learning automatic drawing on copper under Hayter's direction."
      }
    },
    {
      id: "robert_motherwell",
      label: "Robert Motherwell",
      type: "Artist",
      properties: {
        name: "Robert Motherwell",
        birth_year: 1915,
        death_year: 1991,
        primary_mediums: ["Etching", "Lithography", "Painting"],
        bio: "Key American Abstract Expressionist. Made early prints at Atelier 17 in New York in the 1940s, engaging in automatic writing and engraving dialogue with Hayter."
      }
    },
    {
      id: "max_ernst",
      label: "Max Ernst",
      type: "Artist",
      properties: {
        name: "Max Ernst",
        birth_year: 1891,
        death_year: 1976,
        primary_mediums: ["Etching", "Lithography", "Painting"],
        bio: "German Surrealist pioneer. Worked at Atelier 17 in Paris in the 1930s and New York in the 1940s, collaborating on multi-color plates and automatic drawing methods."
      }
    },
    {
      id: "john_buckland_wright",
      label: "John Buckland Wright",
      type: "Artist",
      properties: {
        name: "John Buckland Wright",
        birth_year: 1897,
        death_year: 1954,
        primary_mediums: ["Wood Engraving", "Copper Engraving"],
        bio: "New Zealand-born printmaker and painter. A central figure of Atelier 17 in Paris during the 1930s, acting as co-director alongside Hayter, and later teaching at Camberwell and the Slade in London."
      }
    },
    {
      id: "karl_schrag",
      label: "Karl Schrag",
      type: "Artist",
      properties: {
        name: "Karl Schrag",
        birth_year: 1912,
        death_year: 1995,
        primary_mediums: ["Etching", "Engraving", "Lithography"],
        bio: "German-born American artist. Worked at Atelier 17 in New York in the 1940s and served as its Director in 1950, maintaining the workshop's continuity when Hayter returned to Paris."
      }
    },
    {
      id: "sue_fuller",
      label: "Sue Fuller",
      type: "Artist",
      properties: {
        name: "Sue Fuller",
        birth_year: 1914,
        death_year: 2006,
        primary_mediums: ["Etching", "Soft-ground Etching", "Thread Collage"],
        bio: "American printmaker and sculptor. Studied under Hayter at Atelier 17 in New York, using lace and string in soft-ground etching to create abstract matrices, which led to her famous thread sculptures."
      }
    },

    // Institutions / Studios
    {
      id: "atelier_17",
      label: "Atelier 17",
      type: "Institution_Studio",
      properties: {
        name: "Atelier 17",
        city: "Paris",
        country: "France",
        type: "Workshop",
        bio: "The legendary printmaking studio founded by S.W. Hayter. It served as a crucible for technical experimentation, bringing together modernists like Picasso, Miró, and Pollock to explore line engraving and viscosity printing."
      }
    },
    {
      id: "printmakers_council",
      label: "Printmakers Council",
      type: "Institution_Studio",
      properties: {
        name: "Printmakers Council (PmC)",
        city: "London",
        country: "UK",
        type: "Society",
        bio: "Founded in 1965 by Sorel, Rothenstein, and peers as a pressure group to challenge the traditional Royal Academy, promote experimental print media, and advocate for print studios in art schools."
      }
    },
    {
      id: "camberwell_school",
      label: "Camberwell School of Art",
      type: "Institution_Studio",
      properties: {
        name: "Camberwell School of Arts and Crafts",
        city: "London",
        country: "UK",
        type: "University",
        bio: "A key London art school where Sorel studied upon arrival in 1956 and later returned to teach. It was a major node of pedagogy for post-war British printmakers."
      }
    },
    {
      id: "philadelphia_print_club",
      label: "Philadelphia Print Club",
      type: "Institution_Studio",
      properties: {
        name: "The Print Club of Philadelphia",
        city: "Philadelphia",
        country: "USA",
        type: "Gallery/Workshop",
        bio: "An influential institution founded in 1915 to promote prints. Under Bertha von Moschzisker, it hosted Sorel's pivotal 1968 solo show and fostered transatlantic technical exchanges."
      }
    },
    {
      id: "ecole_beaux_arts",
      label: "École des Beaux-Arts",
      type: "Institution_Studio",
      properties: {
        name: "École Nationale Supérieure des Beaux-Arts",
        city: "Paris",
        country: "France",
        type: "University",
        bio: "The rigid, classical French academic institution. Its traditionalism prompted the emergence of alternative workshops like Atelier 17."
      }
    },
    {
      id: "curwen_studio",
      label: "Curwen Studio",
      type: "Institution_Studio",
      properties: {
        name: "Curwen Studio",
        city: "London",
        country: "UK",
        type: "Workshop",
        bio: "Famous print workshop specializing in lithography. Managed by Stanley Jones, it provided fine-art editioning for Britain's leading post-war artists."
      }
    },
    {
      id: "henry_moore",
      label: "Henry Moore",
      type: "Artist",
      properties: {
        name: "Henry Moore",
        birth_year: 1898,
        death_year: 1986,
        primary_mediums: ["Lithography", "Etching", "Sculpture"],
        bio: "Master British modernist sculptor and printmaker. He collaborated with Stanley Jones at Curwen Studio for over two decades, utilizing lithography to explore organic, sculptural forms on paper."
      }
    },
    {
      id: "barbara_hepworth",
      label: "Barbara Hepworth",
      type: "Artist",
      properties: {
        name: "Barbara Hepworth",
        birth_year: 1903,
        death_year: 1975,
        primary_mediums: ["Lithography", "Screenprinting", "Sculpture"],
        bio: "Leading British abstract sculptor. Collaborated with Stanley Jones at Curwen Studio to produce her famous graphic portfolios, including the 'Aegean Suite' (1970–1971), using color zinc-plate lithography."
      }
    },
    {
      id: "elisabeth_frink",
      label: "Elisabeth Frink",
      type: "Artist",
      properties: {
        name: "Elisabeth Frink",
        birth_year: 1930,
        death_year: 1993,
        primary_mediums: ["Lithography", "Etching", "Sculpture"],
        bio: "Major British sculptor and printmaker. She created expressive, textured lithographs of animals and mythological figures at Curwen Studio, working closely with Jones."
      }
    },
    {
      id: "paula_rego",
      label: "Paula Rego",
      type: "Artist",
      properties: {
        name: "Paula Rego",
        birth_year: 1935,
        death_year: 2018,
        primary_mediums: ["Lithography", "Etching", "Painting"],
        bio: "Acclaimed Portuguese-British artist. Collaborated with Curwen Studio to print some of her most famous graphic narratives, including the 'Nursery Rhymes' lithographs, exploiting the stone's velvety black tones."
      }
    },
    {
      id: "edward_bawden",
      label: "Edward Bawden",
      type: "Artist",
      properties: {
        name: "Edward Bawden",
        birth_year: 1903,
        death_year: 1989,
        primary_mediums: ["Lithography", "Linocut", "Illustration"],
        bio: "Famous British painter, illustrator, and graphic designer. He was associated with the Curwen Press from the 1920s and later printed large-scale linocuts and lithographs at the Curwen Studio."
      }
    },
    {
      id: "david_bomberg",
      label: "David Bomberg",
      type: "Artist",
      properties: {
        name: "David Bomberg",
        birth_year: 1890,
        death_year: 1957,
        primary_mediums: ["Painting", "Drawing", "Lithography"],
        bio: "Pioneering British modernist painter and draughtsman. As an evening tutor at Borough Polytechnic, he was a massive influence on Auerbach and Leon Kossoff, teaching them to construct mass and volume structurally."
      }
    },
    {
      id: "marc_balakjian",
      label: "Marc Balakjian",
      type: "Artist",
      properties: {
        name: "Marc Balakjian",
        birth_year: 1938,
        death_year: 2017,
        primary_mediums: ["Etching", "Mezzotint", "Intaglio Printing"],
        bio: "Armenian-born master printmaker who co-directed Studio Prints in London. He collaborated closely with School of London artists, particularly Frank Auerbach and Lucian Freud, to print their complex, deeply etched plates."
      }
    },
    {
      id: "borough_polytechnic",
      label: "Borough Polytechnic",
      type: "Institution_Studio",
      properties: {
        name: "Borough Polytechnic",
        city: "London",
        country: "UK",
        type: "University",
        bio: "London educational institute. The evening drawing classes taught here by David Bomberg in the post-war years became a legendary breeding ground for expressive figurative art."
      }
    },
    {
      id: "studio_prints",
      label: "Studio Prints",
      type: "Institution_Studio",
      properties: {
        name: "Studio Prints",
        city: "London",
        country: "UK",
        type: "Workshop",
        bio: "Elite printmaking workshop in London founded by Dorothea Wight. It became the primary etching printing facility for School of London artists like Frank Auerbach and Lucian Freud."
      }
    },
    {
      id: "marlborough_graphics",
      label: "Marlborough Graphics",
      type: "Institution_Studio",
      properties: {
        name: "Marlborough Graphics",
        city: "London",
        country: "UK",
        type: "Gallery",
        bio: "The print publishing arm of Marlborough Fine Art. It served as the primary publisher and distributor for Frank Auerbach's limited-edition etching portfolios."
      }
    },
    {
      id: "royal_college_of_art",
      label: "Royal College of Art",
      type: "Institution_Studio",
      properties: {
        name: "Royal College of Art (RCA)",
        city: "London",
        country: "UK",
        type: "University",
        bio: "London's premier postgraduate art school, serving as a major academic node for post-war printmakers and painters."
      }
    },
    // School of London Expansion
    {
      id: "leon_kossoff",
      label: "Leon Kossoff",
      type: "Artist",
      properties: {
        name: "Leon Kossoff",
        birth_year: 1926,
        death_year: 2019,
        primary_mediums: ["Etching", "Drypoint", "Painting"],
        bio: "Major British painter and printmaker, part of the School of London. He was Auerbach's closest contemporary, studying alongside him at Borough Polytechnic under Bomberg and St Martin's, sharing a lifelong dialogue on raw drawing weight and heavily bitten, dense copper plate textures."
      }
    },
    {
      id: "lucian_freud",
      label: "Lucian Freud",
      type: "Artist",
      properties: {
        name: "Lucian Freud",
        birth_year: 1922,
        death_year: 2011,
        primary_mediums: ["Etching", "Painting"],
        bio: "Eminent British painter and printmaker, leading figure in the School of London. He worked closely with Marc Balakjian at Studio Prints to produce his highly detailed, intricate, and textured copper plate etchings."
      }
    },
    {
      id: "terry_willson",
      label: "Terry Willson",
      type: "Artist",
      properties: {
        name: "Terry Willson",
        birth_year: 1948,
        death_year: null,
        primary_mediums: ["Etching", "Screenprinting", "Intaglio Printing"],
        bio: "British master printer and publisher who ran Palm Tree Studios in London, collaborating with Auerbach to print his first major portfolio, 'Six Etchings of Heads'."
      }
    },
    {
      id: "joe_tilson",
      label: "Joe Tilson",
      type: "Artist",
      properties: {
        name: "Joe Tilson",
        birth_year: 1928,
        death_year: 2023,
        primary_mediums: ["Etching", "Screenprinting", "Woodcut", "Painting"],
        bio: "Renowned British Pop Artist and printmaker. A close friend of Auerbach, he hosted him in Somerset in 1980 and helped bite his first copper plate in acid, which launched Auerbach's etching practice."
      }
    },
    {
      id: "peter_daglish",
      label: "Peter Daglish",
      type: "Artist",
      properties: {
        name: "Peter Daglish",
        birth_year: 1930,
        death_year: 2016,
        primary_mediums: ["Etching", "Lithography", "Woodcut", "Painting"],
        bio: "Influential British painter and printmaker who taught fine-art printmaking at the Slade School of Fine Art, mentoring David Ferry in experimental and relief processes."
      }
    },

    // Institutional Nodes Expansion
    {
      id: "st_martins_school",
      label: "St Martin's School of Art",
      type: "Institution_Studio",
      properties: {
        name: "St Martin's School of Art",
        city: "London",
        country: "UK",
        type: "University",
        bio: "Major London art school, serving as a formative academic node where Frank Auerbach and Leon Kossoff received daytime drawing training."
      }
    },
    {
      id: "sidcup_school_of_art",
      label: "Sidcup School of Art",
      type: "Institution_Studio",
      properties: {
        name: "Sidcup School of Art",
        city: "Kent",
        country: "UK",
        type: "University",
        bio: "Art school where Frank Auerbach taught drawing classes part-time in the late 1950s. It was here in 1956 that he met his primary model and muse, Juliet Yardley Mills (J.Y.M.)."
      }
    },
    {
      id: "palm_tree_studios",
      label: "Palm Tree Studios",
      type: "Institution_Studio",
      properties: {
        name: "Palm Tree Studios",
        city: "London",
        country: "UK",
        type: "Workshop",
        bio: "Printmaking studio directed by Terry Willson. Known for publishing and printing editions, it proofed and printed Auerbach's 'Six Etchings of Heads' (1980–1981)."
      }
    },
    {
      id: "slade_school",
      label: "Slade School of Fine Art",
      type: "Institution_Studio",
      properties: {
        name: "Slade School of Fine Art",
        city: "London",
        country: "UK",
        type: "University",
        bio: "One of the UK's leading fine art schools, where David Ferry undertook postgraduate printmaking, studying under Stanley Jones and Peter Daglish."
      }
    },
    {
      id: "curwen_print_study_centre",
      label: "Curwen Print Study Centre",
      type: "Institution_Studio",
      properties: {
        name: "Curwen Print Study Centre",
        city: "Cambridgeshire",
        country: "UK",
        type: "Workshop",
        bio: "Educational printmaking trust co-founded in 2003 by Stanley Jones to preserve fine art printmaking skills, with David Ferry serving as its Founding Artistic Director."
      }
    },
    {
      id: "royal_society_painter_printmakers",
      label: "Royal Society of Painter-Printmakers (RE)",
      type: "Institution_Studio",
      properties: {
        name: "Royal Society of Painter-Printmakers (RE)",
        city: "London",
        country: "UK",
        type: "Society",
        bio: "Premier British printmaking society based at Bankside Gallery, uniting print practitioners across generations; David Ferry served as its President."
      }
    },

    // Original Artworks (Bug Fix)
    {
      id: "wise_foolish_virgin",
      label: "The Wise and Foolish Virgin",
      type: "Artwork",
      properties: {
        year: 1960,
        medium: "Viscosity Print",
        bio: "Agathe Sorel's early multi-color viscosity print produced at Atelier 17 in Paris, demonstrating single-plate color depth."
      }
    },
    {
      id: "la_mere",
      label: "La Mère",
      type: "Artwork",
      properties: {
        year: 1958,
        medium: "Line Engraving / Etching",
        bio: "S.W. Hayter's complex line engraving demonstrating his automatic drawing techniques and viscosity color layering."
      }
    },
    {
      id: "space_engraving_totem",
      label: "Space Engraving: Totem",
      type: "Artwork",
      properties: {
        year: 1965,
        medium: "Perspex / Acrylic Drypoint Sculpture",
        bio: "Agathe Sorel's pioneering three-dimensional space engraving on bent Perspex, which bridged printmaking and sculpture."
      }
    },
    {
      id: "violent_dialogue",
      label: "Violent Dialogue",
      type: "Artwork",
      properties: {
        year: 1965,
        medium: "Linocut / Woodcut Relief",
        bio: "Michael Rothenstein's large-scale relief print, incorporating found materials and raw, expressive textures."
      }
    },
    {
      id: "self_portrait_engraver",
      label: "Self-Portrait as an Engraver",
      type: "Artwork",
      properties: {
        year: 1948,
        medium: "Copper Etching / Drypoint",
        bio: "Mauricio Lasansky's classical self-portrait, showing his early mastery of copper engraving techniques in Iowa."
      }
    },
    {
      id: "bradford_biennale_work",
      label: "Bradford Biennale Work",
      type: "Artwork",
      properties: {
        year: 1969,
        medium: "Multi-medium Collage Print",
        bio: "Agathe Sorel's experimental piece exhibiting at the Bradford Print Biennale, combining zinc plate printmaking and collage elements."
      }
    },
    {
      id: "demonstrators_reddy",
      label: "Demonstrators",
      type: "Artwork",
      properties: {
        year: 1953,
        medium: "Viscosity Print",
        bio: "Krishna Reddy's early multi-color viscosity print, showing his signature carving-like texture and abstract contours."
      }
    },
    {
      id: "adrian_street_print",
      label: "Adrian Street Print",
      type: "Artwork",
      properties: {
        year: 1965,
        medium: "Lithograph",
        bio: "Birgit Skiöld's minimalist lithograph displaying at the PMC's first exhibition, demonstrating subtle gray ink gradients."
      }
    },
    {
      id: "curwen_litho_piper",
      label: "Curwen Lithograph",
      type: "Artwork",
      properties: {
        year: 1967,
        medium: "Lithograph",
        bio: "John Piper's textured architectural lithograph, printed by Stanley Jones at the Curwen Studio."
      }
    },
    {
      id: "pictorial_banknote",
      label: "Pictorial Banknote",
      type: "Artwork",
      properties: {
        year: 1970,
        medium: "Steel Engraving",
        bio: "Harry Eccleston's masterfully detailed copper-plate banknote design, showing his academic precision."
      }
    },

    // New Artworks (Auerbach & Ferry)
    {
      id: "six_drypoints_nude",
      label: "Six Drypoints of the Nude",
      type: "Artwork",
      properties: {
        year: 1954,
        medium: "Drypoint on Alloy",
        bio: "Frank Auerbach's first print series, produced using cheap alloy plates and a nail set in a pen holder, printed by spoon-rubbing."
      }
    },
    {
      id: "six_etchings_heads",
      label: "Six Etchings of Heads",
      type: "Artwork",
      properties: {
        year: 1980,
        medium: "Etching on Copper",
        bio: "Frank Auerbach's first major etching portfolio, printed by Terry Willson at Palm Tree Studios, featuring portraits of Freud, Kossoff, Tilson, and Kitaj."
      }
    },
    {
      id: "seven_portraits",
      label: "Seven Portraits",
      type: "Artwork",
      properties: {
        year: 1990,
        medium: "Etching on Copper",
        bio: "Frank Auerbach's portrait portfolio capturing his close circle of sitters, printed by Marc Balakjian at Studio Prints."
      }
    },
    {
      id: "ruth_ii",
      label: "Ruth II",
      type: "Artwork",
      properties: {
        year: 1994,
        medium: "Etching on Copper",
        bio: "Auerbach's portrait of print collector Ruth Bromberg, heavily bitten in acid to preserve thick webs of black lines, printed at Studio Prints."
      }
    },
    {
      id: "head_jym_art",
      label: "Head of J.Y.M.",
      type: "Artwork",
      properties: {
        year: 1980,
        medium: "Oil / Charcoal",
        bio: "Frank Auerbach's expressive representations of Juliet Yardley Mills, heavily worked and repeatedly scraped back or erased."
      }
    },
    {
      id: "outside_kilburn",
      label: "Outside Kilburn Underground",
      type: "Artwork",
      properties: {
        year: 1984,
        medium: "Etching",
        bio: "Leon Kossoff's classic London landscape print, printed by Marc Balakjian at Studio Prints."
      }
    },
    {
      id: "faces_places_history",
      label: "Faces and Places from History",
      type: "Artwork",
      properties: {
        year: 1995,
        medium: "Photomontage / Hybrid Print",
        bio: "David Ferry's portfolio of 25 prints satirizing English history from the Stone Age to Victoria, created from hand-cut collages."
      }
    },
    {
      id: "the_invaders_book",
      label: "The Invaders",
      type: "Artwork",
      properties: {
        year: 1998,
        medium: "Altered Vintage Book / Collage",
        bio: "David Ferry's series of altered guidebooks, inserting kitsch and surreal elements into vintage prints of stately homes."
      }
    },
    {
      id: "painting_without_brush",
      label: "Painting Without A Brush",
      type: "Artwork",
      properties: {
        year: 1991,
        medium: "Published Monograph",
        bio: "David Ferry's award-winning instructional textbook detailing the workflows, materials, and chemistry of photomontage and collage."
      }
    },
    // Goldsmiths College Expansion
    {
      id: "paul_drury",
      label: "Paul Drury",
      type: "Artist",
      properties: {
        name: "Paul Drury",
        birth_year: 1903,
        death_year: 1987,
        primary_mediums: ["Etching", "Painting", "Drawing"],
        bio: "Major British etcher and educator. He studied at Goldsmiths under Stanley Anderson in the 1920s and later served as Principal of the Art School (1958–1969), keeping traditional printmaking and drawing at the core of the curriculum."
      }
    },
    {
      id: "stanley_anderson",
      label: "Stanley Anderson",
      type: "Artist",
      properties: {
        name: "Stanley Anderson",
        birth_year: 1884,
        death_year: 1966,
        primary_mediums: ["Line Engraving", "Etching", "Drypoint"],
        bio: "Renowned British etcher and engraver. He taught printmaking at Goldsmiths in the 1920s and 1930s, demanding meticulous manual draftsmanship and clean lines from pupils like Drury and Sutherland."
      }
    },
    {
      id: "evelyn_gibbs",
      label: "Evelyn Gibbs",
      type: "Artist",
      properties: {
        name: "Evelyn Gibbs",
        birth_year: 1905,
        death_year: 1991,
        primary_mediums: ["Line Engraving", "Etching", "Painting"],
        bio: "Acclaimed British engraver and educator who won the Prix de Rome for Engraving in 1929. She taught at Goldsmiths starting in 1934, pioneering modern art teaching methods for schools."
      }
    },
    {
      id: "kenneth_martin",
      label: "Kenneth Martin",
      type: "Artist",
      properties: {
        name: "Kenneth Martin",
        birth_year: 1905,
        death_year: 1984,
        primary_mediums: ["Drawing", "Sculpture", "Painting"],
        bio: "Leading British Constructivist artist. Taught drawing and design at Goldsmiths (1946–1967), introducing geometric abstraction and kinetic sculpture to the postwar curriculum."
      }
    },
    {
      id: "robin_tanner",
      label: "Robin Tanner",
      type: "Artist",
      properties: {
        name: "Robin Tanner",
        birth_year: 1904,
        death_year: 1988,
        primary_mediums: ["Etching", "Illustration"],
        bio: "Celebrated Neo-Romantic British etcher. He studied printmaking at Goldsmiths in the 1920s under Clive Gardiner and Stanley Anderson, creating poetic, highly detailed etchings of rural Wiltshire."
      }
    },

    // Marlborough College & Graphics Expansion
    {
      id: "william_morris_artist",
      label: "William Morris",
      type: "Artist",
      properties: {
        name: "William Morris",
        birth_year: 1834,
        death_year: 1896,
        primary_mediums: ["Woodblock Print", "Textile Design", "Typography"],
        bio: "Pioneering designer, writer, and printer. An alumnus of Marlborough College (studied 1848–1851), he went on to lead the Arts and Crafts Movement and found the Kelmscott Press to revive fine typographic printing."
      }
    },
    {
      id: "richard_shirley_smith",
      label: "Richard Shirley Smith",
      type: "Artist",
      properties: {
        name: "Richard Shirley Smith",
        birth_year: 1937,
        death_year: null,
        primary_mediums: ["Wood Engraving", "Illustration", "Painting"],
        bio: "Highly accomplished British wood-engraver and painter. He served as the Head of Art at Marlborough College from 1966 to 1970, championing block printing and book illustration."
      }
    },
    {
      id: "victor_pasmore",
      label: "Victor Pasmore",
      type: "Artist",
      properties: {
        name: "Victor Pasmore",
        birth_year: 1908,
        death_year: 1998,
        primary_mediums: ["Screenprinting", "Relief Printing", "Etching", "Painting"],
        bio: "Pioneering British abstract artist. He collaborated extensively with Marlborough Graphics to publish his monumental, organic abstract screenprints and multi-layered relief graphics."
      }
    },
    {
      id: "francis_bacon",
      label: "Francis Bacon",
      type: "Artist",
      properties: {
        name: "Francis Bacon",
        birth_year: 1909,
        death_year: 1992,
        primary_mediums: ["Lithography", "Etching", "Painting"],
        bio: "Renowned British figurative painter. Marlborough Graphics acted as his primary print publisher, working with master print workshops to release high-quality graphic editions of his iconic triptychs."
      }
    },

    // New Academic Nodes
    {
      id: "goldsmiths_college",
      label: "Goldsmiths College",
      type: "Institution_Studio",
      properties: {
        name: "Goldsmiths College",
        city: "London",
        country: "UK",
        type: "University",
        bio: "Major London art institution that served as a key academic node for classical etching (Anderson, Drury), Constructivist design (Martin), and later conceptual art."
      }
    },
    {
      id: "marlborough_college",
      label: "Marlborough College",
      type: "Institution_Studio",
      properties: {
        name: "Marlborough College",
        city: "Wiltshire",
        country: "UK",
        type: "School",
        bio: "Prestigious Wiltshire school with a historic Art School, hosting resident artists and countenancing famous alumni like William Morris."
      }
    },

    // New Artworks (Goldsmiths & Marlborough)
    {
      id: "kelmscott_chaucer",
      label: "Kelmscott Chaucer",
      type: "Artwork",
      properties: {
        year: 1896,
        medium: "Woodcut relief and letterpress on paper",
        bio: "William Morris's masterwork printed at the Kelmscott Press, containing 87 woodcuts after drawings by Edward Burne-Jones."
      }
    },
    {
      id: "aegean_suite",
      label: "Aegean Suite",
      type: "Artwork",
      properties: {
        year: 1971,
        medium: "Lithography on zinc",
        bio: "Barbara Hepworth's abstract graphic portfolio of geometric forms, printed at Curwen Studio and published by Marlborough Graphics."
      }
    },
    {
      id: "nursery_rhymes_rego",
      label: "Nursery Rhymes Portfolio",
      type: "Artwork",
      properties: {
        year: 1989,
        medium: "Etching and Aquatint",
        bio: "Paula Rego's landmark portfolio of 31 prints published by Marlborough Graphics, showcasing her dark, narrative intaglio lines."
      }
    },
    // Printmaking Techniques (Visible Nodes)
    {
      id: "viscosity_printing",
      label: "Viscosity Printing",
      type: "Technique",
      properties: {
        classification: "Planographic / Intaglio Hybrid",
        bio: "Pioneered at Atelier 17 by Hayter, Reddy, and Moti. It involves printing multiple colors simultaneously from a single plate by exploiting the chemical viscosity of inks and the physical hardness of rollers."
      }
    },
    {
      id: "acrylic_engraving",
      label: "Perspex / Acrylic Engraving",
      type: "Technique",
      properties: {
        classification: "Intaglio (Synthetic Matrix)",
        bio: "Pioneered by Agathe Sorel in London. It involves engraving lines directly into transparent acrylic sheets (Perspex), allowing for layered registration, organic shapes, and three-dimensional print assemblages."
      }
    },
    {
      id: "line_engraving",
      label: "Line Engraving with the Burin",
      type: "Technique",
      properties: {
        classification: "Intaglio (Metallic Matrix)",
        bio: "A classical method revived as a fine art medium at Goldsmiths under Stanley Anderson. It involves incising clean, sculptural lines directly into copper using a steel burin."
      }
    },
    {
      id: "stone_lithography",
      label: "Stone Lithography",
      type: "Technique",
      properties: {
        classification: "Planographic (Chemical)",
        bio: "A planographic process based on the antipathy of grease and water. Promoted at Curwen Studio and Slade by Stanley Jones, it involves drawing with greasy materials on limestone."
      }
    },
    {
      id: "soft_ground_collage",
      label: "Soft-Ground Collage / Texture Transfer",
      type: "Technique",
      properties: {
        classification: "Intaglio (Textured)",
        bio: "An etching method developed at Atelier 17, using a soft, waxy ground into which textiles, threads, and paper collages are pressed to etch their exact textures into the metal."
      }
    },
    {
      id: "relief_printing",
      label: "Relief Printing & Linocuts",
      type: "Technique",
      properties: {
        classification: "Relief (Carved)",
        bio: "A print process where the non-printing areas are carved away, leaving the design raised. Disseminated in progressive education by Evelyn Gibbs at Goldsmiths using linoleum and potato cuts."
      }
    }
  ],
  edges: [
    // STUDIED_UNDER
    {
      id: "e1",
      from: "agathe_sorel",
      to: "sw_hayter",
      type: "STUDIED_UNDER",
      properties: {
        years: "1958-1960",
        location: "Atelier 17, Paris",
        details: "Supported by a Gulbenkian Scholarship. Sorel was initially shocked by Hayter's radical automatism but came to absorb his structural rigors."
      }
    },
    {
      id: "e2",
      from: "agathe_sorel",
      to: "margit_graber",
      type: "STUDIED_UNDER",
      properties: {
        years: "Before 1956",
        location: "Budapest, Hungary",
        details: "Early drawing and painterly mentorship under the veteran Hungarian modernist, establishing Sorel's strong sense of composition."
      }
    },
    {
      id: "e3",
      from: "agathe_sorel",
      to: "anthony_gross",
      type: "STUDIED_UNDER",
      properties: {
        years: "1956-1958",
        location: "Camberwell School of Art",
        details: "Gross taught Sorel classical engraving line weight and layout, and subsequently urged her to apply to Atelier 17."
      }
    },
    {
      id: "e4",
      from: "david_ferry",
      to: "agathe_sorel",
      type: "STUDIED_UNDER",
      properties: {
        years: "1970s",
        location: "Camberwell School of Art",
        details: "Ferry studied under Sorel, inheriting her dedication to line integrity, experimental materials, and book arts."
      }
    },
    {
      id: "e_studied_sitkey",
      from: "gabor_sitkey",
      to: "robert_medley",
      type: "STUDIED_UNDER",
      properties: {
        years: "1956-1960",
        location: "Camberwell School of Art",
        details: "Sitkey studied painting and textile design under Medley, influencing his textured approaches to canvas layout."
      }
    },
    {
      id: "e_studied_kitaj",
      from: "rb_kitaj",
      to: "robert_medley",
      type: "STUDIED_UNDER",
      properties: {
        years: "1958-1959",
        location: "Camberwell School of Art",
        details: "Kitaj studied under Medley, beginning his lifetime engagement with figurative, text-dense compositions."
      }
    },
    {
      id: "e_studied_reddy",
      from: "krishna_reddy",
      to: "sw_hayter",
      type: "STUDIED_UNDER",
      properties: {
        years: "1953-1957",
        location: "Atelier 17, Paris",
        details: "Reddy studied print mechanics with Hayter, transitioning his sculptural carving habits onto metal plates."
      }
    },
    {
      id: "e_studied_moti",
      from: "kaiko_moti",
      to: "sw_hayter",
      type: "STUDIED_UNDER",
      properties: {
        years: "1950s",
        location: "Atelier 17, Paris",
        details: "Moti studied viscosity dynamics under Hayter, assisting in standardizing the chemical properties of oil rollers."
      }
    },
    {
      id: "e_studied_thornton",
      from: "valerie_thornton",
      to: "sw_hayter",
      type: "STUDIED_UNDER",
      properties: {
        years: "1954",
        location: "Atelier 17, Paris",
        details: "Thornton studied print textures under Hayter, directly translating his line engravings into heavy stone-relief effects."
      }
    },
    {
      id: "e_studied_dickson",
      from: "jennifer_dickson",
      to: "sw_hayter",
      type: "STUDIED_UNDER",
      properties: {
        years: "1960-1965",
        location: "Atelier 17, Paris",
        details: "Dickson won a French Government Scholarship to study color systems under Hayter, specializing in photo-etchings."
      }
    },
    {
      id: "e_studied_fuller",
      from: "sue_fuller",
      to: "sw_hayter",
      type: "STUDIED_UNDER",
      properties: {
        years: "1943-1945",
        location: "Atelier 17, New York",
        details: "Fuller studied the physical behaviors of soft-ground etching under Hayter, experimenting with lace, thread, and fabrics."
      }
    },

    // INFLUENCED_MATERIAL_TECHNIQUE
    {
      id: "e5",
      from: "sw_hayter",
      to: "agathe_sorel",
      type: "INFLUENCED_MATERIAL_TECHNIQUE",
      properties: {
        technique: "Viscosity Printing",
        details: "Hayter introduced Sorel to simultaneous multi-color printmaking on a single plate by controlling the viscosity of different inks."
      }
    },
    {
      id: "e6",
      from: "agathe_sorel",
      to: "mauricio_lasansky",
      type: "INFLUENCED_MATERIAL_TECHNIQUE",
      properties: {
        technique: "Perspex / Acrylic Plates",
        details: "Transatlantic exchange in the late 1960s where Sorel shared her methods of drypoint engraving directly onto transparent synthetic plates."
      }
    },
    {
      id: "e7",
      from: "agathe_sorel",
      to: "sam_maitin",
      type: "INFLUENCED_MATERIAL_TECHNIQUE",
      properties: {
        technique: "Acrylic Plate Engraving",
        details: "Sorel shared her Fulham studio experiments with Maitin, resulting in a dialogue regarding translucent mediums in Philadelphia print circles."
      }
    },
    {
      id: "e8",
      from: "agathe_sorel",
      to: "david_ferry",
      type: "INFLUENCED_MATERIAL_TECHNIQUE",
      properties: {
        technique: "3D Space Engravings / Collage Books",
        details: "Sorel's sculptural print assemblages directly inspired Ferry's three-dimensional book designs and multi-layered collages."
      }
    },
    {
      id: "e_inf_reddy_hayter",
      from: "krishna_reddy",
      to: "sw_hayter",
      type: "INFLUENCED_MATERIAL_TECHNIQUE",
      properties: {
        technique: "Simultaneous Viscosity Printing",
        details: "Reddy's close collaboration with Hayter led to the chemical and physical breakthrough of printing multiple colors simultaneously with rollers of different hardness."
      }
    },
    {
      id: "e_inf_skiold_sorel",
      from: "birgit_skiold",
      to: "agathe_sorel",
      type: "INFLUENCED_MATERIAL_TECHNIQUE",
      properties: {
        technique: "Open-Access Printmaking Studio Model",
        details: "Skiöld's Adrian Street open studio pioneered open-access presses, directly influencing Sorel's layout for her Fulham workshop."
      }
    },
    {
      id: "e_inf_hayter_thornton",
      from: "sw_hayter",
      to: "valerie_thornton",
      type: "INFLUENCED_MATERIAL_TECHNIQUE",
      properties: {
        technique: "Textured Intaglio / Aquatint",
        details: "Hayter's deep-etching methods inspired Thornton to develop highly textured plates resembling architectural stone surfaces."
      }
    },
    {
      id: "e_inf_hayter_pollock",
      from: "sw_hayter",
      to: "jackson_pollock",
      type: "INFLUENCED_MATERIAL_TECHNIQUE",
      properties: {
        technique: "Automatism on Copper",
        details: "Hayter's automatic engraving exercises at the NY workshop directly encouraged Pollock's gestural freedom and automatic line drawing."
      }
    },
    {
      id: "e_inf_hayter_fuller",
      from: "sw_hayter",
      to: "sue_fuller",
      type: "INFLUENCED_MATERIAL_TECHNIQUE",
      properties: {
        technique: "Soft-ground Texturing",
        details: "Hayter's instruction on embedding threads in soft-ground sparked Fuller's interest in lines in space, leading to her thread sculptures."
      }
    },
    {
      id: "e_inf_miro_hayter",
      from: "joan_miro",
      to: "sw_hayter",
      type: "INFLUENCED_MATERIAL_TECHNIQUE",
      properties: {
        technique: "Surrealist Line Dynamics",
        details: "Miró and Hayter shared a close conceptual dialogue in Paris on automatic drawing, influencing Hayter's early line philosophy."
      }
    },

    // CO_FOUNDED
    {
      id: "e9",
      from: "agathe_sorel",
      to: "printmakers_council",
      type: "CO_FOUNDED",
      properties: {
        year: 1965,
        details: "Founding member. Helped draft the initial constitution to secure professional status and exhibition routes for printmakers."
      }
    },
    {
      id: "e10",
      from: "michael_rothenstein",
      to: "printmakers_council",
      type: "CO_FOUNDED",
      properties: {
        year: 1965,
        details: "Co-organizer. Hosted the first planning meetings at his Chelsea flat on Beaufort Street in early 1965."
      }
    },
    {
      id: "e11",
      from: "julian_trevelyan",
      to: "printmakers_council",
      type: "CO_FOUNDED",
      properties: {
        year: 1965,
        details: "Founding member. Advocated for a loose, anti-academic print cooperative to counter conservative institutions."
      }
    },
    {
      id: "e12",
      from: "anthony_gross",
      to: "printmakers_council",
      type: "CO_FOUNDED",
      properties: {
        year: 1965,
        details: "Founding member. Brought his extensive Royal Academy connections to give the council leverage while maintaining radicalism."
      }
    },
    {
      id: "e_cofound_cheese",
      from: "bernard_cheese",
      to: "printmakers_council",
      type: "CO_FOUNDED",
      properties: {
        year: 1965,
        details: "Founding Vice-Chairman. Organised early general meetings at the Federation of British Artists galleries."
      }
    },
    {
      id: "e_cofound_evans",
      from: "merlyn_evans",
      to: "printmakers_council",
      type: "CO_FOUNDED",
      properties: {
        year: 1965,
        details: "Founding committee member. Represented abstract relief concerns on the first executive board."
      }
    },
    {
      id: "e_cofound_skiold",
      from: "birgit_skiold",
      to: "printmakers_council",
      type: "CO_FOUNDED",
      properties: {
        year: 1965,
        details: "Founding committee member. Offered her Adrian Street studio space for early PmC coordination."
      }
    },
    {
      id: "e_cofound_jones",
      from: "stanley_jones",
      to: "printmakers_council",
      type: "CO_FOUNDED",
      properties: {
        year: 1965,
        details: "Founding committee member. Jones bridged the council with Curwen Studio to enable high-quality lithography."
      }
    },
    {
      id: "e_cofound_grant",
      from: "alistair_grant",
      to: "printmakers_council",
      type: "CO_FOUNDED",
      properties: {
        year: 1965,
        details: "Founding committee member. Brought lithography and screenprinting connections from the Royal College of Art."
      }
    },
    {
      id: "e_cofound_hermes",
      from: "gertrude_hermes",
      to: "printmakers_council",
      type: "CO_FOUNDED",
      properties: {
        year: 1965,
        details: "Founding committee member. Hermes represented the classical wood engraving vanguard within the PmC."
      }
    },
    {
      id: "e_cofound_dickson",
      from: "jennifer_dickson",
      to: "printmakers_council",
      type: "CO_FOUNDED",
      properties: {
        year: 1965,
        details: "Founding member. Brought color etching ideas from Atelier 17 to enrich the PmC's technical range."
      }
    },
    {
      id: "e_cofound_eccleston",
      from: "harry_eccleston",
      to: "printmakers_council",
      type: "CO_FOUNDED",
      properties: {
        year: 1965,
        details: "Inaugural President. Spearheaded the organizational growth and secured early gallery relationships."
      }
    },
    {
      id: "e_cofound_jones_studio",
      from: "stanley_jones",
      to: "curwen_studio",
      type: "CO_FOUNDED",
      properties: {
        year: 1958,
        details: "Jones co-founded Curwen Studio under the auspices of the Curwen Press to provide a collaborative space for master lithographers."
      }
    },

    // WORKED_AT / MEMBER_OF
    {
      id: "e13",
      from: "agathe_sorel",
      to: "atelier_17",
      type: "WORKED_AT",
      properties: {
        role: "Scholar / Artist",
        years: "1958-1960",
        details: "Studied and printed alongside an international cadre of artists, assisting in color roll-ups and experimental clean-wiping."
      }
    },
    {
      id: "e14",
      from: "agathe_sorel",
      to: "camberwell_school",
      type: "WORKED_AT",
      properties: {
        role: "Lecturer in Printmaking",
        years: "1960s-1980s",
        details: "Introduced Hayter's viscosity methods and her own Perspex engraving techniques to the Camberwell curriculum."
      }
    },
    {
      id: "e15",
      from: "agathe_sorel",
      to: "printmakers_council",
      type: "WORKED_AT",
      properties: {
        role: "Chairman",
        years: "1981-1983",
        details: "Led the Council through major international print exchanges, expanding the network to France, Germany, and the US."
      }
    },
    {
      id: "e17",
      from: "bertha_von_moschzisker",
      to: "philadelphia_print_club",
      type: "WORKED_AT",
      properties: {
        role: "Director",
        years: "1944-1969",
        details: "Spearheaded transatlantic relationships, hosted international exhibitions, and curated modern prints for Philadelphia collections."
      }
    },
    {
      id: "e18",
      from: "sw_hayter",
      to: "atelier_17",
      type: "WORKED_AT",
      properties: {
        role: "Founder / Director",
        years: "1927-1988",
        details: "Directed the workshop, pushing the conceptual bounds of print line dynamics, surrealist automatic drawing, and chemical etching."
      }
    },
    {
      id: "e19",
      from: "david_ferry",
      to: "camberwell_school",
      type: "WORKED_AT",
      properties: {
        role: "Student",
        years: "1970s",
        details: "Engaged in hands-on workshop learning under Sorel and other PMC printmakers."
      }
    },
    {
      id: "e_work_medley",
      from: "robert_medley",
      to: "camberwell_school",
      type: "WORKED_AT",
      properties: {
        role: "Head of Painting & Sculpture",
        years: "1958-1965",
        details: "Medley restructured the curriculum to encourage expressionist figuration and shared print/paint facilities."
      }
    },
    {
      id: "e_work_inlander",
      from: "heinz_inlander",
      to: "camberwell_school",
      type: "WORKED_AT",
      properties: {
        role: "Lecturer in Painting",
        years: "1957-1963",
        details: "Shared Central European expressionist principles with Sorel and Sitkey."
      }
    },
    {
      id: "e_work_jones_curwen",
      from: "stanley_jones",
      to: "curwen_studio",
      type: "WORKED_AT",
      properties: {
        role: "Technical Director",
        years: "1958-1995",
        details: "Supervised high-end lithograph press runs for major artists, bringing Parisian litho expertise to London."
      }
    },
    {
      id: "e_work_eccleston_pmc",
      from: "harry_eccleston",
      to: "printmakers_council",
      type: "WORKED_AT",
      properties: {
        role: "President",
        years: "1965-1972",
        details: "Guided the PmC through its formative exhibitions at the F.B.A. and Bankside Galleries."
      }
    },
    {
      id: "e_work_peterdi_yale",
      from: "gabor_peterdi",
      to: "ecole_beaux_arts",
      type: "WORKED_AT",
      properties: {
        role: "Associate Professor",
        years: "1930s",
        details: "Studied at the Académie Julian and École des Beaux-Arts before joining Atelier 17."
      }
    },

    // 32-39 Worked At Atelier 17
    {
      id: "e_work_miro_a17",
      from: "joan_miro",
      to: "atelier_17",
      type: "WORKED_AT",
      properties: {
        role: "Visiting Artist",
        years: "1930s-1940s",
        details: "Made prints in both the Paris and New York phases, working closely with Hayter on viscosity coloring experiments."
      }
    },
    {
      id: "e_work_bourgeois_a17",
      from: "louise_bourgeois",
      to: "atelier_17",
      type: "WORKED_AT",
      properties: {
        role: "Artist",
        years: "1946-1949",
        details: "Etched her seminal print series 'He Disappeared into Complete Silence' at the New York studio."
      }
    },
    {
      id: "e_work_pollock_a17",
      from: "jackson_pollock",
      to: "atelier_17",
      type: "WORKED_AT",
      properties: {
        role: "Visiting Artist",
        years: "1944-1945",
        details: "Created a series of 11 drypoint and engraved plates in New York, which are considered crucial to his transition toward drip-painting."
      }
    },
    {
      id: "e_work_motherwell_a17",
      from: "robert_motherwell",
      to: "atelier_17",
      type: "WORKED_AT",
      properties: {
        role: "Artist",
        years: "1940s",
        details: "Engaged in automatic drawing workshops at the NY location, refining his calligraphic language."
      }
    },
    {
      id: "e_work_ernst_a17",
      from: "max_ernst",
      to: "atelier_17",
      type: "WORKED_AT",
      properties: {
        role: "Artist",
        years: "1930s-1940s",
        details: "Collaborated on Surrealist portfolios in Paris and NY, exploring relief texturing and acid biting."
      }
    },
    {
      id: "e_work_buckland_wright_a17",
      from: "john_buckland_wright",
      to: "atelier_17",
      type: "WORKED_AT",
      properties: {
        role: "Co-Director",
        years: "1930-1939",
        details: "Assisted Hayter in managing the Paris workshop, tutoring students in line and wood engraving."
      }
    },
    {
      id: "e_work_schrag_a17",
      from: "karl_schrag",
      to: "atelier_17",
      type: "WORKED_AT",
      properties: {
        role: "Director",
        years: "1950",
        details: "Served as director of the NY workshop, sustaining its operations and teaching curriculum."
      }
    },
    {
      id: "e_work_fuller_a17",
      from: "sue_fuller",
      to: "atelier_17",
      type: "WORKED_AT",
      properties: {
        role: "Assistant & Printer",
        years: "1943-1945",
        details: "Worked at the NY studio, assisting in printing editions and conducting experimental soft-ground trials."
      }
    },
    {
      id: "e_work_buckland_wright_camberwell",
      from: "john_buckland_wright",
      to: "camberwell_school",
      type: "WORKED_AT",
      properties: {
        role: "Instructor in Engraving",
        years: "1948-1953",
        details: "Brought Atelier 17's line engraving methods directly into Camberwell's pedagogy before Sorel's arrival."
      }
    },

    // EXHIBITED_WITH
    {
      id: "e20",
      from: "wise_foolish_virgin",
      to: "la_mere",
      type: "EXHIBITED_WITH",
      properties: {
        exhibition: "Bradford Print Biennale",
        year: 1969,
        details: "Sorel's viscosity masterpiece exhibited side-by-side with Hayter's work, highlighting their shared pedagogical roots in simultaneous color engraving."
      }
    },
    {
      id: "e21",
      from: "space_engraving_totem",
      to: "violent_dialogue",
      type: "EXHIBITED_WITH",
      properties: {
        exhibition: "Printmakers Council Retrospective",
        year: 1970,
        details: "Representing the vanguard of British prints: Sorel's 3D Perspex sculpture exhibited alongside Rothenstein's heavy woodcut reliefs."
      }
    },
    {
      id: "e22",
      from: "space_engraving_totem",
      to: "self_portrait_engraver",
      type: "EXHIBITED_WITH",
      properties: {
        exhibition: "Philadelphia Print Club Exhibition",
        year: 1968,
        details: "Pivotal transatlantic exhibition curated by Bertha von Moschzisker. Sorel's space engravings were set in dialogue with Lasansky's classical copper drypoints."
      }
    },
    {
      id: "e23",
      from: "bradford_biennale_work",
      to: "wise_foolish_virgin",
      type: "EXHIBITED_WITH",
      properties: {
        exhibition: "Bradford Print Biennale",
        year: 1969,
        details: "Tracking Sorel's progression from single-plate color depth (Virgin) to multi-medium physical collage (Bradford piece)."
      }
    },
    {
      id: "e_exh_reddy",
      from: "demonstrators_reddy",
      to: "la_mere",
      type: "EXHIBITED_WITH",
      properties: {
        exhibition: "Atelier 17 Group Exhibition",
        year: 1960,
        details: "Reddy's abstract contours set in dialogue with Hayter's line dynamics in Paris."
      }
    },
    {
      id: "e_exh_skiold",
      from: "adrian_street_print",
      to: "space_engraving_totem",
      type: "EXHIBITED_WITH",
      properties: {
        exhibition: "Printmakers Council First Exhibition",
        year: 1966,
        details: "Skiöld's minimalist lithographs displayed alongside Sorel's early Perspex drypoints in London."
      }
    },
    {
      id: "e_exh_piper",
      from: "curwen_litho_piper",
      to: "violent_dialogue",
      type: "EXHIBITED_WITH",
      properties: {
        exhibition: "Curwen Studio Exhibition",
        year: 1968,
        details: "Piper's lithograph displayed next to Rothenstein's relief prints, showcasing lithographic texture versus relief texture."
      }
    },
    {
      id: "e_exh_eccleston",
      from: "pictorial_banknote",
      to: "bradford_biennale_work",
      type: "EXHIBITED_WITH",
      properties: {
        exhibition: "Bradford Print Biennale",
        year: 1970,
        details: "Eccleston's masterfully engraved banknotes shown alongside experimental relief works by Sorel."
      }
    },
    {
      id: "e_work_moore_curwen",
      from: "henry_moore",
      to: "curwen_studio",
      type: "WORKED_AT",
      properties: {
        role: "Visiting Artist",
        years: "1958-1980s",
        details: "Collaborated closely with Stanley Jones on over a hundred lithographs, utilizing wash-like tusche drawings on zinc and stone."
      }
    },
    {
      id: "e_work_hepworth_curwen",
      from: "barbara_hepworth",
      to: "curwen_studio",
      type: "WORKED_AT",
      properties: {
        role: "Visiting Artist",
        years: "1969-1971",
        details: "Translated her geometric and organic abstractions into print form, developing multi-layered color lithograph portfolios."
      }
    },
    {
      id: "e_work_frink_curwen",
      from: "elisabeth_frink",
      to: "curwen_studio",
      type: "WORKED_AT",
      properties: {
        role: "Visiting Artist",
        years: "1960s-1980s",
        details: "Utilized heavy lithographic crayon washes on limestone to create her powerful bird and soldier figures."
      }
    },
    {
      id: "e_work_rego_curwen",
      from: "paula_rego",
      to: "curwen_studio",
      type: "WORKED_AT",
      properties: {
        role: "Visiting Artist",
        years: "1980s-1990s",
        details: "Printed narrative lithographs, drawing directly on stones or using transfer papers to capture her dense, fluid linework."
      }
    },
    {
      id: "e_work_bawden_curwen",
      from: "edward_bawden",
      to: "curwen_studio",
      type: "WORKED_AT",
      properties: {
        role: "Visiting Artist",
        years: "1958-1980s",
        details: "Printed fine-art editions of his linocut designs and lithographs, continuing his lifetime link to the Curwen name."
      }
    },
    {
      id: "e_inf_jones_moore",
      from: "stanley_jones",
      to: "henry_moore",
      type: "INFLUENCED_MATERIAL_TECHNIQUE",
      properties: {
        technique: "Stone Lithography Ink Washes",
        details: "Jones guided Moore on how to prepare greasy liquid ink (tusche) to produce wash textures on limestone that mirrored his sculptural drawings."
      }
    },
    {
      id: "e_inf_jones_hepworth",
      from: "stanley_jones",
      to: "barbara_hepworth",
      type: "INFLUENCED_MATERIAL_TECHNIQUE",
      properties: {
        technique: "Zinc Plate Color Layering",
        details: "Jones assisted Hepworth in layering transparent ink roll-ups on zinc, translating her three-dimensional sculpture shadows into overlapping color planes."
      }
    },
    {
      id: "e_inf_jones_rego",
      from: "stanley_jones",
      to: "paula_rego",
      type: "INFLUENCED_MATERIAL_TECHNIQUE",
      properties: {
        technique: "Crayon Transfer Lithography",
        details: "Jones introduced Rego to heavy litho grease crayons and transfer sheets, enabling her to draw fluidly in her studio and transfer directly to limestone."
      }
    },
    {
      id: "e_inf_jones_frink",
      from: "stanley_jones",
      to: "elisabeth_frink",
      type: "INFLUENCED_MATERIAL_TECHNIQUE",
      properties: {
        technique: "Lithographic Crayon Gradients",
        details: "Jones worked with Frink to chemically etch her delicate graphite-like shading onto stones without losing detail."
      }
    },
    {
      id: "e_studied_auerbach_bomberg",
      from: "frank_auerbach",
      to: "david_bomberg",
      type: "STUDIED_UNDER",
      properties: {
        years: "1947-1953",
        location: "Borough Polytechnic, London",
        details: "Attended Bomberg's evening classes, absorbing his principles of 'spirit in the mass' and structural weight over academic polish."
      }
    },
    {
      id: "e_work_bomberg_borough",
      from: "david_bomberg",
      to: "borough_polytechnic",
      type: "WORKED_AT",
      properties: {
        role: "Evening Lecturer in Drawing",
        years: "1947-1953",
        details: "Ran highly influential drawing sessions that trained the School of London painters in architectural mass construction."
      }
    },
    {
      id: "e_work_auerbach_camberwell",
      from: "frank_auerbach",
      to: "camberwell_school",
      type: "WORKED_AT",
      properties: {
        role: "Visiting Tutor",
        years: "1958-1965",
        details: "Taught drawing and painting, introducing Camberwell students to his iterative construction and scraping processes."
      }
    },
    {
      id: "e_work_balakjian_studio",
      from: "marc_balakjian",
      to: "studio_prints",
      type: "WORKED_AT",
      properties: {
        role: "Master Printer & Co-Director",
        years: "1968-2010s",
        details: "Ran the printing operations, etching and printing custom copper runs for School of London figurative artists."
      }
    },
    {
      id: "e_work_auerbach_rca",
      from: "frank_auerbach",
      to: "royal_college_of_art",
      type: "WORKED_AT",
      properties: {
        role: "Postgraduate Student",
        years: "1952-1955",
        details: "Completed his painting studies under traditional tutors while developing his heavy, sculptural impasto strokes."
      }
    },
    {
      id: "e_work_grant_rca",
      from: "alistair_grant",
      to: "royal_college_of_art",
      type: "WORKED_AT",
      properties: {
        role: "Professor of Printmaking",
        years: "1955-1990s",
        details: "Led the print department, integrating lithography, etching, and screenprinting into a unified graphic system."
      }
    },
    {
      id: "e_work_auerbach_studio_prints",
      from: "frank_auerbach",
      to: "studio_prints",
      type: "WORKED_AT",
      properties: {
        role: "Visiting Artist",
        years: "1968-2010s",
        details: "Worked closely with Marc Balakjian to proof and print his limited-edition hard-ground etching runs."
      }
    },
    {
      id: "e_work_auerbach_marlborough",
      from: "frank_auerbach",
      to: "marlborough_graphics",
      type: "WORKED_AT",
      properties: {
        role: "Published Artist",
        years: "1970s-2010s",
        details: "Marlborough acted as his primary gallery and print division publisher, releasing his portraits and Camden studio series."
      }
    },
    {
      id: "e_inf_bomberg_auerbach",
      from: "david_bomberg",
      to: "frank_auerbach",
      type: "INFLUENCED_MATERIAL_TECHNIQUE",
      properties: {
        technique: "Structural construction of volume / mass drawings",
        details: "Bomberg's emphasis on structural constructivism led to Auerbach's heavy charcoal drawings and scraped-down oil paintings."
      }
    },
    {
      id: "e_inf_balakjian_auerbach",
      from: "marc_balakjian",
      to: "frank_auerbach",
      type: "INFLUENCED_MATERIAL_TECHNIQUE",
      properties: {
        technique: "Deep-etched intaglio chemistry",
        details: "Balakjian's specialized acid-biting techniques allowed Auerbach to etch copper plates extremely deeply, producing thick, raised ink ridges on paper."
      }
    },
    // New Edges (Frank Auerbach Circle)
    {
      id: "e_studied_kossoff_bomberg",
      from: "leon_kossoff",
      to: "david_bomberg",
      type: "STUDIED_UNDER",
      properties: {
        years: "1947-1953",
        location: "Borough Polytechnic, London",
        details: "Kossoff attended Bomberg's evening classes with Auerbach, learning to build mass and architectural weight."
      }
    },
    {
      id: "e_studied_kossoff_st_martins",
      from: "leon_kossoff",
      to: "st_martins_school",
      type: "WORKED_AT",
      properties: {
        role: "Student",
        years: "1949-1953",
        details: "Kossoff received his daytime painting training at St Martin's, where he met and befriended Auerbach."
      }
    },
    {
      id: "e_studied_auerbach_st_martins",
      from: "frank_auerbach",
      to: "st_martins_school",
      type: "WORKED_AT",
      properties: {
        role: "Student",
        years: "1948-1952",
        details: "Auerbach undertook his daytime drawing and painting studies alongside Kossoff."
      }
    },
    {
      id: "e_work_auerbach_sidcup",
      from: "frank_auerbach",
      to: "sidcup_school_of_art",
      type: "WORKED_AT",
      properties: {
        role: "Tutor in Drawing",
        years: "1956-1958",
        details: "Auerbach taught drawing classes part-time at Sidcup, where he met Juliet Yardley Mills (J.Y.M.) in 1956."
      }
    },
    {
      id: "e_work_willson_palm_tree",
      from: "terry_willson",
      to: "palm_tree_studios",
      type: "WORKED_AT",
      properties: {
        role: "Master Printer & Founder",
        years: "1970s-1990s",
        details: "Established Palm Tree Studios, directing proofing and printing of major graphic editions."
      }
    },
    {
      id: "e_work_auerbach_palm_tree",
      from: "frank_auerbach",
      to: "palm_tree_studios",
      type: "WORKED_AT",
      properties: {
        role: "Visiting Artist",
        years: "1980-1981",
        details: "Worked closely with Terry Willson to proof and print his first major head etching portfolio."
      }
    },
    {
      id: "e_work_kossoff_studio_prints",
      from: "leon_kossoff",
      to: "studio_prints",
      type: "WORKED_AT",
      properties: {
        role: "Visiting Artist",
        years: "1980s",
        details: "Collaborated with Marc Balakjian to proof and print his intricate, heavily etched copper plates."
      }
    },
    {
      id: "e_work_freud_studio_prints",
      from: "lucian_freud",
      to: "studio_prints",
      type: "WORKED_AT",
      properties: {
        role: "Visiting Artist",
        years: "1980s-2000s",
        details: "Freud worked with Marc Balakjian to proof his highly precise and detailed copper plate etchings."
      }
    },
    {
      id: "e_inf_tilson_auerbach",
      from: "joe_tilson",
      to: "frank_auerbach",
      type: "INFLUENCED_MATERIAL_TECHNIQUE",
      properties: {
        technique: "First copper plate biting in acid",
        details: "Tilson assisted Auerbach in biting his very first portrait plate in Somerset, which initiated Auerbach's etching practice."
      }
    },
    {
      id: "e_inf_willson_auerbach",
      from: "terry_willson",
      to: "frank_auerbach",
      type: "INFLUENCED_MATERIAL_TECHNIQUE",
      properties: {
        technique: "Copper plate printing and biting",
        details: "Willson worked with Auerbach on complex biting times and multi-plate trials for 'Six Etchings of Heads'."
      }
    },
    {
      id: "e_inf_balakjian_freud",
      from: "marc_balakjian",
      to: "lucian_freud",
      type: "INFLUENCED_MATERIAL_TECHNIQUE",
      properties: {
        technique: "Highly detailed copper etching proofing",
        details: "Balakjian's technical precision enabled Freud to translate his obsessive drawing textures to copper plate editions."
      }
    },
    {
      id: "e_inf_balakjian_kossoff",
      from: "marc_balakjian",
      to: "leon_kossoff",
      type: "INFLUENCED_MATERIAL_TECHNIQUE",
      properties: {
        technique: "Heavily textured acid biting",
        details: "Balakjian worked with Kossoff to bite his plates deeply, capturing his fast, energetic drawings in metal."
      }
    },
    {
      id: "e_inf_auerbach_kossoff",
      from: "frank_auerbach",
      to: "leon_kossoff",
      type: "INFLUENCED_MATERIAL_TECHNIQUE",
      properties: {
        technique: "Expressive figurative drawing weight",
        details: "Auerbach and Kossoff maintained a lifelong studio dialogue, sharing principles of structural construction and incised lines."
      }
    },

    // New Edges (David Ferry Circle)
    {
      id: "e_studied_ferry_slade",
      from: "david_ferry",
      to: "slade_school",
      type: "WORKED_AT",
      properties: {
        role: "Postgraduate Student",
        years: "1981-1983",
        details: "Completed his advanced studies in printmaking, focusing on lithography and relief processes."
      }
    },
    {
      id: "e_studied_ferry_jones",
      from: "david_ferry",
      to: "stanley_jones",
      type: "STUDIED_UNDER",
      properties: {
        years: "1981-1983",
        location: "Slade School of Fine Art",
        details: "Studied stone lithography and grease chemistry under Jones, combining it with photographic processes."
      }
    },
    {
      id: "e_studied_ferry_daglish",
      from: "david_ferry",
      to: "peter_daglish",
      type: "STUDIED_UNDER",
      properties: {
        years: "1981-1983",
        location: "Slade School of Fine Art",
        details: "Daglish guided Ferry in bold, color-based relief printing and woodcut layout design."
      }
    },
    {
      id: "e_work_daglish_slade",
      from: "peter_daglish",
      to: "slade_school",
      type: "WORKED_AT",
      properties: {
        role: "Tutor in Printmaking",
        years: "1970s-1990s",
        details: "Taught generations of printmakers, encouraging vibrant, experimental block printing."
      }
    },
    {
      id: "e_work_ferry_cardiff",
      from: "david_ferry",
      to: "cardiff_school_of_art",
      type: "WORKED_AT",
      properties: {
        role: "Professor of Printmaking & Book Arts",
        years: "1990s-2000s",
        details: "Directed Cardiff's fine art print and artist book curricula, establishing the department as an academic leader."
      }
    },
    {
      id: "e_work_ferry_winchester",
      from: "david_ferry",
      to: "winchester_school_of_art",
      type: "WORKED_AT",
      properties: {
        role: "Head of Printmaking",
        years: "1980s-1990s",
        details: "Led the Winchester print studio, integrating traditional and photo-mechanical workflows."
      }
    },
    {
      id: "e_work_ferry_curwen_centre",
      from: "david_ferry",
      to: "curwen_print_study_centre",
      type: "WORKED_AT",
      properties: {
        role: "Founding Artistic Director",
        years: "2003-present",
        details: "Directs educational programs, maintaining the print study centre's national outreach and workshops."
      }
    },
    {
      id: "e_work_ferry_re",
      from: "david_ferry",
      to: "royal_society_painter_printmakers",
      type: "WORKED_AT",
      properties: {
        role: "President",
        years: "2018-present",
        details: "Leads the society, curating major exhibitions at Bankside Gallery and promoting printmaking advocacy."
      }
    },
    {
      id: "e_work_eccleston_re",
      from: "harry_eccleston",
      to: "royal_society_painter_printmakers",
      type: "WORKED_AT",
      properties: {
        role: "President",
        years: "1975-1984",
        details: "Led the society through its modernization and transition to the Bankside Gallery home."
      }
    },
    {
      id: "e_work_sorel_re",
      from: "agathe_sorel",
      to: "royal_society_painter_printmakers",
      type: "WORKED_AT",
      properties: {
        role: "Fellow / Member",
        years: "1960s-2020",
        details: "Elected as a Fellow, Sorel regularly exhibited her space engravings and collages in RE group shows."
      }
    },
    {
      id: "e_work_jones_re",
      from: "stanley_jones",
      to: "royal_society_painter_printmakers",
      type: "WORKED_AT",
      properties: {
        role: "Fellow / Member",
        years: "1960s-2010s",
        details: "Jones exhibited his custom lithographs and served as an active fellow supporting lithography education."
      }
    },
    {
      id: "e_cofound_jones_centre",
      from: "stanley_jones",
      to: "curwen_print_study_centre",
      type: "WORKED_AT",
      properties: {
        role: "Co-Founder",
        years: "2003",
        details: "Jones co-founded the Centre in Cambridgeshire to ensure lithographic and printmaking skills are passed down to future generations."
      }
    },
    {
      id: "e_inf_jones_ferry",
      from: "stanley_jones",
      to: "david_ferry",
      type: "INFLUENCED_MATERIAL_TECHNIQUE",
      properties: {
        technique: "Traditional lithography and ink chemistry",
        details: "Jones passed on his deep knowledge of grease-crayon chemistry, lithographic inks, and limestone printing to Ferry."
      }
    },
    {
      id: "e_inf_daglish_ferry",
      from: "peter_daglish",
      to: "david_ferry",
      type: "INFLUENCED_MATERIAL_TECHNIQUE",
      properties: {
        technique: "Experimental color woodcuts and layout",
        details: "Daglish influenced Ferry's approach to vibrant, multi-layered block printing and layout construction."
      }
    },

    // Exhibitions of Ferry and Auerbach Artworks (Hidden but in data schema)
    {
      id: "e_exh_ferry_history",
      from: "faces_places_history",
      to: "the_invaders_book",
      type: "EXHIBITED_WITH",
      properties: {
        exhibition: "RE Annual Exhibition",
        year: 1999,
        details: "Ferry's historical photomontage prints set in dialogue with his altered guidebooks, displaying his collage mentality."
      }
    },
    {
      id: "e_exh_auerbach_heads",
      from: "six_etchings_heads",
      to: "seven_portraits",
      type: "EXHIBITED_WITH",
      properties: {
        exhibition: "Marlborough Graphics Retrospective",
        year: 1992,
        details: "Comparing Auerbach's early Terry Willson-printed heads with his later Marc Balakjian-printed portfolio, demonstrating printing texture shifts."
      }
    },
    {
      id: "e_exh_auerbach_nudes",
      from: "six_drypoints_nude",
      to: "six_etchings_heads",
      type: "EXHIBITED_WITH",
      properties: {
        exhibition: "Fitzwilliam Museum Print Retrospective",
        year: 2007,
        details: "Showing Auerbach's crude 1954 spoon-printed drypoints alongside his formal 1980 copper plate etchings."
      }
    },
    {
      id: "e_exh_kossoff_kilburn",
      from: "outside_kilburn",
      to: "seven_portraits",
      type: "EXHIBITED_WITH",
      properties: {
        exhibition: "Studio Prints Retrospective",
        year: 1988,
        details: "Kossoff's cityscapes shown alongside Auerbach's portraits, highlighting their shared printing style at Balakjian's workshop."
      }
    },
    // New Edges (Goldsmiths College)
    {
      id: "e_studied_sutherland_goldsmiths",
      from: "graham_sutherland",
      to: "goldsmiths_college",
      type: "WORKED_AT",
      properties: {
        role: "Student",
        years: "1921-1926",
        details: "Sutherland studied engraving and drawing at Goldsmiths, forming his core draftsmanship."
      }
    },
    {
      id: "e_studied_sutherland_anderson",
      from: "graham_sutherland",
      to: "stanley_anderson",
      type: "STUDIED_UNDER",
      properties: {
        years: "1921-1926",
        location: "Goldsmiths College, London",
        details: "Sutherland studied traditional line engraving and etching under Anderson."
      }
    },
    {
      id: "e_studied_drury_goldsmiths",
      from: "paul_drury",
      to: "goldsmiths_college",
      type: "WORKED_AT",
      properties: {
        role: "Student",
        years: "1920-1925",
        details: "Drury studied painting and printmaking, developing his landscape etching style."
      }
    },
    {
      id: "e_studied_drury_anderson",
      from: "paul_drury",
      to: "stanley_anderson",
      type: "STUDIED_UNDER",
      properties: {
        years: "1920-1925",
        location: "Goldsmiths College, London",
        details: "Drury developed a close dialogue with Anderson, absorbing his rigorous burin control."
      }
    },
    {
      id: "e_studied_tanner_goldsmiths",
      from: "robin_tanner",
      to: "goldsmiths_college",
      type: "WORKED_AT",
      properties: {
        role: "Student",
        years: "1924-1928",
        details: "Tanner completed evening classes in printmaking to earn his teaching credentials."
      }
    },
    {
      id: "e_studied_tanner_anderson",
      from: "robin_tanner",
      to: "stanley_anderson",
      type: "STUDIED_UNDER",
      properties: {
        years: "1924-1928",
        location: "Goldsmiths College, London",
        details: "Tanner studied etching under Anderson, focusing on pastoral landscapes."
      }
    },
    {
      id: "e_work_drury_goldsmiths",
      from: "paul_drury",
      to: "goldsmiths_college",
      type: "WORKED_AT",
      properties: {
        role: "Principal & Head of Etching",
        years: "1926-1969",
        details: "Drury directed the drawing and printmaking curriculum, preserving traditional techniques."
      }
    },
    {
      id: "e_work_anderson_goldsmiths",
      from: "stanley_anderson",
      to: "goldsmiths_college",
      type: "WORKED_AT",
      properties: {
        role: "Tutor in Printmaking",
        years: "1920s-1930s",
        details: "Anderson taught line engraving and printmaking, mentoring Drury, Sutherland, and Tanner."
      }
    },
    {
      id: "e_work_gibbs_goldsmiths",
      from: "evelyn_gibbs",
      to: "goldsmiths_college",
      type: "WORKED_AT",
      properties: {
        role: "Lecturer in Art Teacher-Training",
        years: "1934-1940s",
        details: "Gibbs designed printmaking curricula for teacher-training courses, emphasizing child expression."
      }
    },
    {
      id: "e_work_martin_goldsmiths",
      from: "kenneth_martin",
      to: "goldsmiths_college",
      type: "WORKED_AT",
      properties: {
        role: "Lecturer in Drawing & Design",
        years: "1946-1967",
        details: "Martin taught post-war students, introducing Constructivist geometry and kinetic space design."
      }
    },

    // New Edges (Marlborough College)
    {
      id: "e_studied_morris_marlborough",
      from: "william_morris_artist",
      to: "marlborough_college",
      type: "WORKED_AT",
      properties: {
        role: "Student",
        years: "1848-1851",
        details: "Morris studied at the College during its early years, developing his love for Wiltshire landscapes and Gothic architecture."
      }
    },
    {
      id: "e_work_shirley_smith_marlborough",
      from: "richard_shirley_smith",
      to: "marlborough_college",
      type: "WORKED_AT",
      properties: {
        role: "Head of Art",
        years: "1966-1970",
        details: "Smith directed the art school, teaching block engraving and book illustration."
      }
    },

    // New Edges (Marlborough Graphics)
    {
      id: "e_work_pasmore_marlborough",
      from: "victor_pasmore",
      to: "marlborough_graphics",
      type: "WORKED_AT",
      properties: {
        role: "Published Artist",
        years: "1960s-1990s",
        details: "Pasmore published his major abstract screenprints and relief prints in collaboration with Marlborough Graphics."
      }
    },
    {
      id: "e_work_bacon_marlborough",
      from: "francis_bacon",
      to: "marlborough_graphics",
      type: "WORKED_AT",
      properties: {
        role: "Published Artist",
        years: "1960s-1990s",
        details: "Bacon collaborated with Marlborough Graphics to release limited-edition lithograph sets of his triptychs."
      }
    },
    {
      id: "e_work_rego_marlborough",
      from: "paula_rego",
      to: "marlborough_graphics",
      type: "WORKED_AT",
      properties: {
        role: "Published Artist",
        years: "1980s-2010s",
        details: "Rego published her narrative etchings and aquatints, including the landmark Nursery Rhymes."
      }
    },
    {
      id: "e_work_moore_marlborough",
      from: "henry_moore",
      to: "marlborough_graphics",
      type: "WORKED_AT",
      properties: {
        role: "Published Artist",
        years: "1970s-1980s",
        details: "Moore published multiple abstract lithograph portfolios and landscapes through Marlborough Graphics."
      }
    },
    {
      id: "e_work_hepworth_marlborough",
      from: "barbara_hepworth",
      to: "marlborough_graphics",
      type: "WORKED_AT",
      properties: {
        role: "Published Artist",
        years: "1970s",
        details: "Hepworth published her abstract portfolios (like Aegean Suite) through Marlborough Graphics."
      }
    },

    // Exhibitions (Goldsmiths & Marlborough Artworks)
    {
      id: "e_exh_morris_chaucer",
      from: "kelmscott_chaucer",
      to: "wise_foolish_virgin",
      type: "EXHIBITED_WITH",
      properties: {
        exhibition: "Arts & Crafts Society Exhibition",
        year: 1965,
        details: "Morris's typographic print masterwork exhibited in historical retrospect alongside modern viscosity prints."
      }
    },
    {
      id: "e_exh_hepworth_aegean",
      from: "aegean_suite",
      to: "nursery_rhymes_rego",
      type: "EXHIBITED_WITH",
      properties: {
        exhibition: "Marlborough Graphics Anniversary Exhibition",
        year: 1995,
        details: "Hepworth's zinc-plate lithograph forms set in dialogue with Rego's dark, narrative nursery rhyme etchings."
      }
    },
    {
      id: "e_work_sorel_goldsmiths",
      from: "agathe_sorel",
      to: "goldsmiths_college",
      type: "WORKED_AT",
      properties: {
        role: "Lecturer in Printmaking",
        years: "1966-1980s",
        details: "Taught printmaking part-time under Principal Paul Drury, introducing Goldsmiths students to the viscosity printing methods of Atelier 17 and her own Perspex drypoint techniques."
      }
    },
    // Goldsmiths Technical Dissemination Edges
    {
      id: "e_inf_anderson_sutherland",
      from: "stanley_anderson",
      to: "graham_sutherland",
      type: "INFLUENCED_MATERIAL_TECHNIQUE",
      properties: {
        technique: "Direct Line Engraving with the Burin",
        details: "Anderson trained Sutherland in direct, non-acid line engraving on copper, reviving it as a primary expressive fine-art medium."
      }
    },
    {
      id: "e_inf_anderson_drury",
      from: "stanley_anderson",
      to: "paul_drury",
      type: "INFLUENCED_MATERIAL_TECHNIQUE",
      properties: {
        technique: "Burin Control & Fine-Art Engraving",
        details: "Anderson's insistence on precise burin incising initiated Drury's highly technical landscape etching style."
      }
    },
    {
      id: "e_inf_anderson_tanner",
      from: "stanley_anderson",
      to: "robin_tanner",
      type: "INFLUENCED_MATERIAL_TECHNIQUE",
      properties: {
        technique: "Meticulous burin carving and drypoint",
        details: "Anderson guided Tanner in manual burin techniques to capture rustic textures in his Wiltshire landscapes."
      }
    },
    {
      id: "e_inf_gibbs_goldsmiths_relief",
      from: "evelyn_gibbs",
      to: "goldsmiths_college",
      type: "INFLUENCED_MATERIAL_TECHNIQUE",
      properties: {
        technique: "Linocut & Potato Relief Printing in Pedagogy",
        details: "Gibbs pioneered and disseminated the use of cheap, non-toxic linocuts and potato prints for child expression, making printmaking a standard in national school curricula."
      }
    },
    // Connections from Entities to Technique Nodes (Unified under INFLUENCED_MATERIAL_TECHNIQUE)
    {
      id: "e_tech_sorel_acrylic",
      from: "agathe_sorel",
      to: "acrylic_engraving",
      type: "INFLUENCED_MATERIAL_TECHNIQUE",
      properties: {
        technique: "Perspex drypoint development",
        details: "Sorel invented and pioneered 3D space engravings on bent Perspex sheets, establishing this synthetic technique."
      }
    },
    {
      id: "e_tech_sorel_viscosity",
      from: "agathe_sorel",
      to: "viscosity_printing",
      type: "INFLUENCED_MATERIAL_TECHNIQUE",
      properties: {
        technique: "Viscosity color layering",
        details: "Sorel studied viscosity printmaking under Hayter, applying it to her classical single-plate etchings."
      }
    },
    {
      id: "e_tech_hayter_viscosity",
      from: "sw_hayter",
      to: "viscosity_printing",
      type: "INFLUENCED_MATERIAL_TECHNIQUE",
      properties: {
        technique: "Viscosity printing pioneer",
        details: "Hayter co-developed simultaneous multi-color viscosity printmaking, establishing Atelier 17 as its research center."
      }
    },
    {
      id: "e_tech_hayter_soft_ground",
      from: "sw_hayter",
      to: "soft_ground_collage",
      type: "INFLUENCED_MATERIAL_TECHNIQUE",
      properties: {
        technique: "Surrealist soft-ground texturing",
        details: "Hayter developed automated texturing using waxy soft grounds to capture fabrics and collage textures."
      }
    },
    {
      id: "e_tech_a17_viscosity",
      from: "atelier_17",
      to: "viscosity_printing",
      type: "INFLUENCED_MATERIAL_TECHNIQUE",
      properties: {
        technique: "Pedagogical dissemination of viscosity",
        details: "Atelier 17 served as the global workshop where viscosity printing was taught to international printmakers."
      }
    },
    {
      id: "e_tech_a17_soft_ground",
      from: "atelier_17",
      to: "soft_ground_collage",
      type: "INFLUENCED_MATERIAL_TECHNIQUE",
      properties: {
        technique: "Soft-ground etching workshops",
        details: "Atelier 17 integrated texturing methods into surrealist print experiments."
      }
    },
    {
      id: "e_tech_reddy_viscosity",
      from: "krishna_reddy",
      to: "viscosity_printing",
      type: "INFLUENCED_MATERIAL_TECHNIQUE",
      properties: {
        technique: "Viscosity roll-up chemistry",
        details: "Reddy co-developed multi-color print rollups, refining ink-oil separation and roller dynamics."
      }
    },
    {
      id: "e_tech_jones_lithography",
      from: "stanley_jones",
      to: "stone_lithography",
      type: "INFLUENCED_MATERIAL_TECHNIQUE",
      properties: {
        technique: "Limestone lithography chemistry",
        details: "Jones mastered greasy tusche printing on stone in Paris and brought this expertise to London."
      }
    },
    {
      id: "e_tech_curwen_lithography",
      from: "curwen_studio",
      to: "stone_lithography",
      type: "INFLUENCED_MATERIAL_TECHNIQUE",
      properties: {
        technique: "Commercial lithography press runs",
        details: "Curwen Studio was the leading workshop providing stone lithography facilities for modern painters."
      }
    },
    {
      id: "e_tech_anderson_line",
      from: "stanley_anderson",
      to: "line_engraving",
      type: "INFLUENCED_MATERIAL_TECHNIQUE",
      properties: {
        technique: "Direct copper line engraving",
        details: "Anderson championed line engraving, reviving it from commercial reproduction into fine art."
      }
    },
    {
      id: "e_tech_sutherland_line",
      from: "graham_sutherland",
      to: "line_engraving",
      type: "INFLUENCED_MATERIAL_TECHNIQUE",
      properties: {
        technique: "Acid-free burin engraving",
        details: "Sutherland studied burin incising under Anderson, building his signature romantic line precision."
      }
    },
    {
      id: "e_tech_drury_line",
      from: "paul_drury",
      to: "line_engraving",
      type: "INFLUENCED_MATERIAL_TECHNIQUE",
      properties: {
        technique: "Intaglio lines and plate proofing",
        details: "Drury practiced and taught line engraving, preserving classic burin methods at Goldsmiths."
      }
    },
    {
      id: "e_tech_goldsmiths_line",
      from: "goldsmiths_college",
      to: "line_engraving",
      type: "INFLUENCED_MATERIAL_TECHNIQUE",
      properties: {
        technique: "Line engraving pedagogy",
        details: "Goldsmiths was the primary college reviving direct, non-acid engraving as a fine art course."
      }
    },
    {
      id: "e_tech_ferry_lithography",
      from: "david_ferry",
      to: "stone_lithography",
      type: "INFLUENCED_MATERIAL_TECHNIQUE",
      properties: {
        technique: "Stone lithography and book design",
        details: "Ferry studied lithography under Jones, combining it with photographic collage elements."
      }
    },
    {
      id: "e_tech_ferry_acrylic",
      from: "david_ferry",
      to: "acrylic_engraving",
      type: "INFLUENCED_MATERIAL_TECHNIQUE",
      properties: {
        technique: "Synthetic print assemblages",
        details: "Ferry studied Perspex and collaged book printing under Sorel at Camberwell."
      }
    },
    {
      id: "e_tech_gibbs_relief",
      from: "evelyn_gibbs",
      to: "relief_printing",
      type: "INFLUENCED_MATERIAL_TECHNIQUE",
      properties: {
        technique: "Progressive relief printing",
        details: "Gibbs pioneered linocutting as an accessible creative medium for schools."
      }
    },
    {
      id: "e_tech_goldsmiths_relief",
      from: "goldsmiths_college",
      to: "relief_printing",
      type: "INFLUENCED_MATERIAL_TECHNIQUE",
      properties: {
        technique: "Teacher-training printmaking course",
        details: "Goldsmiths disseminated child relief printing throughout British school curricula."
      }
    },
    {
      id: "e_tech_morris_relief",
      from: "william_morris_artist",
      to: "relief_printing",
      type: "INFLUENCED_MATERIAL_TECHNIQUE",
      properties: {
        technique: "Hand-carved woodblock relief",
        details: "Morris revived woodblock relief cutting and hand-press book printing at the Kelmscott Press."
      }
    },
    {
      id: "e_work_cheese_camberwell",
      from: "bernard_cheese",
      to: "camberwell_school",
      type: "WORKED_AT",
      properties: {
        years: "1950–1968",
        details: "Taught lithography at Camberwell, establishing it as a key center for stone printing."
      }
    },
    {
      id: "e_tech_camberwell_acrylic",
      from: "camberwell_school",
      to: "acrylic_engraving",
      type: "INFLUENCED_MATERIAL_TECHNIQUE",
      properties: {
        technique: "Perspex Engraving Pedagogy",
        details: "Introduced by Sorel, who taught print assembly and synthetic engraving."
      }
    },
    {
      id: "e_tech_camberwell_viscosity",
      from: "camberwell_school",
      to: "viscosity_printing",
      type: "INFLUENCED_MATERIAL_TECHNIQUE",
      properties: {
        technique: "Viscosity Color Pedagogy",
        details: "Introduced by Sorel, bringing Atelier 17's chemical ink resistance systems to Camberwell."
      }
    },
    {
      id: "e_tech_camberwell_line",
      from: "camberwell_school",
      to: "line_engraving",
      type: "INFLUENCED_MATERIAL_TECHNIQUE",
      properties: {
        technique: "Burin Line Engraving Pedagogy",
        details: "Established by John Buckland Wright in 1948, passing on his Paris Atelier 17 copper engraving methodologies."
      }
    },
    {
      id: "e_tech_camberwell_relief",
      from: "camberwell_school",
      to: "relief_printing",
      type: "INFLUENCED_MATERIAL_TECHNIQUE",
      properties: {
        technique: "Experimental Relief and Linocuts",
        details: "Taught by Michael Rothenstein, who pioneered the use of found wood offcuts, fabrics, and photographic composites in relief prints."
      }
    },
    {
      id: "e_tech_camberwell_litho",
      from: "camberwell_school",
      to: "stone_lithography",
      type: "INFLUENCED_MATERIAL_TECHNIQUE",
      properties: {
        technique: "Stone Lithography Pedagogy",
        details: "Taught by Bernard Cheese (1950–1968) and Stanley Jones, focusing on auto-lithographic stone layers."
      }
    },
    {
      id: "e_tech_buckland_wright_line",
      from: "john_buckland_wright",
      to: "line_engraving",
      type: "INFLUENCED_MATERIAL_TECHNIQUE",
      properties: {
        technique: "Copper line engraving",
        details: "Wright taught copper burin engraving and wood engraving at Camberwell, writing 'Etching and Engraving: Techniques and the Modern Trend' in 1953."
      }
    },
    {
      id: "e_tech_rothenstein_relief",
      from: "michael_rothenstein",
      to: "relief_printing",
      type: "INFLUENCED_MATERIAL_TECHNIQUE",
      properties: {
        technique: "Found-object relief woodblocks",
        details: "Rothenstein championed incorporating found wood offcuts, plaster, and photo-screen elements in relief printing, publishing 'Frontiers of Printmaking' (1966)."
      }
    },
    {
      id: "e_tech_cheese_litho",
      from: "bernard_cheese",
      to: "stone_lithography",
      type: "INFLUENCED_MATERIAL_TECHNIQUE",
      properties: {
        technique: "Auto-lithography on stone",
        details: "Cheese taught and practiced auto-lithography on limestone, capturing post-war British scenes."
      }
    }
  ]
};
