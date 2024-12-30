import { ToastContainer } from 'react-toastify'
import './App.css'
import IndexRouter from './routes/index.js'
function App() {
  return (
    <>
      <IndexRouter />
      <ToastContainer />
    </>
  )
}

export default App
