import logo from "../../assets/logo.png";
import type { Category, MenuItem, RestaurantData } from "../../types/menu";

const C = "TND";
/** [name, description, ingredients separated by "|"] */
type T = [string, string, string];
const list = (s: string) => (s ? s.split("|") : undefined);

const cat = (id: string, name: string, ar: string, description?: string, arDesc?: string): Category =>
  ({ id, name, description, ar: { name: ar, description: arDesc } });

const baseCategories: Category[] = [
  cat("pizza", "Pizzas", "البيتزا", "Pâte étalée à la main, cuite au four à pierre.", "عجينة مفرودة يدويًا ومخبوزة في فرن حجري."),
  cat("pasta", "Pâtes", "الباستا", "Fraîches chaque matin.", "طازجة كل صباح."),
  cat("makloub", "Makloub ", "مقلوب ", "Fraîches chaque matin.", "طازجة كل صباح."),
  cat("baguette", "baguette farcie", " باقيت فارسي", "Fraîches chaque matin.", "طازجة كل صباح."),
  cat("sandwich", "Sandwich", "ساندويتش", "Fraîches chaque matin.", "طازجة كل صباح."),
  cat("chapati", "Chapati", "شاباتي", "Fraîches chaque matin.", "طازجة كل صباح."),

];

const i = (id: string, categoryId: string, price: number, fr: T, ar: T, allergens: string[] = [], extra: Partial<MenuItem> = {}): MenuItem => ({
  id, categoryId, price, currency: C, available: true,
  name: fr[0], description: fr[1], ingredients: list(fr[2]), allergens,
  ar: { name: ar[0], description: ar[1], ingredients: list(ar[2]) },
  ...extra,
});

