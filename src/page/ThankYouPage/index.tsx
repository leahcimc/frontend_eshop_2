import { useEffect } from 'react';
import '../../common/commonStyle.css';
import TopNavBar from '../../common/component/TopNavBar';
import thankyouPic from '../../image/thankyou.jpg';
import { Image } from 'react-bootstrap';

export default function ThankYouPage() {

    useEffect(() => {
        document.title = '感謝惠顧';
    }, []);

    return (
        <>
            <TopNavBar />
            <div className="backGlassBox">
                <Image
                    src={thankyouPic}
                    thumbnail
                    style={{
                        width: '400'
                    }}
                />
            </div>
        </>
    )
}