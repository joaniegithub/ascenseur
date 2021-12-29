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
import { gameTableRowsStyles } from "./gameTableRowsStyle";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

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
	const isTricksPhase = game.currentPhase === 2;
	const btnNextDisabled = !getGameCanGoNext(game);
	const totalBetOrTricks = getGameTotalBetOrTricks(game);

	return (
		<div className={classes.gameContainer}>
			<div className={classes.tableContainer}>
				<table className={classes.table}>
					<thead>
						<tr className={classes.tableRow}>
							<th
								className={classes.firstColTableCellHeader}
								key={"row_0_col_0"}
							></th>
							{game.turnNumbers.map((turnNumber, i) => {
								return (
									<th
										className={classes.headerTableCell}
										key={"row_0_col_" + i}
									>
										{turnNumber}
									</th>
								);
							})}
							<th
								className={classes.lastColTableCellHeader}
								key={"row_0_col_last"}
							>
								{game.turnNumbers[game.currentTurn]}
							</th>
						</tr>
					</thead>
					<tbody>
						<GameTableRows />
					</tbody>
					<tfoot>
						<tr className={classes.tableRow}>
							<th
								className={classes.firstColTableCellFooter}
								key={"row_last_col_0"}
							></th>
							{game.turnNumbers.map((turnNumber, i) => {
								return (
									<th
										className={classes.footerTableCell}
										key={"row_last_col_" + i}
									>
										--
									</th>
								);
							})}
							<th
								className={classes.lastColTableCellFooter}
								key={"row_last_col_last"}
							>
								{isBetPhase
									? "Paris: " + totalBetOrTricks
									: isTricksPhase
									? "Levées: " + totalBetOrTricks
									: ""}
								{isBetPhase || isTricksPhase ? (
									<IconButton
										onClick={handleNext}
										disabled={btnNextDisabled}
									>
										<CheckCircleIcon
											color={
												btnNextDisabled
													? "disabled"
													: "primary"
											}
											sx={{ fontSize: 28 }}
										/>
									</IconButton>
								) : (
									<IconButton
										variant="contained"
										color={
											btnNextDisabled
												? "disabled"
												: "primary"
										}
										disabled={btnNextDisabled}
										onClick={handleNext}
									>
										<ArrowCircleRightIcon
											sx={{ fontSize: 36 }}
										/>
									</IconButton>
								)}
							</th>
						</tr>
					</tfoot>
				</table>
			</div>
		</div>
	);
};

export default withStyles(styles, { name: "Game" })(Game);
