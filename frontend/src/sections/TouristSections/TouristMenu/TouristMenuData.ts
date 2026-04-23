export interface Dish {
  id: number;
  title: string;
  weight: string;
  description: string;
  price: number;
  image?: string;
  isHot?: boolean;
}

export const TouristMenuData: Dish[] = [
  {
    id: 101,
    title: "Shopska Salad",
    weight: "350g",
    description: "The most famous Bulgarian salad. Fresh tomatoes, cucumbers, peppers, onions, and plenty of grated Bulgarian white brine cheese (sirene).",
    price: 4.50,
  },
  {
    id: 102,
    title: "Tarator",
    weight: "300g",
    description: "A cold soup made of yogurt, cucumbers, garlic, chopped dill, and walnuts. Refreshing and healthy.",
    price: 3.50,
  },
  {
    id: 103,
    title: "Musaka",
    weight: "400g",
    description: "A national favorite. Layers of diced potatoes and minced meat, topped with a thick yogurt-based glaze and baked to perfection.",
    price: 6.50,
    isHot: true,
  },
  {
    id: 104,
    title: "Kavarma",
    weight: "350g",
    description: "Slow-cooked pork or chicken with plenty of onions, mushrooms, and peppers in a traditional clay pot.",
    price: 7.50,
    isHot: true,
  },
  {
    id: 105,
    title: "Sarmi (Stuffed Cabbage)",
    weight: "300g",
    description: "Cabbage leaves stuffed with a mixture of rice, minced meat, and traditional Bulgarian spices.",
    price: 5.50,
    isHot: true,
  },
  {
    id: 106,
    title: "Fried Meatballs (Kyufte)",
    weight: "300g",
    description: "Grilled or fried spiced minced meat patties. A staple of Bulgarian street food and home cooking.",
    price: 6.00,
    isHot: true,
  }
];
