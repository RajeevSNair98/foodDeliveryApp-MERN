import React from "react";
import Layout from "../Layout/Layout";
import image1 from "../../images/img1.gif";
import image2 from "../../images/img2.png";
import './About.css'

const About = () => {
  return (
    <Layout title={"About us - TastyEats"}>
   <section className='banner container'>
          <div className=" row">
            <div className="col-md-12" >
            <div className="banner-contents d-flex">
                          <div className="banner-text ">
                              <div className="banner-head border-bottom border-dange ">
                                   <h1>Fastest <span className='fw-bold'>Delivery</span>&</h1>
                                   <h1 className='fw-bold'><span>Easy Pickup</span></h1>
                              </div>
                              <div className="banner-para mt-5">
                                   <p>When you are too lazy to cook</p>
                                   <p>we are just a click away...!</p>
                                   <img className='w100' style={{height:"230px"}} src={image1} alt="" /> 
                              </div> 
                          </div>
                      </div>
            </div>
          </div>
      </section>
    </Layout>
  );
};

export default About;
