import { PaymentElement, useElements, useStripe } from '@stripe/react-stripe-js'
import React from 'react'
import { Button } from 'react-bootstrap'

const CheckOutForm = () => {
    const stripe = useStripe();
    const elements = useElements();

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (!stripe || !elements) {
            return;
        }

        const result = await stripe.confirmPayment({
            elements,
            confirmParams: {
                return_url: '',
            },
        });

        if (result.error) {
            // Show error to your customer (for example, payment details incomplete)
            console.log(result.error.message);
        } else {
            // Your customer will be redirected to your `return_url`. For some payment
            // methods like iDEAL, your customer will be redirected to an intermediate
            // site first to authorize the payment, then redirected to the `return_url`.
        }
    }


    return (
        <form onSubmit={handleSubmit}>
            <PaymentElement />
            <Button disabled={!stripe}>Submit</Button>
        </form>
    )
}

export default CheckOutForm