import '../../common/commonStyle.css';
import TopNavBar from '../../common/component/TopNavBar';
import MainItem from './component/MainItem';
import BackPrev from '../../common/component/BackPrev';
import BackToTop from '../../common/component/BackToTop';
import SuccessToast from './component/SuccessToast';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { ProductDetail } from '../../data/dto/ProductDto';
import { Spinner } from 'react-bootstrap';
import * as ProductApi from '../../api/productAPI';


type Params = {
    productId: string;
}

export default function ProductDetailPage() {
    const { productId } = useParams<Params>();
    const navigate = useNavigate();
    const [result, setResult] = useState<ProductDetail | undefined>(undefined);
    const [isAdded, setIsAdded] = useState<boolean>(false);


    const toggleShowA = () => setIsAdded(!isAdded);

    const fetch1ProductData = async (pid: string) => {
        const resultData = await ProductApi.getOneProduct(pid);
        setResult(resultData);
        document.title = resultData.name;
    }

    useEffect(() => {
        if (productId) {
            fetch1ProductData(productId);
        } else {
            navigate("/error");
        }

    }, [])

    return (
        <>
            <TopNavBar />
            <div className="backGlassBox">
                {
                    result
                        ? (
                            <MainItem
                                productData={result}
                                setIsAdded={setIsAdded}
                            />
                        ) : (
                            <div><Spinner animation="border" role="status" /></div>
                        )
                }
                {
                    isAdded
                        ? (
                            <SuccessToast isAdded={isAdded} toggleShowA={toggleShowA} />
                        ) : (
                            null
                        )
                }
            </div>
            <BackPrev />
            <BackToTop />
        </>
    )
}