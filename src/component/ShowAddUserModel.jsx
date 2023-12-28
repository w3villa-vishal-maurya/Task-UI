import React, { useRef, useEffect, useState, useContext } from 'react'
import { Dropdown, Collapse, initMDB } from "mdb-ui-kit";
import axios from '../api/axios';
import AuthContext from '../context/AuthProvider';
import { useLocation } from 'react-router-dom';

const SHOW_ALL_USER = "/project/show-users";
const ADD_PROJECT_TO_USER = "/project//add-user-to-project";


const ShowAddUserModel = ({ closeUserModel }) => {
    const checkRef = useRef();
    const { auth } = useContext(AuthContext);
    const [errMsg, setErrMsg] = useState('');
    const [projectUsers, setProjectUsers] = useState([]);
    const [checkedState, setCheckedState] = useState([]);

    window.onclick = function (event) {
        if (event.target.id == "modal-2") {
            closeUserModel();
        }
    }


    const location = useLocation();

    const path = location.pathname.split('/');
    const projectId = path[2];

    useEffect(() => {
        initMDB({ Dropdown, Collapse });
        async function showAllUser() {
            try {
                const response = await axios.post(SHOW_ALL_USER,
                    {
                        projectId
                    },
                    {
                        headers: { Authorization: auth.accessToken }
                    }
                );

                // console.log(response.data.Users);
                setProjectUsers(response.data?.Users);
                setErrMsg("");
            } catch (err) {
                if (!err?.response) {
                    setErrMsg('No server response');
                }
                else if (err.response?.status === 400) {
                    setErrMsg('No available any users!');
                } else if (err.response?.status === 401) {
                    setErrMsg('Unautherized');
                }
                else {
                    setErrMsg('You are not login, Login first...');
                }
            }
        }

        showAllUser();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        setCheckedState(new Array(projectUsers.length).fill(false));
    }, [projectUsers])



    const handleOnChange = (position) => {
        const updatedCheckedState = checkedState.map((item, index) =>
            index === position ? !item : item
        );
        setCheckedState(updatedCheckedState);
    }

    const handleAddUserSubmit = async () => {
        try {
            const addUsers = checkedState
                .map((item, index) => {
                    if (item) {
                        return projectUsers[index]?._id;
                    }
                })
                .filter((item) => {
                    if (item) {
                        return true;
                    }
                })

            console.log(addUsers);

            const response = await axios.post(ADD_PROJECT_TO_USER,
                {
                    projectId,
                    addUsers
                },
                {
                    headers: { Authorization: auth.accessToken }
                }
            );

            console.log(response.data?.message);
            alert(response.data?.message);
            closeUserModel();
        }
        catch (err) {
            if (!err?.response) {
                setErrMsg('No server response');
            }
            else if (err.response?.status === 400) {
                setErrMsg('No any user exixts...');
                // navigate(from, { replace: true });
            } else if (err.response?.status === 401) {
                setErrMsg('Unautherized');
            }
            else {
                setErrMsg('You are not login, Login first...');
            }
        }
    }

    return (
        <>
            <div className='modal-wrapper' id="modal-2"></div>
            <div className='modal-container'>
                <div class="todo">
                    <div class="head">
                        <h3>Available User</h3>
                    </div>
                    <ul class="user-list">
                        {projectUsers.length ?
                            projectUsers
                                .map((user, index) => (
                                    <li id={user?._id}>
                                        <input
                                            id={index}
                                            className=""
                                            name="task"
                                            type="checkbox"
                                            checked={checkedState[index]}
                                            onChange={() => handleOnChange(index)}
                                        />
                                        <label htmlFor={user?._id}>
                                            <span className="">{user?.name}</span>
                                        </label>
                                    </li>
                                ))
                            :
                            <div>{errMsg}</div>
                        }

                    </ul>
                </div>

                <button onClick={handleAddUserSubmit}>Add User</button>
            </div>
        </>
    )
}

export default ShowAddUserModel
