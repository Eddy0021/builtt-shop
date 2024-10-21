export interface Product {
    id: number;
    name: string;
    price: number;
    weight: number;
    unit: string;
    image: string;
    sale: number; // Sale percentage
    count: number; // Quantity in cart
}