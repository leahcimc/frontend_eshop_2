import '../../../common/commonStyle.css';
import { Row, Col, Image, Spinner } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { NumericFormat } from 'react-number-format';
import { faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import { CartDto } from "../../../data/dto/CartDto";
import { Button } from 'react-bootstrap';
import * as CartApi from "../../../api/cartAPI";

type Props = {
    item: CartDto;
    itemList: CartDto[];
    setCartList: (cartList: CartDto[]) => void;
    calTotal: (resultList: CartDto[]) => void;
}

export default function CartRow({ item, itemList, setCartList, calTotal }: Props) {
    const [updatedQuant, setUpdatedQuant] = useState<number>(item.cart_quantity)
    const [isUpdating, setIsUpdating] = useState<boolean>(false)

    const renderSelector = () => {
        if (isUpdating) {
            return (

                <Button
                    variant="outline-light"
                    className='itemButton'
                    disabled
                >
                    <Spinner animation="border" role="status"/>
                </Button>

            )
        } else {
            return (
                <>
                    <Button
                        variant="outline-light"
                        className='itemButton'
                        onClick={handleMinus}

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
                        {updatedQuant}
                    </Button>

                    <Button
                        variant="outline-light"
                        className='itemButton'
                        onClick={handlePlus}
                    >
                        +
                    </Button>
                </>
            )
        }
    }

    const renderRemove = () => {
        if (isUpdating) {
            return (
                <Button
                    variant="outline-light"
                    className='itemButton fontAwesomeButton'
                    disabled
                >
                    <Spinner animation="border" role="status"/>
                </Button>
            )
        } else {
            return (
                <Button
                    variant="outline-light"
                    className='itemButton fontAwesomeButton'
                    onClick={handleDelete}
                >
                    <FontAwesomeIcon icon={faTrashCan} style={{ color: "#ffffff", }} />
                </Button>
            )
        }
    }

    const handleMinus = async () => {
        try {
            setIsUpdating(true);
            if (updatedQuant > 1) {
                const data = await CartApi.updateCartItem(item.pid, updatedQuant - 1)
                setUpdatedQuant(data.cart_quantity);

                for (const listItem of itemList) {
                    if (listItem.pid === item.pid) {
                        listItem.cart_quantity = data.cart_quantity;
                        calTotal(itemList);
                    }
                }
            } else {
                null
            }
            setIsUpdating(false);
        } catch (e) {
            throw e;
        }
    }

    const handlePlus = async () => {
        try {
            setIsUpdating(true);
            const data = await CartApi.updateCartItem(item.pid, updatedQuant + 1)
            setUpdatedQuant(data.cart_quantity);

            for (const listItem of itemList) {
                if (listItem.pid === item.pid) {
                    listItem.cart_quantity = data.cart_quantity;
                    calTotal(itemList);
                }
            }
            setIsUpdating(false);
        } catch (e) {
            throw e;
        }
    }

    const handleDelete = async () => {
        try {
            setIsUpdating(true);
            await CartApi.deleteCartItem(item.pid);
            const updatedList = itemList.filter((listItem) => (
                listItem.pid !== item.pid
            ))
            setCartList(updatedList);

            calTotal(updatedList);
            setIsUpdating(false);
        } catch (e) {
            throw e;
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
                        <Image
                            src={item.image_url}
                            className="detailPic"
                            style={{
                                width: "150px"
                            }}
                        />
                    </Col>

                    <Col sm={5}>
                        {item.name}
                    </Col>

                    <Col sm={2} className="d-flex justify-content-center">
                        <NumericFormat value={item.price.toFixed(2)} displayType={'text'} thousandSeparator={true} prefix={'$'} />
                    </Col>

                    <Col sm={2} className="d-flex justify-content-center">
                        {renderSelector()}
                    </Col>

                    <Col sm={1}>
                        {renderRemove()}
                    </Col>
                </div>
            </Row >

        </>
    )
}