import '../../common/commonStyle.css';
import './component/checkout.css';
import { LoginUserContext } from '../../App';
import { useNavigate, useParams } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import { Form, Spinner } from 'react-bootstrap';
import * as TransactionApi from '../../api/transactionAPI';
import { TransactionDto } from '../../data/dto/TransactionDto';
import { NumericFormat } from 'react-number-format';

type Params = {
    transactionId: string;
}

export default function CheckOutPage() {
    const { transactionId } = useParams<Params>();
    const loginUser = useContext(LoginUserContext);
    const [result, setResult] = useState<TransactionDto | undefined>(undefined);
    const navigate = useNavigate();

    const handlePay = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        finishBill(transactionId!);
        navigate("/thankyou");
    }

    const finishBill = async (tid: string) => {
        try {
            await TransactionApi.finishTransaction(tid);

        } catch (e) {
            navigate("/error");
        }
    }

    const fetch1BillData = async (tid: string) => {
        try {
            const resultData = await TransactionApi.getTransaction(tid);
            setResult(resultData);
        } catch (e) {
            navigate("/error");
        }

    }

    useEffect(() => {
        if (loginUser) {
            transactionId &&
                fetch1BillData(transactionId);
            document.title = `繳付帳單'${transactionId}'`;
        } else if (loginUser === null) {
            navigate("/login");
        }
    }, [loginUser])

    return (
        <>
            <div className="backGlassBox">
                <div className="box-2">
                    <div className="box-inner-2">
                        <div>
                            <p className="fw-bold">Payment Details</p>
                            <p className="dis mb-3">此網站沒有任何商業功能，請不要填寫任何真實訊息。</p>
                        </div>
                        <form action="">
                            <div className="mb-3">
                                <p className="dis fw-bold mb-2">Email address</p>
                                <Form.Control className="form-control" type="email" value="demo@fake.com" />
                            </div>
                            <div>
                                <p className="dis fw-bold mb-2">Card details</p>
                                <div className="d-flex align-items-center justify-content-between card-atm border rounded">
                                    <div className="fab fa-cc-visa ps-0"></div>
                                    <Form.Control type="text" className="form-control" placeholder="Card Details" />
                                    <div className="d-flex w-50">
                                        <Form.Control type="text" className="form-control px-0" placeholder="MM/YY" />
                                        <Form.Control type="password" maxLength={3} className="form-control px-0" placeholder="CVV" />
                                    </div>
                                </div>
                                <div className="my-3 cardname">
                                    <p className="dis fw-bold mb-2">Cardholder name</p>
                                    <Form.Control className="form-control" type="text" />
                                </div>
                                <div className="address">
                                    <p className="dis fw-bold mb-3">Billing address</p>
                                    <select className="form-select" aria-label="Default select example">
                                        <option selected hidden>Hong Kong</option>
                                        <option value="1">China</option>
                                        <option value="2">Macau</option>
                                        <option value="3">Taiwan</option>
                                        <option value="4">Hong Kong</option>
                                    </select>
                                    <div className="d-flex">
                                        <Form.Control className="form-control zip" type="text" placeholder="Detail Address" />
                                    </div>
                                    <div className=" my-3">
                                        <p className="dis fw-bold mb-2">VAT Number</p>
                                        <div className="inputWithcheck">
                                            <Form.Control className="form-control" type="text" value="GB012345B9" />
                                            <span className="fas fa-check"></span>

                                        </div>
                                    </div>
                                    {
                                        result
                                            ? (
                                                <div className="d-flex flex-column dis">
                                                    <div className="d-flex align-items-center justify-content-between mb-2">
                                                        <p className="fw-bold">Total</p>
                                                        <p className="fw-bold"><span className="fas fa-dollar-sign"></span>
                                                            <NumericFormat value={result.total.toFixed(2)} displayType={'text'} thousandSeparator={true} prefix={'$'} />
                                                        </p>
                                                    </div>
                                                    <div className="btn btn-primary mt-2" onClick={handlePay}>Pay<span className="fas fa-dollar-sign px-1"></span>
                                                        <NumericFormat value={result.total.toFixed(2)} displayType={'text'} thousandSeparator={true} prefix={'$'} />
                                                    </div>
                                                </div>
                                            ) : (
                                                <div><Spinner animation="border" role="status" /></div>
                                            )
                                    }

                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}



// import '../../common/commonStyle.css';
// import TopNavBar from '../../common/component/TopNavBar';
// import { Elements } from '@stripe/react-stripe-js';
// import { loadStripe } from '@stripe/stripe-js';
// import CheckOutForm from './component/CheckOutForm';
// import { useEffect, useState } from 'react';

// // const stripe = require('stripe')(process.env.STRIPE_KEY)

// const stripePromise = loadStripe('pk_test_51OQkBUBR26WQZSSRAqSSCbqqDsBMAgAfOy8QwMOg3e2pk7socUSfBLEspZOubQqrZpuGzTwjqsJ2UpKcqqS3RDiH00StXVMp5i');

// export default function CheckOutPage() {
//     const [clientSecret, setClientSecret] = useState("");

//     useEffect(() => {
//         // Create PaymentIntent as soon as the page loads
//         fetch("/create-payment-intent", {
//             method: "POST",
//             headers: { "Content-Type": "application/json" },
//             body: JSON.stringify({ items: [{ id: "xl-tshirt" }] }),
//         })
//             .then((res) => res.json())
//             .then((data) => setClientSecret(data.clientSecret));
//     }, []);

//     const appearance = {
//         theme: 'stripe',
//     };
//     const options = {
//         clientSecret,
//         appearance,
//     };

//     return (
//         <>
//             <TopNavBar />
//             <div className="backGlassBox">
//                 {clientSecret && (
//                     <Elements options={options} stripe={stripePromise}>
//                         <CheckOutForm />
//                     </Elements>
//                 )}
//             </div>
//         </>
//     )
// }