export const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:8000/api";

export type CarouselContent = {
    productId: number;
    title: string;
    image: string;
};

export interface HotSalesContent {
    title: string;
    content: CarouselContent[];
}