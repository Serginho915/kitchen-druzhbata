export const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export const resolveApiImage = (image?: string | null) => {
  if (!image) return null;
  if (image.startsWith("http://") || image.startsWith("https://")) return image;

  const backendBaseUrl = API_BASE_URL.replace(/\/api\/?$/, "");
  return `${backendBaseUrl}${image.startsWith("/") ? "" : "/"}${image}`;
};

export type CarouselContent = {
  productId: number;
  title: string;
  image: string;
};

export interface HotSalesContent {
  title: string;
  content: CarouselContent[];
}