import { useCartContext } from "../context/CartContext"
import { useParams } from "react-router"
import { useEffect, useState } from "react"
import { getFirestore } from "../services/getFirestore"
import firebase from "firebase"
import { useHistory } from "react-router"

function Checkout() {

    const history = useHistory()
    const [order, setOrder] = useState('')
    const { cartList, totalPriceCart, clearCart, checkoutList } = useCartContext()
    const { checkoutId } = useParams()
    const [checkout, setCheckout] = useState([])
    const [formData, setFormData] = useState({ name: "", phone: "", email: "", doc: "" })


    useEffect(() => {

        if (checkoutId) {

            setCheckout(checkoutList)
        }
        else {

            setCheckout(cartList)
        }

    }, [checkoutId, cartList, checkoutList])

    const generarOrden = (e) => {

        e.preventDefault()

        let orden = {}
        orden.date = firebase.firestore.Timestamp.fromDate(new Date())
        orden.buyer = formData
        orden.total = totalPriceCart()
        orden.items = checkout.map(prod => {
            const id = prod.id
            const nombre = prod.nombre
            const precio = prod.precio
            const cantidad = prod.cantidad
            const img = prod.img
            const oferta = prod.oferta

            return { id, nombre, precio, cantidad, img, oferta }
        })

        const dbQuery = getFirestore()
        dbQuery.collection('orders').add(orden)
            .then(resp => setOrder(resp.id))
            .finally(clearCart())


        const itemsToUpdate = dbQuery.collection('productos').where(
            firebase.firestore.FieldPath.documentId(), 'in', checkout.map(i => i.id)
        )

        const batch = dbQuery.batch()

        itemsToUpdate.get()
            .then(collection => {
                collection.docs.forEach(docSnapshot => {
                    batch.update(docSnapshot.ref, {
                        stock: docSnapshot.data().stock - checkout.find(item => item.id === docSnapshot.id).cantidad
                    })
                })

                batch.commit()
            })
    }

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        })
    }

    useEffect(() => {

        if (order) {

            return history.push(`/checkout/purchased/${order}`)
        }

    }, [order, history])

    return <>

        <h1 className="checkout-title">Checkout</h1>
        <div className="checkout__contain">
            <div className="checkout__contain-content">
                                <div class="checkout__contain-content-dni">
                    <div class="checkout__contain-content-dni-flip">
                        <div class="checkout__contain-content-dni-flip-front">
                        <div class="checkout__contain-content-dni-flip-front-chip"></div>
                        <div class="checkout__contain-content-dni-flip-front-holder">
                            <label>Nombre y apellido</label>
                            <div>{formData.name}</div>
                        </div>
                        <div class="checkout__contain-content-dni-flip-front-expiration">
                            <label>Numero de documento</label>
                            <div>{formData.doc}</div>
                        </div>
                        </div>
                    </div>
                </div>

                <form onSubmit={generarOrden} onChange={handleChange} className="checkout__contain-content-form">

                    <fieldset>
                        <label htmlFor="card-holder">Nombre y apellido del titular</label>
                        <input defaultValue={formData.name} name='name' type="text" id="card-holder" required />
                    </fieldset>
                    <fieldset className="fieldset-expiration">
                        <label htmlFor="">Numero de telefono</label>
                        <input defaultValue={formData.phone} name='phone' id="tel-number" type="text" required />
                    </fieldset>
                    <fieldset className="fieldset-ccv">
                        <label>Número de documento</label>
                        <input defaultValue={formData.doc} name="doc" id="dni-number" type="num" className="input-dni-number" maxLength="10" required />

                    </fieldset>

                    <fieldset>
                        <label htmlFor="">Correo electronico</label>
                        <input defaultValue={formData.email} name='email' id="email-text" type="text" required />
                    </fieldset>

                    <div className="checkout__contain-content-button">

                        <button className="checkout__contain-content-button-next">Finalizar compra</button>

                    </div>

                </form>

            </div>


            <div className="checkout__contain-details">
                <h2 className="checkout__contain-details-title">Detalle de la compra</h2>

                {
                    checkout.map(prod =>

                        <div key={prod.id} className="checkout__contain-details-content">
                            <img className="checkout__contain-details-content-img" src={prod.img}
                                alt="" />
                            <h3 className="checkout__contain-details-content-title">{prod.nombre}</h3>
                            <span className="checkout__contain-details-content-quantity">Cantidad: {prod.cantidad}</span>

                            {
                                prod.oferta ?

                                    <div className="checkout__contain-details-content-off">

                                        <span className="checkout__contain-details-content-off-oldprice">${prod.precio * prod.cantidad}</span>

                                        <div>

                                            <span className="checkout__contain-details-content-price">${Number((prod.precio - ((prod.precio * prod.oferta) / 100)) * prod.cantidad).toFixed(1)}</span>
                                            <span className="checkout__contain-details-content-off-title">{prod.oferta}% OFF</span>

                                        </div>

                                    </div>

                                    :

                                    <span className="checkout__contain-details-content-subtotal">Subtotal: ${prod.precio * prod.cantidad}</span>
                            }

                        </div >
                    )
                }

                <h3 className="checkout__contain-details-total-title">Total: ${Number(checkout.reduce((sum, value) => (sum + (value.precio - ((value.precio * value.oferta) / 100)) * value.cantidad), 0).toFixed(1))}</h3>

            </div>

        </div>


    </>
}

export default Checkout