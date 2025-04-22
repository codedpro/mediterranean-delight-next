export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  nutritionalInfo?: {
    calories: string;
    protein: string;
    carbs: string;
    fat: string;
    [key: string]: string;
  };
}

export const menuItems: MenuItem[] = [
  {
    id: "grilled-lamb-kebabs",
    name: "Grilled Lamb Kebabs",
    description: "Tender lamb marinated in Mediterranean spices, served with tzatziki sauce",
    price: 24.99,
    image: "/images/food/grilled-lamb-kebabs.jpeg",
    category: "Main Course",
    nutritionalInfo: {
      calories: "450",
      protein: "35g",
      carbs: "12g",
      fat: "28g",
    },
  },
  {
    id: "seafood-paella",
    name: "Seafood Paella",
    description: "Authentic Spanish-style paella with shrimp, mussels, and saffron rice",
    price: 28.99,
    image: "/images/food/seafood-paella.jpeg",
    category: "Main Course",
    nutritionalInfo: {
      calories: "520",
      protein: "32g",
      carbs: "45g",
      fat: "22g",
    },
  },
  {
    id: "falafel-platter",
    name: "Falafel Platter",
    description: "Handcrafted falafels served with hummus, pita, and tahini sauce",
    price: 18.99,
    image: "/images/food/falafel-platter.jpeg",
    category: "Main Course",
    nutritionalInfo: {
      calories: "380",
      protein: "15g",
      carbs: "42g",
      fat: "18g",
    },
  },
  {
    id: "chicken-shawarma",
    name: "Chicken Shawarma",
    description: "Marinated chicken with garlic sauce, pickles, and fresh vegetables",
    price: 16.99,
    image: "/images/food/chicken-shawarma.jpeg",
    category: "Main Course",
    nutritionalInfo: {
      calories: "420",
      protein: "38g",
      carbs: "25g",
      fat: "20g",
    },
  },
  {
    id: "moussaka",
    name: "Moussaka",
    description: "Layers of eggplant, minced meat, and béchamel sauce",
    price: 22.99,
    image: "/images/food/moussaka.jpeg",
    category: "Main Course",
    nutritionalInfo: {
      calories: "480",
      protein: "28g",
      carbs: "32g",
      fat: "30g",
    },
  },
  {
    id: "stuffed-bell-peppers",
    name: "Stuffed Bell Peppers",
    description: "Bell peppers filled with rice, herbs, and Mediterranean spices",
    price: 19.99,
    image: "/images/food/stuffed-bell-peppers.jpeg",
    category: "Main Course",
    nutritionalInfo: {
      calories: "350",
      protein: "12g",
      carbs: "45g",
      fat: "15g",
    },
  },
  {
    id: "grilled-sea-bass",
    name: "Grilled Sea Bass",
    description: "Fresh sea bass with lemon and herbs, served with seasonal vegetables",
    price: 29.99,
    image: "/images/food/grilled-sea-bass.jpeg",
    category: "Main Course",
    nutritionalInfo: {
      calories: "380",
      protein: "42g",
      carbs: "8g",
      fat: "22g",
    },
  },
  {
    id: "vegetable-tagine",
    name: "Vegetable Tagine",
    description: "Slow-cooked vegetables with Moroccan spices and couscous",
    price: 17.99,
    image: "/images/food/vegetable-tagine.jpeg",
    category: "Main Course",
    nutritionalInfo: {
      calories: "320",
      protein: "10g",
      carbs: "48g",
      fat: "12g",
    },
  },
  {
    id: "kunafa",
    name: "Kunafa",
    description: "Sweet cheese pastry soaked in sugar syrup",
    price: 8.99,
    image: "/images/food/kunafa.jpeg",
    category: "Dessert",
    nutritionalInfo: {
      calories: "380",
      protein: "8g",
      carbs: "52g",
      fat: "18g",
    },
  },
  {
    id: "halva",
    name: "Halva",
    description: "Traditional sesame-based dessert with pistachios",
    price: 6.99,
    image: "/images/food/halva.jpeg",
    category: "Dessert",
    nutritionalInfo: {
      calories: "280",
      protein: "6g",
      carbs: "32g",
      fat: "16g",
    },
  },
  {
    id: "orange-cake",
    name: "Orange Cake",
    description: "Moist orange cake with citrus glaze",
    price: 7.99,
    image: "/images/food/orange-cake.jpeg",
    category: "Dessert",
    nutritionalInfo: {
      calories: "320",
      protein: "4g",
      carbs: "45g",
      fat: "14g",
    },
  },
]; 