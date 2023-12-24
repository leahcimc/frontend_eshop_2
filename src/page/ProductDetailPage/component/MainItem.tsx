import '../../../common/commonStyle.css';
import './MainItem.css';
import { Button, Col, Image, Row, Spinner } from "react-bootstrap";
import { ProductDetail } from "../../../data/dto/ProductDto";
import { NumericFormat } from 'react-number-format';
import { useState, useContext } from "react";
import { LoginUserContext } from '../../../App';
import { useNavigate } from 'react-router-dom';
import * as CartApi from '../../../api/cartAPI';

type Props = {
    productData: ProductDetail;
    setIsAdded: (state: boolean) => void;
}

export default function MainItem({ productData, setIsAdded }: Props) {

    const navigate = useNavigate();
    const loginUser = useContext(LoginUserContext);
    const [quantity, setQuantity] = useState<number>(1);
    const [isAdding, setIsAdding] = useState<boolean>(false);

    const renderCartButton = () => {
        if (isAdding) {
            return (
                <Button
                    variant="outline-light"
                    className='itemButton'
                    disabled
                >
                    <Spinner animation="border" role="status" />
                </Button>

            )
        } else {
            return (
                <Button
                    variant="outline-light"
                    className='itemButton'
                    onClick={() => {
                        addNewItem(productData.pid, quantity)
                    }}
                >
                    加入購物籃
                </Button>
            )
        }

    }

    const addNewItem = async (pid: number, quant: number) => {
        setIsAdding(true);
        if (loginUser) {
            await CartApi.putCartItem(pid, quant);
            setIsAdded(true);
        } else if (loginUser === null) {
            navigate("/login");
        } else {
            null
        }
        setIsAdding(false);
    }

    return (
        <Row>
            <Col sm={5} className="d-flex phoneSize">
                <Image src={productData.image_url} className="detailPic" />
            </Col>

            <Col sm={6} className="captionBox phoneSize">
                <div>
                    <h1>
                        {productData.name}
                    </h1>
                    <br />
                    <h4>
                        {productData.description}
                    </h4>
                    <br />
                    <h3>
                        <NumericFormat value={productData.price.toFixed(2)} displayType={'text'} thousandSeparator={true} prefix={'$'} />
                    </h3>
                </div>

                <div className="d-flex">
                    <Button
                        variant="outline-light"
                        className='itemButton'
                        onClick={() => {
                            quantity < 2
                                ? (null
                                ) : (
                                    setQuantity(quantity - 1)
                                )
                        }}
                    >
                        -
                    </Button>
                    <Button
                        variant="outline-light"
                        className='itemButton'
                        style={{
                            userSelect: "none",
                            pointerEvents: "none",
                            backgroundColor: "rgba(255,255,255, 0.8)",
                            color: " rgba(0, 0, 0, 0.8)"
                        }}
                    >
                        {quantity}
                    </Button>

                    <Button
                        variant="outline-light"
                        className='itemButton'
                        onClick={() => {
                            setQuantity(quantity + 1)
                        }}
                    >
                        +
                    </Button>
                </div>

                {renderCartButton()}
            </Col>

        </Row >
    )
}