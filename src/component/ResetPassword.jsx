import React, { useEffect, useRef, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import axios from '../api/axios';
import { Dropdown, Collapse, initMDB } from "mdb-ui-kit";


const ResetPassword = () => {
    const passwordRef = useRef();

    useEffect(() => {
        passwordRef.current.focus();
    }, [])

    const location = useLocation();
    const navigate = useNavigate();

    const [password, setPassword] = useState('');
    const [errMsg, setErrMsg] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            initMDB({ Dropdown, Collapse });
            const path = location?.pathname;
            const token = path.split("/")[2];
            const RESET_PASSWORD = `/reset-password/git ${token}`;

            const response = await axios.post(RESET_PASSWORD, { "password": password });

            console.log(response.data?.message);
            alert(response.data?.message);
            navigate("/login");
        } catch (err) {
            if (!err?.response) {
                setErrMsg('No server response');
            }
            else if (err.response?.status === 400) {
                setErrMsg('Generated Token expired or invalid!');
            } else if (err.response?.status === 401) {
                setErrMsg('Unautherized');
            }
            else {
                setErrMsg('Unknown Error');
            }

            alert(errMsg);

            // errRef.current.focus();
        }
    }


    return (
        <>
            <section className="vh-100 style-1" >
                <div className="container py-5 h-100">
                    {/* { errMsg ? <p>{errMsg}</p> : ''} */}
                    <div className="row d-flex justify-content-center align-items-center h-100">
                        <div className="col-12 col-md-8 col-lg-6 col-xl-5">
                            <div className="card shadow-2-strong style-2">
                                <form className="card-body p-5 text-center" onSubmit={handleSubmit}>

                                    <h3 className="mb-5">New Password</h3>

                                    <div className="form-outline mb-4">

                                        <label
                                            htmlFor="typeEmailX-2"
                                            className="form-label">
                                            Password
                                        </label>
                                        <input
                                            id="typeEmailX-2"
                                            className="form-control form-control-lg"
                                            type="password"
                                            name="email"
                                            ref={passwordRef}
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            required
                                        />
                                    </div>

                                    <button className="btn btn-primary btn-lg btn-block" type="submit" >Reset Password</button>

                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default ResetPassword
