import { GiDiamondsSmile, GiSadCrab } from "react-icons/gi"
import "./Winner.css"

export function Winner({winnerCode}) {
    const refresh = () => {
        window.location.reload();
    }

    const getContent = () => {
        if (winnerCode !== "") {
            return (
                <div className="Container">
                    <h1 className="Title">
                        {`The winner is player '${winnerCode}' !!!`}
                    </h1>
                    <p>Tap the image to play again!</p>
                    <GiDiamondsSmile onClick={refresh} size={300} />
                </div>
            );
        }

        return (
            <div className="Container">
                <h1 className="Title">
                    It is a tie!! you are both losers
                </h1>
                <p>Tap the image to play again!</p>
                <GiSadCrab onClick={refresh} size={300} />
            </div>
        );
    }

    return (
        getContent()
    );
}
