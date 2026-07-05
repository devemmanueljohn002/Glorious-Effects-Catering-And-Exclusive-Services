export const COURSES = [
  { name: "Beginner Catering", level: "Beginner", weeks: "4 weeks", price: 45000 },
  { name: "Professional Baking", level: "Intermediate", weeks: "6 weeks", price: 75000 },
  { name: "Cake Decoration Masterclass", level: "Advanced", weeks: "5 weeks", price: 95000 },
  { name: "Snacks & Small Chops", level: "Beginner", weeks: "3 weeks", price: 38000 },
  { name: "Drinks Preparation", level: "Beginner", weeks: "2 weeks", price: 28000 },
  { name: "Event Food Setup", level: "Intermediate", weeks: "4 weeks", price: 55000 },
] as const

export type ProductCategory = "Snacks" | "Meals" | "Drinks" | "Cakes" | "Events" | "Packages"
export type Product = {
  id: string
  name: string
  desc?: string
  price: number
  img: string
  tag: ProductCategory
  note?: string
}

export const PRODUCTS: Product[] = [
  // SNACKS & SMALL CHOPS
  { id: "meatpie", name: "Meat Pie", desc: "Golden flaky pastry stuffed with seasoned minced beef, potatoes & vegetables.", price: 1499, img: "/p-meatpie.jpg", tag: "Snacks", note: "Min order: 10" },
  { id: "chickenpie", name: "Chicken Pie", desc: "Soft buttery pastry filled with juicy shredded chicken and vegetable mix.", price: 1999, img: "/p-meatpie.jpg", tag: "Snacks", note: "Min order: 10" },
  { id: "fishroll", name: "Fish Roll", desc: "Crispy rolled pastry with spicy fish filling and signature seasoning.", price: 699, img: "/p-meatpie.jpg", tag: "Snacks", note: "Min order: 10" },
  { id: "sausageroll", name: "Sausage Roll", desc: "Premium sausage wrapped in soft buttery pastry with savory spices.", price: 699, img: "/p-meatpie.jpg", tag: "Snacks", note: "Min order: 10" },
  { id: "puffpuff", name: "Puff Puff (Pack of 20)", desc: "Soft fluffy Nigerian puff puff fried to golden perfection.", price: 1999, img: "/p-pastries.jpg", tag: "Snacks", note: "Min order: 10 packs" },
  { id: "chinchin", name: "Chin Chin (500g)", desc: "Crunchy sweet fried dough snack with rich milky flavor.", price: 1499, img: "/p-chinchin.jpg", tag: "Snacks" },
  { id: "springrolls", name: "Spring Rolls", desc: "Crunchy vegetable spring rolls with carrots, cabbage and spices.", price: 499, img: "/p-smallchops.jpg", tag: "Snacks", note: "Min order: 20" },
  { id: "samosa", name: "Samosa", desc: "Triangular crispy pastry filled with spicy minced meat and vegetables.", price: 499, img: "/p-smallchops.jpg", tag: "Snacks", note: "Min order: 20" },
  { id: "gizzard", name: "Peppered Gizzard (Bowl)", desc: "Tender spicy gizzard sautéed in rich pepper sauce.", price: 4999, img: "/p-smallchops.jpg", tag: "Snacks" },
  { id: "pepchicken", name: "Peppered Chicken (Bowl)", desc: "Juicy fried chicken tossed in flavorful spicy pepper sauce.", price: 5499, img: "/p-smallchops.jpg", tag: "Snacks" },
  { id: "sliders", name: "Burger Sliders", desc: "Mini gourmet burgers with beef patty, cheese and vegetables.", price: 1499, img: "/p-smallchops.jpg", tag: "Snacks" },
  { id: "hotdog", name: "Hot Dog", desc: "Soft hotdog bun with grilled sausage and signature sauces.", price: 1199, img: "/p-smallchops.jpg", tag: "Snacks" },
  { id: "shawarma", name: "Chicken Shawarma", desc: "Creamy chicken shawarma loaded with vegetables and signature sauce.", price: 3499, img: "/p-smallchops.jpg", tag: "Snacks", note: "From ₦3,499 – ₦9,999" },
  { id: "popcorn", name: "Popcorn (Cup)", desc: "Fresh buttery popcorn in caramel and salted flavors.", price: 999, img: "/p-pastries.jpg", tag: "Snacks" },
  { id: "donuts", name: "Glazed Donuts", desc: "Soft glazed donuts with assorted toppings.", price: 899, img: "/p-doughnut.jpg", tag: "Snacks", note: "Min order: 20" },
  { id: "cupcakes", name: "Cupcakes", desc: "Moist vanilla and chocolate cupcakes with creamy frosting.", price: 999, img: "/p-cookies.jpg", tag: "Snacks", note: "Min order: 20" },
  { id: "scotcheggs", name: "Scotch Eggs", desc: "Boiled eggs wrapped in sausage meat and coated in crispy crumbs.", price: 1999, img: "/p-smallchops.jpg", tag: "Snacks" },
  { id: "minipizza", name: "Mini Pizza", desc: "Freshly baked mini pizza topped with cheese, sausage and vegetables.", price: 8999, img: "/p-smallchops.jpg", tag: "Snacks" },
  { id: "yamfries", name: "Yam Fries (Bowl)", desc: "Crispy deep-fried yam sticks with spicy pepper dip.", price: 3599, img: "/p-smallchops.jpg", tag: "Snacks" },
  { id: "plantainchips", name: "Plantain Chips (Pack)", desc: "Crunchy sweet-and-salty plantain chips from ripe plantains.", price: 4499, img: "/p-chinchin.jpg", tag: "Snacks" },
  { id: "coconutcandy", name: "Coconut Candy (Pack)", desc: "Traditional coconut candy with rich caramelized sweetness.", price: 1999, img: "/p-chinchin.jpg", tag: "Snacks", note: "Min order: 5" },
  { id: "parfait", name: "Fruit Parfait (Cup)", desc: "Layered yogurt parfait with fresh fruits and crunchy granola.", price: 5999, img: "/p-smoothie.jpg", tag: "Snacks" },
  { id: "wings", name: "Chicken Wings (Pack)", desc: "Crispy spicy chicken wings glazed with barbecue sauce.", price: 4999, img: "/p-smallchops.jpg", tag: "Snacks" },
  { id: "pancakes", name: "Pancakes (Pack)", desc: "Soft fluffy pancakes served with syrup and fruit toppings.", price: 2199, img: "/p-pastries.jpg", tag: "Snacks", note: "Min order: 5" },
  { id: "cookies", name: "Butter Cookies (Pack)", desc: "Freshly baked butter cookies with crunchy edges and soft centers.", price: 2499, img: "/p-cookies.jpg", tag: "Snacks", note: "Min order: 5" },
  { id: "bananabread", name: "Banana Bread (Loaf)", desc: "Moist homemade banana bread with rich buttery flavor.", price: 3499, img: "/p-pastries.jpg", tag: "Snacks", note: "Min order: 2" },
  { id: "cheeseballs", name: "Cheese Balls (Pack)", desc: "Crispy cheese-filled snack balls — perfect for parties.", price: 2999, img: "/p-chinchin.jpg", tag: "Snacks" },
  { id: "icecream", name: "Ice Cream Cups", desc: "Creamy ice cream served in assorted flavors with toppings.", price: 1599, img: "/p-smoothie.jpg", tag: "Snacks", note: "Min order: 5" },
  { id: "cakeslice", name: "Cake Slice", desc: "Available in vanilla, red velvet and chocolate.", price: 2599, img: "/p-cake.jpg", tag: "Snacks", note: "Min order: 5" },
  { id: "smallchops", name: "Small Chops Platter", desc: "Luxury platter with samosa, spring rolls, puff puff, gizzard & peppered meat.", price: 15000, img: "/p-smallchops.jpg", tag: "Snacks", note: "Serves 10–15" },

  // FULL MEALS
  { id: "jollof", name: "Jollof Rice with Chicken", price: 5999, img: "/p-smallchops.jpg", tag: "Meals" },
  { id: "friedrice", name: "Fried Rice with Turkey", price: 5999, img: "/p-smallchops.jpg", tag: "Meals" },
  { id: "ofada", name: "Ofada Rice with Ayamase", price: 5999, img: "/p-smallchops.jpg", tag: "Meals" },
  { id: "whiterice", name: "White Rice & Stew", price: 4999, img: "/p-smallchops.jpg", tag: "Meals" },
  { id: "coconutrice", name: "Coconut Rice", price: 5999, img: "/p-smallchops.jpg", tag: "Meals" },
  { id: "nativerice", name: "Native Rice", price: 5999, img: "/p-smallchops.jpg", tag: "Meals" },
  { id: "chineserice", name: "Chinese Rice", price: 6999, img: "/p-smallchops.jpg", tag: "Meals" },
  { id: "spagjollof", name: "Spaghetti Jollof", price: 5999, img: "/p-smallchops.jpg", tag: "Meals" },
  { id: "stirfry", name: "Stir Fry Pasta", price: 5999, img: "/p-smallchops.jpg", tag: "Meals" },
  { id: "yamporridge", name: "Yam Porridge", price: 5899, img: "/p-smallchops.jpg", tag: "Meals" },
  { id: "beansplantain", name: "Beans & Plantain", price: 5399, img: "/p-smallchops.jpg", tag: "Meals" },
  { id: "poundedyam", name: "Pounded Yam & Egusi", price: 6999, img: "/p-smallchops.jpg", tag: "Meals" },
  { id: "amala", name: "Amala, Ewedu & Gbegiri", price: 5999, img: "/p-smallchops.jpg", tag: "Meals" },
  { id: "eba", name: "Eba & Okra Soup", price: 5999, img: "/p-smallchops.jpg", tag: "Meals" },
  { id: "semo", name: "Semovita & Ogbono", price: 6999, img: "/p-smallchops.jpg", tag: "Meals" },
  { id: "catfish", name: "Catfish Pepper Soup", price: 6999, img: "/p-smallchops.jpg", tag: "Meals" },
  { id: "goatpep", name: "Goat Meat Pepper Soup", price: 6999, img: "/p-smallchops.jpg", tag: "Meals" },
  { id: "asun", name: "Asun", price: 6999, img: "/p-smallchops.jpg", tag: "Meals" },
  { id: "grilledfish", name: "Grilled Fish with Sauce", price: 8999, img: "/p-smallchops.jpg", tag: "Meals" },
  { id: "nkwobi", name: "Nkwobi", price: 8599, img: "/p-smallchops.jpg", tag: "Meals" },

  // DRINKS
  { id: "chapman", name: "Chapman", price: 2599, img: "/p-drinks.jpg", tag: "Drinks" },
  { id: "zobo", name: "Zobo Drink", price: 1599, img: "/p-drinks.jpg", tag: "Drinks" },
  { id: "tigernut", name: "Tigernut Drink", price: 2999, img: "/p-drinks.jpg", tag: "Drinks" },
  { id: "orangejuice", name: "Fresh Orange Juice", price: 2599, img: "/p-smoothie.jpg", tag: "Drinks" },
  { id: "pineapple", name: "Pineapple Juice", price: 2599, img: "/p-smoothie.jpg", tag: "Drinks" },
  { id: "smoothies", name: "Smoothies", price: 3999, img: "/p-smoothie.jpg", tag: "Drinks" },
  { id: "milkshake", name: "Milkshake", price: 3599, img: "/p-smoothie.jpg", tag: "Drinks" },
  { id: "water", name: "Bottled Water", price: 499, img: "/p-drinks.jpg", tag: "Drinks" },
  { id: "softdrinks", name: "Soft Drinks", price: 899, img: "/p-drinks.jpg", tag: "Drinks" },
  { id: "energy", name: "Energy Drinks", price: 1499, img: "/p-drinks.jpg", tag: "Drinks" },
  { id: "mocktail", name: "Mocktails", price: 3599, img: "/p-drinks.jpg", tag: "Drinks" },
  { id: "cocktail", name: "Cocktail Drinks", price: 4999, img: "/p-drinks.jpg", tag: "Drinks" },
  { id: "fruitpunch", name: "Fruit Punch", price: 2999, img: "/p-smoothie.jpg", tag: "Drinks" },
  { id: "lemonade", name: "Lemonade", price: 2999, img: "/p-drinks.jpg", tag: "Drinks" },
  { id: "icetea", name: "Ice Tea", price: 1999, img: "/p-drinks.jpg", tag: "Drinks" },

  // CAKES & DESSERTS
  { id: "birthdaycake", name: "Birthday Cake", desc: "Custom designs for every celebration.", price: 23000, img: "/p-cake.jpg", tag: "Cakes", note: "Starting from" },
  { id: "weddingcake", name: "Wedding Cake", desc: "Multi-tier luxury wedding cakes.", price: 120000, img: "/p-cake.jpg", tag: "Cakes", note: "Starting from" },
  { id: "redvelvet", name: "Red Velvet Cake", desc: "Classic red velvet with cream cheese frosting.", price: 30000, img: "/p-cake.jpg", tag: "Cakes", note: "Starting from" },
  { id: "chocolatecake", name: "Chocolate Cake", desc: "Rich, moist Belgian chocolate cake.", price: 28000, img: "/p-cake.jpg", tag: "Cakes", note: "Starting from" },
  { id: "fruitcake", name: "Fruit Cake", desc: "Loaded with premium dried fruits and nuts.", price: 35000, img: "/p-cake.jpg", tag: "Cakes", note: "Starting from" },
  { id: "fondantcake", name: "Fondant Cake", desc: "Smooth fondant finish with custom decoration.", price: 45000, img: "/p-cake.jpg", tag: "Cakes", note: "Starting from" },
  { id: "buttercreamcake", name: "Buttercream Cake", desc: "Silky buttercream with elegant piping.", price: 25000, img: "/p-cake.jpg", tag: "Cakes", note: "Starting from" },
  { id: "anniversarycake", name: "Anniversary Cake", desc: "Bespoke cakes for milestone moments.", price: 30000, img: "/p-cake.jpg", tag: "Cakes", note: "Starting from" },
  { id: "kidscake", name: "Kids Character Cake", desc: "Themed cakes featuring your child's favourite character.", price: 40000, img: "/p-cake.jpg", tag: "Cakes", note: "Starting from" },
  { id: "graduationcake", name: "Graduation Cake", desc: "Celebrate academic milestones in style.", price: 35000, img: "/p-cake.jpg", tag: "Cakes", note: "Starting from" },
  { id: "tradweddingcake", name: "Traditional Wedding Cake", desc: "Cultural designs with luxurious detail.", price: 150000, img: "/p-cake.jpg", tag: "Cakes", note: "Starting from" },
  { id: "cheesecake", name: "Cheesecake", desc: "Rich, creamy New York–style cheesecake.", price: 35000, img: "/p-cake.jpg", tag: "Cakes" },
  { id: "brownies", name: "Brownies", desc: "Fudgy chocolate brownies with crackly tops.", price: 12000, img: "/p-cookies.jpg", tag: "Cakes" },
  { id: "dessertcups", name: "Dessert Cups", desc: "Layered dessert cups with cream and fruit.", price: 2000, img: "/p-smoothie.jpg", tag: "Cakes", note: "Min order: 10" },
  { id: "fruittart", name: "Fruit Tart", desc: "Buttery tart shell filled with custard and fresh fruit.", price: 15000, img: "/p-pastries.jpg", tag: "Cakes" },

  // EVENT CATERING SERVICES
  { id: "evt-wedding", name: "Wedding Catering", desc: "Full-service wedding catering with luxury presentation.", price: 450000, img: "/p-events.jpg", tag: "Events", note: "₦450K – ₦850K" },
  { id: "evt-birthday", name: "Birthday Catering", desc: "Memorable birthday food experiences for all ages.", price: 180000, img: "/p-events.jpg", tag: "Events", note: "₦180K – ₦450K" },
  { id: "evt-corporate", name: "Corporate Event Catering", desc: "Executive catering for offices and conferences.", price: 150000, img: "/p-events.jpg", tag: "Events", note: "₦150K – ₦500K" },
  { id: "evt-burial", name: "Burial Reception Catering", desc: "Dignified catering service for receptions.", price: 250000, img: "/p-events.jpg", tag: "Events", note: "₦250K – ₦600K" },
  { id: "evt-school", name: "School Event Catering", desc: "Catering for school programs and ceremonies.", price: 120000, img: "/p-events.jpg", tag: "Events", note: "₦120K – ₦350K" },
  { id: "evt-outdoor", name: "Outdoor Catering", desc: "Open-air event catering with full setup.", price: 500000, img: "/p-events.jpg", tag: "Events", note: "₦500K – ₦1.2M" },
  { id: "evt-cocktail", name: "Cocktail Party Service", desc: "Cocktails, mocktails, and signature small chops.", price: 180000, img: "/p-events.jpg", tag: "Events", note: "₦180K – ₦550K" },
  { id: "evt-anniversary", name: "Anniversary Catering", desc: "Romantic and elegant catering for anniversaries.", price: 200000, img: "/p-events.jpg", tag: "Events", note: "₦200K – ₦500K" },
  { id: "evt-graduation", name: "Graduation Party Catering", desc: "Celebrate achievements with premium food.", price: 150000, img: "/p-events.jpg", tag: "Events", note: "₦150K – ₦400K" },
  { id: "evt-tradwedding", name: "Traditional Wedding Catering", desc: "Cultural cuisine and full event coverage.", price: 500000, img: "/p-events.jpg", tag: "Events", note: "₦500K – ₦1.5M" },

  // SPECIAL PACKAGES
  { id: "pkg-silver", name: "Silver Catering Package", desc: "Basic meal service, small chops, soft drinks, standard presentation.", price: 250000, img: "/p-package.jpg", tag: "Packages", note: "Serves 50–120 · ₦250K – ₦500K" },
  { id: "pkg-gold", name: "Gold Catering Package", desc: "Premium meals, desserts, beverage service & event attendants.", price: 450000, img: "/p-package.jpg", tag: "Packages", note: "Serves 100–250 · ₦450K – ₦900K" },
  { id: "pkg-luxury", name: "Premium Luxury Package", desc: "Luxury buffet, VIP presentation, premium desserts, full team & décor.", price: 1800000, img: "/p-package.jpg", tag: "Packages", note: "Serves 300–800 · ₦1.8M – ₦3M+" },
  { id: "pkg-smallchops", name: "Small Chops Package", desc: "Samosa, spring rolls, puff puff, gizdodo, mini burgers & more.", price: 180000, img: "/p-package.jpg", tag: "Packages", note: "Serves 70–180 · ₦180K – ₦350K" },
  { id: "pkg-drinks", name: "Drinks & Cocktails Package", desc: "Mocktails, cocktails, Chapman station & beverage stand setup.", price: 200000, img: "/p-package.jpg", tag: "Packages", note: "Serves 80–250 · ₦200K – ₦450K" },
  { id: "pkg-wedding", name: "Wedding Reception Package", desc: "Full buffet, drinks, desserts, waiters, ushers & cake support.", price: 700000, img: "/p-package.jpg", tag: "Packages", note: "Serves 150–500 · ₦700K – ₦1.9M" },
  { id: "pkg-corp", name: "Corporate Lunch Package", desc: "Executive lunch packs, office meals, conference catering.", price: 220000, img: "/p-package.jpg", tag: "Packages", note: "Serves 40–180 · ₦220K – ₦500K" },
  { id: "pkg-birthday", name: "Birthday Combo Package", desc: "Party meals, small chops, drinks & dessert table.", price: 280000, img: "/p-package.jpg", tag: "Packages", note: "Serves 60–200 · ₦280K – ₦600K" },
  { id: "pkg-student", name: "Student Party Package", desc: "Budget-friendly meals, snacks & drinks for campus events.", price: 170000, img: "/p-package.jpg", tag: "Packages", note: "Serves 80–250 · ₦170K – ₦400K" },
  { id: "pkg-complete", name: "Complete Event Catering Package", desc: "Food, drinks, desserts, service team & luxury presentation.", price: 1000000, img: "/p-package.jpg", tag: "Packages", note: "Serves 250–1000+ · ₦1M – ₦3.5M+" },
]

