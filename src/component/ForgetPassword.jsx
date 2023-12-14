import React, { useEffect, useRef, useState } from 'react'
import axios from '../api/axios';

const FORGET_PASSWORD = "/forget-password"

const ForgetPassword = () => {
    const emailRef = useRef();

    useEffect(()=>{
        emailRef.current.focus();
    },[])

    const [email, setEmail] = useState('');
    const [errMsg, setErrMsg] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(FORGET_PASSWORD, { "email": email });

            console.log(response.data?.message);
            alert(response.data?.message);
            setErrMsg(response.data);
        } catch (err) {
            if (!err?.response) {
                setErrMsg('No server response');
            }
            else if (err.response?.status === 400) {
                setErrMsg('Use is not registred');
            } else if (err.response?.status === 401) {
                setErrMsg('Unautherized');
            }
            else {
                setErrMsg('You are not login, Login first...');
            }

            // errRef.current.focus();
            alert(errMsg);
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

                                    <h3 className="mb-5">Forget Password</h3>

                                    <div className="form-outline mb-4">

                                        <label
                                            htmlFor="typeEmailX-2"
                                            className="form-label">
                                            Email
                                        </label>
                                        <input
                                            id="typeEmailX-2"
                                            className="form-control form-control-lg"
                                            type="email"
                                            name="email"
                                            ref={emailRef}
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            required
                                        />
                                    </div>

                                    <button className="btn btn-primary btn-lg btn-block" type="submit" >click here</button>

                                    <p className="text-center text-muted mt-4 mb-0">New  account? <a href="/register"
                                        className="fw-bold text-body">Register here</a></p>

                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default ForgetPassword
