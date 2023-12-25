import { useEffect } from 'react';
import '../../common/commonStyle.css';
import TopNavBar from '../../common/component/TopNavBar';
import errorPic from '../../image/error.png';
import { Image } from 'react-bootstrap';

export default function ErrorPage() {
    useEffect(() => {
        document.title = 'Error';
      }, []);

    return (
        <>
            <TopNavBar />
            <div className="backGlassBox">
                <Image
                    src={errorPic}
                    thumbnail
                    style={{
                        width: '400'
                    }}
                />
            </div>
        </>
    )
}