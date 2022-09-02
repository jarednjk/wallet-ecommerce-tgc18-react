import React, { useState, useContext } from 'react';
import { useNavigate, Link } from "react-router-dom";
import axios from 'axios';
import { Container, Form, Button } from 'react-bootstrap';
import { UserContext } from '../context/UserContext';

const BASE_URL = "https://8000-jarednjk-jarednjkwallet-ufol4k5k2n3.ws-us63.gitpod.io"

export default function Login() {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const value = useContext(UserContext);

    // const [loginFail, setLoginFail] = useState(false)

    // const navigate = useNavigate();

    // async function login() {

    //     console.log("email", email)
    //     console.log("password", password)

    //     if (!email || !password) {
    //         setLoginFail(true)
    //     } else {
    //         const response = await axios.post(BASE_URL + "/api/users/login/", {
    //             "email": email,
    //             "password": password
    //         })

    //         if (response.status === 200) {
    //             localStorage.setItem("accessToken", response.data.accessToken)
    //             localStorage.setItem('refreshToken', response.data.refreshToken)
    //             localStorage.setItem('id', response.data.user_id)
    //             navigate('/profile')
    //         } else if (response.status === 204) {
    //             setLoginFail(true)
    //         }
    //     }
    // }

    return (
        <React.Fragment>
            <Container>
                <div className="mt-5 pt-5 px-3 form-input mx-auto">
                    <h2 className='text-center'>MEMBER LOGIN</h2>
                    <p className='text-center'>Enter your email and password to access your account.</p>
                    <Form className="pt-3">
                        <Form.Control type="email"
                            name="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />

                        <Form.Control className="mt-3"
                            type="password"
                            name="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />

                        {value.loginFail === true ? <Form.Text style={{ color: 'red' }}>Invalid email or password. Please try again.</Form.Text> : null}

                        <div className="d-grid mt-3">
                            <Button onClick={ async () => { await value.login(email, password)}}>SIGN IN</Button>
                        </div>
                        <p className="text-center pt-5">Don't have an account? <Link to="/register">Register now</Link></p>
                    </Form>

                </div>
            </Container>
        </React.Fragment>
    )
}