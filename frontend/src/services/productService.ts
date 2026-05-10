import { apiClient } from "./apiClient";
import type { Product, ProductDetail, AddToCartRequest, CartResponse } from "@/products/types/product.types";

interface ApiProduct {
  id: string;
  brand: string;
  model: string;
  price: string;
  imgUrl: string;
}

interface ApiProductDetail extends ApiProduct {
  cpu: string;
  ram: string;
  os: string;
  displayResolution: string;
  battery: string;
  primaryCamera: string | string[];
  dimentions: string;
  weight: string;
  options: {
    colors: { code: number | string; name: string }[];
    storages: { code: number | string; name: string }[];
  };
}

const mapApiProductToProduct = (apiProduct: ApiProduct): Product => ({
  id: apiProduct.id,
  brand: apiProduct.brand,
  model: apiProduct.model,
  price: apiProduct.price ? Number(apiProduct.price) : null,
  imageUrl: apiProduct.imgUrl || null,
  cpu: null,
  ram: null,
  os: null,
  screenResolution: null,
  battery: null,
  cameras: null,
  dimensions: null,
  weight: null,
});

const mapApiProductDetailToProductDetail = (apiProduct: ApiProductDetail): ProductDetail => ({
  ...mapApiProductToProduct(apiProduct),
  cpu: apiProduct.cpu || null,
  ram: apiProduct.ram || null,
  os: apiProduct.os || null,
  screenResolution: apiProduct.displayResolution || null,
  battery: apiProduct.battery || null,
  cameras: Array.isArray(apiProduct.primaryCamera)
    ? apiProduct.primaryCamera.filter(Boolean).join(", ")
    : apiProduct.primaryCamera || null,
  dimensions: apiProduct.dimentions || null,
  weight: apiProduct.weight || null,
  storageOptions: apiProduct.options?.storages || [],
  colorOptions: apiProduct.options?.colors || [],
});

export const productService = {
  getProducts: async (): Promise<ProductDetail[]> => {
    const { data } = await apiClient.get("/product");
    return data.map(mapApiProductToProduct);
  },

  getProductDetail: async (id: string): Promise<ProductDetail> => {
    const { data } = await apiClient.get(`/product/${id}`);
    return mapApiProductDetailToProductDetail(data);
  },

  addToCart: async (request: AddToCartRequest): Promise<CartResponse> => {
    const { data } = await apiClient.post("/cart", {
      id: request.id,
      colorCode: Number(request.colorCode),
      storageCode: Number(request.storageCode),
    });
    return data;
  },
};
