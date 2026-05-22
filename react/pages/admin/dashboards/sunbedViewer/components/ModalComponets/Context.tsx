import { createContext, useContext, useState, type ReactNode } from "react";
import type { ICustomer, IPackage, IProduct, IMinuteItem } from "@/Models/types";
import { nanoid } from "@reduxjs/toolkit";

export type CartProduct = IProduct & { cartItemId: string };
export type CartPackage = IPackage & { cartItemId: string };
export type CartMinutes = IMinuteItem & { cartItemId: string };

export interface Cart {
    products: CartProduct[];
    packages: CartPackage[];
    minutes: CartMinutes[]; 
    price: number;
}

interface AddQueueContextType {
    transitionCondition: boolean;
    setTransitionCondition: (value: boolean) => void;
    selectedCustomer: ICustomer | null;
    setSelectedCustomer: (customer: ICustomer | null) => void;
    page: number;
    changePage: (changeValue: number) => void;
    isGuest: boolean;
    setGuest: (value: boolean) => void;
    cart: Cart;
    addProductToCart: (product: IProduct) => void;
    addMinutesToCart: (minutes: IMinuteItem) => void;
    addPackageToCart: (pkg: IPackage) => void; // 1. Add the new function here
    removeItemFromCart: (cartItemId: string) => void;
    reset: () => void;
    contentKey: number;
}

const AddQueueContext = createContext<AddQueueContextType | undefined>(undefined);

export const AddQueueProvider = ({ children }: { children: ReactNode }) => {
    const [transitionCondition, setTransitionCondition] = useState<boolean>(false);
    const [selectedCustomer, setSelectedCustomer] = useState<ICustomer | null>(null);
    const [contentKey, setContentKey] = useState(0);
    const [isGuest, setGuest] = useState(false);
    const [page, setPage] = useState<number>(1);
    const [cart, setCart] = useState<Cart>({ products: [], packages: [], minutes: [], price: 0 });

    const changePage = (changeValue: number) => {
        setPage(prevPage => prevPage + changeValue);
    };

    const addProductToCart = (product: IProduct) => {
        const newCartItem: CartProduct = { ...product, cartItemId: nanoid() };
        setCart(currentCart => ({
            ...currentCart,
            products: [...currentCart.products, newCartItem],
            price: currentCart.price + product.sale_price,
        }));
    };

    const addMinutesToCart = (minutesItem: IMinuteItem) => {
        const newCartItem: CartMinutes = { ...minutesItem, cartItemId: nanoid() };
        setCart(currentCart => ({
            ...currentCart,
            minutes: [...currentCart.minutes, newCartItem],
            price: currentCart.price + minutesItem.price,
        }));
    };

    // 2. Implement the addPackageToCart function
    const addPackageToCart = (pkg: IPackage) => {
        const newCartItem: CartPackage = { ...pkg, cartItemId: nanoid() };
        setCart(currentCart => ({
            ...currentCart,
            packages: [...currentCart.packages, newCartItem],
            price: currentCart.price + pkg.price, 
        }));
    };

    const removeItemFromCart = (cartItemId: string) => {
        setCart(currentCart => {
            let itemPrice = 0;
            const productToRemove = currentCart.products.find(p => p.cartItemId === cartItemId);
            if (productToRemove) itemPrice = productToRemove.sale_price;

            const minutesToRemove = currentCart.minutes.find(m => m.cartItemId === cartItemId);
            if (minutesToRemove) itemPrice = minutesToRemove.price;
            
            const packageToRemove = currentCart.packages.find(p => p.cartItemId === cartItemId);
            if (packageToRemove) itemPrice = packageToRemove.price;

            const newProducts = currentCart.products.filter(p => p.cartItemId !== cartItemId);
            const newMinutes = currentCart.minutes.filter(m => m.cartItemId !== cartItemId);
            const newPackages = currentCart.packages.filter(p => p.cartItemId !== cartItemId);

            return {
                products: newProducts,
                minutes: newMinutes,
                packages: newPackages,
                price: currentCart.price - itemPrice,
            };
        });
    };

    const reset = () => {
        setTransitionCondition(false);
        setSelectedCustomer(null);
        setPage(1);
        setContentKey(prevKey => prevKey + 1);
        setCart({ products: [], packages: [], minutes: [], price: 0 });
    };

    const value = {
        transitionCondition,
        setTransitionCondition,
        selectedCustomer,
        setSelectedCustomer,
        page,
        changePage,
        isGuest,
        setGuest,
        cart,
        addProductToCart, 
        addMinutesToCart,
        addPackageToCart, // 3. Add the function to the value object
        removeItemFromCart,
        reset,
        contentKey, 
    };

    return <AddQueueContext.Provider value={value}>{children}</AddQueueContext.Provider>;
};

export const useAddQueue = () => {
    const context = useContext(AddQueueContext);
    if (context === undefined) {
        throw new Error("useAddQueue must be used within an AddQueueProvider");
    }
    return context;
};
