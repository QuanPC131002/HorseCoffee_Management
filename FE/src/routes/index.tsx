import { Route, Routes } from "react-router-dom"
import MenuAll from "../components/Order/AllProducts"
import ProductAdd from "../components/Product/ProductAdd"
import LayoutAdmin from "../layout/Admin"
import CategoryAdd from "../components/Category/CategoryAdd"
import CategoryList from "../components/Category/CategoryList"
import CategoryEdit from "../components/Category/CategoryEdit"
import WareList from "../components/WareHouse/WareList"
import WareAdd from "../components/WareHouse/WareAdd"
import WareEdit from "../components/WareHouse/WareEdit"
import ProductList from "../components/Product/ProductList"
import ProductEdit from "../components/Product/ProductEdit"
const IndexRouter = () => {
  return (
    <div>
      <Routes>
        <Route path='/' element={<LayoutAdmin />}>
          <Route path='order' element={<MenuAll />} />
          <Route path='categories'>
            <Route index element={<CategoryList />} />
            <Route path="add" element={<CategoryAdd />} />
            <Route path="edit/:id" element={<CategoryEdit />} />
          </Route>
          <Route path='ware'>
            <Route index element={<WareList />} />
            <Route path="add" element={<WareAdd />} />
            <Route path="edit/:id" element={<WareEdit />} />
          </Route>

          <Route path='products'>
            <Route index element={<ProductList />} />
            <Route path="add" element={<ProductAdd />} />
            <Route path="edit/:id" element={<ProductEdit />} />
          </Route>
        </Route>
      </Routes>
    </div>
  )
}

export default IndexRouter
