import React from 'react'
import DashBoard from '../components/DashBoard'
import { Outlet } from 'react-router-dom'

const LayoutAdmin = () => {
  return (
    <div>
      <DashBoard />
      {/* <Outlet /> */}
    </div>
  )
}

export default LayoutAdmin
