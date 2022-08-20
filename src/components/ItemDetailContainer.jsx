import { useEffect, useState } from "react"
import { useParams } from "react-router"
import { getFirestore } from "../services/getFirestore"
import ItemDetail from "./ItemDetail"

function ItemDetailContainer() {

    const [detail, setDetail] = useState([])
    const { detalleId } = useParams()
    const [loading, setLoading] = useState(true)

    useEffect(() => {

        const db = getFirestore()
        const dbQuery = db.collection('productos').where('id', '==', detalleId)
        dbQuery.get()
            .then(resp => setDetail(resp.docs.map(prod => prod.data())))
            .finally(() => setLoading(false))

    }, [detalleId])

    return <>

        <section className="productos">

            <h1 className="productos-title">Productos</h1>
            <div className="productos__row">

                {
                    loading ? <div className="lds-dual-ring"></div> :

                        detail.map(detail =>

                            <ItemDetail key={detail.id} id={detail.id} nombre={detail.nombre} img={detail.img} precio={detail.precio} descripcion={detail.descripcion} stock={detail.stock} favoritos={detail.favoritos} oferta={detail.oferta} />

                        )
                }

            </div>

        </section>
    </>

}

export default ItemDetailContainer