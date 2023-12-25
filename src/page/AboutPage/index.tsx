import '../../common/commonStyle.css';
import TopNavBar from '../../common/component/TopNavBar';
import BackToTop from '../../common/component/BackToTop';
import { useEffect } from 'react';

export default function AboutPage() {

    useEffect(() => {
        document.title = '關於網頁';
    }, []);

    return (
        <>
            <TopNavBar />
            <div className="backGlassBox">
                <div style={{ fontSize: "1.75rem", textAlign: "center", textShadow: "2px 2px rgba(0, 0, 0, 0.8)" }}>
                    <h1>關於網頁</h1>
                    <hr />
                    <p>
                        這是一個僅供教育目的的虛假網站。
                        請注意，本網站僅用於模擬和演示，
                        並不提供真實的服務或信息。
                        任何在此網站上提供的內容都是虛構的，
                        不應被視為真實或可靠。
                        謝謝您的理解和支持。
                    </p>

                    <p>
                        This is a fake website for educational purposes only.
                        Please note that this website is solely for simulation and demonstration purposes
                        and does not provide real services or information,
                        Any content provided on this website is fictional and should not be considered as genuine or reliable.
                        Thankyou for your understanding and support.
                    </p>
                    <hr />

                    <h2>參考資料</h2>

                    <div style={{ textAlign: "left" }}>
                        <a href='https://www.fortress.com.hk/zh-hk/'>FORTRESS豐澤 - 香港專業大型電器官方網站</a>
                        <br />
                        <a href='https://www.youtube.com/@codehal'>Codehal</a>
                        <br />
                        <a href='https://www.youtube.com/watch?v=Ex62189AHC8'>Root Cause - MSI Logo</a>
                        <br />
                    </div>
                    <hr />

                    <h2>Dependency</h2>
                    <div style={{ fontSize: "1.25rem", textAlign: "left" }}>
                        <h3>Backend</h3>

                        <p>java 17</p>
                        <p>Gradle</p>
                        <p>org.springframework.boot version 3.1.5</p>
                        <p>org.springframework.boot:spring-boot-starter-data-jpa</p>
                        <p>org.springframework.boot:spring-boot-starter-oauth2-resource-server</p>
                        <p>org.springframework.boot:spring-boot-starter-security</p>
                        <p>org.springframework.boot:spring-boot-starter-web</p>
                        <p>com.mysql:mysql-connector-j</p>
                        <br />

                        <h3>Frontend</h3>
                        <p>react: 18.2.0</p>
                        <p>typescript: 5.2.2</p>
                        <p>vite: 5.0.8</p>
                        <p>react-bootstrap: 2.9.1</p>
                        <p>react-router-dom: 6.21.0</p>
                        <p>axios: 1.6.2</p>
                        <p>firebase: 10.7.1</p>
                        <p>moment: 2.29.4</p>
                        <p>fortawesome/react-fontawesome: 0.2.0</p>
                        <p>react-number-format: 5.3.1</p>
                        <p>react-social-login-buttons: 3.9.1</p>
                        <br />

                        <h3>Database</h3>
                        <p>MySQL</p>
                        <br />

                        <h3>Cloud and Deployment</h3>
                        <p>Docker</p>
                        <p>AWS EC2</p>
                        <p>AWS RDS</p>
                        <p>AWS S3</p>

                    </div>
                </div>


            </div>
            <BackToTop />
        </>
    )
}