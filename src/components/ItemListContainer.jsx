import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { getFirestore } from "../services/getFirestore"
import ItemList from "./ItemList"

function ItemListContainer() {

    const [items, setItems] = useState([])
    const [loading, setLoading] = useState(true)
    const { categoriaId } = useParams()
    const { search } = useParams()

    useEffect(() => {

        if (categoriaId) {

            const db = getFirestore()
            const dbQuery = db.collection('productos').where('categoria', '==', categoriaId)
            dbQuery.get()
                .then(resp => setItems(resp.docs.map(prod => prod.data())))
                .finally(() => setLoading(false))

        } else if (search) {
            const db = getFirestore()
            const dbQuery = db.collection('productos').get()
            dbQuery
                .then(resp => setItems(resp.docs.map(prod => prod.data()).filter(prod => prod.nombre.toUpperCase().indexOf(search.toUpperCase()) > -1)))
                .finally(() => setLoading(false))
        }
        else {
            const db = getFirestore()
            const dbQuery = db.collection('productos').get()
            dbQuery
                .then(resp => setItems(resp.docs.map(prod => prod.data())))
                .finally(() => setLoading(false))
        }

    }, [categoriaId, search])


    return (
        <>
            <section className="productos">

                <h1 className="productos-title">Productos</h1>
                <div className="productos__row">
                    {
                        loading ? <div className="lds-dual-ring"></div> :

                            <ItemList productos={items} />
                    }

                </div>

                <h2 className="productos-title">Ofertas</h2>

                <div className="productos__row">

                    {
                        <ItemList productos={items.filter(prod => prod.oferta > 0)} />
                    }

                </div>

            </section>
        </>
    )
}

export default ItemListContainer