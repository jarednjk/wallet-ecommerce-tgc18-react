import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from "react-router-dom";
import axios from 'axios';


const BASE_URL = "https://warlet.herokuapp.com"

export const UserContext = React.createContext({
    
});


export default function LoginProvider({children}) {

    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [loginFail, setLoginFail] = useState(false)

    const navigate = useNavigate();

    async function login(email, password) {
        
        console.log("email", email)
        console.log("password", password)

        if (!email || !password) {
            setLoginFail(true)
        } else {
            const response = await axios.post(BASE_URL + "/api/users/login/", {
                "email": email,
                "password": password,
            })

            console.log(response.data)

            if (response.status === 200) {
                console.log(response)
                localStorage.setItem("accessToken", response.data.accessToken)
                localStorage.setItem('refreshToken', response.data.refreshToken)
                localStorage.setItem('id', response.data.id)
                
                navigate('/profile')
            } else if (response.status === 204) {
                setLoginFail(true)
            }
        }
    }
    return <UserContext.Provider value={{loginFail, login}}>{children}</UserContext.Provider>
}