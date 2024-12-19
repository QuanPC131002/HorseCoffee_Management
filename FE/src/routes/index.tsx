import { Route, Routes } from "react-router-dom"
import MenuAll from "../components/Order/AllProducts"
import ProductAdd from "../components/Product/ProductAdd"
import LayoutAdmin from "../layout/Admin"
import CategoryAdd from "../components/Category/CategoryAdd"
import CategoryList from "../components/Category/CategoryList"
import CategoryEdit from "../components/Category/CategoryEdit"
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
        </Route>
      </Routes>
    </div>
  )
}

export default IndexRouter
