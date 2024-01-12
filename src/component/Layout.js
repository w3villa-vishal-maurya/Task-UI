import { Outlet } from "react-router-dom";
import { Dropdown, Collapse, initMDB } from "mdb-ui-kit";
import React, { useEffect } from 'react';
import "./style/task.css"
import { useNavigate } from 'react-router-dom';

const Layout = () => {
    const navigate = useNavigate();

    useEffect(() => {
        initMDB({ Dropdown, Collapse });
    }, [])
    return (
        <main className="app">
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
                    <Outlet />
                    {/* Render Meetings component based on the state */}
                </div>
            </div >

        </main>
    )
}

export default Layout;