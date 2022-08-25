import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useNavigate, Link } from "react-router-dom";
import axios from 'axios'

const BASE_URL = "https://8000-jarednjk-jarednjkwallet-ufol4k5k2n3.ws-us63.gitpod.io"

export default function Login() {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [loginFail, setLoginFail] = useState(false)

    const navigate = useNavigate();

    async function login() {

        console.log("email", email)
        console.log("password", password)

        if (!email || !password) {
            setLoginFail(true)
        } else {
            const response = await axios.post(BASE_URL + "/api/users/login/", {
                "email": email,
                "password": password
            })

            if (response.status === 200) {
                localStorage.setItem("accessToken", response.data.accessToken)
                localStorage.setItem('refreshToken', response.data.refreshToken)
                navigate('/profile')
            } else if (response.status === 204) {
                setLoginFail(true)
            }
        }
    }

    return (
        <React.Fragment>
            <div className="mt-5 pt-5 form-input mx-auto text-center">
                <h2>LOGIN</h2>
                <p>Enter your email and password to access your account.</p>
                <Form className="pt-2">
                    <Form.Control type="email"
                                  name="email"
                                  placeholder="Email"
                                  value={email}
                                  onChange={(e) => setEmail(e.target.value)}
                                   />

                    <Form.Control className="my-3"
                                  type="password"
                                  name="password"
                                  placeholder="Password"
                                  value={password}
                                  onChange={(e) => setPassword(e.target.value)}
                                  />
                    
                    { loginFail === true ? <Form.Text style={{color: 'red'}}>Invalid email or password. Please try again.</Form.Text>:null }

                    <div className="d-grid">
                        <Button onClick={login}>LOGIN</Button>
                    </div>
                    <p className="pt-5">Not a member? <Link to="/register">Sign up now</Link></p>
                </Form>

                <div></div>
            </div>
        </React.Fragment>
    )
}