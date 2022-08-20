import { Link } from "react-router-dom";
import { useCartContext } from "../context/CartContext"
import { useState } from "react";

function Item({ id, img, nombre, precio, descripcion, stock, oferta }) {

    const { isInFav, addToFav, favList } = useCartContext()
    const [fillHeart, setFillHeart] = useState(isInFav(id))

    const onFav = (state) => {
        var i = 0
        state ? 
            addToFav({ id, img, precio, descripcion, stock, nombre, oferta }) 
            : 
            i = favList.findIndex(p => p.id === id)
            favList.splice(i, 1)
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

            <div id={`${id}`} className="productos__row-card">

                <Link to={`/detalle/${id}`}>

                    <h2 className="productos__row-card-title">{nombre}</h2>

                </Link>

                {fillHeart ?

                    <svg onClick={handlerUnFav} xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-heart-fill" viewBox="0 0 16 16">
                        <path fillRule="evenodd" d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z" />
                    </svg>

                    :

                    <svg onClick={handlerOnFav} xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-heart notFillHeart" viewBox="0 0 16 16">
                        <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z"></path>
                    </svg>
                }

                <Link to={`/detalle/${id}`}>

                    <img className="productos__row-card-img" src={`${img}`} alt="" />

                </Link>

                {stock === 0 ?
                <span className="productos__row-card-price">Sin stock</span>
                :
                    oferta ?

                    <div className="productos__row-card-off">

                        <span className="productos__row-card-off-oldprice">{`$${precio}`}</span>

                        <span className="productos__row-card-price">{`$${precio-((precio*oferta)/100)}`}</span>

                        <span className="productos__row-card-off-title">{oferta}% OFF</span>

                    </div>

                :

                    <span className="productos__row-card-price">{`$${precio}`}</span>
                }

                <p className="productos__row-card-description">{descripcion}</p>

            </div>

        </>
    )
}

export default Item