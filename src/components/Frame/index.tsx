import React from 'react'
import { Outlet } from 'react-router-dom'
import './index.scss'
export default function Frame () {
  return(
    <div className='layout'>
      <div className='g-main'>
        <Outlet></Outlet>
      </div>
    </div>
  )
}
