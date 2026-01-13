import { Navigate } from 'react-router-dom'
import React from 'react'
import { useSelector } from 'react-redux'

const ProtectedRoute = ({children,role}) => {
  const {userInfo}= useSelector((state)=>state.auth)
  if(!userInfo || (role && userInfo.role !== role)){
    return <Navigate to="/login" replace/>
  }
  return (
    children
  )
}

export default ProtectedRoute
