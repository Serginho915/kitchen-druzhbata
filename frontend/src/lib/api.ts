export const API_BASE_URL = "/api";

export const resolveApiImage = (image?: string | null) => {
  if (!image) return null;
  if (image.startsWith("http://") || image.startsWith("https://")) return image;

  return image.startsWith("/") ? image : `/${image}`;
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
