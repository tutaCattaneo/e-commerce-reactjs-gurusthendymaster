import { useState } from "react"
import { Link } from "react-router-dom"
import { useCartContext } from "../context/CartContext"

function ItemCount({ initial, stock, onAdd, onFav, id, onBuy }) {

    const { isInFav} = useCartContext()

    const [quantity, setQuantity] = useState(initial)

    const [fillHeart, setFillHeart] = useState(isInFav(id))

    const handlerAdd = () => {
        if (quantity < stock) setQuantity(quantity + 1)
    }

    const handlerRm = () => {
        if (quantity > initial) setQuantity(quantity - 1)
    }

    const handlerOnAdd = () => {
        onAdd(quantity)
        setQuantity(initial)
    }

    const handlerOnBuy = () => {
        onBuy(quantity)
        setQuantity(initial)
    }

    const handlerOnFav = () => {
        setFillHeart(true)
        onFav(true)
    }
    const handlerUnFav = () => {
        setFillHeart(false)
        onFav(false)
    }


    return (
        <>
            

            {stock === 0 ?

                <div className="productos__row-card-buy-quantity-container">
                    <span>Sin stock</span>
                </div>

                :
                <div className="productos__row-card-buy-quantity-container">

                    <p className="productos__row-card-buy-quantity-container-title">Cantidad:</p>

                    <div className="productos__row-card-buy-quantity-container-selector">

                        <svg onClick={handlerRm} className="productos__row-card-buy-quantity-container-selector-substract" xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
                            <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"></path>
                            <path d="M4 8a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 4 8z"></path>
                        </svg>
                        <label>{quantity}</label>
                        <svg onClick={handlerAdd} className="productos__row-card-buy-quantity-container-selector-add" xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
                            <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"></path>
                            <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"></path>
                        </svg>

                    </div>

                    <span className="productos__row-card-buy-quantity-container-stock">(Stock disponible: {stock})</span>

                    <div className="product__detail-b2-buy">

                        {fillHeart ?

                            <svg onClick={handlerUnFav} xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-heart-fill" viewBox="0 0 16 16">
                                <path fillRule="evenodd" d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z" />
                            </svg>

                            :

                            <svg onClick={handlerOnFav} xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-heart notFillHeart" viewBox="0 0 16 16">
                                <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z"></path>
                            </svg>
                        }

                        <Link onClick={handlerOnBuy} to={`/checkout/${id}`} className="product__detail-b2-buy-link">Comprar</Link>

                        <svg onClick={handlerOnAdd} className="bi bi-cart3" xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
                            <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM3.102 4l1.313 7h8.17l1.313-7H3.102zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"></path>
                        </svg>

                    </div>

                </div>

            }
        </>
    )
}

export default ItemCount