import '../commonStyle.css';
import './TopNavBar.css';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Offcanvas from 'react-bootstrap/Offcanvas';
import logo from '../../image/logo.png';
import { Image, Spinner } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useContext, useState } from 'react';
import { LoginUserContext } from '../../App';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import * as FirebaseAuthService from "../../firebase/FirebaseAuthService";

type Props = {
    handleUserInput?: (userInput: string) => void
}

export default function TopNavBar({handleUserInput}: Props) {
    const expand = 'lg';
    const navigate = useNavigate();
    const loginUser = useContext(LoginUserContext);
    const [userInput, setUserInput] = useState<string>("");

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setUserInput(event.target.value);
        // handleUserInput!(userInput);
    }

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        handleUserInput 
        ? (
            handleUserInput(userInput)
        ) : (
            navigate(`/${userInput}`)
        )
    }

    const renderLoginContainer = () => {
        if (loginUser) {
            return (
                <>
                    <Nav.Link>
                        <Button
                            variant="outline-light"
                            className='itemButton buttonMargin'
                            style={{
                                userSelect: "none",
                                pointerEvents: "none",
                            }}
                        >
                            {loginUser.email}
                        </Button>
                    </Nav.Link>

                    <Nav.Link>
                        <Button
                            variant="outline-light"
                            className='itemButton buttonMargin'
                            onClick={
                                () => { navigate('/shoppingcart') }
                            }
                        >
                            購物籃
                        </Button>
                    </Nav.Link>

                    <Nav.Link>
                        <Button
                            variant="outline-light"
                            className='itemButton buttonMargin'
                            onClick={
                                () => { navigate('/transaction') }
                            }
                        >
                            我的帳單
                        </Button>
                    </Nav.Link>

                    <Nav.Link>
                        <Button
                            variant="outline-light"
                            className='itemButton buttonMargin'
                            onClick={async () => {
                                await FirebaseAuthService.handleSignOut();
                                navigate('/login');
                            }}
                        >
                            登出
                        </Button>
                    </Nav.Link>

                </>
            )
        } else if (loginUser === null) {
            return (
                <Nav.Link>
                    <Button
                        variant="outline-light"
                        className='itemButton'
                        onClick={
                            () => { navigate('/login') }
                        }
                    >
                        登入
                    </Button>
                </Nav.Link>
            )
        } else {
            return (
                <Nav.Link>
                    <Spinner animation="border" role="status" />
                </Nav.Link>

            )
        }
    }

    return (
        <>
            <Navbar key={expand} expand={expand} className=" mb-3 barStyle" data-bs-theme="dark">
                <Container fluid className='horizontalElementStyle'>
                    <Navbar.Brand onClick={() => { navigate('/') }} className='logo'>
                        <Image src={logo} roundedCircle thumbnail />
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${expand}`} />

                    <Navbar.Offcanvas
                        id={`offcanvasNavbar-expand-${expand}`}
                        aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
                        placement="end"
                        data-bs-theme="dark"
                        className=''
                    >
                        <Offcanvas.Header closeButton>

                            <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${expand}`}>
                                Penguin Computer
                            </Offcanvas.Title>

                        </Offcanvas.Header>

                        <Offcanvas.Body>

                            <Nav className="justify-content-end flex-grow-1 ">
                                <Nav.Link href="#action1">主頁</Nav.Link>
                                <Nav.Link href="#action2">簡介</Nav.Link>
                                <NavDropdown
                                    title="所有商品"
                                    id={`offcanvasNavbarDropdown-expand-${expand}`}
                                    onClick={() => { navigate(`/${''}`) }}
                                >
                                    <NavDropdown.Item href="#action3">
                                        MSI
                                    </NavDropdown.Item>
                                    <NavDropdown.Item onClick={() => { navigate('/shoppingcart') }}>
                                        ASUS
                                    </NavDropdown.Item>

                                    <NavDropdown.Divider />

                                    <NavDropdown.Item onClick={() => { navigate('/thankyou') }}>
                                        Other
                                    </NavDropdown.Item>
                                </NavDropdown>
                            </Nav>
                            <Form
                                className="d-flex"
                                onSubmit={handleSubmit}
                            >
                                <Form.Control
                                    type="search"
                                    placeholder="搜尋"
                                    className="me-2 inputBox"
                                    aria-label="Search"
                                    onChange={handleInputChange}
                                    value={userInput}
                                />
                                <Button
                                    type='submit'
                                    variant="outline-light"
                                    className='itemButton fontAwesomeButton'
                                >
                                    <FontAwesomeIcon icon={faMagnifyingGlass} style={{ color: "#ffffff", }} />
                                </Button>
                            </Form>

                            <hr />

                            <div
                                style={{
                                    borderRight: '1px solid rgba(255, 255, 255, 0.8)',
                                    marginLeft: '2px',
                                    marginRight: '1px'
                                }}
                            />

                            {renderLoginContainer()}

                        </Offcanvas.Body>

                    </Navbar.Offcanvas>
                </Container>
            </Navbar>
        </>
    );
}
