import '../../common/commonStyle.css';
import TopNavBar from '../../common/component/TopNavBar';
import TransactionTable from './component/transactionTable';
import { useState, useEffect, useContext } from 'react';
import { Button, Col, Row, Spinner } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import { LoginUserContext } from '../../App';
import { TransactionDto } from '../../data/dto/TransactionDto';
import { NumericFormat } from 'react-number-format';
import moment from "moment/moment";
import * as TransactionApi from '../../api/transactionAPI';

type Params = {
    transactionId: string;
}

export default function TransactionPage() {
    const { transactionId } = useParams<Params>();
    const loginUser = useContext(LoginUserContext);
    const navigate = useNavigate();
    const [result, setResult] = useState<TransactionDto | undefined>(undefined);
    const [countDown, setCountDown] = useState<number>(0);
    const [isPaying, setIsPaying] = useState<boolean>(false);



    const calRemainTime = (createTime: Date) => {
        const currentTime = moment();
        const counterTime = moment(createTime).subtract(timedifference, 'minutes').add(4, 'hour');
        const remainTime = counterTime.diff(currentTime);

        if (remainTime > 0) {
            setCountDown(remainTime);
        } else {
            setCountDown(0);
        }
    }

    const renderBtn = () => {
        if (!isPaying) {
            if (result!.status === "PREPARE") {
                return (
                    <div>
                        <Button
                            variant="outline-light"
                            className="cancelBtn"
                            onClick={() => deleteBill(transactionId!)}
                        >
                            取消訂單
                        </Button>

                        {renderPayBtn()}
                    </div>
                )
            }
        } else {
            return (
                <div><Spinner animation="border" role="status" /></div>
            )
        }

    }

    const renderPayBtn = () => {

        if (countDown > 0) {
            return (
                <Button
                    variant="outline-light"
                    className="confirmBtn"
                    onClick={() => payBill(transactionId!)}
                >
                    確認付款
                </Button>
            )
        } else {
            return (
                <Button
                    variant="outline-light"
                    className="confirmBtn"
                    disabled
                >
                    交易逾時
                </Button>
            )
        }


    }

    const renderTimer = () => {
        if (result!.status === "PREPARE") {
            if (countDown > 0) {
                return (
                    <Col>
                        距離交易關閉: {moment.utc(countDown).format("HH:mm:ss")}
                    </Col>
                )
            } else {
                return (
                    <Col>
                        交易逾時
                    </Col>
                )
            }
        } else if (result!.status === "PROCESSING") {
            return (
                <Col>
                    處理中
                </Col>
            )
        } else {
            return (
                <Col>
                    交易完成
                </Col>
            )
        }

    }

    //time zone handle
    const timedifference = new Date().getTimezoneOffset();

    const fetch1BillData = async (tid: string) => {
        try {
            const resultData = await TransactionApi.getTransaction(tid);
            setResult(resultData);

            calRemainTime(resultData.datetime);
        } catch (e) {
            console.log(e)
            navigate("/error");
        }

    }

    const payBill = async (tid: string) => {
        try {
            setIsPaying(true);
            await TransactionApi.payTransaction(tid);

            navigate(`/checkout/${tid}`);
            setIsPaying(false);
        } catch (e) {
            navigate("/error");
        }
    }

    const deleteBill = async (tid: string) => {
        try {
            setIsPaying(true);
            await TransactionApi.deleteTransaction(tid);
            navigate("/");
            setIsPaying(false);
        } catch (e) {
            navigate("/error");
        }
    }

    useEffect(() => {
        if (loginUser) {
            transactionId &&
                fetch1BillData(transactionId)

            document.title = `帳單'${transactionId}'的資料`;

        } else if (loginUser === null) {
            navigate("/login");
        }


        const timer = setInterval(() => setCountDown((countDown) => countDown - 1000), 1000);
        return () => clearInterval(timer);

    }, [loginUser])


    return (
        <>
            <TopNavBar />
            <div className="backGlassBox">
                {
                    result
                        ? (
                            <div
                                className="text-center"
                                style={{
                                    display: "grid",
                                    width: "100%",
                                    fontSize: "1.25rem",
                                }}
                            >

                                <Row
                                    style={{
                                        fontSize: "1.75rem"
                                    }}
                                >

                                    <Col>
                                        交易建立日期: {moment(result.datetime).subtract(timedifference, 'minutes').format("YYYY-MM-DD HH:mm:ss")}
                                    </Col>

                                    {renderTimer()}

                                </Row>
                                <hr />

                                <TransactionTable data={result} />

                                <div
                                    style={{
                                        fontSize: "1.75rem"
                                    }}
                                >
                                    總金額: <NumericFormat
                                        value={result.total.toFixed(2)}
                                        displayType={'text'}
                                        thousandSeparator={true}
                                        prefix={'$'}
                                    />
                                    <hr />
                                </div>

                                {renderBtn()}
                            </div>
                        ) : (
                            <div><Spinner animation="border" role="status" /></div>
                        )
                }

            </div>
        </>
    )
}