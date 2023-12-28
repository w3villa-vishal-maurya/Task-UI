import React from 'react'
import "./component/style/general.css"
import Navbar from './component/Navbar'
import Login from './component/Login'
import Registration from './component/Registration'
import { Routes, Route } from 'react-router-dom';
import TaskFrame from './component/TaskFrame';
import RequireAuth from './component/RequireAuth';
import ForgetPassword from './component/ForgetPassword'
import ResetPassword from './component/ResetPassword'




const App = () => {

  return (
    <>
      <Navbar />
      <Routes>

        {/* {Public Routes} */}
        <Route path="/register" element={<Registration />} />
        <Route path="/login" element={<Login />} />
        <Route path="/admin/login" element={<Login />} />
        <Route path="/forget-password" element={<ForgetPassword />} />
        <Route path="/reset-password/*" element={<ResetPassword />} />

        {/* {Private Routes} */}
        <Route element={<RequireAuth />}>
          <Route path="*" element={<TaskFrame />} />
        </Route>



      </Routes>
    </>
  )
}

export default App
