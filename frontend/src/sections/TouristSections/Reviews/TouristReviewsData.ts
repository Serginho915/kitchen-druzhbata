export interface Review {
  id: number;
  stars: number;
  author: string;
  text: string;
  source: string;
}

export const TOURIST_REVIEWS: Review[] = [
  {
    id: 1,
    stars: 5,
    author: "James Wilson",
    text: "Found this gem while visiting Sofia. Authentic Bulgarian food that feels home-cooked. The staff were very welcoming and explained the daily menu to us in English. Highly recommend for anyone looking for the real deal!",
    source: "Google",
  },
  {
    id: 2,
    stars: 5,
    author: "Elena Petrova",
    text: "Страхотно място! Храната е винаги прясна и много вкусна. Мусаката е точно както трябва да бъде. Идеално за туристи, които искат да опитат истинска българска кухня.",
    source: "Facebook",
  },
  {
    id: 3,
    stars: 5,
    author: "Markus Schmidt",
    text: "Great atmosphere and even better food. The Tarator was so refreshing on a hot day. It's a bit hidden away from the city centre but absolutely worth the trip for the authentic taste and local prices.",
    source: "Google",
  },
  {
    id: 4,
    stars: 5,
    author: "Sophie Laurent",
    text: "Une magnifique découverte. La cuisine est délicieuse et généreuse. On sent que c'est fait avec amour. Le personnel est adorable. Un incontournable à Sofia!",
    source: "Google",
  }
];
