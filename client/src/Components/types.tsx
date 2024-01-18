// Contains all the custom types we want to use for our application

export interface CategoryBookItem {
    bookId: number;
    title: string;
    author: string;
    price: number;
    isPublic: boolean;
    rating: number;
    description : string;
    isFeatured: boolean;
    categoryId : number;
}


export interface CategoryItem {
    categoryId: number;
    name: string;
}


//this interface represents the items(books) in our shopping cart
export class ShoppingCartItem {
    id:number;
    book: CategoryBookItem;
    quantity: number;

    constructor(theBook: CategoryBookItem) {
        this.id = theBook.bookId;
        this.book = theBook;
        this.quantity = 1;
    }
}
export const initialCartState:ShoppingCartItem[] =  [];

// this is used by the reducer. You can define it on the CartReducer
export interface ContextProps {
    children: JSX.Element | JSX.Element[]
}


export const months: string[] = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
];

export const years = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15]

export interface CustomerForm {
    name: string;
    address: string;
    phone: string;
    email: string;
    ccNumber: string;
    ccExpiryMonth: number;
    ccExpiryYear: number;
}

export interface Order {
    orderId: number;
    amount: number;
    dateCreated: number;
    confirmationNumber: number;
    customerId: number;
}

export interface OrderDetails {
    order: Order;
    customer: Customer;
    books: CategoryBookItem[];
    lineItems: LineItem[];
}

export interface ServerErrorResponse {
    reason: string;
    message: string;
    fieldName: string;
    error: boolean;
}

export interface Order {
    orderId: number;
    amount: number;
    dateCreated: number;
    confirmationNumber: number;
    customerId: number;
}

export interface LineItem {
    bookId: number;
    orderId: number;
    quantity: number;
}
export interface Customer {
    customerName: string;
    address: string;
    phone: string;
    email: string;
    ccNumber: string;
    ccExpDate: number;
}

export interface OrderDetails {
    order: Order;
    customer: Customer;
    books: CategoryBookItem[];
    lineItems: LineItem[];
}