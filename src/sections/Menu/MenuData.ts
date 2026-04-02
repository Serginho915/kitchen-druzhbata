import SaladIcon from "@/assets/images/dishesCategories/Salad.svg";
import SoupIcon from "@/assets/images/dishesCategories/Soup.svg";
import ColdDishesIcon from "@/assets/images/dishesCategories/pepperHot.svg";
import MainDishIcon from "@/assets/images/dishesCategories/MainDish.svg";
import MeatFishIcon from "@/assets/images/dishesCategories/MeatFish.svg";
import SideIcon from "@/assets/images/dishesCategories/Side.svg";
import DessertIcon from "@/assets/images/dishesCategories/Dessert.svg";
import HotSalesIcon from "@/assets/images/dishesCategories/HotSales.svg";

export interface Dish {
  id: number;
  title: string;
  weight: string;
  description: string;
  price: number;
  image?: string;
  isHot?: boolean;
}

export interface Category {
  id: string;
  title: string;
  icon: any;
  dishes: Dish[];
}

export const MenuData: Category[] = [
  {
    id: "favorites",
    title: "Любими Предложения",
    icon: HotSalesIcon,
    dishes: [
      {
        id: 101,
        title: "Салата от кисело зеле",
        weight: "120 г",
        description: "Традиционна салата от кисело зеле с олио и червен пипер.",
        price: 1.50,
      },
      {
        id: 102,
        title: "Борш",
        weight: "300 г",
        description: "Богата зеленчукова супа с цвекло, месо и сметана.",
        price: 2.50,
      },
      {
        id: 103,
        title: "Лазаня",
        weight: "350 г",
        description: "Италианска класика с телешка кайма и сос Бешамел.",
        price: 4.50,
        isHot: true,
      },
    ],
  },
  {
    id: "salads",
    title: "Салати",
    icon: SaladIcon,
    dishes: [
      { id: 1, title: "Зелева салата", weight: "200 г", description: "Свежа зелева салата с моркови.", price: 1.50 },
      { id: 2, title: "Салата от кисело зеле", weight: "200 г", description: "Традиционна салата от кисело зеле.", price: 1.50 },
      { id: 3, title: "Моркови по корейски", weight: "150 г", description: "Пикантни моркови с подправки.", price: 1.50 },
    ],
  },
  {
    id: "soups",
    title: "Супи",
    icon: SoupIcon,
    dishes: [
      { id: 6, title: "Боб чорба", weight: "300 г", description: "Класическа българска боб чорба.", price: 2.00 },
      { id: 7, title: "Борш", weight: "300 г", description: "Традиционен руски борш.", price: 2.50 },
      { id: 8, title: "Гъбена супа", weight: "300 г", description: "Крем супа от пресни гъби.", price: 2.00 },
      { id: 9, title: "Зеленчукова супа", weight: "300 г", description: "Бърза и лесна зеленчукова супа.", price: 2.00 },
      { id: 10, title: "Пилешка супа", weight: "300 г", description: "Домашна пилешка супа.", price: 2.50 },
      { id: 11, title: "Рибена чорба", weight: "300 г", description: "Свежа рибена чорба.", price: 2.50 },
      { id: 12, title: "Супа с топчета", weight: "300 г", description: "Любимата супа с топчета.", price: 2.50 },
    ],
  },
  {
    id: "cold-dishes",
    title: "Студени Ястия / Разядки",
    icon: ColdDishesIcon,
    dishes: [
      { id: 4, title: "Пастет от домашно пиле", weight: "150 г", description: "Домашно приготвен пилешки пастет.", price: 1.50 },
      { id: 5, title: "Люти чушки", weight: "50 г", description: "Мариновани люти чушки.", price: 0.50 },
    ],
  },
  {
    id: "main-dishes",
    title: "Основни Ястия",
    icon: MainDishIcon,
    dishes: [
      { id: 13, title: "Лазаня", weight: "350 г", description: "Италианска лазаня.", price: 4.50 },
      { id: 14, title: "Мусака", weight: "400 г", description: "Традиционна мусака.", price: 4.50 },
      { id: 15, title: "Ориз с гъби", weight: "300 г", description: "Пухкав ориз с горски гъби.", price: 3.00 },
      { id: 16, title: "Ориз със зеленчуци", weight: "300 г", description: "Ориз със сезонни зеленчуци.", price: 3.00 },
      { id: 17, title: "Паста с сметана и пиле", weight: "350 г", description: "Паста в сметанов сос с пиле.", price: 4.50 },
      { id: 18, title: "Пелмени", weight: "250 г", description: "Домашни руски пелмени.", price: 3.00 },
      { id: 19, title: "Печен патладжан с моцарела", weight: "300 г", description: "Леко предястие или основно.", price: 3.00 },
      { id: 20, title: "Печен патладжан с моцарела и месо", weight: "350 г", description: "Засищащ патладжан с месо.", price: 4.50 },
      { id: 21, title: "Пълнени чушки", weight: "350 г", description: "Чушки пълнени с ориз и кайма.", price: 3.50 },
      { id: 22, title: "Сарми с месо и ориз", weight: "300 г", description: "Зелеви сарми с кайма.", price: 3.00 },
      { id: 23, title: "Шакшука", weight: "300 г", description: "Яйца в пикантен доматен сос.", price: 2.50 },
    ],
  },
  {
    id: "meat-fish",
    title: "Месо и Риба",
    icon: MeatFishIcon,
    dishes: [
      { id: 24, title: "Бяла риба", weight: "200 г", description: "Филе от бяла риба на тиган.", price: 3.00 },
      { id: 25, title: "Кавърма", weight: "300 г", description: "Свинска кавърма по селски.", price: 3.00 },
      { id: 26, title: "Кебапче", weight: "80 г", description: "Сочно кебапче на скара.", price: 0.80 },
      { id: 27, title: "Кюфтета с сос", weight: "300 г", description: "Телешки кюфтета в доматен сос.", price: 3.00 },
      { id: 28, title: "Месо по френски", weight: "250 г", description: "Свинско месо със запечен кашкавал.", price: 3.00 },
      { id: 29, title: "Пилешки бут", weight: "250 г", description: "Печено пилешко бутче.", price: 3.00 },
      { id: 30, title: "Пилешки крилца", weight: "250 г", description: "Хрупкави пилешки крилца.", price: 3.00 },
      { id: 31, title: "Пилешки сърца", weight: "200 г", description: "Задушени пилешки сърца.", price: 3.00 },
      { id: 32, title: "Пилешко кюфте", weight: "100 г", description: "Кюфте от пилешко месо.", price: 3.00 },
      { id: 33, title: "Пилешка пържола", weight: "200 г", description: "Грилована пилешка пържола.", price: 3.00 },
      { id: 34, title: "Руло от бекон и пиле", weight: "200 г", description: "Сочно солено руло.", price: 3.00 },
      { id: 35, title: "Царско пилешко кюфте", weight: "150 г", description: "Пилешко кюфте с пълнеж.", price: 3.00 },
    ],
  },
  {
    id: "sides",
    title: "Гарнитури",
    icon: SideIcon,
    dishes: [
      { id: 36, title: "Задушени зеленчуци", weight: "200 г", description: "Смесени сезонни зеленчуци.", price: 2.50 },
      { id: 37, title: "Картофено пюре", weight: "200 г", description: "Пухкаво картофено пюре.", price: 2.50 },
      { id: 38, title: "Картофи по селски", weight: "200 г", description: "Ароматни селски картофи.", price: 2.50 },
      { id: 39, title: "Картофи с розмарин", weight: "200 г", description: "Печени картофи с пресен розмарин.", price: 2.50 },
    ],
  },
  {
    id: "desserts",
    title: "Десерти",
    icon: DessertIcon,
    dishes: [
      { id: 40, title: "Вафлена торта", weight: "150 г", description: "Хрупкава вафлена торта.", price: 1.50 },
      { id: 41, title: "Реване", weight: "150 г", description: "Сиропирано домашно реване.", price: 1.50 },
      { id: 42, title: "Френска селска торта", weight: "150 г", description: "Традиционна френска торта с мед.", price: 2.00 },
      { id: 43, title: "Шоколадова торта", weight: "150 г", description: "Наситена шоколадова торта.", price: 3.00 },
    ],
  },
];
