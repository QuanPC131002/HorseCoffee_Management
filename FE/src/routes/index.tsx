  import { Route, Routes } from 'react-router-dom';
import ForgotPassword from '../components/Auth/ForgotPasswod';
import Login from "../components/Auth/Login";
import ChangePassword from '../components/Auth/Profile/ChangePassword';
import LayoutProfile from '../components/Auth/Profile/LayoutProfile';
import Register from "../components/Auth/Register";
import ResetPassword from '../components/Auth/ResetPassword';
import CategoryAdd from "../components/Category/CategoryAdd";
import CategoryEdit from "../components/Category/CategoryEdit";
import CategoryList from "../components/Category/CategoryList";
import MenuAll from "../components/Menu/AllProducts";
import OrderDetail from "../components/Order/OrderDetail";
import Order from "../components/Order/OrderList";
import ProductAdd from "../components/Product/ProductAdd";
import ProductEdit from "../components/Product/ProductEdit";
import ProductList from "../components/Product/ProductList";
import WareAdd from "../components/WareHouse/WareAdd";
import WareEdit from "../components/WareHouse/WareEdit";
import WareList from "../components/WareHouse/WareList";
import LayoutAdmin from "../layout/Admin";
import PrivateRoute from './PrivateRouter';
import Statis from '../components/Stastis/Statis';

  const IndexRouter = () => {
    return (
      <div>
        <Routes>
          <Route path='/' element={<LayoutAdmin />}>
            <Route path='menu'>
              <Route index element={<PrivateRoute element={<MenuAll />} />} />
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

            <Route path="statis">
              <Route index element={<PrivateRoute element={<Statis />} />} />
            </Route>

            <Route path='profile'>
              <Route index element={<PrivateRoute element={<LayoutProfile />} />} />
              <Route path='change-password' element={<PrivateRoute element={<ChangePassword />} />} />
            </Route>
          </Route>

          <Route path='auth'>
            <Route index element={<Login />} />
            <Route path="register" element={<Register />} />
            <Route path="forgot-password" element={<ForgotPassword />} />
            <Route path="reset-password" element={<ResetPassword />} />
            <Route path="profile/:id" element={<LayoutProfile />} />
          </Route>
        </Routes>
      </div>
    );
  };

  export default IndexRouter;
