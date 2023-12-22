import React, { useState, useContext, useEffect } from 'react';
import AuthContext from '../context/AuthProvider';
import axios from '../api/axios';
import { useLocation } from 'react-router-dom';
import "./style/projectDashboard.css";

const ProjectDashboard = () => {
    const { auth } = useContext(AuthContext);
    // const navigate = useNavigate();
    const [project, setProject] = useState({});
    const [errMsg, setErrMsg] = useState('');
    const [projectTask, setProjectTask] = useState([]);
    let [projectUser, setProjectUser] = useState([]);

    const location = useLocation();
    // const navigate = useNavigate();


    const path = location.pathname.split('/');
    const projectId = path[2];

    useEffect(() => {
        async function getProjectWithId() {
            try {
                console.log({ "hello me": auth });
                const PROJECT_WITH_ID = `/project/${projectId}`;

                const response = await axios.get(PROJECT_WITH_ID,
                    {
                        headers: { Authorization: auth.accessToken }
                    }
                );


                setProject(response?.data?.project);

                response?.data?.projectTask.length ? setProjectTask(response?.data?.projectTask) : setErrMsg("Not any task created yet!");

                response?.data?.projectUser.length ? setProjectUser(response?.data?.projectUser) : setErrMsg("Not any user listed yet!");
            }
            catch (err) {
                if (!err?.response) {
                    setErrMsg('No server response');
                }
                else if (err.response?.status === 400) {
                    setErrMsg('Task not found....');
                    // navigate(from, { replace: true });
                } else if (err.response?.status === 401) {
                    setErrMsg('Unautherized');
                }
                else {
                    setErrMsg('You are not login, Login first...');
                }
            }

        }

        getProjectWithId()




        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <div className='project-dashboard'>
            <div class="head-title">
                <div class="left">
                    <h1>{project?.projectName}</h1>
                    <ul class="breadcrumb">
                        <li>
                            <div>{project?.projectName}</div>
                        </li>
                        <li><i class='bx bx-chevron-right'></i></li>
                        <li>
                            <a class="active" href={`${"/projects"}`}>Back</a>
                        </li>
                    </ul>
                </div>
                {/* <a href="#" class="btn-download">
                    <i class='bx bxs-cloud-download'></i>
                    <span class="text">Download PDF</span>
                </a> */}
            </div>

            <ul class="box-info">
                <li>
                    <i class='bx bxs-calendar-check'></i>
                    <span class="text">
                        <h3>{projectTask?.length}</h3>
                        <p>Total Task</p>
                    </span>
                </li>
                <li>
                    <i class='bx bxs-group'></i>
                    <span class="text">
                        <h3>{project?.users?.length}</h3>
                        <p>Users</p>
                    </span>
                </li>
                <li>
                    <i class='bx bxs-dollar-circle'></i>
                    <span class="text">
                        <h3>$2543</h3>
                        <p>Total Sales</p>
                    </span>
                </li>
            </ul>


            <div class="table-data">
                <div class="order">
                    <div class="head">
                        <h3>Recent Tasks</h3>
                        <i class='bx bx-search'></i>
                        <i class='bx bx-filter'></i>
                    </div>
                    <table>
                        <thead>
                            <tr>
                                <th>Task</th>
                                <th>Date Created</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {projectTask.length > 0 ?
                                projectTask.map((item) => (
                                    <tr id={item?._id}>
                                        <td>
                                            {/* <img src="img/people.png" /> */}
                                            <p>{item?.description}</p>
                                        </td>
                                        <td>{new Date(item?.createdAt).toLocaleDateString()}</td>
                                        <td><span class={item?.completed ? "status completed" : "status pending"}>{item?.completed ? "completed" : "pending"}</span></td>
                                    </tr>
                                ))
                                :
                                <tr>
                                    <td>
                                        <p>{errMsg}</p>
                                    </td>
                                    {/* <td>{new Date(item?.createdAt).toLocaleDateString()}</td>
                                    <td><span class={item?.completed ? "status completed" : "status pending"}>{item?.completed ? "completed" : "pending"}</span></td> */}
                                </tr>

                            }


                        </tbody>
                    </table>
                </div>
                <div class="todo">
                    <div class="head">
                        <h3>User</h3>
                        <i class='bx bx-plus'></i>
                        <i class='bx bx-filter'></i>
                    </div>
                    <ul class="todo-list">
                        {console.log(projectUser)}

                        {projectUser.length ?
                            projectUser
                                .filter((user) => user?._id === auth?.user_id)
                                .map((user) => (
                                    <li class="completed auth_user" id={user?._id}>
                                        <p>{user?.name}</p>
                                        <i class='bx bx-dots-vertical-rounded'></i>
                                    </li>
                                ))
                            :
                            <li class="completed">
                                <p>{setErrMsg}</p>
                                <i class='bx bx-dots-vertical-rounded'></i>
                            </li>

                        }
                        {projectUser.length ?
                            projectUser
                                .filter((user) => user?._id !== auth?.user_id)
                                .map((user) => (
                                    <li class="completed" id={user?._id}>
                                        <p>{user?.name}</p>
                                        <i class='bx bx-dots-vertical-rounded'></i>
                                    </li>
                                ))
                            :
                            <div>{errMsg}</div>
                        }

                    </ul>
                </div>
            </div>
        </div>
    )
}

export default ProjectDashboard
