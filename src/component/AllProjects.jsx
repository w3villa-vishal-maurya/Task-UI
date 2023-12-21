import React, { useState, useContext, useEffect } from 'react';
import axios from "../api/axios";
import AuthContext from '../context/AuthProvider';
import Project from './Project';
import "./style/project.css"

const SHOE_ASSIGNED_PROJECT = "/project/show-assigned-project"

const Meeting = () => {
    const { auth } = useContext(AuthContext);
    const [errMsg, setErrMsg] = useState('');
    const [projects, setProjects] = useState([]);

    useEffect(() => {
        // document.addEventListener('DOMContentLoaded', function () {
        // var modeSwitch = document.querySelector('.mode-switch');
        // modeSwitch.addEventListener('click', function () {
        //     document.documentElement.classList.toggle('dark');
        //     modeSwitch.classList.toggle('active');
        // });
        var listView = document.querySelector('.list-view');
        var gridView = document.querySelector('.grid-view');
        var projectsList = document.querySelector('.project-boxes');
        listView.addEventListener('click', function () {
            gridView.classList.remove('active');
            listView.classList.add('active');
            projectsList.classList.remove('jsGridView');
            projectsList.classList.add('jsListView');
        });
        gridView.addEventListener('click', function () {
            gridView.classList.add('active');
            listView.classList.remove('active');
            projectsList.classList.remove('jsListView');
            projectsList.classList.add('jsGridView');
        });
        // document.querySelector('.messages-btn').addEventListener('click', function () {
        //     document.querySelector('.messages-section').classList.add('show');
        // });
        // document.querySelector('.messages-close').addEventListener('click', function () {
        //     document.querySelector('.messages-section').classList.remove('show');
        // });
        // });

        async function getAllProject() {
            try {
                // initMDB({ Dropdown, Collapse });
                // if(!dataFetched || isDeletedData) {
                const response = await axios.get(SHOE_ASSIGNED_PROJECT, {
                    headers: { Authorization: auth.accessToken }
                });

                // Set the response data in state
                console.log(response.data.Projects);
                if (response?.data?.Projects) {
                    setProjects(response.data.Projects);
                }
                else {
                    setErrMsg(response?.data?.message);
                }
            } catch (err) {
                if (!err?.response) {
                    setErrMsg('No server response');
                }
                else if (err.response?.status === 400) {
                    setErrMsg('You have not any current project yet...');
                } else if (err.response?.status === 401) {
                    setErrMsg('Unautherized');
                }
                else if (err.response?.status === 403) {
                    setErrMsg('User is not logged In');
                }
                else {
                    setErrMsg('Login failed');
                }

                // errRef.current.focus();
            }
        }

        getAllProject();
        // eslint-disable-next-line react-hooks/exhaustive-deps

    }, [])

    return (

        <>
            <div class="projects-section">
                <div class="projects-section-header">
                    <p>Projects</p>
                    <p class="time">December, 12</p>
                </div>
                <div class="projects-section-line">
                    <div class="projects-status">
                        <div class="item-status">
                            <span class="status-number">{projects.length}</span>
                            <span class="status-type">In Progress</span>
                        </div>
                        <div class="item-status">
                            <span class="status-number">{projects.length}</span>
                            <span class="status-type">Upcoming</span>
                        </div>
                        <div class="item-status">
                            <span class="status-number">{projects.length}</span>
                            <span class="status-type">Total Projects</span>
                        </div>
                    </div>
                    <div class="view-actions">
                        <button class="view-btn list-view" title="List View">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                                fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                stroke-linejoin="round" class="feather feather-list">
                                <line x1="8" y1="6" x2="21" y2="6" />
                                <line x1="8" y1="12" x2="21" y2="12" />
                                <line x1="8" y1="18" x2="21" y2="18" />
                                <line x1="3" y1="6" x2="3.01" y2="6" />
                                <line x1="3" y1="12" x2="3.01" y2="12" />
                                <line x1="3" y1="18" x2="3.01" y2="18" />
                            </svg>
                        </button>
                        <button class="view-btn grid-view active" title="Grid View">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"
                                fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                stroke-linejoin="round" class="feather feather-grid">
                                <rect x="3" y="3" width="7" height="7" />
                                <rect x="14" y="3" width="7" height="7" />
                                <rect x="14" y="14" width="7" height="7" />
                                <rect x="3" y="14" width="7" height="7" />
                            </svg>
                        </button>
                    </div>
                </div>
                <div class="project-boxes jsGridView">
                    {
                        projects.length > 0
                            ?
                            projects?.map((item) => (

                                < Project item={item} />
                            ))
                            :
                            <div>{errMsg}</div>
                    }



                </div>
            </div>
        </>

    )
}

export default Meeting


