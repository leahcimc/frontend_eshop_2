export interface TransactionDto {
    tid: number;
    status: string;
    total: number;
    items: Item[];
    buyer_uid: number;
    datetime: Date;
}

export interface Item {
    tpid: number;
    product: Product;
    quantity: number;
    subtotal: number;
}

export interface Product {
    pid: number;
    name: string;
    description: string;
    price: number;
    stock: number;
    image_url: string;
}

export interface TransactionListDto {
    tid: number;
    status: string;
    total: number;
    datetime: Date;
}