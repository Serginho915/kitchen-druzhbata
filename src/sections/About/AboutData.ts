export interface Review {
  id: number;
  stars: number;
  author: string;
  text: string;
  source: string;
}

export const REVIEWS: Review[] = [
  {
    id: 1,
    stars: 5,
    author: "Иван Георгиев",
    text: "Храната е много вкусна и винаги прясна. Обслужването е на ниво!",
    source: "Google",
  },
  {
    id: 2,
    stars: 5,
    author: "Мария Николова",
    text: "Любимо място за обяд в Дружба. Супите са страхотни. Порциите са големи.",
    source: "Facebook",
  },
  {
    id: 3,
    stars: 5,
    author: "Петър Стоянов",
    text: "Бърза доставка и отлично качество. Препоръчвам горещо!",
    source: "Google",
  },
];
