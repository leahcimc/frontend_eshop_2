import "../commonStyle.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUp } from "@fortawesome/free-solid-svg-icons";
import { Button } from "react-bootstrap";


export default function BackToTop() {
    const topFunction = () => {
        document.documentElement.scrollTop = 0;
    }

    return (
        <>
            <Button
                variant="outline-light"
                className="itemButton fontAwesomeButton"
                style={{
                    position: "sticky",
                    zIndex: "1",
                    bottom: "8vh",
                    left: "90vw"
                }}
                onClick={topFunction}
            >
                <FontAwesomeIcon icon={faArrowUp} style={{ color: "#ffffff", }} />
            </Button>
        </>
    )
}