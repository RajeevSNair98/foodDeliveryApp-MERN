import React from 'react'
import { Link } from 'react-router-dom'
import './Footer.css'

const Footer = () => {
  return (
    <div className='bg-dark text-light p-3 container'>
        <h4 className='text-center'>All right reserved &copy; TastyEats  </h4>
        {/* <p className="text-center mt-3 ">
            <Link className='mx-3 f' to={'/about'}>About</Link>
            |
            <Link className='mx-3 f' to={'/contact'}>Contact</Link>
            |
            <Link className='mx-3 f' to={'/policy'}>Privacy Policy</Link>
        </p> */}
    </div>
  )
}

export default Footer