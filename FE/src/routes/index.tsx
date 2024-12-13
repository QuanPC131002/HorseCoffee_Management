import { Route, Routes } from "react-router-dom"
import LayoutAdmin from "../layout/Admin"
const IndexRouter = () => {
  return (
    <div>
      <Routes>
        <Route path='/' element={<LayoutAdmin />} />
      </Routes>
    </div>
  )
}

export default IndexRouter
