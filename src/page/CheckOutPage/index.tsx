import '../../common/commonStyle.css';
import TopNavBar from '../../common/component/TopNavBar';
import {Elements} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';
import CheckOutForm from './component/CheckOutForm';

// const stripe = require('stripe')(process.env.STRIPE_KEY)

const stripePromise = loadStripe('pk_test_51OQkBUBR26WQZSSRAqSSCbqqDsBMAgAfOy8QwMOg3e2pk7socUSfBLEspZOubQqrZpuGzTwjqsJ2UpKcqqS3RDiH00StXVMp5i');

export default function CheckOutPage() {
    const options = {
        clientSecret: '{{CLIENT_SECRET}}',
    }

    return (
        <>
            <TopNavBar />
            <div className="backGlassBox">
                <Elements stripe={stripePromise} options={options}>
                    <CheckOutForm />
                </Elements>
            </div>
        </>
    )
}