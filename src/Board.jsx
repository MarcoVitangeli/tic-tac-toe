import { useEffect, useState } from "react";
import { Winner } from "./Winner"
import "./Board.css"

const WINNER_INDEX = 1;
const NUMBER_OF_ROUNDS = 0;

function BoardElement({ currentPlayer, toggle }) {
    const [player, setPlayer] = useState("");

    const handleClick = () => {
        if (player !== "") {
            return;
        }

        setPlayer(currentPlayer);
        toggle();
    };

    return (
        <span className="BoardElement" onClick={handleClick}>{player}</span>
    );
}

export function Board() {
    const [player, setPlayer] = useState("O");
    const [shouldPlay, setShouldPlay] = useState(true);
    const [winner, setWinner] = useState("");

    useEffect(() => {
        const winner = checkWinner();

        if (!winner[WINNER_INDEX] && winner[NUMBER_OF_ROUNDS] !== 9) {
            return;
        }
        setShouldPlay(false);
        setWinner(winner[WINNER_INDEX]);
    }, [
        player
    ]);

    const togglePlayer = () => {
        if (player === "O") {
            setPlayer("X");
            return;
        }
        setPlayer("O");
    };

    const getContent = () => {
        if (!shouldPlay) {
            return <Winner winnerCode={winner} />
        }

        return (
            <>
                <div className="BoardHeader">
                    {`Current Player: ${player}`}
                </div>
                <div className="Board">
                    <BoardElement currentPlayer={player} toggle={togglePlayer} />
                    <BoardElement currentPlayer={player} toggle={togglePlayer} />
                    <BoardElement currentPlayer={player} toggle={togglePlayer} />
                    <BoardElement currentPlayer={player} toggle={togglePlayer} />
                    <BoardElement currentPlayer={player} toggle={togglePlayer} />
                    <BoardElement currentPlayer={player} toggle={togglePlayer} />
                    <BoardElement currentPlayer={player} toggle={togglePlayer} />
                    <BoardElement currentPlayer={player} toggle={togglePlayer} />
                    <BoardElement currentPlayer={player} toggle={togglePlayer} />
                </div>
            </>
        );
    }

    return (
        getContent()
    );
}

function checkWinner() {
    const elements = document.querySelectorAll('span');

    const text = Array.from(elements)
        .map(domNode => domNode.innerText);

    const numOfRounds = text
        .map(e => e !== "" ? 1 : 0)
        .reduce((x, y) => x + y, 0);

    function checkTuple(t1, t2, t3) {
        if (t1 === "" || t2 === "" || t3 === "") {
            return [false, ""];
        }

        if (t1 !== t2 || t2 !== t3) {
            return [false, ""];
        }

        return [true, t1];
    }

    let result = [];
    // rows
    result.push(checkTuple(text[0], text[1], text[2]));
    result.push(checkTuple(text[3], text[4], text[5]));
    result.push(checkTuple(text[6], text[7], text[8]));

    //columns
    result.push(checkTuple(text[0], text[3], text[6]));
    result.push(checkTuple(text[1], text[4], text[7]));
    result.push(checkTuple(text[2], text[5], text[8]));

    // diagonals
    result.push(checkTuple(text[0], text[4], text[8]));
    result.push(checkTuple(text[2], text[4], text[6]));

    for (let tuple of result) {
        if (tuple[0]) {
            return [numOfRounds, tuple[1]];
        }
    }

    return [numOfRounds, ""];
}
