import React, { useState,useEffect } from "react";
import Layout from "../Layout/Layout";
import { useCart } from "../../context/cart";
import { useAuth } from "../../context/auth";
import { useNavigate } from "react-router-dom";
import DropIn from 'braintree-web-drop-in-react'
import axios from "axios";
import { toast } from "react-hot-toast";

const CartPage = () => {
  const { auth, setAuth } = useAuth();
  const [cart, setCart] = useCart();
  const navigate = useNavigate();
  const [clientToken,setClientToken] = useState('')
  const [instance,setInstance] = useState('')
  const [loading,setLoading] = useState(false)

  const totalPrice = () => {
    let total = 0;
    cart?.map((item) => {
      total = total + item.price;
    });
    return total;
  };

  const removeCartItem = (pid) => {
    try {
      let myCart = [...cart];
      let index = myCart.findIndex((item) => item._id === pid);
      myCart.splice(index, 1);
      setCart(myCart);
      localStorage.setItem("cart", JSON.stringify(myCart));
    } catch (error) {
      console.log(error);
    }
  };

  const getToken = async()=>{
    try {
        const {data} = await axios.get(`${process.env.REACT_APP_API}/api/v1/product/braintree/token`)
        setClientToken(data?.clientToken)
    } catch (error) {
        console.log(error);
    }
  }

  useEffect(()=>{
    getToken()
  },[auth?.token])

   const handlePayment = async()=>{
     try {
         setLoading(true)
         const {nonce} = await instance.requestPaymentMethod()
         const {data} = await axios.post(`${process.env.REACT_APP_API}/api/v1/product/braintree/payment`,{
             nonce,cart
         })
         setLoading(false)
         localStorage.removeItem('cart')
         setCart([])
         navigate('/dashboard/user/orders')
         toast.success('Payment completed')
         setLoading(false)
     } catch (error) {
         console.log(error);
     }
   }

  return (
    // <Layout>
    //   <div className="container">
    //     <div className="row">
    //       <div className="col-md-12">
    //         <div className="text-center bg-light p-2">
    //           <h1>{`Hello  ${auth?.token && auth?.user?.name}`}</h1>
    //           <h4 className="text-center">
    //             {cart?.length >= 1
    //               ? `You have ${cart.length} items in your cart
    //                      ${auth.token ? "" : "Please login to checkout"}`
    //               : "Your cart is empty"}
    //           </h4>
    //         </div>
    //       </div>
    //     </div>
    //     <div className="row">
    //       <div className="col-md-8">
    //         {cart?.map((p) => (
    //           <div className="row mb-2 p-3 card flex-row">
    //             <div className="col-md-4">
    //               <img
    //                 src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${p._id}`}
    //                 className="card-img-top h-50"
    //                 alt={p.name}
    //                 style={{ width: "70px", height: "170px !important" }}
    //               />
    //             </div>
    //             <div className="col-md-8">
    //               <h4>{p.name}</h4>
    //               <p>{p.description}</p>
    //               <h4>Price : {p.price}</h4>
    //               <button
    //                 className="btn btn-danger"
    //                 onClick={() => removeCartItem(p._id)}
    //               >
    //                 Remove
    //               </button>
    //             </div>
    //           </div>
    //         ))}
    //       </div>
    //       <div className="col-md-4 text-center">
    //         <h4>Cart summary</h4>
    //         <p>Total | Checkout | Payment</p>
    //         <hr />
    //         <h4>Total : {totalPrice()}</h4>
    //         {auth?.user?.address ? (
    //           <div className="mb-3">
    //             <h4>Current address</h4>
    //             <h5>{auth?.user?.address}</h5>
    //             <button
    //               className="btn btn-outline-warning"
    //               onClick={() => navigate("/dashboard/user/profile")}
    //             >
    //               Update Address
    //             </button>
    //           </div>
    //         ) : (
    //           <div className="mb-3">
    //             {auth?.token ? (
    //               <button
    //                 className="btn btn-outline-warning"
    //                 onClick={() => navigate("/dashboard/user/profile")}
    //               >
    //                 Update Address
    //               </button>
    //             ) : (
    //               <button onClick={() => navigate("/login",{state:"/cart"})}>
    //                 Please login to checkout
    //               </button>
    //             )}
    //           </div>
    //         )}
    //          <div className="mt-2">
    //             {!clientToken || !auth?.token || !cart?.length ? (
    //               ""
    //             ) : (
    //               <>
    //                 <DropIn
    //                   options={{
    //                     authorization: clientToken,
    //                     paypal: {
    //                       flow: "vault",
    //                     },
    //                   }}
    //                   onInstance={(instance) =>{ setInstance(instance)}}
    //                 />

    //                 <button
    //                   className="btn btn-primary"
    //                    onClick={handlePayment}
    //                   disabled={loading || !instance || !auth?.user?.address}
    //                 >
    //                   {loading ? "Processing ...." : "Make Payment"}
    //                 </button>
    //               </>
    //             )}
    //           </div>
    //       </div>
    //     </div>
    //   </div>
    // </Layout>
    <Layout>
    <div className="containe">
      <div className="row">
        <div className="col-md-12">
          <div className="text-center bg-light p-2">
            <h6>{`Hello  ${auth?.token && auth?.user?.name}`}</h6>
            <h5 className="text-center">
              {cart?.length >= 1
                ? `You have ${cart.length} items in your cart
                       ${auth.token ? "" : "Please login to checkout"}`
                : "Your cart is empty"}
            </h5>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-md-8">
          {cart?.map((p) => (
            <div className="row mb-2 p-3 card flex-row">
              <div className="col-md-4">
                <img
                  src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${p._id}`}
                  className="card-img-top h-50"
                  alt={p.name}
                  style={{ width: "70px", height: "170px !important" }}
                />
              </div>
              <div className="col-md-8">
                <h6><b>{p.name}</b></h6>
                <h6>Price : {p.price}</h6>
                <button
                  className="btn btn-danger"
                  onClick={() => removeCartItem(p._id)}
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
        <div className="col-md-4 text-center">
          <h6><b>Cart summary</b></h6>
          <p>Total | Checkout | Payment</p>
          <hr />
          <h6>Total : {totalPrice()}</h6>
          {auth?.user?.address ? (
            <div className="mb-3">
              <h6>Current address</h6>
              <h5>{auth?.user?.address}</h5>
              <button
                className="btn btn-outline-warning"
                onClick={() => navigate("/dashboard/user/profile")}
              >
                Update Address
              </button>
            </div>
          ) : (
            <div className="mb-3">
              {auth?.token ? (
                <button
                  className="btn btn-outline-warning"
                  onClick={() => navigate("/dashboard/user/profile")}
                >
                  Update Address
                </button>
              ) : (
                <button onClick={() => navigate("/login",{state:"/cart"})}>
                  Please login to checkout
                </button>
              )}
            </div>
          )}
           <div className="mt-2">
              {!clientToken || !auth?.token || !cart?.length ? (
                ""
              ) : (
                <>
                  <DropIn
                    options={{
                      authorization: clientToken,
                      paypal: {
                        flow: "vault",
                      },
                    }}
                    onInstance={(instance) =>{ setInstance(instance)}}
                  />

                  <button
                    className="btn btn-primary"
                     onClick={handlePayment}
                    disabled={loading || !instance || !auth?.user?.address}
                  >
                    {loading ? "Processing ...." : "Make Payment"}
                  </button>
                </>
              )}
            </div>
        </div>
      </div>
    </div>
  </Layout>
  );
};

export default CartPage;
