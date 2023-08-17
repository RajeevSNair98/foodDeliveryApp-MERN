import React from 'react'
import { NavLink } from 'react-router-dom'

const UserMenu = () => {
  return (
    <div className='container '>
        <div className="text-center ">
    <div className="list-group">
    <h1 className='bg-warning'>Dashboard</h1>
    <NavLink to="/dashboard/user/profile" className="bg-primary list-group-item list-group-item-action">Profile</NavLink>
    <NavLink to="/dashboard/user/orders" className="bg-info list-group-item list-group-item-action">Orders</NavLink>
    </div>
    </div>
    </div>
  )
}

export default UserMenu