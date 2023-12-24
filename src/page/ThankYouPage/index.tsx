import '../../common/commonStyle.css';
import TopNavBar from '../../common/component/TopNavBar';
import thankyouPic from '../../image/thankyou.jpg';
import { Image } from 'react-bootstrap';

export default function ThankYouPage() {

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