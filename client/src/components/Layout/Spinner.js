import React,{useState,useEffect} from 'react'
import { useNavigate,useLocation } from 'react-router-dom'

const Spinner = ({path='login'}) => {
    const [count,setCount] = useState(5)
    const location = useLocation()
    const navigate = useNavigate()

    useEffect(()=>{
        const interval = setInterval(()=>{
            setCount((prevValue)=> --prevValue) 
        },1000)
        count === 0 && navigate(`${path}`,{
            state:location.pathname
        })
        return ()=> clearInterval(interval)
    },[count,navigate,location,path])

  return (
    <>
    <div className="d-flex flex-column justify-content-center" style={{height:'100vh'}}>
        <h1 className="text-center">redirecting to you {count}</h1>
        <div className="spinner-border" role='status'>
            <span className="visually-hidden">Loading...</span>
        </div>
    </div>
    </>
  )
}

export default Spinner