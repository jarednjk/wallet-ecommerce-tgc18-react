import React from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Link } from "react-router-dom";

export default function Login() {
    return (
        <React.Fragment>
            <div className="mt-5 pt-5 form-input mx-auto text-center">
                <h2>LOGIN</h2>
                <p>Enter your email and password to access your account.</p>
                <Form className="pt-2">
                    <Form.Control type="email" placeholder="Email" />
                    <Form.Control className="my-3" type="password" placeholder="Password" />
                    <div className="d-grid">
                    <Button>LOGIN</Button>
                    </div>
                    <p className="pt-5">Not a member? <Link to="/register">Sign up now</Link></p>
                </Form>

                <div></div>
            </div>
        </React.Fragment>
    )
}