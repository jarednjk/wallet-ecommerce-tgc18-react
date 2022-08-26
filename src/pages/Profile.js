import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import axios from 'axios';

const BASE_URL = "https://8000-jarednjk-jarednjkwallet-ufol4k5k2n3.ws-us63.gitpod.io"
export default function Profile() {

    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [email, setEmail] = useState("")
    const [loggedIn, setLoggedIn] = useState(false)

    // load in the current active user
    useEffect(() => {
        if (localStorage.getItem('id') !== null) {
            console.log(localStorage.getItem('accessToken'));
            const fetchProfile = async () => {
                let response = await axios.get(BASE_URL + "/api/users/profile", {
                    headers: {
                        authorization: "Bearer " + localStorage.getItem('accessToken')
                    }
                });
                
                console.log(response.data)

                setFirstName(response.data.first_name)
                setLastName(response.data.last_name)
                setEmail(response.data.email)
            }
            fetchProfile();
            setLoggedIn(true)
        }
    }, [])

    // logout
    const logout = async () => {
        const response = await axios.post(BASE_URL + "/api/users/logout", {
            'refreshToken': localStorage.getItem('refreshToken')
        })

        if (response.data) {
            localStorage.clear()
        }
    }

    return (
        <React.Fragment>
            {loggedIn === true ? 
            <div>
                <h2>Welcome {firstName} {lastName}</h2>
            </div>
            :
            null
        }
        </React.Fragment>
    )
}