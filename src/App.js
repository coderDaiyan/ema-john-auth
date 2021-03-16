import "./App.css";
import Header from "./components/Header/header";
import Shop from "./components/Shop/shop";
import Review from "./components/Review/Review";
import Inventory from "./components/Inventory/Inventory";
import NotFound from "./components/NotFound/NotFound";
import ProductDetail from "./components/ProductDetail/ProductDetail";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

function App() {
  return (
    <div>
      <Router>
        <Header></Header>
        <Switch>
          <Route path="/shop">
            <Shop></Shop>
          </Route>
          <Route path="/review">
            <Review></Review>
          </Route>
          <Route path="/inventory">
            <Inventory></Inventory>
          </Route>
          <Route path="/product/:productKey">
            <ProductDetail></ProductDetail>
          </Route>
          <Route exact path="/">
            <Shop></Shop>
          </Route>
          <Route path="*">
            <NotFound></NotFound>
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
