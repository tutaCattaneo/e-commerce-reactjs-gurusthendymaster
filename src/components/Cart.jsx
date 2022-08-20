import { useCartContext } from "../context/CartContext"
import { Link } from "react-router-dom"

function Cart() {

    const { cartList, deleteItem, totalPriceCart } = useCartContext()

    return <>

        <div className="carrito">

            <h1 className="carrito-title">Carrito</h1>

            {Object.keys(cartList).length === 0 ?

                <div className="carrito__contain">

                    <div className="carrito__contain-table-empty">

                        <h2 className="carrito__contain-table-empty-title">Tu carrito está vacío</h2>
                        <p className="carrito__contain-table-empty-subtitle">¿No sabés qué comprar? ¡Miles de productos te esperan!</p>
                        <Link to="/" className="carrito__contain-buy-button">Ir al inicio</Link>

                    </div>

                </div>

                :

                <div className="carrito__contain">

                    <div className="carrito__contain-buy">

                        <Link to='/checkout' className="carrito__contain-buy-button">Continuar con la compra</Link>

                        <h3 className="carrito__contain-buy-title">Total: ${totalPriceCart()}</h3>

                    </div>
                    {
                        cartList.map(prod =>

                            <div key={prod.id} className="carrito__contain-table">

                                <img className="carrito__contain-table-img" src={prod.img} alt="" />

                                <h2 className="carrito__contain-table-title">{prod.nombre}</h2>

                                <span className="carrito__contain-table-quantity">{prod.cantidad}</span>

                                {prod.oferta ?

                                    <span className="carrito__contain-table-price">${Number((prod.precio - ((prod.precio * prod.oferta) / 100)) * prod.cantidad).toFixed(1)}</span>
                                    :
                                    <span className="carrito__contain-table-price">${prod.precio * prod.cantidad}</span>
                                }

                                <svg onClick={() => deleteItem(prod.id)} className="carrito__contain-table-x" xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="currentColor" viewBox="0 0 16 16">
                                    <path className="carrito__contain-table-x" d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
                                </svg>

                            </div>
                        )
                    }
                </div>
            }
        </div>
    </>
}

export default Cart