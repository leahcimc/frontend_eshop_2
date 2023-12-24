import { Table } from "react-bootstrap";
import { TransactionDto } from "../../../data/dto/TransactionDto"
import TransactionRow from "./transactionRow";

type Props = {
    data: TransactionDto;
}

export default function TransactionTable({ data }: Props) {
    return (
        <>
            <Table striped bordered hover variant="outline-light">
                <thead>
                    <tr>
                        <th>商品</th>
                        <th>商品名稱</th>
                        <th>商品價格</th>
                        <th>已選數目</th>
                        <th>小計</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        data.items && data.items.map &&
                        data.items.map(
                            (checkOutItem) => <TransactionRow checkOutItem={checkOutItem} key={checkOutItem.tpid} />
                        )
                    }
                </tbody>
            </Table>
        </>
    )
}