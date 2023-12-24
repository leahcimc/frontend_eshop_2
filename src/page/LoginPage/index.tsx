import '../../common/commonStyle.css';
import TopNavBar from '../../common/component/TopNavBar';
import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form } from 'react-bootstrap';
import { Col } from 'react-bootstrap';
import { Row } from 'react-bootstrap';
import { Button } from 'react-bootstrap';
import { GoogleLoginButton } from 'react-social-login-buttons';
import { LoginUserContext } from '../../App';
import * as FirebaseAuthService from '../../firebase/FirebaseAuthService';

export default function LoginPage() {
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const loginUser = useContext(LoginUserContext);
    const navigate = useNavigate();

    const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(event.target.value);
    }
    const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(event.target.value);
    }

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const loginResult = await FirebaseAuthService.handleSignInWithEmailAndPassword(email, password);
        if (loginResult) {
            navigate(-1);
        } else {
            alert('login fail');
        }
    }

    useEffect(() => {
        if (loginUser) {
            navigate("/");
        }
    }, [loginUser]);

    return (
        <>
            <TopNavBar />
            <div className="backGlassBox">
                <Form
                    onSubmit={handleSubmit}
                    style={{
                        color: 'azure',
                        textShadow: '2px 2px rgba(0, 0, 0, 0.8)'
                    }}
                >
                    <Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
                        <Form.Label column sm="4">
                            電郵地址
                        </Form.Label>
                        <Col sm="8">
                            <Form.Control
                                type="email"
                                placeholder="example@demo.com"
                                className="inputBox"
                                onChange={handleEmailChange}
                                value={email}
                            />
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row} className="mb-3" controlId="formPlaintextPassword">
                        <Form.Label column sm="4">
                            密碼
                        </Form.Label>
                        <Col sm="8">
                            <Form.Control
                                type="password"
                                placeholder="password"
                                className="inputBox"
                                onChange={handlePasswordChange}
                                value={password}
                            />
                        </Col>
                    </Form.Group>

                    <Button
                        type='submit'
                        className='itemButton d-flex justify-content-center'
                        style={{
                            width: "100%",
                            color: 'azure',
                            textShadow: '2px 2px rgba(0, 0, 0, 0.8)'
                        }}
                    >
                        登入
                    </Button>

                    <hr />

                    <GoogleLoginButton onClick={() => {
                        FirebaseAuthService.handleSignInWithGoogle();
                    }}
                    />

                </Form>
            </div>
        </>
    )
}