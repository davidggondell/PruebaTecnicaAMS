export interface Product {
  id: string
  brand: string
  model: string
  price: number
  imageUrl: string
  cpu: string
  ram: string
  os: string
  screenResolution: string
  battery: string
  cameras: string
  dimensions: string
  weight: string
}

export interface StorageOption {
  code: string
  name: string
}

export interface ColorOption {
  code: string
  name: string
  hexColor?: string
}

export interface ProductDetail extends Product {
  storageOptions: StorageOption[]
  colorOptions: ColorOption[]
}

export interface AddToCartRequest {
  id: string;
  colorCode: string;
  storageCode: string;
}

export interface CartResponse {
  count: number;
}
