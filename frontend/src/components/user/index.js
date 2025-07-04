import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from '../main/Navbar'
import { Footer } from '../main/Footer'

const index = () => {
    return (
        <div>
            <Navbar />
            <Outlet />
            {/* <Footer /> */}
        </div>
    )
}

export default index