const baseItems: MenuItem[] = [
  i("margherita", "pizza", 13,
    ["Margherita", "Tomate San Marzano, mozzarella fior di latte et basilic frais.", "Sauce tomate|Mozzarella|Basilic|Huile d'olive"],
    ["مارغريتا", "طماطم سان مارزانو وموزاريلا فيور دي لاتي وريحان طازج.", "صلصة طماطم|موزاريلا|ريحان|زيت زيتون"], ["gluten", "milk"], { featured: true }),
  i("margherita", "pizza", 24,
    ["Spéciale Souhail", "Notre signature : mozzarella, pepperoni de bœuf, poivrons rôtis, champignons et filet de miel pimenté.", "Mozzarella|Pepperoni de bœuf|Poivrons|Champignons|Miel pimenté"],
    ["سبيشال فادي", "توقيعنا: موزاريلا وببروني لحم بقري وفلفل مشوي وفطر وخيط من العسل الحار.", "موزاريلا|ببروني لحم بقري|فلفل|فطر|عسل حار"], ["gluten", "milk"], { featured: true }),
  i("quattro-formaggi", "pizza", 21,
    ["Quatre fromages", "Mozzarella, gorgonzola, parmesan et emmental sur base crème.", "Mozzarella|Gorgonzola|Parmesan|Emmental"],
    ["الأجبان الأربعة", "موزاريلا وغورغونزولا وبارميزان وإيمنتال على قاعدة بيضاء.", "موزاريلا|غورغونزولا|بارميزان|إيمنتال"], ["gluten", "milk"]),
  i("margherita", "pizza", 18.5,
    ["Thon et oignon", "Tomate, mozzarella, thon, oignon rouge et olives.", "Sauce tomate|Mozzarella|Thon|Oignon rouge|Olives"],
    ["تونة وبصل", "طماطم وموزاريلا وتونة وبصل أحمر وزيتون.", "صلصة طماطم|موزاريلا|تونة|بصل أحمر|زيتون"], ["gluten", "milk", "fish"]),
  i("margherita", "pizza", 17,
    ["Végétarienne", "Tomate, mozzarella, courgette, poivrons, champignons et olives.", "Sauce tomate|Mozzarella|Courgette|Poivrons|Champignons|Olives"],
    ["نباتية", "طماطم وموزاريلا وكوسة وفلفل وفطر وزيتون.", "صلصة طماطم|موزاريلا|كوسة|فلفل|فطر|زيتون"], ["gluten", "milk"]),
  
// ---- English layer (French and Arabic live above; any missing English text falls back to French)
  i("spaghetti", "pasta", 15.5,
    ["Spaghetti Thon", "Penne dans une sauce pimentée tomate et ail.", "Penne|Tomate|Ail|Piment|Persil"],
    ["بيني أرابياتا", "بيني بصلصة الطماطم والثوم الحارة.", "بيني|طماطم|ثوم|فلفل حار|بقدونس"], ["gluten"]),
     i("spaghetti", "pasta", 15.5,
    ["Spaghetti Escalope", "Penne dans une sauce pimentée tomate et ail.", "Penne|Tomate|Ail|Piment|Persil"],
    ["بيني أرابياتا", "بيني بصلصة الطماطم والثوم الحارة.", "بيني|طماطم|ثوم|فلفل حار|بقدونس"], ["gluten"]),
  i("lasagna", "pasta", 21,
    ["Lasagnes", "Couches de pâtes, ragù de bœuf, béchamel et mozzarella gratinées.", "Pâtes|Ragù de bœuf|Béchamel|Mozzarella"],
    ["لازانيا", "طبقات من العجين مع راغو اللحم والبشاميل والموزاريلا مخبوزة.", "عجين|راغو لحم بقري|بشاميل|موزاريلا"], ["gluten", "milk", "egg"], { available: false }),
  
    i("makloub", "makloub", 15.5,
    ["Escalope", "Penne dans une sauce pimentée tomate et ail.", "Penne|Tomate|Ail|Piment|Persil"],
    ["بيني أرابياتا", "بيني بصلصة الطماطم والثوم الحارة.", "بيني|طماطم|ثوم|فلفل حار|بقدونس"], ["gluten"]),
   i("makkloub", "makloub", 21,
    ["Thon", "Couches de pâtes, ragù de bœuf, béchamel et mozzarella gratinées.", "Pâtes|Ragù de bœuf|Béchamel|Mozzarella"],
    ["مقلوب", "طبقات من العجين مع راغو اللحم والبشاميل والموزاريلا مخبوزة.", "عجين|راغو لحم بقري|بشاميل|موزاريلا"], ["gluten", "milk", "egg"]),
    i("makloub", "makloub", 15.5,
    ["Chwarma", "Penne dans une sauce pimentée tomate et ail.", "Penne|Tomate|Ail|Piment|Persil"],
    ["بيني أرابياتا", "بيني بصلصة الطماطم والثوم الحارة.", "بيني|طماطم|ثوم|فلفل حار|بقدونس"], ["gluten"]),
     i("makloub", "makloub", 15.5,
    ["Corden Bleu", "Penne dans une sauce pimentée tomate et ail.", "Penne|Tomate|Ail|Piment|Persil"],
    ["بيني أرابياتا", "بيني بصلصة الطماطم والثوم الحارة.", "بيني|طماطم|ثوم|فلفل حار|بقدونس"], ["gluten"]),
    i("makloub", "makloub", 15.5,
    ["Jombon", "Penne dans une sauce pimentée tomate et ail.", "Penne|Tomate|Ail|Piment|Persil"],
    ["مقلوب", "بيني بصلصة الطماطم والثوم الحارة.", "بيني|طماطم|ثوم|فلفل حار|بقدونس"], ["gluten"]),

    i("baguette", "baguette", 15.5,
    ["Escalope", "Penne dans une sauce pimentée tomate et ail.", "Penne|Tomate|Ail|Piment|Persil"],
    ["باقيت فارسي", " بينيبصلصة الطماطم والثوم الحارة.", "بيني|طماطم|ثوم|فلفل حار|بقدونس"], ["gluten"]),
    i("baguette", "baguette", 15.5,
    ["Chawarma", "Penne dans une sauce pimentée tomate et ail.", "Penne|Tomate|Ail|Piment|Persil"],
    ["باقيت فارسي", "بيني بصلصة الطماطم والثوم الحارة.", "بيني|طماطم|ثوم|فلفل حار|بقدونس"], ["gluten"]),
     i("baguette", "baguette", 15.5,
    ["Special's Souhail", "Penne dans une sauce pimentée tomate et ail.", "Penne|Tomate|Ail|Piment|Persil"],
    ["باقيت فارسي", " بينيبصلصة الطماطم والثوم الحارة.", "بيني|طماطم|ثوم|فلفل حار|بقدونس"], ["gluten"]),
    
    
    
  ]

