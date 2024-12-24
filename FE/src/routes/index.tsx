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
const IndexRouter = () => {
  return (
    <div>
      <Routes>
        <Route path='/' element={<LayoutAdmin />}>
          <Route path='order' element={<MenuAll />} />
          <Route path='products' element={<ProductAdd />} />
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
        </Route>
      </Routes>
    </div>
  )
}

export default IndexRouter
