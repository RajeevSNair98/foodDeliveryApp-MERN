import React,{useState} from 'react'
import Layout from '../../Layout/Layout'
import {Form,Button} from 'react-bootstrap'
import {useNavigate} from 'react-router-dom'
import toast from 'react-hot-toast'
import axios from 'axios'

const Register = () => {

    const [name,setName] = useState('')
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')
    const [phone,setPhone] = useState('')
    const [address,setAddress] = useState('')
    const [answer,setAnswer] = useState('')
    const navigate = useNavigate()

    const handleSubmit = async(e)=>{
        e.preventDefault()
       
        try {
            const res = await axios.post(`${process.env.REACT_APP_API}/api/v1/auth/register`,
            {name,email,password,phone,address,answer})
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
    <Layout title={'Register-TastyEats'}>
          <div className="container ">
    <div className="row ">
        <div className="col-3 col-md-4 col-lg-4"></div>
        <div className="col-6 col-md-4 col-lg-4 mt-1 text-center">
            <h2 className='text-center bg-warning mb-2'>Sign-In Form</h2>
        <Form onSubmit={handleSubmit}>
      
        <Form.Group className="mb-1" controlId="formBasicEmail">
        <Form.Label className='bg-light '>Name</Form.Label>
        <Form.Control type="text" value={name} onChange={(e)=>setName(e.target.value)} required placeholder="Enter your name" />
      </Form.Group>
      
      <Form.Group className="mb-1" controlId="formBasicEmail">
        <Form.Label className='bg-light'>Email address</Form.Label>
        <Form.Control type="email" value={email} onChange={(e)=>setEmail(e.target.value)} required placeholder="Enter email" />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label className='bg-light'>Password</Form.Label>
        <Form.Control type="password" value={password} onChange={(e)=>setPassword(e.target.value)} required placeholder="Enter your Password" />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label className='bg-light'>Phone</Form.Label>
        <Form.Control type="number" value={phone} onChange={(e)=>setPhone(e.target.value)} required placeholder="Enter Phone number" />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label className='bg-light'>Address</Form.Label>
        <Form.Control type="textarea" value={address} onChange={(e)=>setAddress(e.target.value)} required placeholder="Enter your Address" />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label className='bg-light'>Verify</Form.Label>
        <Form.Control type="text" value={answer} onChange={(e)=>setAnswer(e.target.value)} required placeholder="What is your favorite sport ?" />
      </Form.Group>
     
      

      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
        </div>
        <div className="col-3 col-md-4 col-lg-4"></div>
    </div>
   </div>
    </Layout>
   
  )
}

export default Register