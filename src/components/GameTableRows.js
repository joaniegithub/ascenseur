import { withStyles } from "@material-ui/core/styles";
import { useCurrentGame, gameSetBet, gameSetTricks } from "store/actions";
import { useDispatch } from "react-redux";
import React from "react";
import NumSelector from "./NumSelector";
import { colors, gameTableRowsStyles, StyledTd } from "./gameTableRowsStyle";

const styles = gameTableRowsStyles;

const GameTableRows = (props) => {
	const { classes } = props;

	// const [openNewPlayer, setOpenNewPlayer] = React.useState(false);
	// const [nbPlayers, setNbPlayers] = React.useState(0);
	// const [nbTurnsMode, setNbTurnsMode] = React.useState(0);

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
	const isPostBetPhase = game.currentPhase === 1;
	const isTricksPhase = game.currentPhase === 2;

	const getCell = (
		player,
		indexRow,
		indexCol,
		confirmedTurnBet,
		confirmedTurnTrick,
		confirmedTurnScore,
		currentTurn
	) => {
		const done = confirmedTurnScore !== "...";
		const missed = confirmedTurnBet !== confirmedTurnTrick;
		return (
			<StyledTd
				isEven={indexRow % 2 == 0}
				isFirstScoreCol={indexCol === 0}
				isCurrent={indexCol === currentTurn}
				key={"row_" + (indexRow + 1) + "_col_" + indexCol}
			>
				<div className={classes.wrapperCellData}>
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
							missed
								? classes.scoreResultMissed
								: classes.scoreResult
						}
					>
						{confirmedTurnScore}
					</span>
				</div>
			</StyledTd>
		);
	};

	return (
		<React.Fragment>
			{game.players &&
				game.players.map((player, index) => {
					const currentBet = player.bets[game.currentTurn] || 0;
					const currentTricks = player.tricks[game.currentTurn] || 0;
					// const confirmedCurrentBet =
					// 	game.currentPhase >= 1
					// 		? currentBet
					// 		: "-";

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
						<tr className={classes.tableRow} key={"row_" + index}>
							<StyledTd isFirst={true} isEven={index % 2 == 0}>
								{player.name}
							</StyledTd>
							{game.turnNumbers.map((turnNumber, i) => {
								if (i > game.currentTurn) {
									return;
								}
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
									game.currentTurn
								);
							})}
							<StyledTd
								isLast={true}
								isEven={index % 2 === 0}
								isExpanded={
									game.currentPhase === 0 ||
									game.currentPhase === 2
								}
							>
								<span className={classes.currentVal}>
									{currentVal}
								</span>
								{(isBetPhase || isTricksPhase) && (
									<NumSelector
										value={currentVal}
										min={0}
										max={game.turnNumbers[game.currentTurn]}
										handleUpdateQty={(bet) =>
											handlePlayerBetChange(player, bet)
										}
										index={index}
									/>
								)}
							</StyledTd>
						</tr>
					);
				})}
		</React.Fragment>
	);
};

export default withStyles(styles, { name: "GameTableRows" })(GameTableRows);
