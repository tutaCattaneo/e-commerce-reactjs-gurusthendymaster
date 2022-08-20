import { useState, useEffect } from "react"
import { getFirestore } from "../services/getFirestore";

function Purchased({ match }) {

    const [itemOrders, setItemOrders] = useState([])
    const [buyerOrders, setBuyerOrders] = useState([])
    const { params: { order } } = match

    useEffect(() => {
        const db = getFirestore()
        const dbQuery = db.collection('orders').doc(order)
        dbQuery.get()
            .then(resp => ((setItemOrders(resp.data().items), setBuyerOrders(resp.data().buyer))))
    }, [order])

    return <>

        <div className="purchased__contain">

            <svg xmlns="http://www.w3.org/2000/svg" width="120" height="120" fill="currentColor" className="bi bi-suit-heart-fill" viewBox="0 0 16 16">
                <defs>
                    <linearGradient id="myGradient" gradientTransform="rotate(45)">
                        <stop offset="0%" stopColor="#dd33c6">
                            <animate attributeName="stop-color" attributeType="CSS" values="#dd33c6;#2295befb;#965ada;#dd33c6;" dur="5s" repeatCount="indefinite"></animate>
                        </stop>
                        <stop offset="100%" stopColor="#17c4e2">
                            <animate attributeName="stop-color" attributeType="CSS" values="#17c4e2;#965ada;#2295befb;#17c4e2;" dur="5s" repeatCount="indefinite"></animate>
                        </stop>
                    </linearGradient>
                </defs>

                <path fill="url('#myGradient')" d="M4 1c2.21 0 4 1.755 4 3.92C8 2.755 9.79 1 12 1s4 1.755 4 3.92c0 3.263-3.234 4.414-7.608 9.608a.513.513 0 0 1-.784 0C3.234 9.334 0 8.183 0 4.92 0 2.755 1.79 1 4 1z" />
            </svg>

            <h2 className="purchased__contain-text">¡Gracias {buyerOrders.name} por elegirnos!</h2>

            <span className="purchased__contain-email">Corroborá las instrucciones de retiro en tu correo: {buyerOrders.email} para continuar con la compra</span>

            <div className="checkout__contain-details">

                <h2 className="checkout__contain-details-title">Detalle de la compra</h2>
                {
                    itemOrders.map(detail =>
                        <div key={detail.id} className="checkout__contain-details-content">
                            <img className="checkout__contain-details-content-img" src={detail.img} alt="" />
                            <h3 className="checkout__contain-details-content-title">{detail.nombre}</h3>
                            <span className="checkout__contain-details-content-quantity">Cantidad: {detail.cantidad}</span>

                            {
                                detail.oferta ?

                                    <div className="checkout__contain-details-content-off">

                                        <span className="checkout__contain-details-content-off-oldprice">${detail.precio * detail.cantidad}</span>

                                        <div>

                                            <span className="checkout__contain-details-content-price">${Number((detail.precio - ((detail.precio * detail.oferta) / 100)) * detail.cantidad).toFixed(1)}</span>
                                            <span className="checkout__contain-details-content-off-title">{detail.oferta}% OFF</span>

                                        </div>

                                    </div>

                                    :

                                    <span className="checkout__contain-details-content-subtotal">Subtotal: ${detail.precio * detail.cantidad}</span>
                            }

                        </div>
                    )
                }

                <div className="checkout__contain-details-total">

                    <h3 className="checkout__contain-details-total-title">Total: ${Number(itemOrders.reduce((sum, value) => (sum + (value.precio - ((value.precio * value.oferta) / 100)) * value.cantidad), 0).toFixed(1))}</h3>
                    

                </div>

                <span className="checkout__contain-details-id">ID de la compra: {order}</span>

            </div>

        </div>

    </>
}

export default Purchased