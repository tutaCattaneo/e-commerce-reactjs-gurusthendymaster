import {BrowserRouter, Switch, Route} from 'react-router-dom'
import Cart from './components/Cart';
import ItemDetailContainer from './components/ItemDetailContainer';
import ItemListContainer from './components/ItemListContainer';
import NavBar from './components/NavBar';
import CartContextProvider from './context/CartContext';
import Checkout from './components/Checkout';
import './sass/style.css';
import Purchased from './components/Purchased';

function App() {

  return (
    <div className="App">

      <CartContextProvider>
        <BrowserRouter>
          <NavBar/>
          <Switch>
            <Route exact path='/'>
              <ItemListContainer/>
            </Route>
            <Route exact path="/categoria/:categoriaId" component={ItemListContainer}/>
            <Route exact path="/detalle/:detalleId" component={ItemDetailContainer}/>
            <Route exact path="/cart" component={Cart}/>
            <Route exact path="/checkout" component={Checkout}/>
            <Route exact path="/checkout/:checkoutId" component={Checkout}/>
            <Route exact path="/checkout/purchased/:order" component={Purchased}/>
            <Route exact path="/:search" component={ItemListContainer}/>
          </Switch>
        </BrowserRouter>
      </CartContextProvider>

    </div>
  )
}

export default App;

/* Browser router engloba todo lo que queremos que este enrutado */
/* El switch funciona como el switch de js y sirve para navegar entre uno u otro componente */
/* Route nos asocia el componente con la ruta */
/* Se pone exact para que la ruta sea exactamente la que elegimos */