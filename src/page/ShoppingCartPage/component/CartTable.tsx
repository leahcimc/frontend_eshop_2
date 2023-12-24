import { Col, Row } from "react-bootstrap";
import { CartDto } from "../../../data/dto/CartDto";
import CartRow from "./CartRow";

type Props = {
    cartList: CartDto[];
    setCartList: (cartList: CartDto[]) => void;
    calTotal: (resultList: CartDto[]) => void;
}

export default function CartTable({ cartList, setCartList, calTotal }: Props) {
    return (
        <>
            <Row>
                <div
                    className="backGlassBox"
                    style={{
                        minHeight: "50px",
                        marginTop: "0",
                        marginBottom: "0",
                        border: "0",
                        background: "transparent",
                        textDecorationLine: "underline",
                        boxShadow: "none"
                    }}
                >
                    <Col sm={2} className="d-flex justify-content-center">
                        商品
                    </Col>

                    <Col sm={5} className="d-flex justify-content-center">
                        商品名稱
                    </Col>

                    <Col sm={2} className="d-flex justify-content-center">
                        商品價格
                    </Col>

                    <Col sm={2} className="d-flex justify-content-center">
                        已選數目
                    </Col>

                    <Col sm={1}>

                    </Col>
                </div>
            </Row>


            {
                cartList.map &&
                cartList.map(
                    (item) => {
                        return <CartRow
                            item={item}
                            itemList={cartList}
                            setCartList={setCartList}
                            calTotal={calTotal}
                            key={item.pid} />;
                    }
                )
            }

        </>
    )
}