export const PRODUCT_CATEGORIES: ReadonlyArray<"All" | ProductCategory> = [
  "All",
  "Snacks",
  "Meals",
  "Drinks",
  "Cakes",
  "Events",
  "Packages",
]

export function formatNaira(n: number) {
  return `₦${n.toLocaleString()}`
}

export type GalleryImage = { src: string; label: string; cat: "Cakes" | "Snacks" | "Events" | "Drinks" | "Training" }

export const GALLERY_IMAGES: GalleryImage[] = [
  { src: "/p-cake.jpg",        label: "Celebration Cakes",       cat: "Cakes"    },
  { src: "/p-smallchops.jpg",  label: "Small Chops Platter",     cat: "Snacks"   },
  { src: "/p-pastries.jpg",    label: "Fresh Pastries",          cat: "Snacks"   },
  { src: "/p-smoothie.jpg",    label: "Smoothies & Drinks",      cat: "Drinks"   },
  { src: "/p-doughnut.jpg",    label: "Glazed Doughnuts",        cat: "Snacks"   },
  { src: "/p-chinchin.jpg",    label: "Chin Chin & Cookies",     cat: "Snacks"   },
  { src: "/p-meatpie.jpg",     label: "Golden Meat Pies",        cat: "Snacks"   },
  { src: "/p-drinks.jpg",      label: "Drinks Station",          cat: "Drinks"   },
  { src: "/p-cookies.jpg",     label: "Butter Cookies",          cat: "Snacks"   },
  { src: "/hero-buffet.jpg",   label: "Wedding Reception Buffet",cat: "Events"   },
  { src: "/p-events.jpg",      label: "Event Catering Setup",    cat: "Events"   },
  { src: "/p-package.jpg",     label: "Premium Packages",        cat: "Events"   },
  { src: "/hero-geces.jpg",    label: "GECES Kitchen",           cat: "Training" },
  { src: "/geces-brand.jpg",   label: "Brand Showcase",          cat: "Training" },
]

