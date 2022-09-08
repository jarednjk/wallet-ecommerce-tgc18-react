import React, { useEffect, useState } from "react";
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { Link } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

const BASE_URL = "https://8000-jarednjk-jarednjkwallet-ufol4k5k2n3.ws-us64.gitpod.io"

export default function Cart() {

    const [loggedIn, setLoggedIn] = useState(true);
    const [cartItems, setCartItems] = useState([]);
    // const [orderTotal, setOrderTotal] = useState(0);
    const [quantity, setQuantity] = useState({});

    // for loop -> quantity obj (id : quantity)
    // useState(quantity obj)

    useEffect(() => {
        if (localStorage.getItem("id") !== null) {
            fetch();
        } else {
            setLoggedIn(false)
        }
    }, [])

    const user_id = localStorage.getItem("id");
    const fetch = async () => {

        const response = await axios.get(BASE_URL + "/api/cart", {
            headers: {
                authorization: `Bearer ${localStorage.getItem("accessToken")}`
            }
        });
        const quantity = {}
        for (let r of response.data) {
            quantity[r.variant_id] = r.quantity
        }
        setQuantity(quantity)

        // let orderSubTotal = 0;
        // for (let i of response.data) {
        //     orderSubTotal += (i.variant.product.cost * i.quantity)
        // }
        // setOrderTotal(orderSubTotal.toFixed(2))

        setCartItems(response.data)
        console.log(response.data)
        // console.log(orderSubTotal);

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

    const updateFormField = (e) => {
        setQuantity({
            [e.target.name]: e.target.value
        })
    }

    const updateCartItem = async (variantId, quantity) => {

        // const variantId = e.target.name
        // const quantity = quantit
        console.log('update', variantId, quantity)
        const response = await axios.post(BASE_URL + `/api/cart/${variantId}/update`, { quantity: quantity }, {
            headers: {
                authorization: `Bearer ${localStorage.getItem("accessToken")}`
            }
        });
        if (response) {
            toast.success('Item updated in cart');
            await fetch();
            return true
        } else {
            toast.error('Something went wrong')
            return false;
        }
    }

    return (
        <React.Fragment>
            <h2 className="display-6 text-center mt-5">My Cart</h2>
            {loggedIn ?
                <React.Fragment>
                    {cartItems && cartItems.length !== 0 ?

                        <Container className="p-5">
                            <div>
                                <hr />

                                {cartItems.map((c) => {
                                    return (
                                        <React.Fragment>
                                            <div className="d-flex">
                                                <div>
                                                    <img src={c.variant?.image_url} className="cart-img" />
                                                </div>
                                                <div className="ps-5">
                                                    <h4 className="mb-4">{c.variant?.product?.name} ({c.variant?.color?.name})</h4>
                                                    <div style={{ maxWidth: '100px' }} className=" d-flex align-items-center">
                                                        <h6>Quantity: </h6><Form.Control size="sm" onChange={updateFormField} name={c.variant_id} type="text" value={quantity[c.variant_id]} style={{ width: '30px' }} />
                                                        <Button onClick={() => { updateCartItem(c.variant_id, quantity[c.variant_id]) }} name={c.variant_id} size='sm' className="ms-2 ms-md-4">Update</Button>
                                                    </div>
                                                    <Button onClick={() => { deleteCartItem(c.variant_id) }} variant='outline-secondary' size='sm' className="mt-3">Delete</Button>
                                                    <h6 className="mt-4">Price: S${c.variant.product.cost * c.quantity} (S${c.variant.product.cost} / item)</h6>
                                                </div>
                                            </div>
                                            <hr />
                                            <a className="btn btn-dark btn-outline-light btn-block"
                                                href={BASE_URL + "/api/checkout/" + user_id + '/checkout'}
                                            >Checkout</a>
                                        </React.Fragment>
                                    )
                                })}
                            </div>

                            <ToastContainer />
                        </Container>

                        :
                        <p className="py-4 lead text-center">There are no items in your shopping cart</p>
                    }
                </React.Fragment>
                :
                <p className="py-4 text-center">Please <Link to="/login">log in</Link> to view or add items in your shopping cart.</p>


            }

        </React.Fragment>
    )
}