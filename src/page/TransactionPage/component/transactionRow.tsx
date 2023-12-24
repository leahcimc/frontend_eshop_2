import '../../../common/commonStyle.css';
import { Image } from "react-bootstrap";
import { Item } from "../../../data/dto/TransactionDto";
import { NumericFormat } from 'react-number-format';

type Props = {
    checkOutItem: Item;
}

export default function TransactionRow({ checkOutItem }: Props) {

    return (
        <>
            <tr>
                <td>
                    <Image
                        src={checkOutItem.product.image_url}
                        className="detailPic"
                        style={{
                            width: "150px",
                            boxShadow: "0 5px 5px rgba(0, 0, 0, 0.4)"
                        }}
                    />
                </td>
                <td
                    style={{
                        textAlign: "left"
                    }}
                >
                    {checkOutItem.product.name}
                </td>
                <td>
                    <NumericFormat value={checkOutItem.product.price.toFixed(2)} displayType={'text'} thousandSeparator={true} prefix={'$'} />
                </td>
                <td>{checkOutItem.quantity}</td>
                <td>
                    <NumericFormat value={checkOutItem.subtotal.toFixed(2)} displayType={'text'} thousandSeparator={true} prefix={'$'} />
                </td>
            </tr>
        </>
    )
}