export const GALLERY_PREVIEW_COUNT = 6

export const CONTACT = {
  whatsapp: "https://wa.link/ajjaml",
  facebook:
    "https://m.facebook.com/story.php?story_fbid=pfbid02zijKXwXEnnTweKRBjQXoF3qD3zoZzQZQuWjwSu3RWnN39riBqxBTp9bpdjxUzVV5l&id=100011073814591&mibextid=Nif5oz",
  tiktok: "https://www.tiktok.com/@gloriouseffects?_r=1&_t=ZS-96RemNelRZ3",
  instagram: "https://www.instagram.com/geces_official?igsh=MWt0dm12c2xpZDh6eg==",
  email: "myglorioueffects911@gmail.com",
  phone: "+234 903 320 0204",
  phoneHref: "tel:+2349033200204",
  address: "22/24 Idowu Street, Olodi-Apapa, Lagos",
}


// Add Vendor interface and data
export interface Vendor {
  id: string
  name: string
  slug: string
  description: string
  image: string
  rating: number
  location: string
  specialties: string[]
  products: string[] // Product IDs
}

// Define vendors
export const VENDORS: Vendor[] = [
  {
    id: "v1",
    name: "Ada's Catering Services",
    slug: "adas-catering",
    description: "Expert in traditional Nigerian cuisine and event catering",
    image: "/vendors/ada.jpg",
    rating: 4.9,
    location: "Lagos",
    specialties: ["Catering", "Small Chops", "Baking"],
    products: ["meatpie", "chickenpie", "fishroll", "sausageroll", "puffpuff", "chinchin", "springrolls", "samosa", "gizzard", "pepchicken", "sliders", "hotdog"]
  },
  {
    id: "v2",
    name: "Bello's Event Planners",
    slug: "bellos-events",
    description: "Luxury event planning and gourmet catering",
    image: "/vendors/bello.jpg",
    rating: 4.8,
    location: "Abuja",
    specialties: ["Events", "Wedding Cakes", "Catering"],
    products: ["evt-wedding", "evt-birthday", "evt-corporate", "evt-burial", "evt-school", "evt-outdoor", "evt-cocktail", "evt-anniversary", "evt-graduation", "evt-tradwedding"]
  },
  {
    id: "v3",
    name: "Chiamaka's Baking Studio",
    slug: "chiamakas-baking",
    description: "Specializing in custom cakes and pastries",
    image: "/vendors/chiamaka.jpg",
    rating: 4.9,
    location: "Port Harcourt",
    specialties: ["Baking", "Cake Decoration", "Pastries"],
    products: ["birthdaycake", "weddingcake", "redvelvet", "chocolatecake", "fruitcake", "fondantcake", "buttercreamcake", "anniversarycake", "kidscake", "graduationcake", "tradweddingcake", "cheesecake", "brownies", "dessertcups", "fruittart"]
  },
  {
    id: "v4",
    name: "Tunde's Kitchen & Drinks",
    slug: "tundes-kitchen",
    description: "Specialty meals, drinks and cocktail services",
    image: "/vendors/tunde.jpg",
    rating: 4.7,
    location: "Lagos",
    specialties: ["Meals", "Drinks", "Cocktails"],
    products: ["jollof", "friedrice", "ofada", "whiterice", "coconutrice", "nativerice", "chineserice", "spagjollof", "stirfry", "yamporridge", "beansplantain", "poundedyam", "amala", "eba", "semo", "catfish", "goatpep", "asun", "grilledfish", "nkwobi", "chapman", "zobo", "tigernut", "orangejuice", "pineapple", "smoothies", "milkshake", "water", "softdrinks", "energy", "mocktail", "cocktail", "fruitpunch", "lemonade", "icetea"]
  },
  {
    id: "v5",
    name: "GECES Premium Packages",
    slug: "geces-packages",
    description: "Complete event packages for every occasion",
    image: "/vendors/geces.jpg",
    rating: 4.9,
    location: "Lagos",
    specialties: ["Packages", "Events", "Full Service"],
    products: ["pkg-silver", "pkg-gold", "pkg-luxury", "pkg-smallchops", "pkg-drinks", "pkg-wedding", "pkg-corp", "pkg-birthday", "pkg-student", "pkg-complete"]
  }
]

// Helper functions
export function getVendorBySlug(slug: string) {
  return VENDORS.find(v => v.slug === slug)
}

export function getVendorById(id: string) {
  return VENDORS.find(v => v.id === id)
}

export function getProductsByVendor(vendorId: string) {
  const vendor = getVendorById(vendorId)
  if (!vendor) return []
  return PRODUCTS.filter(p => vendor.products.includes(p.id))
}

export function getVendorByProductId(productId: string) {
  return VENDORS.find(v => v.products.includes(productId))
}

export function getVendorName(vendorId: string) {
  const vendor = getVendorById(vendorId)
  return vendor ? vendor.name : "Unknown Vendor"
}