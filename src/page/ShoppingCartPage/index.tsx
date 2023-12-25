import '../../common/commonStyle.css';
import TopNavBar from '../../common/component/TopNavBar';
import CartTable from './component/CartTable';
import BackPrev from '../../common/component/BackPrev';
import BackToTop from '../../common/component/BackToTop';
import { useEffect, useState, useContext } from 'react';
import { LoginUserContext } from '../../App';
import { NumericFormat } from 'react-number-format';
import { useNavigate } from 'react-router-dom';
import { Button, Spinner } from 'react-bootstrap';
import { CartDto } from '../../data/dto/CartDto';
import * as CartApi from "../../api/cartAPI";
import * as TransactionApi from "../../api/transactionAPI";

export default function ShoppingCartPage() {

    const navigate = useNavigate();
    const loginUser = useContext(LoginUserContext);
    const [cartList, setCartList] = useState<CartDto[] | undefined>(undefined);
    const [total, setTotal] = useState<number>(0);
    const [isCreateBill, setIsCreateBill] = useState<boolean>(false);

    let totalAmount = 0;

    const calTotal = (resultList: CartDto[]) => {
        resultList.map((item) => {
            (totalAmount = totalAmount + (item.price * item.cart_quantity))
        })
        setTotal(totalAmount);
    }

    const renderBtn = () => {
        if (!isCreateBill) {
            return (
                <div>
                    <Button
                        variant="outline-light"
                        className='itemButton'
                        style={{
                            width: "30vw"
                        }}
                        onClick={createBill}
                    >
                        前往結帳
                    </Button>
                </div>
            )
        } else {
            return (
                <div>
                    <Button
                        variant="outline-light"
                        className='itemButton'
                        style={{
                            width: "30vw"
                        }}
                        disabled
                    >
                        <Spinner animation="border" role="status" />
                    </Button>
                </div>
            )
        }
    }


    const fetchCart = async () => {
        try {
            const result = await CartApi.getCartItem();
            setCartList(result);
            calTotal(result);

        } catch (e) {
            navigate("/error");
        }

    }


    const createBill = async () => {
        try {
            setIsCreateBill(true);
            const result = await TransactionApi.createTransaction();
            navigate(`/transaction/${result.tid}`);
            setIsCreateBill(false);
        } catch (e) {
            navigate("/error");
        }
    }

    useEffect(() => {
        document.title = '我的購物籃';
        if (loginUser) {
            fetchCart();

        } else if (loginUser === null) {
            navigate("/login");
        } else {
            navigate("/shoppingcart");
        }
    }, [loginUser]);

    return (
        <>
            <TopNavBar />
            <div
                className="backGlassBox d-flex justify-content-center flex-wrap"
                style={{
                    background: "rgba(0, 0, 0, 0.2)"
                }}
            >
                {
                    cartList
                        ? cartList.length !== 0
                            ? (
                                <>

                                    <CartTable
                                        cartList={cartList}
                                        setCartList={setCartList}
                                        calTotal={calTotal}
                                    />
                                    <div style={{
                                        textAlign: "center"
                                    }}
                                    >
                                        <div style={{
                                            margin: "16px",
                                            fontSize: "1.75rem"
                                        }}
                                        >
                                            總金額: <NumericFormat
                                                value={total.toFixed(2)}
                                                displayType={'text'}
                                                thousandSeparator={true}
                                                prefix={'$'}
                                            />
                                            <hr />
                                        </div>

                                        {renderBtn()}
                                    </div>
                                </>

                            ) : (
                                <div>您的購物籃是空的</div>
                            ) : (
                            <div><Spinner animation="border" role="status" /></div>
                        )

                }


            </div>
            <BackPrev />
            <BackToTop />

        </>
    )
}