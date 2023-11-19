import React from 'react'
import "./ChakriBusiness.scss"
import ChakriLogo from '../../assets/ChakriLogo'


const ChakriBusiness = () => {
  return (
    <div className="chakri">
      <div className="container">
        <div className="item">
        <h1>Chakri Khujoo Business</h1>
        <h1>Advanced solutions and professional talent for businesses</h1>
        <p></p>
        <div className="title">
            <ChakriLogo />
            <b>Chakri Khujoo Pro</b>
        </div>
        <p>Access top freelancers and professional business tools for any project</p>
        <div className="title">
            <ChakriLogo />
            <b>Chakri Khujoo Certified</b>
        </div>
        <p>Build your own branded marketplace of certified experts</p>
        <div className="title">
            <ChakriLogo />
            <b>Chakri Khujoo Enterprise</b>
        </div>
        <p>Manage your freelance workforce and onboard additional talent with an end-to-end SaaS solution</p>

        <button>Explore Chakri Khujoo Buisness</button>
        </div>
        <div className="item">
            <img src='https://fiverr-res.cloudinary.com/q_auto,f_auto,w_870,dpr_1.0/v1/attachments/generic_asset/asset/51c35c7cecf75e6a5a0110d27909a2f5-1690202609364/EN.png' />
        </div>
      </div>
    </div>
  )
}

export default ChakriBusiness