// ---- English layer (French and Arabic live above; any missing English text falls back to French)
const ENCAT: Record<string, [string, string?]> = {
  starters: ["Starters", "To share, or not."], salads: ["Salads"], pizza: ["Pizza", "Hand-stretched, baked in a stone oven."],
  pasta: ["Pasta", "Fresh every morning."], burgers: ["Burgers"], desserts: ["Desserts"],
  "hot-drinks": ["Hot drinks"], "cold-drinks": ["Cold drinks"],
};
const EN: Record<string, T> = {
  bruschetta: ["Bruschetta", "Grilled country bread, fresh tomato, basil and extra virgin olive oil.", "Bread|Tomato|Basil|Garlic|Olive oil"],
  "mozzarella-sticks": ["Mozzarella sticks", "Golden breaded mozzarella with a warm tomato dip.", "Mozzarella|Breadcrumbs|Tomato sauce"],
  "garlic-bread": ["Garlic bread", "Baked with garlic butter and parsley, finished with melted cheese.", "Bread|Garlic butter|Parsley|Cheese"],
  arancini: ["Arancini", "Crispy risotto balls filled with mozzarella and served with arrabbiata.", "Risotto rice|Mozzarella|Breadcrumbs|Arrabbiata sauce"],
  caesar: ["Chicken Caesar", "Romaine, grilled chicken, parmesan, croutons and Caesar dressing.", "Romaine|Chicken|Parmesan|Croutons|Caesar dressing"],
  caprese: ["Caprese", "Sliced tomato, fresh mozzarella, basil and olive oil.", "Tomato|Mozzarella|Basil|Olive oil"],
  "tuna-salad": ["Tuna salad", "Tuna, mixed greens, sweet corn, olives, egg and lemon vinaigrette.", "Tuna|Lettuce|Corn|Olives|Egg"],
  margherita: ["Margherita", "San Marzano tomato, fior di latte mozzarella and fresh basil.", "Tomato sauce|Mozzarella|Basil|Olive oil"],
  "fadi-special": ["Fadi's Special", "Our signature: mozzarella, beef pepperoni, roasted peppers, mushrooms and a drizzle of hot honey.", "Mozzarella|Beef pepperoni|Peppers|Mushrooms|Hot honey"],
  "quattro-formaggi": ["Quattro Formaggi", "Mozzarella, gorgonzola, parmesan and emmental on a white base.", "Mozzarella|Gorgonzola|Parmesan|Emmental"],
  diavola: ["Diavola", "Tomato, mozzarella, spicy salami and chili oil.", "Tomato sauce|Mozzarella|Spicy salami|Chili oil"],
  tonno: ["Tuna & Onion", "Tomato, mozzarella, tuna, red onion and olives.", "Tomato sauce|Mozzarella|Tuna|Red onion|Olives"],
  vegetariana: ["Vegetariana", "Tomato, mozzarella, zucchini, peppers, mushrooms and olives.", "Tomato sauce|Mozzarella|Zucchini|Peppers|Mushrooms|Olives"],
  calzone: ["Calzone", "Folded pizza filled with ricotta, mozzarella, ham and mushrooms.", "Ricotta|Mozzarella|Ham|Mushrooms|Tomato sauce"],
  carbonara: ["Carbonara", "Spaghetti, egg yolk, pecorino and crispy beef bacon.", "Spaghetti|Egg yolk|Pecorino|Beef bacon|Black pepper"],
  bolognese: ["Bolognese", "Tagliatelle with a slow-cooked beef ragù.", "Tagliatelle|Beef|Tomato|Carrot|Celery"],
  "penne-arrabbiata": ["Penne Arrabbiata", "Penne in a spicy tomato and garlic sauce.", "Penne|Tomato|Garlic|Chili|Parsley"],
  alfredo: ["Chicken Alfredo", "Fettuccine, grilled chicken and a creamy parmesan sauce.", "Fettuccine|Chicken|Cream|Parmesan"],
  lasagna: ["Lasagna", "Baked layers of pasta, beef ragù, béchamel and mozzarella.", "Pasta sheets|Beef ragù|Béchamel|Mozzarella"],
  "classic-burger": ["Classic Burger", "Beef patty, cheddar, lettuce, tomato, pickles and house sauce in a brioche bun.", "Beef patty|Cheddar|Lettuce|Tomato|Pickles|Brioche bun"],
  "mama-burger": ["Mama's Double", "Two beef patties, double cheddar, caramelized onions and smoky sauce.", "2 beef patties|Cheddar|Caramelized onion|Smoky sauce|Brioche bun"],
  "chicken-burger": ["Crispy Chicken Burger", "Crispy chicken fillet, coleslaw, lettuce and garlic mayo.", "Crispy chicken|Coleslaw|Lettuce|Garlic mayo|Brioche bun"],
  "nutella-pizza": ["Nutella Pizza", "Warm dough with Nutella, banana and crushed hazelnuts.", "Dough|Nutella|Banana|Hazelnuts"],
};

const categories: Category[] = baseCategories.map((c) => {
  const e = ENCAT[c.id];
  return e ? { ...c, en: { name: e[0], description: e[1] } } : c;
});
const items: MenuItem[] = baseItems.map((it) => {
  const e = EN[it.id];
  return e ? { ...it, en: { name: e[0], description: e[1], ingredients: list(e[2]) } } : it;
});

const data: RestaurantData = {
  restaurant: {
    slug: "mama-mia",
    name: "Mama Mia by Souhail",
    tagline: "Pizza, pâtes et burgers",
    description: "Une cuisine italienne généreuse, préparée chaque jour, de notre four à pierre jusqu'à votre table.",
    ar: { tagline: "بيتزا وباستا وبرغر", description: "مطبخ إيطالي سخي يُحضَّر يوميًا من فرننا الحجري إلى طاولتكم." },
    logo,
    logoBackground: "#FAF2DF",
    en: { tagline: "Pizza, pasta and burgers", description: "Generous Italian comfort food made fresh every day, from our stone oven to your table." },
    phone: "+216 50 983 500",
    tiktok: "https://www.tiktok.com/@fadifadibouslimisingle",
    instagram:"https://www.instagram.com/bouslimi_souhail/",
    founder: "Souhail Bouslimi",
    poweredBy: "Pizziola TN",
  },
  theme: {
    primary: "#FFC20E", secondary: "#FFE08A", background: "#0A0A0A", surface: "#171717",
    text: "#FFF9E6", muted: "#A8A29A", onPrimary: "#0A0A0A", radius: "md",
    fontHeading: "'Bricolage Grotesque Variable', system-ui, sans-serif",
    fontBody: "'Inter Variable', system-ui, sans-serif",
  },
  categories,
  items,
};

export default data;
