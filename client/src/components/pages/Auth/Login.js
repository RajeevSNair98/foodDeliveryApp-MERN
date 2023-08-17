import React,{useState} from 'react'
import Layout from '../../Layout/Layout'
import {Form,Button} from 'react-bootstrap'
import {useNavigate,useLocation} from 'react-router-dom'
import toast from 'react-hot-toast'
import axios from 'axios'
import { useAuth } from '../../../context/auth'

const Login = () => {

    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')
    const {auth,setAuth} = useAuth()
    const navigate = useNavigate()
    const location = useLocation()

    const handleSubmit = async(e)=>{
        e.preventDefault()
       
        try {
            const res = await axios.post(`${process.env.REACT_APP_API}/api/v1/auth/login`,
            {email,password})
            if(res.data.success){
                toast.success(res.data.message)
                setAuth({
                    ...auth,
                    user:res.data.user,
                    token:res.data.token

                });
                localStorage.setItem('auth',JSON.stringify(res.data))
                navigate(location.state ||'/')
            }else{
                toast.error(res.data.message)
            }

            
        } catch (error) {
            console.log(error);
            toast.error("Something went wrong")
        }
    }


  return (
    <Layout title={'Login - TastyEats'}>
        <div className="container">
    <div className="row ">
        <div className="col-3 col-md-4 col-lg-4"></div>
        <div className="col-6 col-md-4 col-lg-4 mt-5 text-center cont-1">
            <h2 className='text-center bg-warning mb-5'>Login Form</h2>
        <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label className='bg-light p-2'>Email address</Form.Label>
        <Form.Control type="email" value={email} onChange={(e)=> setEmail(e.target.value)} placeholder="Enter email" />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label className='bg-light p-2'>Password</Form.Label>
        <Form.Control type="password" value={password} onChange={(e)=>setPassword(e.target.value)} placeholder="Password" />
      </Form.Group>

      <Button variant="primary"  className='mb-3'  type="submit">
        Submit
      </Button><br/>

      <Button variant="dark w-75 h-25" onClick={()=>{navigate('/forgot-password')}}>
        Forgot password
      </Button>
      

    </Form>
        </div>
        <div className="col-3 col-md-4 col-lg-4"></div>
    </div>
   </div>
    </Layout>
          
  )
}

export default Login