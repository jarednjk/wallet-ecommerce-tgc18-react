import React, { useEffect, useState } from "react";
import { Container, Table, Row, Col, Form, Button } from 'react-bootstrap';
import { Link } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';


const BASE_URL = "https://8000-jarednjk-jarednjkwallet-ufol4k5k2n3.ws-us63.gitpod.io"

export default function Orders() {
    const [loggedIn, setLoggedIn] = useState(true);
    const [orderItems, setOrderItems] = useState([]);

    useEffect(() => {
        if (localStorage.getItem("id") !== null) {
            fetch();
        } else {
            setLoggedIn(false)
        }
    }, [])

    const fetch = async () => {
        const response = await axios.get(BASE_URL + "/api/orders", {
            headers: {
                authorization: `Bearer ${localStorage.getItem("accessToken")}`
            }
        });

        setOrderItems(response.data)
        console.log(response.data)
    }

    return (
        <React.Fragment>
            <Container className="py-5 px-sm-0 px-lg-5">
                <h2 className="text-center">My Orders</h2> 
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>#Order ID</th>
                            <th>Order Date</th>
                            <th>Shipping Address</th>
                            <th>Order Status</th>
                            <th>Details</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orderItems.map(o => (
                            <tr>
                                <td>{o.id}</td>
                                <td>{o.order_date.slice(0,10)}</td>
                                <td>{o.shipping_address_line1}<br/>{o.shipping_address_line2}<br/>{o.shipping_address_postal}</td>
                                <td>{o.status.name}</td>
                                <td><a className='btn-dark btn-sm btn' href={o.receipt_url} target="_blank">View Receipt</a></td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </Container>
        </React.Fragment>
    )
}

