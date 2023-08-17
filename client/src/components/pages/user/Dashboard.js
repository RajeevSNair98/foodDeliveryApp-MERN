import React from 'react'
import Layout from '../../Layout/Layout'
import UserMenu from '../../Layout/UserMenu'
import { useAuth } from '../../../context/auth'

const Dashboard = () => {
  const {auth} = useAuth()
  return (
    <Layout title={'Dashboard - Ecommerce App'}>
          <div className="container m-3 p-3">
            <div className="row">
              <div className="col-md-4 col-12">
                <UserMenu/>
              </div>
              <div className="col-md-8 mt-3 col-12">
                <div className="card  p-3 text-center mt-5 ">
                    <h3 className='p-1'><span className='bg-danger p-1 text-white'>Name</span> : <b>{auth?.user?.name}</b></h3>
                    <h3><span className='bg-danger p-1 text-white'>Email</span> : <b>{auth?.user?.email}</b></h3>
                    <h3><span className='bg-danger p-1 text-white'>Address </span> : <b>{auth?.user?.address}</b></h3>
                </div>
              </div>
            </div>
          </div>
    </Layout>
  )
}

export default Dashboard