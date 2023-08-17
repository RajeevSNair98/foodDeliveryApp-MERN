import React,{useState} from 'react'
import Layout from '../../Layout/Layout'
import {Form,Button} from 'react-bootstrap'
import {useNavigate} from 'react-router-dom'
import toast from 'react-hot-toast'
import axios from 'axios'

const ForgotPassword = () => {

    const [email,setEmail] = useState('')
    const [newPassword,setNewPassword] = useState('')
    const [answer,setAnswer] = useState('')

    const navigate = useNavigate()

    const handleSubmit = async(e)=>{
        e.preventDefault()
       
        try {
            const res = await axios.post(`${process.env.REACT_APP_API}/api/v1/auth/forgot-password`,
            {email,newPassword,answer})
            if(res.data.success){
                toast.success(res.data.message)
                navigate('/login')
            }else{
                toast.error(res.data.message)
            }

            
        } catch (error) {
            console.log(error);
            toast.error("Something went wrong")
        }
    }

  return (
    <div>
        <Layout>
        <div className="container">
    <div className="row ">
        <div className="col-3 col-md-4 col-lg-4"></div>
        <div className="col-6 col-md-4 col-lg-4 mt-5 text-center cont-1">
            <h2 className='text-center bg-warning mb-5'>Reset password</h2>
        <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label className='bg-light p-2'>Email address</Form.Label>
        <Form.Control type="email" value={email} onChange={(e)=> setEmail(e.target.value)} placeholder="Enter email" />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label className='bg-light p-2'>Verify</Form.Label>
        <Form.Control type="text" value={answer} onChange={(e)=> setAnswer(e.target.value)} placeholder="Enter your favorite sport ?" />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label className='bg-light p-2'>Password</Form.Label>
        <Form.Control type="password" value={newPassword} onChange={(e)=>setNewPassword(e.target.value)} placeholder="Password" />
      </Form.Group>

      <Button variant="primary"  className='mb-3'  type="submit">
        Reset
      </Button><br/>

      

    </Form>
        </div>
        <div className="col-3 col-md-4 col-lg-4"></div>
    </div>
   </div>

        </Layout>
    </div>
  )
}

export default ForgotPassword