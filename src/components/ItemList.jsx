import Item from "./Item"

function ItemList (items){

    return (
        <>
            {
                items.productos.map(prod => 

                    <Item key={prod.id} id={prod.id} nombre={prod.nombre} precio={prod.precio} descripcion={prod.descripcion} img={prod.img} stock={prod.stock} favoritos={prod.favoritos} oferta={prod.oferta}/> 
                )
            }
        </>
    )
}

export default ItemList