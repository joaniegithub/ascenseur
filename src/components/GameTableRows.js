import { withStyles } from "@material-ui/core/styles";
import { useCurrentGame, gameSetBet, gameSetTricks } from "store/actions";
import { useDispatch } from "react-redux";
import React from "react";
import NumSelector from "./NumSelector";
import {
	gameTableRowsStyles,
	StyledDivWrapper,
	StyledTd,
	StyledTr,
} from "./gameTableRowsStyle";

const styles = gameTableRowsStyles;

const GameTableRows = (props) => {
	const { classes } = props;

	// const settings = useSettings();
	const game = useCurrentGame();
	const dispatch = useDispatch();

	// Change Bet
	const handlePlayerBetChange = (player, bet) => {
		if (game.currentPhase === 0) {
			dispatch(gameSetBet(player, bet));
		} else if (game.currentPhase === 2) {
			dispatch(gameSetTricks(player, bet));
		}
	};

	const isBetPhase = game.currentPhase === 0;
	const isTricksPhase = game.currentPhase === 2;
	const isGameDone =
		game.currentTurn === game.nbTurns - 1 && game.currentPhase === 3;
	let highScore = -1;
	let winners = [];
	if (isGameDone) {
		const finalScores = game.players.map((player, i) => {
			return {
				playerName: player.name,
				playerIndex: i,
				score: player.scores[player.scores.length - 1],
			};
		});
		highScore = Math.max.apply(
			Math,
			finalScores.map(function (o) {
				return o.score;
			})
		);
		winners = finalScores.map((player) => {
			return player.score === highScore ? highScore : false;
		});
	}

	const getCell = (
		player,
		indexRow,
		indexCol,
		confirmedTurnBet,
		confirmedTurnTrick,
		confirmedTurnScore,
		currentTurn,
		isLast,
		currentVal,
		isWinner
	) => {
		const done = confirmedTurnScore !== "...";
		const missed = confirmedTurnBet !== confirmedTurnTrick;

		const cellContent = (
			<StyledDivWrapper
				isWinner={isWinner}
				isCurrent={indexCol === currentTurn}
			>
				<span className={classes.scoreTrickData}>
					{(missed || indexCol === currentTurn) && (
						<span
							className={
								missed && done
									? classes.scoreTrickBetMissed
									: classes.scoreTrickBet
							}
						>
							{confirmedTurnBet}
						</span>
					)}
					<span
						className={
							missed
								? classes.scoreTrickResultMissed
								: classes.scoreTrickResult
						}
					>
						{confirmedTurnTrick}
					</span>
				</span>
				<span
					className={
						missed && done
							? classes.scoreResultMissed
							: classes.scoreResult
					}
				>
					{confirmedTurnScore}
				</span>
			</StyledDivWrapper>
		);

		return (
			<StyledTd
				isEven={indexRow % 2 === 0}
				isFirstScoreCol={indexCol === 0}
				isCurrent={indexCol === currentTurn}
				isLast={isLast}
				isWinner={isWinner}
				key={"row_" + (indexRow + 1) + "_col_" + indexCol}
			>
				{isLast && (isBetPhase || isTricksPhase) ? (
					<StyledDivWrapper isWrapper={true}>
						{cellContent}

						<StyledDivWrapper isControl={true}>
							{(isBetPhase || isTricksPhase) && (
								<NumSelector
									value={currentVal}
									min={0}
									max={game.turnNumbers[game.currentTurn]}
									handleUpdateQty={(bet) =>
										handlePlayerBetChange(player, bet)
									}
								/>
							)}
						</StyledDivWrapper>
					</StyledDivWrapper>
				) : (
					<React.Fragment>{cellContent}</React.Fragment>
				)}
			</StyledTd>
		);
	};

	return (
		<React.Fragment>
			{game.players &&
				game.players.map((player, index) => {
					const currentBet = player.bets[game.currentTurn] || 0;
					const currentTricks = player.tricks[game.currentTurn] || 0;

					const isWinner = winners[index];

					let currentVal = "";
					switch (game.currentPhase) {
						case 0:
						case 1:
							currentVal = currentBet;
							break;
						case 2:
							currentVal = currentTricks;
							break;
						default:
							currentVal = "";
							break;
					}

					return (
						<StyledTr
							key={"row_" + index}
							isEven={index % 2 === 0}
							isWinner={isWinner}
						>
							<StyledTd
								isFirst={true}
								isEven={index % 2 === 0}
								isWinner={isWinner}
							>
								{player.name}
							</StyledTd>
							{game.turnNumbers.map((turnNumber, i) => {
								if (i > game.currentTurn) {
									return null;
								}
								const isLast = i === game.currentTurn;
								const turnBet = player.bets[i];
								const confirmedTurnBet =
									(game.currentPhase >= 1 &&
										game.currentTurn >= i) ||
									game.currentTurn > i
										? turnBet
										: "-";

								const turnTrick = player.tricks[i];
								const confirmedTurnTrick =
									(game.currentPhase >= 3 &&
										game.currentTurn >= i) ||
									game.currentTurn > i
										? turnTrick
										: "-";
								const turnScore = player.scores[i];
								const confirmedTurnScore =
									(game.currentPhase >= 3 &&
										game.currentTurn >= i) ||
									game.currentTurn > i
										? turnScore
										: "...";

								return getCell(
									player,
									index,
									i,
									confirmedTurnBet,
									confirmedTurnTrick,
									confirmedTurnScore,
									game.currentTurn,
									isLast,
									currentVal,
									isWinner
								);
							})}
						</StyledTr>
					);
				})}
		</React.Fragment>
	);
};

export default withStyles(styles, { name: "GameTableRows" })(GameTableRows);
