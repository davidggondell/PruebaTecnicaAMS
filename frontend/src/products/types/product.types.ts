export interface Product {
  id: string;
  brand: string;
  model: string;
  price: number | null;
  imageUrl: string | null;
  cpu: string | null;
  ram: string | null;
  os: string | null;
  screenResolution: string | null;
  battery: string | null;
  cameras: string | null;
  dimensions: string | null;
  weight: string | null;
}

export interface StorageOption {
  code: string | number;
  name: string;
}

export interface ColorOption {
  code: string | number;
  name: string;
  hexColor?: string;
}

export interface ProductDetail extends Product {
  storageOptions: StorageOption[]
  colorOptions: ColorOption[]
}

export interface AddToCartRequest {
  id: string;
  colorCode: string | number;
  storageCode: string | number;
}

export interface CartResponse {
  count: number;
}
