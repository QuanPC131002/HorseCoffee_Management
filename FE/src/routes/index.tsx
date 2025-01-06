  import { Route, Routes } from 'react-router-dom';
  import Login from "../components/Auth/Login";
  import Register from "../components/Auth/Register";
  import CategoryAdd from "../components/Category/CategoryAdd";
  import CategoryEdit from "../components/Category/CategoryEdit";
  import CategoryList from "../components/Category/CategoryList";
  import MenuAll from "../components/Menu/AllProducts";
  import ProductAdd from "../components/Product/ProductAdd";
  import ProductEdit from "../components/Product/ProductEdit";
  import ProductList from "../components/Product/ProductList";
  import WareAdd from "../components/WareHouse/WareAdd";
  import WareEdit from "../components/WareHouse/WareEdit";
  import WareList from "../components/WareHouse/WareList";
  import LayoutAdmin from "../layout/Admin";
  import OrderDetail from "../Order/OrderDetail";
  import Order from "../Order/OrderList";
  import PrivateRoute from './PrivateRouter';
  import ResetPassword from '../components/Auth/ResetPassword';
  import ForgotPassword from '../components/Auth/ForgotPasswod';

  const IndexRouter = () => {
    return (
      <div>
        <Routes>
          <Route path='/' element={<LayoutAdmin />}>
            <Route path='menu'>
              <Route index element={<PrivateRoute element={<MenuAll />} />} />
              {/* <Route path="checkout" element={<Checkout />} /> */}
            </Route>
            <Route path='categories'>
              <Route index element={<PrivateRoute element={<CategoryList />} />} />
              <Route path="add" element={<PrivateRoute element={<CategoryAdd />} />} />
              <Route path="edit/:id" element={<PrivateRoute element={<CategoryEdit />} />} />
            </Route>
            <Route path='ware'>
              <Route index element={<PrivateRoute element={<WareList />} />} />
              <Route path="add" element={<PrivateRoute element={<WareAdd />} />} />
              <Route path="edit/:id" element={<PrivateRoute element={<WareEdit />} />} />
            </Route>

            <Route path='products'>
              <Route index element={<PrivateRoute element={<ProductList />} />} />
              <Route path="add" element={<PrivateRoute element={<ProductAdd />} />} />
              <Route path="edit/:id" element={<PrivateRoute element={<ProductEdit />} />} />
            </Route>
            <Route path="order">
              <Route index element={<PrivateRoute element={<Order />} />} />
              <Route path="detail/:userId/:orderId" element={<PrivateRoute element={<OrderDetail />} />} />
            </Route>
          </Route>

          <Route path='auth'>
            <Route index element={<Login />} />
            <Route path="register" element={<Register />} />
            <Route path="forgot-password" element={<ForgotPassword />} />
            <Route path="reset-password" element={<ResetPassword />} />
          </Route>
        </Routes>
      </div>
    );
  };

  export default IndexRouter;
