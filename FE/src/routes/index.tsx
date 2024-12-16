import { Route, Routes } from "react-router-dom"
import LayoutAdmin from "../layout/Admin"
import AllProducts from "../components/Order/AllProducts"
import ProductAdd from "../components/Product/ProductAdd"
const IndexRouter = () => {
  return (
    <div>
      <Routes>
        <Route path='/' element={<LayoutAdmin />}>
          <Route path='/order' element={<AllProducts />} />
          <Route path='/products' element={<ProductAdd />} />
        </Route>
      </Routes>
    </div>
  )
}

export default IndexRouter
