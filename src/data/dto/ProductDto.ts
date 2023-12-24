export interface ProductDto {
    pid: number;
    name: string;
    price: number;
    image_url: string;
    has_stock: boolean;
}

export interface ProductDetail {
    pid: number;
    name: string;
    description: string;
    price: number;
    image_url: string;
    stock: number;
}