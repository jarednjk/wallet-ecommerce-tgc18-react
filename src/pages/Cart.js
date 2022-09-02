import React, { useEffect, useState } from "react";
import { Container, Row, Col, Table } from 'react-bootstrap';
import { Link } from "react-router-dom";
import axios from "axios";

const BASE_URL = "https://8000-jarednjk-jarednjkwallet-ufol4k5k2n3.ws-us63.gitpod.io"

export default function Cart() {

    const [loggedIn, setLoggedIn] = useState(true);
    const [cartItems, setCartItems] = useState([]);
    const [orderTotal, setOrderTotal] = useState(0);

    useEffect(() => {
        if (localStorage.getItem("id") !== null) {
            fetch();
        } else {
            setLoggedIn(false)
        }
    }, [])

    const fetch = async () => {

        const response = await axios.get(BASE_URL + "/api/cart", {
            headers: {
                authorization: `Bearer ${localStorage.getItem("accessToken")}`
            }
        });

        let orderSubTotal = 0;
        for (let i of response.data) {
            orderSubTotal += (i.variant.product.cost * i.quantity)
        }
        setOrderTotal(orderSubTotal.toFixed(2))

        setCartItems(response.data)
        console.log(response.data)
        console.log(orderSubTotal);

    }

    // const deleteCartItem = async (variantId) => {
    //     const response = await axios.
    // }

    return (
        <React.Fragment>
            {cartItems ?
                
                <Container className="p-5">
                    <h1 className="text-center">My Shopping Cart</h1>
                    <Row>
                        <Col xs={12} lg={8}>
                            <Table striped bordered hover>
                                <thead>
                                    <tr>
                                        <th></th>
                                        <th>ITEM</th>
                                        <th>QTY</th>
                                        <th>TOTAL</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {cartItems.map((c) => {
                                        return ( <tr>
                                        <td><img src={c.variant?.thumbnail_url} /></td>
                                        <td>{c.variant?.product?.name} ({c.variant?.color?.name})</td>
                                        <td>{c.quantity}</td>
                                        <td>${c.variant.product.cost * c.quantity}</td>
                                    </tr> )
                                    })}
                                    
                                </tbody>
                            </Table>
                        </Col>

                        <Col xs={12} lg={4}>

                        </Col>
                    </Row>
                </Container>

                : null}
        </React.Fragment>
    )
}