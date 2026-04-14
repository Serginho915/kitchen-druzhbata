export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
type CarouselContent = {
    productId: number;
    title: string;
    image: string;
}

interface HotSalesContent{
    title: string;
    content: CarouselContent[];
}