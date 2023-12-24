import "../commonStyle.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { Button } from "react-bootstrap";


export default function BackPrev() {
    const navigate = useNavigate();

    return (
        <>
            <Button
                variant="outline-light"
                className="itemButton fontAwesomeButton"
                style={{
                    position: "sticky",
                    zIndex: "1",
                    bottom: "8vh",
                    left: "85vw"
                }}
                onClick={() => {
                    navigate(-1)
                }}
            >
                <FontAwesomeIcon icon={faArrowLeft} style={{ color: "#ffffff", }} />
            </Button>

        </>
    )
}