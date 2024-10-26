import React, { createContext } from "react";
import all_product from '../Components/Assets/all_product'
import { useState } from 'react'

export const ShopContext = createContext(null)

const getDefaultCart = () => {
    let cart = {}
    for (let index = 0; index < all_product.length + 1; index++) {
        cart[index] = 0
    }
    return cart
}

const ShopContextProvider = (props) => {
    const [cartItems, setCartItems] = useState(getDefaultCart())
    const addToCart = (itemId) => {
        setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }))
    }
    const removeFromCart = (itemId) => {
        setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }))
    }

    const getTotalCartAmount = () => {
        let totalAmount = 0;
        for (const item in cartItems) {
            if (cartItems[item] > 0) {
                let itemInfo = all_product.find((product) => product.id === Number(item))
                if (itemInfo) { // Ürün bulunduysa toplamı ekle
                    totalAmount += itemInfo.new_price * cartItems[item]
                }
            }
        }
        return totalAmount; // Döngüden sonra toplam miktarı döndür
    }

    const getTotalCartItems = () => {
        let totaItem = 0;
        for (const item in cartItems) {
            if (cartItems[item] > 0) {
                totaItem += cartItems[item]
            }
        }
        return totaItem
    }


    const contextValue = { getTotalCartItems, getTotalCartAmount, all_product, cartItems, addToCart, removeFromCart }
    return (
        <ShopContext.Provider value={contextValue}>
            {props.children}
        </ShopContext.Provider>
    )
}

export default ShopContextProvider