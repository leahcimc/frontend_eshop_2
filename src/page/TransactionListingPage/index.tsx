import '../../common/commonStyle.css';
import TopNavBar from '../../common/component/TopNavBar';
import TransactionListTable from './component/transactionListTable';
import { useEffect, useState, useContext } from 'react';
import { TransactionListDto } from '../../data/dto/TransactionDto';
import { LoginUserContext } from '../../App';
import { useNavigate } from 'react-router-dom';
import { Spinner } from 'react-bootstrap';
import * as TransactionAPI from '../../api/transactionAPI';
import BackPrev from '../../common/component/BackPrev';
import BackToTop from '../../common/component/BackToTop';

export default function TransactionListingPage() {
    const loginUser = useContext(LoginUserContext);
    const [result, setResult] = useState<TransactionListDto[] | undefined>(undefined);
    const navigate = useNavigate();

    const fetchAllBillData = async () => {
        try {
            const resultList = await TransactionAPI.getAllTransaction();
            setResult(resultList);
        } catch (e) {
            navigate("/error");
        }

    }

    useEffect(() => {
        document.title = '我的帳單';
        if (loginUser) {
            fetchAllBillData();
        } else if (loginUser === null) {
            navigate("/login");
        }
    }, [loginUser])

    return (
        <>
            <TopNavBar />
            <div
                className="backGlassBox d-flex justify-content-center flex-wrap"
                style={{
                    background: "rgba(0, 0, 0, 0.2)",
                    fontSize: "1.25rem"
                }}
            >
                {
                    result
                        ? result.length !== 0
                            ? (
                                <TransactionListTable data={result} />
                            ) : (
                                <div>沒有帳單</div>
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

