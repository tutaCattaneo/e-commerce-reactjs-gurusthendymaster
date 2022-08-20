import { useCartContext } from "../context/CartContext"
import ItemCount from "./ItemCount"

function ItemDetail({ id, img, precio, descripcion, stock, nombre, oferta }) {

    const { addToCart, addToFav, favList, noStockAvaible, setNoStockAvible, addToCheckout } = useCartContext()

    const onAdd = (cantidad) => {
        addToCart({ id, img, precio, descripcion, stock, nombre, cantidad, oferta })
    }

    const onFav = (state) => {
        var i = 0
        state ?
            addToFav({ id, img, precio, descripcion, stock, nombre, oferta })
            :
            i = favList.findIndex(p => p.id === id)
        favList.splice(i, 1)
    }

    const onBuy = (cantidad) => {
        addToCheckout({ id, img, precio, descripcion, stock, nombre, cantidad, oferta })
    }


    return <>


        <div className="product__detail">

            <div className="product__detail-b1">

                <img className="product__detail-b1-img" src={img} alt="" />

            </div>

            <div className="product__detail-b2">

                <h1 className="product__detail-b2-title">{nombre}</h1>

                {
                    oferta ?

                        <div className="product__detail-b2-off">

                            <span className="product__detail-b2-off-oldprice">${precio}</span>

                            <div>

                                <span className="product__detail-b2-price">${precio - ((precio * oferta) / 100)}</span>
                                <span className="product__detail-b2-off-title">{oferta}% OFF</span>

                            </div>

                        </div>

                        :

                        <span className="product__detail-b2-price">${precio}</span>
                }

                <div className="product__detail-b2-description">
                    <h2 className="product__detail-b2-description-title">Descripción</h2>
                    <p className="product__detail-b2-description-text">{descripcion}</p>
                </div>

                <ItemCount id={id} onBuy={onBuy} onFav={onFav} initial={1} stock={stock} onAdd={onAdd} />

            </div>

        </div>

        {noStockAvaible && <div className="product__detail-error">
            <svg onClick={() => setNoStockAvible(!noStockAvaible)} xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-x-lg product__detail-error-icon" viewBox="0 0 16 16">
                <path fill-rule="evenodd" d="M13.854 2.146a.5.5 0 0 1 0 .708l-11 11a.5.5 0 0 1-.708-.708l11-11a.5.5 0 0 1 .708 0Z" />
                <path fill-rule="evenodd" d="M2.146 2.146a.5.5 0 0 0 0 .708l11 11a.5.5 0 0 0 .708-.708l-11-11a.5.5 0 0 0-.708 0Z" />
            </svg>
            <div className="product__detail-error-text">
                <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" class="bi bi-exclamation-lg" viewBox="0 0 16 16">
                    <path d="M7.005 3.1a1 1 0 1 1 1.99 0l-.388 6.35a.61.61 0 0 1-1.214 0L7.005 3.1ZM7 12a1 1 0 1 1 2 0 1 1 0 0 1-2 0Z" />
                </svg>
                <span>La cantidad seleccionada supera el stock disponible</span>
            </div>

        </div>
        }


    </>
}

export default ItemDetail