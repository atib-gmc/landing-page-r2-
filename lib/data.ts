export interface ProjectImage {
    url: string;
    fileId: string;
}

export interface Project {
    id: string;             // UUID
    created_at: string;     // ISO 8601 string
    title: string;
    content: string;        // HTML string
    images_urls: ProjectImage[];
    slug: string;
    hero: ProjectImage;
    date: string;           // YYYY-MM-DD
    scope_of_work: string;
    category_id: string;    // UUID reference
    credit: string;
    tags: string[];
}
export interface Category {
    id: string;          // UUID
    created_at: string;  // ISO 8601 string
    name: string;        // Nama kategori (contoh: "Furniture")
}

const data = [
    {
        "id": "1a2b3c4d-5e6f-7g8h-9i0j-k1l2m3n4o5p6",
        "created_at": "2026-02-24T10:00:00.000000+00:00",
        "title": "Modern Minimalist Villa",
        "content": "<p>A high-end villa project focusing on clean lines and natural light.</p>",
        "images_urls": [
            {
                "url": "https://pub-d7a73e6000ba49538bb3449e97697686.r2.dev/dummy-1.jpg",
                "fileId": "dummy-1.jpg"
            }
        ],
        "slug": "modern-minimalist-villa",
        "hero": {
            "url": "https://pub-d7a73e6000ba49538bb3449e97697686.r2.dev/hero-1.jpg",
            "fileId": "hero-1.jpg"
        },
        "date": "2026-01-15",
        "scope_of_work": "Architectural Design",
        "category_id": "bb89df73-3cb2-4f9b-8d3f-da5d58cab7f8",
        "credit": "admin",
        "tags": ["architecture", "minimalist"]
    },
    {
        "id": "2b3c4d5e-6f7g-8h9i-0j1k-l2m3n4o5p6q7",
        "created_at": "2026-02-24T11:15:00.000000+00:00",
        "title": "Industrial Coffee Shop",
        "content": "<p>Converting an old warehouse into a cozy industrial-themed cafe.</p>",
        "images_urls": [
            {
                "url": "https://pub-d7a73e6000ba49538bb3449e97697686.r2.dev/dummy-2.jpg",
                "fileId": "dummy-2.jpg"
            }
        ],
        "slug": "industrial-coffee-shop",
        "hero": {
            "url": "https://pub-d7a73e6000ba49538bb3449e97697686.r2.dev/hero-2.jpg",
            "fileId": "hero-2.jpg"
        },
        "date": "2026-01-20",
        "scope_of_work": "Interior Design",
        "category_id": "bb89df73-3cb2-4f9b-8d3f-da5d58cab7f8",
        "credit": "admin",
        "tags": ["interior", "commercial"]
    },
    {
        "id": "3c4d5e6f-7g8h-9i0j-1k2l-m3n4o5p6q7r8",
        "created_at": "2026-02-24T12:30:00.000000+00:00",
        "title": "Eco-Friendly Branding",
        "content": "<p>Sustainable brand identity for an organic skincare line.</p>",
        "images_urls": [],
        "slug": "eco-friendly-branding",
        "hero": {
            "url": "https://pub-d7a73e6000ba49538bb3449e97697686.r2.dev/hero-3.jpg",
            "fileId": "hero-3.jpg"
        },
        "date": "2026-02-01",
        "scope_of_work": "Branding",
        "category_id": "cc78ef42-2ba1-4e8a-7c2d-ea4c47bba6e7",
        "credit": "editor",
        "tags": ["branding", "graphic-design"]
    },
    {
        "id": "4d5e6f7g-8h9i-0j1k-2l3m-n4o5p6q7r8s9",
        "created_at": "2026-02-24T14:00:00.000000+00:00",
        "title": "Luxury Apartment Unit",
        "content": "<p>Penthouse renovation with marble finishes and custom furniture.</p>",
        "images_urls": [],
        "slug": "luxury-apartment-unit",
        "hero": {
            "url": "https://pub-d7a73e6000ba49538bb3449e97697686.r2.dev/hero-4.jpg",
            "fileId": "hero-4.jpg"
        },
        "date": "2026-02-10",
        "scope_of_work": "Full Renovation",
        "category_id": "bb89df73-3cb2-4f9b-8d3f-da5d58cab7f8",
        "credit": "admin",
        "tags": ["luxury", "interior"]
    },
    {
        "id": "5e6f7g8h-9i0j-1k2l-3m4n-o5p6q7r8s9t0",
        "created_at": "2026-02-24T15:00:00.000000+00:00",
        "title": "Tech Startup Office",
        "content": "<p>Modern open-space office design for a fintech company.</p>",
        "images_urls": [],
        "slug": "tech-startup-office",
        "hero": {
            "url": "https://pub-d7a73e6000ba49538bb3449e97697686.r2.dev/hero-5.jpg",
            "fileId": "hero-5.jpg"
        },
        "date": "2026-02-15",
        "scope_of_work": "Space Planning",
        "category_id": "bb89df73-3cb2-4f9b-8d3f-da5d58cab7f8",
        "credit": "admin",
        "tags": ["office", "modern"]
    },
    {
        "id": "6f7g8h9i-0j1k-2l3m-4n5o-p6q7r8s9t0u1",
        "created_at": "2026-02-24T16:20:00.000000+00:00",
        "title": "Zen Garden Residence",
        "content": "<p>Landscape design integrating Japanese zen philosophy.</p>",
        "images_urls": [],
        "slug": "zen-garden-residence",
        "hero": {
            "url": "https://pub-d7a73e6000ba49538bb3449e97697686.r2.dev/hero-6.jpg",
            "fileId": "hero-6.jpg"
        },
        "date": "2026-02-18",
        "scope_of_work": "Landscape Design",
        "category_id": "bb89df73-3cb2-4f9b-8d3f-da5d58cab7f8",
        "credit": "admin",
        "tags": ["landscape", "exterior"]
    },
    {
        "id": "7g8h9i0j-1k2l-3m4n-5o6p-q7r8s9t0u1v2",
        "created_at": "2026-02-24T17:45:00.000000+00:00",
        "title": "Art Gallery Lighting",
        "content": "<p>Specialized lighting installation for a contemporary art space.</p>",
        "images_urls": [],
        "slug": "art-gallery-lighting",
        "hero": {
            "url": "https://pub-d7a73e6000ba49538bb3449e97697686.r2.dev/hero-7.jpg",
            "fileId": "hero-7.jpg"
        },
        "date": "2026-02-20",
        "scope_of_work": "Lighting Design",
        "category_id": "bb89df73-3cb2-4f9b-8d3f-da5d58cab7f8",
        "credit": "admin",
        "tags": ["art", "lighting"]
    },
    {
        "id": "8h9i0j1k-2l3m-4n5o-6p7q-r8s9t0u1v2w3",
        "created_at": "2026-02-24T18:00:00.000000+00:00",
        "title": "Skincare Packaging Design",
        "content": "<p>Elegant and recyclable packaging for luxury cosmetics.</p>",
        "images_urls": [],
        "slug": "skincare-packaging-design",
        "hero": {
            "url": "https://pub-d7a73e6000ba49538bb3449e97697686.r2.dev/hero-8.jpg",
            "fileId": "hero-8.jpg"
        },
        "date": "2026-02-22",
        "scope_of_work": "Packaging Design",
        "category_id": "cc78ef42-2ba1-4e8a-7c2d-ea4c47bba6e7",
        "credit": "editor",
        "tags": ["packaging", "branding"]
    },
    {
        "id": "9i0j1k2l-3m4n-5o6p-7q8r-s9t0u1v2w3x4",
        "created_at": "2026-02-24T19:10:00.000000+00:00",
        "title": "Nordic Bedroom Interior",
        "content": "<p>Creating a peaceful sleep environment with Scandinavian influences.</p>",
        "images_urls": [],
        "slug": "nordic-bedroom-interior",
        "hero": {
            "url": "https://pub-d7a73e6000ba49538bb3449e97697686.r2.dev/hero-9.jpg",
            "fileId": "hero-9.jpg"
        },
        "date": "2026-02-23",
        "scope_of_work": "Interior Styling",
        "category_id": "bb89df73-3cb2-4f9b-8d3f-da5d58cab7f8",
        "credit": "admin",
        "tags": ["nordic", "interior"]
    },
    {
        "id": "0j1k2l3m-4n5o-6p7q-8r9s-t0u1v2w3x4y5",
        "created_at": "2026-02-24T20:30:00.000000+00:00",
        "title": "Urban Loft Renovation",
        "content": "<p>A rustic yet modern loft renovation in the city center.</p>",
        "images_urls": [],
        "slug": "urban-loft-renovation",
        "hero": {
            "url": "https://pub-d7a73e6000ba49538bb3449e97697686.r2.dev/hero-10.jpg",
            "fileId": "hero-10.jpg"
        },
        "date": "2026-02-24",
        "scope_of_work": "Full Renovation",
        "category_id": "bb89df73-3cb2-4f9b-8d3f-da5d58cab7f8",
        "credit": "admin",
        "tags": ["loft", "urban"]
    },
    {
        "id": "1k2l3m4n-5o6p-7q8r-9s0t-u1v2w3x4y5z6",
        "created_at": "2026-02-24T21:00:00.000000+00:00",
        "title": "Boutique Hotel Lobby",
        "content": "<p>Reception and lounge area design for a boutique hotel chain.</p>",
        "images_urls": [],
        "slug": "boutique-hotel-lobby",
        "hero": {
            "url": "https://pub-d7a73e6000ba49538bb3449e97697686.r2.dev/hero-11.jpg",
            "fileId": "hero-11.jpg"
        },
        "date": "2026-02-25",
        "scope_of_work": "Interior Design",
        "category_id": "bb89df73-3cb2-4f9b-8d3f-da5d58cab7f8",
        "credit": "admin",
        "tags": ["hotel", "commercial"]
    },
    {
        "id": "2l3m4n5o-6p7q-8r9s-0t1u-v2w3x4y5z6a7",
        "created_at": "2026-02-25T08:00:00.000000+00:00",
        "title": "Creative Studio Workspace",
        "content": "<p>Dynamic and flexible workspace for a creative agency.</p>",
        "images_urls": [],
        "slug": "creative-studio-workspace",
        "hero": {
            "url": "https://pub-d7a73e6000ba49538bb3449e97697686.r2.dev/hero-12.jpg",
            "fileId": "hero-12.jpg"
        },
        "date": "2026-02-26",
        "scope_of_work": "Interior Design",
        "category_id": "bb89df73-3cb2-4f9b-8d3f-da5d58cab7f8",
        "credit": "admin",
        "tags": ["studio", "office"]
    },
    {
        "id": "3m4n5o6p-7q8r-9s0t-1u2v-w3x4y5z6a7b8",
        "created_at": "2026-02-25T09:30:00.000000+00:00",
        "title": "Organic Food Rebrand",
        "content": "<p>Visual identity and logo design for local organic farmers.</p>",
        "images_urls": [],
        "slug": "organic-food-rebrand",
        "hero": {
            "url": "https://pub-d7a73e6000ba49538bb3449e97697686.r2.dev/hero-13.jpg",
            "fileId": "hero-13.jpg"
        },
        "date": "2026-02-27",
        "scope_of_work": "Branding",
        "category_id": "cc78ef42-2ba1-4e8a-7c2d-ea4c47bba6e7",
        "credit": "admin",
        "tags": ["organic", "logo"]
    },
    {
        "id": "4n5o6p7q-8r9s-0t1u-2v3w-x4y5z6a7b8c9",
        "created_at": "2026-02-25T10:45:00.000000+00:00",
        "title": "Contemporary Art Museum",
        "content": "<p>Full conceptual design for a provincial art museum.</p>",
        "images_urls": [],
        "slug": "contemporary-art-museum",
        "hero": {
            "url": "https://pub-d7a73e6000ba49538bb3449e97697686.r2.dev/hero-14.jpg",
            "fileId": "hero-14.jpg"
        },
        "date": "2026-02-28",
        "scope_of_work": "Architectural Design",
        "category_id": "bb89df73-3cb2-4f9b-8d3f-da5d58cab7f8",
        "credit": "admin",
        "tags": ["museum", "public"]
    },
    {
        "id": "5o6p7q8r-9s0t-1u2v-3w4x-y5z6a7b8c9d0",
        "created_at": "2026-02-25T12:00:00.000000+00:00",
        "title": "Beachfront Lounge Design",
        "content": "<p>Outdoor lounge area for a 5-star resort in Bali.</p>",
        "images_urls": [],
        "slug": "beachfront-lounge-design",
        "hero": {
            "url": "https://pub-d7a73e6000ba49538bb3449e97697686.r2.dev/hero-15.jpg",
            "fileId": "hero-15.jpg"
        },
        "date": "2026-03-01",
        "scope_of_work": "Outdoor Styling",
        "category_id": "bb89df73-3cb2-4f9b-8d3f-da5d58cab7f8",
        "credit": "admin",
        "tags": ["resort", "exterior"]
    },
    {
        "id": "6p7q8r9s-0t1u-2v3w-4x5y-z6a7b8c9d0e1",
        "created_at": "2026-02-25T14:15:00.000000+00:00",
        "title": "Smart Home Integration",
        "content": "<p>Full automation setup and architectural planning for a smart house.</p>",
        "images_urls": [],
        "slug": "smart-home-integration",
        "hero": {
            "url": "https://pub-d7a73e6000ba49538bb3449e97697686.r2.dev/hero-16.jpg",
            "fileId": "hero-16.jpg"
        },
        "date": "2026-03-05",
        "scope_of_work": "Technical Design",
        "category_id": "bb89df73-3cb2-4f9b-8d3f-da5d58cab7f8",
        "credit": "admin",
        "tags": ["tech", "residential"]
    },
    {
        "id": "7q8r9s0t-1u2v-3w4x-5y6z-a7b8c9d0e1f2",
        "created_at": "2026-02-25T15:45:00.000000+00:00",
        "title": "Rustic Mountain Cabin",
        "content": "<p>Wood-focused interior design for a getaway cabin.</p>",
        "images_urls": [],
        "slug": "rustic-mountain-cabin",
        "hero": {
            "url": "https://pub-d7a73e6000ba49538bb3449e97697686.r2.dev/hero-17.jpg",
            "fileId": "hero-17.jpg"
        },
        "date": "2026-03-10",
        "scope_of_work": "Interior Design",
        "category_id": "bb89df73-3cb2-4f9b-8d3f-da5d58cab7f8",
        "credit": "admin",
        "tags": ["rustic", "cabin"]
    },
    {
        "id": "8r9s0t1u-2v3w-4x5y-6z7a-b8c9d0e1f2g3",
        "created_at": "2026-02-25T16:30:00.000000+00:00",
        "title": "Minimalist Jewelry Shop",
        "content": "<p>A jewelry store with focus on lighting and display minimalism.</p>",
        "images_urls": [],
        "slug": "minimalist-jewelry-shop",
        "hero": {
            "url": "https://pub-d7a73e6000ba49538bb3449e97697686.r2.dev/hero-18.jpg",
            "fileId": "hero-18.jpg"
        },
        "date": "2026-03-12",
        "scope_of_work": "Commercial Design",
        "category_id": "bb89df73-3cb2-4f9b-8d3f-da5d58cab7f8",
        "credit": "admin",
        "tags": ["commercial", "retail"]
    },
    {
        "id": "9s0t1u2v-3w4x-5y6z-7a8b-c9d0e1f2g3h4",
        "created_at": "2026-02-25T17:15:00.000000+00:00",
        "title": "Library Social Space",
        "content": "<p>Redesigning a public library to include social co-working spaces.</p>",
        "images_urls": [],
        "slug": "library-social-space",
        "hero": {
            "url": "https://pub-d7a73e6000ba49538bb3449e97697686.r2.dev/hero-19.jpg",
            "fileId": "hero-19.jpg"
        },
        "date": "2026-03-15",
        "scope_of_work": "Public Interior",
        "category_id": "bb89df73-3cb2-4f9b-8d3f-da5d58cab7f8",
        "credit": "admin",
        "tags": ["public", "coworking"]
    },
    {
        "id": "0t1u2v3w-4x5y-6z7a-8b9c-d0e1f2g3h4i5",
        "created_at": "2026-02-25T18:00:00.000000+00:00",
        "title": "Fitness Center Rebrand",
        "content": "<p>Energetic and modern visual identity for a local gym.</p>",
        "images_urls": [],
        "slug": "fitness-center-rebrand",
        "hero": {
            "url": "https://pub-d7a73e6000ba49538bb3449e97697686.r2.dev/hero-20.jpg",
            "fileId": "hero-20.jpg"
        },
        "date": "2026-03-20",
        "scope_of_work": "Branding",
        "category_id": "cc78ef42-2ba1-4e8a-7c2d-ea4c47bba6e7",
        "credit": "admin",
        "tags": ["fitness", "branding"]
    }
]

export default data