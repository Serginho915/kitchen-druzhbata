import React from 'react'
import riceImage from "@/assets/images/HotSales/rice.jpg";
import pastaImage from "@/assets/images/HotSales/Pasta.jpg";
import borshtImage from "@/assets/images/HotSales/borsht.jpg";
import  pelmeniImage from "@/assets/images/HotSales/pelmeni.jpg";
import { StaticImageData } from 'next/image';


type CarouselContent = {
    id: number;
    title: string;
    image: StaticImageData;
    price: number;
    weight: string;
    description: string;
}
interface Slide {
    id: number;
    content: CarouselContent;
}
export const CarouselMockData: Slide[] = [
    {
        id: 1,
        content: {
            id: 15,
            title: "Ориз с гъби",
            image: riceImage,
            price: 3.00,
            weight: "300 г",
            description: "Пухкав ориз с горски гъби."
        }
    },
    {
        id: 2,
        content: {
            id: 13,
            title: "Лазаня",
            image: pastaImage,
            price: 4.50,
            weight: "350 г",
            description: "Италианска класика з телешка кайма."
        }
    },
    {
        id: 3,
        content: {
            id: 7,
            title: "Борш",
            image: borshtImage,
            price: 2.50,
            weight: "300 г",
            description: "Традиционен руски борш."
        }
    },
    {
        id: 4,
        content: {
            id: 18,
            title: "Пелмени",
            image: pelmeniImage,
            price: 3.00,
            weight: "250 г",
            description: "Домашни руски пелмени."
        }
    }
];

