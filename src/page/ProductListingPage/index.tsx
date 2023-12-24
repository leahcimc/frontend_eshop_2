import '../../common/commonStyle.css';
import TopNavBar from '../../common/component/TopNavBar';
import ItemTable from './component/ItemTable';
import BackPrev from '../../common/component/BackPrev';
import BackToTop from '../../common/component/BackToTop';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ProductDto } from '../../data/dto/ProductDto';
import { Spinner } from 'react-bootstrap';
import * as ProductApi from '../../api/productAPI';

type Params = {
    searchWord?: string
}

export default function ProductListingPage() {
    const { searchWord } = useParams<Params>();
    const navigate = useNavigate();
    const [searchKey, setSearchKey] = useState<string>('');

    const [allProductList, setAllProductList] = useState<ProductDto[] | undefined>(undefined);

    const handleSearchKeyChange = (userInput: string) => {
        setSearchKey(userInput);
    }

    const fetchAllProduct = async () => {
        try {
            const result = await ProductApi.getAllProduct();
            setAllProductList(result);
        } catch (e) {
            navigate("/error");
        }

    }

    useEffect(() => {
        if (searchWord) {
            setSearchKey(searchWord)
        }
        console.log(searchWord)
        fetchAllProduct();
    }, [])

    return (
        <>
            <TopNavBar handleUserInput={handleSearchKeyChange}/>
            <div className="backGlassBox d-flex justify-content-around flex-wrap">

                {
                    allProductList
                        ? (
                            <ItemTable productList={allProductList} searchKey={searchKey}/>
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