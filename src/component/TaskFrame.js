import { Dropdown, Collapse, initMDB } from "mdb-ui-kit";
import React, {useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import "./style/task.css"
import Task from './Task'
import CreateTask from './CreateTask';
import UpcomingTask from './UpcomingTask';
import Meeting from './AllProjects';
import { useNavigate } from 'react-router-dom';
import Layout from "./Layout";
import UserProfile from './UserProfile';
import UpdateTask from "./UpdateTask";
import ErrorPage from "./ErrorPage";
import ProjectDashboard from "./ProjectDashboard";
import CreateProject from "./CreateProject";





const TaskFrame = () => {
    const navigate = useNavigate();

    useEffect(() => {   
        initMDB({ Dropdown, Collapse });
    }, [])

    return (
        <>
            <div className='task-manager'>
                <div className="left-bar">
                    <div className="left-content">
                        <ul className="action-list">
                            <li className="item item-p">
                                <img className="feather feather-star" src="../svg/star.svg" alt="" />
                                <span onClick={() => navigate("/create-task")}>Create</span>
                            </li>
                            <li className="item item-p">
                                <img className="feather feather-inbox" src="../svg/inbox.svg" alt="" />
                                <span onClick={() => navigate("/all-task")}>Inbox</span>
                            </li>
                            <li className="item item-p">
                                <img className="feather feather-calendar" src="../svg/calender.svg" alt="" />
                                <span onClick={() => navigate("/upcoming-task")}>Upcoming</span>
                            </li>
                            <li className="item item-p">
                                <img className="feather feather-users" src="../svg/users.svg" alt="" />
                                <span onClick={() => navigate("/projects")}>Projects</span>
                            </li>


                            {/* <li className="item">
                                    <img className="feather feather-trash" src="svg/trash.svg" alt="" />
                                    <span>Trash</span>
                                </li> */}
                        </ul>

                    </div>

                    {/* <div className="upper-part">
                            <div className="actions">
                                <div className="circle"></div>
                                <div className="circle-2"></div>
                            </div>
                        </div> */}
                </div>

                <div className="page-content row  d-flex  align-items-center h-100">
                    {/* Use React Router to render the content dynamically */}
                    <Routes>
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
                    </Routes>

                    {/* Render Meetings component based on the state */}
                </div>
            </div >
        </>
    )
}

export default TaskFrame
