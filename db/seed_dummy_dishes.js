require('dotenv').config()

const db = require('./index.js')

const sql = `
  INSERT INTO
    dishes
  (title, image_url, description)
    VALUES
  ($1, $2, $3);
`

const items = [
  {
    "title": "Chicken Tikka Masala",
    "description": "Creamy and flavorful Indian chicken dish with a tomato-based sauce."
  },
  {
    "title": "Caesar Salad",
    "description": "Fresh romaine lettuce, croutons, Parmesan cheese, and Caesar dressing."
  },
  {
    "title": "Beef Stroganoff",
    "description": "Tender beef strips cooked in a creamy mushroom sauce, served over rice or noodles."
  },
  {
    "title": "Sushi Platter",
    "description": "Assortment of fresh raw fish, rice, and vegetables, served with soy sauce and wasabi."
  },
  {
    "title": "Spaghetti Carbonara",
    "description": "Classic Italian pasta dish with creamy sauce, pancetta, and Parmesan cheese."
  },
  {
    "title": "Pad Thai",
    "description": "Traditional Thai stir-fried noodles with tofu, shrimp, peanuts, and tamarind sauce."
  },
  {
    "title": "Margherita Pizza",
    "description": "Simple yet delicious pizza topped with tomato sauce, mozzarella cheese, and fresh basil leaves."
  },
  {
    "title": "Hamburger",
    "description": "Juicy beef patty served in a bun with lettuce, tomato, onion, and condiments."
  },
  {
    "title": "Tiramisu",
    "description": "Classic Italian dessert made with layers of coffee-soaked ladyfingers and mascarpone cheese."
  },
  {
    "title": "Miso Soup",
    "description": "Traditional Japanese soup made with dashi stock, tofu, seaweed, and green onions."
  }
]

for (let item of items) {
  db.query(sql, [item.title, 'https://fakeimg.pl/600x600', item.description], (err, result) => {
    if (err) console.log(err)
  })
}

