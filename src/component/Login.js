import React, { useState, useEffect, useRef } from 'react';
import useAuth from './hooks/useAuth';
import axios from "../api/axios"
import { useNavigate} from 'react-router-dom';
import Cookies from 'universal-cookie';
import { jwtDecode } from "jwt-decode";

const LOGIN_URL = "/login"

function Login() {
    const emailRef = useRef();
    const { setAuth, setIsLogin } = useAuth();

    const cookies = new Cookies();

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    // const from = location.state?.from?.pathname || "/";

    useEffect(() => {
        emailRef.current.focus();
    }, [])


    // Handle form input changes
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    // console.log("Learning Nodejs", auth)



    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        // Make a POST request to the SignUp API with formData
        try {
            const response = await axios.post(LOGIN_URL, formData);
            // Set the response data in state

            const accessToken = response.data?.data?.accessToken;
            setAuth({ ...formData, accessToken });
            setIsLogin(true);

            // Store email and accesstoken to localstorage
            // sessionStorage.setItem(
            //     "email",
            //     JSON.stringify({ "email": formData.email, password: formData.password, "accessToken": accessToken })
            // );

            const decode = jwtDecode(accessToken);
           

            // cookies.set("email", JSON.stringify({ "email": formData.email, password: formData.password, "accessToken": accessToken, user_id: decode?._id, role: decode.role}),
            //     { expires: new Date(decode.exp * 1000) },
            // )
            let expires =  "expires=" + new Date(decode.exp * 1000).toUTCString();
            console.log(expires);

            document.cookie = "email" + "=" + JSON.stringify({ "email": formData.email, password: formData.password, "accessToken": accessToken, user_id: decode?._id, role: decode.role}) + "; " + expires;

            // navigate(from, { replace: true });
            navigate('/all-task');
        } catch (err) {
            if (!err?.response) {
                // setErrMsg('No server response');
                alert("No server response, Reload the page... or server is busy !");
            }
            else if (err.response?.status === 400) {

                alert("Incorrect Password!");

            } else if (err.response?.status === 401) {

                alert("Email id is not registred !!!");
            }
            else {

                alert("Incorrect Email or Password!");
            }

        }
    };

    return (<>
        <section className="vh-100 style-1" >
            <div className="container py-5 h-100">
                {/* { errMsg ? <p>{errMsg}</p> : ''} */}
                <div className="row d-flex justify-content-center align-items-center h-100">
                    <div className="col-12 col-md-8 col-lg-6 col-xl-5">
                        <div className="card shadow-2-strong style-2">
                            <form className="card-body p-5 text-center" onSubmit={handleSubmit}>

                                <h3 className="mb-5">Sign in</h3>

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
                                        value={formData.email}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </div>

                                <div className="form-outline mb-4">

                                    <label
                                        htmlFor="typePasswordX-2"
                                        className="form-label">
                                        Password
                                    </label>
                                    <input
                                        className="form-control form-control-lg"
                                        type="password"
                                        name="password"
                                        value={formData.password}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </div>


                                <button className="btn btn-primary btn-lg btn-block" type="submit" >Login</button>

                                {/* <hr className="my-4" />

                                <button className="btn btn-lg btn-block btn-primary style-3"
                                    type="submit"><i className="fab fa-google me-2"></i> Sign in with google</button>
                                <button className="btn btn-lg btn-block btn-primary mb-2 style-4"
                                    type="submit"><i className="fab fa-facebook-f me-2"></i>Sign in with facebook</button> */}

                                <p className="text-center text-muted mt-5 mb-0"><a href="/forget-password"
                                    className="fw-bold text-body">Forget Passowrd</a></p>
                                <p className="text-center text-muted mb-0">New  account? <a href="/register"
                                    className="fw-bold text-body">Register here</a></p>

                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </>
    );
}

export default Login;

