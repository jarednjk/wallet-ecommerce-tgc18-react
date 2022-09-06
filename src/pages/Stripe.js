import React, { useContext } from "react";
// import Stripe from "stripe";
import { loadStripe } from '@stripe/stripe-js'


const BASE_URL = "https://8000-jarednjk-jarednjkwallet-ufol4k5k2n3.ws-us63.gitpod.io"


export default async function Stripe() {

    const [loggedIn, setLoggedIn] = useState(true);
    const [stripeSessionData, setStripeSessionData] = useState('');

    // const stripeSessionData = async getStripeData () => {
    //     if (localStorage.getItem('accessToken')) {
    //         try {
    //             let response = await axios.get(BASE_URL + 'api/checkout', {
    //                 headers: {
    //                     authorization: `Bearer ${localStorage.getItem('accessToken')}`
    //                 }
    //             })
    //             console.log('stripesession data', response.data)
    //             setStripeSessionData(response.data)
    //             navigate('/stripe')

    //         } catch (error) {
    //             return false
    //         }
    //     } else {
    //         return false
    //     }
    // }

    
    const getStripeData = async () => {
        if (localStorage.getItem('accessToken')) {
            try {
                let response = await axios.get(BASE_URL + 'api/checkout', {
                    headers: {
                        authorization: `Bearer ${localStorage.getItem('accessToken')}`
                    }
                })
                console.log('stripesession data', response.data)
                setStripeSessionData(response.data)
                navigate('/stripe')

            } catch (error) {
                return false
            }
        } else {
            return false
        }
    }

    const context = useContext(CustomerContext)
    console.log('I am stripe', stripeSessionData)
    let sessionIdObject = { sessionId: stripeSessionData.sessionId };
    let publishableKey = stripeSessionData.publishableKey;
    const stripePromise = loadStripe(publishableKey);
    const stripe = await stripePromise;
    stripe.redirectToCheckout(sessionIdObject);
}