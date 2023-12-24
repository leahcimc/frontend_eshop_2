import { faCircleCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Toast, ToastContainer } from "react-bootstrap";

type Props = {
    isAdded: boolean;
    toggleShowA: () => void;
}


export default function SuccessToast({isAdded, toggleShowA}: Props) {
    return (
        <>
            <ToastContainer
                className="p-3"
                // position="bottom-start"
                style={{
                    zIndex: 2,
                    position: "absolute",
                    bottom: "12vh",
                    left: "40vw"
                }}
            >
                <Toast
                    show={isAdded} onClose={toggleShowA} animation delay={3000} autohide
                    className="popUpBox"
                >
                    <Toast.Body className="d-flex justify-content-center align-items-center">
                        <FontAwesomeIcon icon={faCircleCheck} size="2xl" style={{ color: "#00f068", marginRight: "8px"}} />
                        <div>成功加入</div>
                    </Toast.Body>
                </Toast>
            </ToastContainer>
        </>
    )
}