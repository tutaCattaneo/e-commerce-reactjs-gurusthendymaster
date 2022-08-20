import { createContext, useContext, useState } from "react";

const CartContext = createContext()
export const useCartContext = () => useContext(CartContext)

const CartContextProvider = ({ children }) => {

    const [cartList, setCartList] = useState([])
    const [checkoutList, setCheckoutList] = useState([])
    const [favList, setFavList] = useState([])
    const [noStockAvaible, setNoStockAvible] = useState(false)

    function addToCart(items) {

        if (cartList.find(p => p.id === items.id)) {
            const i = cartList.findIndex(p => p.id === items.id)
            cartList[i].cantidad = cartList[i].cantidad + items.cantidad
            setCartList([...cartList])
            setNoStockAvible(false)
            
            if (cartList[i].cantidad > cartList[i].stock) {
                cartList[i].cantidad = cartList[i].cantidad - items.cantidad
                setCartList([...cartList])
                setNoStockAvible(true)
            }

        } else {
            setCartList([
                ...cartList,
                items
            ])
            setNoStockAvible(false)
        }

    }

    function addToCheckout(items) {
        setCheckoutList([items])
    }

    function addToFav(items) {

        if (favList.find(p => p.id === items.id)) {
            setFavList([...favList])

        } else {
            setFavList([...favList, items])
        }
    }

    function deleteItem(id) {
        setCartList(cartList.filter(prod => prod.id !== id))
    }

    const totalPriceCart = () => {

        return Number(cartList.reduce((sum, value) => (sum + (value.precio - ((value.precio * value.oferta) / 100))* value.cantidad), 0).toFixed(1))
    }

    const cartCounter = () => {

        return cartList.reduce((sum, value) => (sum + value.cantidad), 0)
    }

    const isInFav = (id) => {
        return favList.some(prod => prod.id === id)
    }

    function deleteFav(id) {
        setFavList(favList.filter(prod => prod.id !== id))
    }

    function clearCart() {
        setCartList([])
    }


    return (
        <>
            <CartContext.Provider value={{ noStockAvaible, addToCheckout, checkoutList, setNoStockAvible, clearCart, cartList, deleteFav, addToCart, addToFav, favList, deleteItem, totalPriceCart, cartCounter, isInFav }}>

                {children}

            </CartContext.Provider>
        </>
    )
}

export default CartContextProvider