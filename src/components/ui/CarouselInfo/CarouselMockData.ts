import React from 'react'
import riceImage from "@/assets/images/HotSales/rice.jpg";
import pastaImage from "@/assets/images/HotSales/Pasta.jpg";
import { StaticImageData } from 'next/image';


type CarouselContent = {
    title: string;
    image: StaticImageData;
}
interface Slide {
    id: number;
    content: CarouselContent;
}
export const CarouselMockData: Slide[] = [
    {
        id: 1,
        content: {
            title: "Топла храна, приготвена днес",
            image: riceImage,
        }
    },
    {
        id: 2,
        content: {
            title: "Храна с вкус на традиция",
            image: pastaImage,
        }
    },
    {
        id: 3,
        content: {
            title: "Безплатна доставка в София",
            image: riceImage,
        }
    },
    {
        id: 4,
        content: {
            title: "Всеки делник (Пон-Пет)",
            image: pastaImage,
        }
    }
];

