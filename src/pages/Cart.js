import React, { useEffect, useState } from "react";
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { Link } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { AiOutlinePlus, AiOutlineMinus } from "react-icons/ai";


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

    const deleteCartItem = async (variantId) => {
        const response = await axios.post(BASE_URL + `/api/cart/${variantId}/delete`, {}, {
            headers: {
                authorization: `Bearer ${localStorage.getItem("accessToken")}`
            }
        });
        if (response) {
            toast.success('Item removed from cart');
            await fetch();
            return true
        } else {
            toast.error('Something went wrong')
            return false;
        }
    }

    return (
        <React.Fragment>
            {cartItems ?

                <Container className="p-5">
                    <h1 className="text-center">My Shopping Cart</h1>
                    <div>
                        {cartItems.map((c) => {
                            return (
                                <React.Fragment>
                                    <hr />
                                    <div className="d-flex">
                                        <div>
                                            <img src={c.variant?.image_url} className="cart-img" />
                                        </div>
                                        <div className="ps-5">
                                            <h4 className="mb-4">{c.variant?.product?.name} ({c.variant?.color?.name})</h4>
                                            <div style={{ maxWidth: '100px' }} className=" d-flex align-items-center">
                                                <button class="col-3 btn btn-sm px-0 item-body" ><AiOutlineMinus /></button>
                                                <div className="col-4 p-1 item-body qty-box text-center">{c.quantity}</div>
                                                <button class="col-3 btn btn-sm px-0 item-body" ><AiOutlinePlus /></button>
                                                <Button variant='outline-secondary' size='sm' className="ms-2 ms-md-4">Delete</Button>
                                            </div>
                                            <h6 className="mt-4">Price: S${c.variant.product.cost * c.quantity} (S${c.variant.product.cost} / item)</h6>
                                        </div>
                                    </div>
                                    <hr />
                                </React.Fragment>
                            )
                        })}
                    </div>


                    {/* <Row>
                        <Col xs={12} lg={8}>
                            <div className="table-responsiveness">
                            <table className="table table-bordered">
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
                                        <button onClick={() => {deleteCartItem(c.variant.id)}}>Delete</button>
                                    </tr> )
                                    })}
                                    
                                </tbody>
                            </table>
                            </div>
                        </Col>

                        <Col xs={12} lg={4}>

                        </Col>
                    </Row> */}
                </Container>

                : null}
        </React.Fragment>
    )
}