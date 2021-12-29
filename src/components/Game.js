import { withStyles } from "@material-ui/core/styles";
import {
	useCurrentGame,
	gameSetBet,
	gameNext,
	gameSetTricks,
} from "store/actions";
import { useDispatch } from "react-redux";
import React from "react";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowCircleRightIcon from "@mui/icons-material/ArrowCircleRight";
import { Button } from "@mui/material";
import { IconButton } from "@mui/material";
import { getGameCanGoNext, getGameTotalBetOrTricks } from "store/selector";
import GameTableRows from "./GameTableRows";
import { gameTableRowsStyles, StyledTd, StyledTh } from "./gameTableRowsStyle";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import Ascenseur from "./Ascenseur";

const styles = gameTableRowsStyles;

const Game = (props) => {
	const { classes } = props;

	// const [openNewPlayer, setOpenNewPlayer] = React.useState(false);
	// const [nbPlayers, setNbPlayers] = React.useState(0);
	// const [nbTurnsMode, setNbTurnsMode] = React.useState(0);

	// const settings = useSettings();
	const game = useCurrentGame();
	const dispatch = useDispatch();

	// React.useEffect(() => {
	// 	if (
	// 		game &&
	// 		game.players &&
	// 		game.players.length > 0
	// 	) {
	// 		setNbPlayers(game.players.length);
	// 	}
	// }, [game]);
	// console.log(nbTurnsMode);

	// const nbTurnsOneWay = Math.floor(52 / nbPlayers);
	// const nbTurnsTwoWays = Math.floor(52 / nbPlayers) * 2 - 1;

	// Change Bet
	const handlePlayerBetChange = (player, bet) => {
		if (game.currentPhase === 0) {
			dispatch(gameSetBet(player, bet));
		} else if (game.currentPhase === 2) {
			dispatch(gameSetTricks(player, bet));
		}
	};

	const handleNext = () => {
		dispatch(gameNext());
	};

	const isBetPhase = game.currentPhase === 0;
	const isPostBetPhase = game.currentPhase === 1;
	const isTricksPhase = game.currentPhase === 2;
	const btnNextDisabled = !getGameCanGoNext(game);
	const totalBetOrTricks = getGameTotalBetOrTricks(game);

	return (
		<div className={classes.gameContainer}>
			<Ascenseur />
			<div className={classes.tableContainer}>
				<table className={classes.table}>
					<thead>
						<tr>
							<StyledTh
								isHeader={true}
								isFirst={true}
								key={"row_0_col_0"}
							></StyledTh>
							{game.turnNumbers.map((turnNumber, i) => {
								if (i > game.currentTurn) {
									return;
								}
								return (
									<StyledTh
										isHeader={true}
										isFirstScoreCol={i === 0}
										isCurrent={i === game.currentTurn}
										key={"row_0_col_" + i}
									>
										{turnNumber}
									</StyledTh>
								);
							})}
							<StyledTh
								isHeader={true}
								isLast={true}
								key={"row_0_col_last"}
							>
								{game.turnNumbers[game.currentTurn]}
							</StyledTh>
						</tr>
					</thead>
					<tbody>
						<GameTableRows />
					</tbody>
					<tfoot>
						<tr className={classes.tableRow}>
							<StyledTd
								isFooter={true}
								isFirst={true}
								key={"row_last_col_0"}
							></StyledTd>
							{game.turnNumbers.map((turnNumber, i) => {
								if (i > game.currentTurn) {
									return;
								}
								return (
									<StyledTd
										isFooter={true}
										isFirstScoreCol={i === 0}
										isCurrent={i === game.currentTurn}
										key={"row_last_col_" + i}
									>
										-
									</StyledTd>
								);
							})}
							<StyledTd
								isFooter={true}
								isLast={true}
								key={"row_last_col_last"}
							>
								{(isBetPhase || isTricksPhase) && (
									<div className={classes.wrapperCellData}>
										<span
											className={
												classes.betTrickTotalLabel
											}
										>
											Total:
										</span>
										<span
											className={
												classes.betTrickTTotalValue
											}
										>
											{totalBetOrTricks}
										</span>
									</div>
								)}
							</StyledTd>
						</tr>
					</tfoot>
				</table>
			</div>
			<div className={classes.nextStepWrapper}>
				<Button
					variant="contained"
					size="small"
					disabled={btnNextDisabled}
					endIcon={
						isBetPhase || isTricksPhase ? (
							<CheckCircleIcon />
						) : (
							ArrowCircleRightIcon
						)
					}
					onClick={handleNext}
				>
					{isBetPhase
						? "Confirmer les paris"
						: isPostBetPhase
						? "Fin de ronde"
						: isTricksPhase
						? "Confirmer les levées remportées"
						: "Tour suivant"}
				</Button>
			</div>
		</div>
	);
};

export default withStyles(styles, { name: "Game" })(Game);
