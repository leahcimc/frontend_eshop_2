import { Row, Col } from "react-bootstrap";
import { TransactionListDto } from "../../../data/dto/TransactionDto"
import TransactionListRow from "./transactionListRow";

type Props = {
    data: TransactionListDto[];
}

export default function TransactionListTable({ data }: Props) {
    return (
        <>
            <Row>
                <div
                    className="backGlassBox"
                    style={{
                        minHeight: "30px",
                        marginTop: "0",
                        marginBottom: "0",
                        border: "0",
                        background: "transparent",
                        textDecorationLine: "underline",
                        boxShadow: "none"
                    }}
                >
                    <Col sm={2} className="d-flex justify-content-center">
                        訂單編號
                    </Col>

                    <Col sm={5} className="d-flex justify-content-center">
                        建立日期
                    </Col>

                    <Col sm={2} className="d-flex justify-content-center">
                        交易總額
                    </Col>

                    <Col sm={2} className="d-flex justify-content-center">
                        狀態
                    </Col>

                    <Col sm={1}>

                    </Col>
                </div>
            </Row>

            {
                data && data.map &&
                data.map((item) => (
                    <TransactionListRow result={item} key={item.tid} />
                ))
            }
        </>
    )
}