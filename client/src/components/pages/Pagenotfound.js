import React from 'react'
import Layout from '../Layout/Layout'
import './Pagenotfound.css'

const Pagenotfound = () => {
  return (
    <Layout title={'Pagenotfound'}>
       <div className="pnf container">
        <div className="pnf-title">404</div>
        <h2 className='pnf-heading'>Oops ! Page not found</h2>
       </div>
    </Layout>
  )
}

export default Pagenotfound