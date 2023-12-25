import { useEffect, useState } from 'react';
import '../../common/commonStyle.css';
import './home.css';
import logo from '../../image/logo.png';

import { useNavigate } from 'react-router-dom';
import { Image } from 'react-bootstrap';



export default function HomePage() {
    const [isEntering, setIsEntering] = useState<boolean>(false);
    const navigate = useNavigate();

    const handleOnClick = () => {
        setIsEntering(true);
        setTimeout(() => navigate('/product'), 9000);
    }

    const renderEntry = () => {
        if (isEntering) {
            return (
                <div className='homeAfter'>

                </div>
            )
        } else {
            return (
                <>
                    <div className='headerBox'>
                        <Image src={logo} roundedCircle thumbnail className='homeIcon' />
                        <div className='brandBox'>
                            Penguin Computer
                            <hr />
                            <div className='sloganBox'>
                                Learn．Aspire．Become
                            </div>
                        </div>
                    </div>
                    <div className='home'>
                        <button className='entryBtn' onClick={handleOnClick}>Enter</button>
                    </div>
                </>
            )
        }
    }

    useEffect(() => {
        document.title = 'Penguin Computer';
    }, []);

    return (
        <>
            {renderEntry()}
        </>
    )
}