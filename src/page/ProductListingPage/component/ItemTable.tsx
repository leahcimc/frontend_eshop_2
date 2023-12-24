import ProductItem from "./ProductItem";
import { ProductDto } from "../../../data/dto/ProductDto";

type Props = {
    productList: ProductDto[]
    searchKey: string
}

export default function ItemTable({ productList, searchKey }: Props) {
    return (
        <>
            {
                productList && productList.map &&
                productList.filter(
                    (productDetail) => productDetail.name.includes(searchKey)
                ).map(
                    (productDetail) => <ProductItem productDetail={productDetail} key={productDetail.pid}/> 
                )
            }

        </>
    )
}