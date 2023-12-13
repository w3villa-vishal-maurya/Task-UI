import React, { useEffect, useState, useContext } from 'react'
import "./style/general.css"
import AuthContext from '../context/AuthProvider';
import {useNavigate} from 'react-router-dom';
import axios from '../api/axios';



const SHOW_PROFILE = "/profile";

const UserProfile = () => {
    const { auth} = useContext(AuthContext);
    const [showProfileData, setShowProfileData] = useState([]);
    const [errMsg, setErrMsg] = useState('');

    const navigate = useNavigate();

    const loginFrom = "/login";

    useEffect(()=>{
        async function showProfile(){
            try {

                // console.log(auth.accessToken);
                const response = await axios.get(SHOW_PROFILE, {
                    headers: { Authorization: auth.accessToken }
                });

                setShowProfileData(response.data?.profile);
            } catch (err) {
                if (!err?.response) {
                    setErrMsg('No server response');
                    navigate(loginFrom, { replace: true });
                }
                else if (err.response?.status === 400) {
                    setErrMsg('You have not any current task yet...');
                } else if (err.response?.status === 401) {
                    setErrMsg('Unautherized');
                    navigate(loginFrom, { replace: true });
                }
                else if (err.response?.status === 403) {
                    setErrMsg('User is not logged In');
                }
                else {
                    setErrMsg('Login failed');
                }

                // errRef.current.focus();
                console.log(errMsg);
            }
        }

        showProfile();
         // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])
    return (
        <>
            <section className="user-style-1 page-content" >
                <div className="container py-5 h-100">
                    <div className="row d-flex justify-content-center align-items-center h-100">
                        <div className="col col-lg-12 mb-4 mb-lg-0">
                            <div className="card mb-3 user-style-2">
                                <div className="row g-0">
                                    <div className="col-md-4 gradient-custom text-center text-white user-style-3"
                                    >
                                        <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava1-bg.webp"
                                            alt="Avatar" className="img-fluid my-5 user-style-4" />
                                        <h5>{showProfileData[0]?.name}</h5>
                                        <p>Web Developer</p>
                                        <i className="far fa-edit mb-5"></i>
                                    </div>
                                    <div className="col-md-8">
                                        <div className="card-body p-4">
                                            <h6>Information</h6>
                                            <hr className="mt-0 mb-4" />
                                            <div className="row pt-1">
                                                <div className="col-6 mb-3">
                                                    <h6>email</h6>
                                                    <p className="text-muted">{showProfileData[0]?.email}</p>
                                                </div>
                                                <div className="col-6 mb-3">
                                                    <h6>Phone</h6>
                                                    <p className="text-muted">{showProfileData[0]?.phoneNumber}</p>
                                                </div>
                                            </div>
                                            <h6>Projects</h6>
                                            <hr className="mt-0 mb-4" />
                                            <div className="row pt-1">
                                                <div className="col-6 mb-3">
                                                    <h6>Recent</h6>
                                                    <p className="text-muted">Lorem ipsum</p>
                                                </div>
                                                <div className="col-6 mb-3">
                                                    <h6>Most Viewed</h6>
                                                    <p className="text-muted">Dolor sit amet</p>
                                                </div>
                                            </div>
                                            <div className="d-flex justify-content-start">
                                                <a href="#!"><i className="fab fa-facebook-f fa-lg me-3"></i></a>
                                                <a href="#!"><i className="fab fa-twitter fa-lg me-3"></i></a>
                                                <a href="#!"><i className="fab fa-instagram fa-lg"></i></a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default UserProfile
