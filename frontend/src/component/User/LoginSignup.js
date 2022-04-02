import React, { Fragment, useRef, useEffect, useState } from 'react'
import "./LoginSignup.css"
import Loader from "../layout/Loader/Loader"
import { MdFace, MdMailOutline } from 'react-icons/md'
import { TiLockOpenOutline } from 'react-icons/ti'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from "react-redux"
import { clearErrors, login, register } from '../../actions/userAction'
import { useAlert } from "react-alert"
import { useNavigate } from 'react-router-dom'

const LoginSignup = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate()
    const alert = useAlert();
    const { error, loading, isAuthenticated } = useSelector((state) => state.user);

    const loginTab = useRef(null);
    const registerTab = useRef(null);
    const switcherTab = useRef(null);

    const [loginEmail, setLoginEmail] = useState("");
    const [loginPassword, setLoginPassword] = useState("");

    const [user, setUser] = useState({
        name: "",
        email: "",
        password: "",
    });

    const { name, email, password } = user;
    const [avatar, setAvatar] = useState("/ProfilePng.png");
    const [avatarPreview, setAvatarPreview] = useState("/ProfilePng.png");


    const loginSubmit = (e) => {
        e.preventDefault();
        // console.log("Login Form Submitted");
        dispatch(login(loginEmail, loginPassword));
    }

    const registerSubmit = (e) => {
        e.preventDefault();

        const myForm = new FormData();
        myForm.set("name", name);
        myForm.set("email", email);
        myForm.set("password", password);
        myForm.set("avatar", avatar);
        // console.log("Sign Up Form Submitted");
        dispatch(register(myForm));
    };

    const registerDataChange = (e) => {
        if (e.target.name === "avatar") {
            const reader = new FileReader();

            reader.onload = () => {
                if (reader.readyState === 2) {
                    setAvatarPreview(reader.result);
                    setAvatar(reader.result);
                }
            };
            reader.readAsDataURL(e.target.files[0]);
        } else {
            setUser({ ...user, [e.target.name]: e.target.value });
        }
    };

    useEffect(() => {
        if (error) {
            alert.error(error);
            dispatch(clearErrors());

        }
        if (isAuthenticated) {
            navigate("/account")
        }

    }, [dispatch, error, alert, isAuthenticated, navigate])


    const switchTabs = (e, tab) => {
        if (tab === "login") {
            switcherTab.current.classList.add("shiftToNeutral");
            switcherTab.current.classList.remove("shiftToRight");

            registerTab.current.classList.remove("shiftToNeutralForm");
            loginTab.current.classList.remove("shiftToLeft");

        }
        if (tab === "register") {
            switcherTab.current.classList.add("shiftToRight");
            switcherTab.current.classList.remove("shiftToNeutral");

            registerTab.current.classList.add("shiftToNeutralForm");
            loginTab.current.classList.add("shiftToLeft");

        }
    }

    return (
        <Fragment>
            {loading ? (
                <Loader />
            ) : (
                <Fragment>
                    <div className='LoginSignUpContainer'>
                        <div className='LoginSignUpBox'>
                            <div>
                                <div className='login_signUp_toggle'>
                                    <p onClick={(e) => switchTabs(e, "login")}>
                                        LOGIN
                                    </p>
                                    <p onClick={(e) => switchTabs(e, "register")}>
                                        REGISTER
                                    </p>
                                </div>
                                <button ref={switcherTab}></button>
                            </div>
                            <form className='loginForm' ref={loginTab} onSubmit={loginSubmit}>
                                <div className='loginEmail'>
                                    <MdMailOutline />
                                    <input
                                        type="email"
                                        placeholder='Email'
                                        required
                                        value={loginEmail}
                                        onChange={(e) => setLoginEmail(e.target.value)}
                                    />
                                </div>
                                <div className='loginPassword'>
                                    <TiLockOpenOutline />
                                    <input
                                        type="password"
                                        placeholder='Password'
                                        required
                                        value={loginPassword}
                                        onChange={(e) => setLoginPassword(e.target.value)}
                                    />
                                </div>
                                <Link to="/password/forget">Forget Password</Link>
                                <input type="submit" value="Login" className="loginBtn" />
                            </form>
                            <form
                                className='signUpForm'
                                ref={registerTab}
                                encType="multipart/form-data"
                                onSubmit={registerSubmit}
                            >
                                <div className='signUpName'>
                                    <MdFace />
                                    <input
                                        type="text"
                                        placeholder='Name'
                                        required
                                        name='name'
                                        value={name}
                                        onChange={registerDataChange}
                                    />
                                </div>
                                <div className='signUpEmail'>
                                    <MdMailOutline />
                                    <input
                                        type="email"
                                        placeholder='Email'
                                        required
                                        name='email'
                                        value={email}
                                        onChange={registerDataChange}
                                    />
                                </div>
                                <div className='signUpPassword'>
                                    <TiLockOpenOutline />
                                    <input
                                        type="password"
                                        placeholder='Password'
                                        required
                                        name='password'
                                        value={password}
                                        onChange={registerDataChange}
                                    />
                                </div>
                                <div id='registerImage'>
                                    <img src={avatarPreview} alt="Avatar Preview" />
                                    <input
                                        type="file"
                                        name='avatar'
                                        accept='image/'
                                        onChange={registerDataChange}
                                    />

                                </div>
                                <input
                                    type="submit"
                                    value="Register"
                                    className="signUpBtn"
                                // disabled={loading ? true : false}
                                />
                            </form>

                        </div>

                    </div>
                </Fragment>

            )}
        </Fragment>
    )
}

export default LoginSignup