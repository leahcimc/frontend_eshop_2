import '../../../common/commonStyle.css';
import { TransactionListDto } from "../../../data/dto/TransactionDto"
import { NumericFormat } from 'react-number-format';
import { Row, Col } from "react-bootstrap";
import moment from "moment/moment";
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

type Props = {
    result: TransactionListDto;
}

export default function TransactionListRow({ result }: Props) {
    const navigate = useNavigate();

    const renderStatus = () => {
        if (result.status === 'PREPARE') {
            return (
                <>
                    等待付款
                </>
            )
        } else if (result.status === 'PROCESSING') {
            return (
                <>
                    處理中
                </>
            )
        } else if (result.status === 'FINISH') {
            return (
                <>
                    已完成
                </>
            )
        }
    }

    return (
        <>
            <Row>
                <div
                    style={{
                        width: "95vw",
                        minHeight: "200px",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        textShadow: "2px 2px rgba(0, 0, 0, 0.8)"
                    }}
                >
                    <Col sm={2} className="d-flex justify-content-center">
                        {result.tid}
                    </Col>

                    <Col sm={5} className="d-flex justify-content-center">
                        {moment(result.datetime).subtract(new Date().getTimezoneOffset(), 'minutes').format("YYYY-MM-DD HH:mm:ss")}
                    </Col>

                    <Col sm={2} className="d-flex justify-content-center">
                        <NumericFormat value={result.total.toFixed(2)} displayType={'text'} thousandSeparator={true} prefix={'$'} />
                    </Col>

                    <Col sm={2} className="d-flex justify-content-center">
                        {renderStatus()}
                    </Col>

                    <Col sm={1} className="d-flex justify-content-center">
                        <Button
                            variant="outline-light"
                            className='itemButton buttonMargin'
                            onClick={
                                () => { navigate(`/transaction/${result.tid}`) }
                            }
                        >
                            訂單詳情
                        </Button>
                    </Col>
                </div>
                <hr />
            </Row>

        </>
    )
}