import React from 'react'
import "./component/style/general.css"
import Navbar from './component/Navbar'
import Login from './component/Login'
import Registration from './component/Registration'
import { Routes, Route } from 'react-router-dom';
import RequireAuth from './component/RequireAuth';
import ForgetPassword from './component/ForgetPassword'
import ResetPassword from './component/ResetPassword'
import Task from './component/Task'
import UpcomingTask from './component/UpcomingTask'
import UserProfile from './component/UserProfile'
import UpdateTask from './component/UpdateTask'
import CreateProject from './component/CreateProject'
import CreateTask from './component/CreateTask'
import Meeting from './component/AllProjects'
import ErrorPage from './component/ErrorPage'
import ProjectDashboard from './component/ProjectDashboard'
import Layout from './component/Layout'

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
          <Route path='/' element={<Layout />}>
            <Route path="/create-task" element={<CreateTask />} />
            <Route path="/all-task" element={<Task />} />
            <Route path="/upcoming-task" element={<UpcomingTask />} errorElement={<ErrorPage />} />
            <Route path="/user-profile" element={<UserProfile />} />
            <Route path="/update-task/:token" element={<UpdateTask />} />
            <Route path="/projects" element={<Meeting />} />
            <Route path="/projects/create" element={<CreateProject />} />
            <Route path="/projects/:id" element={<ProjectDashboard />} />
            <Route path="/*" element={<ErrorPage />} />
          </Route>
        </Route>



      </Routes>
    </>
  )
}

export default App
