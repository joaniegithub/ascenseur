import { withStyles } from "@material-ui/core/styles";
import { useCurrentGame, gameNext, newGame } from "store/actions";
import { useDispatch } from "react-redux";
import React from "react";
import ArrowCircleRightIcon from "@mui/icons-material/ArrowCircleRight";
import { Button } from "@mui/material";
import { getGameCanGoNext, getGameTotalBetOrTricks } from "store/selector";
import GameTableRows from "./GameTableRows";
import {
	gameTableRowsStyles,
	StyledTd,
	StyledTh,
	StyledTr,
	StyledDivWrapper,
} from "./gameTableRowsStyle";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import Ascenseur from "./Ascenseur";
import { TWO_WAYS } from "store/constants";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";

const styles = gameTableRowsStyles;

const getBets = (game, i) => {
	return game.players.reduce((a, player) => {
		return a + player.bets[i];
	}, 0);
};

const Game = (props) => {
	const { classes } = props;

	const [confirmCancelGameOpen, setConfirmCancelGameOpen] =
		React.useState(false);
	// Confirm Delete Dialog
	const handleConfirmCancelGameClose = () => {
		setConfirmCancelGameOpen(false);
		dispatch(newGame());
	};
	const handleConfirmCancelGameDisagree = () => {
		setConfirmCancelGameOpen(false);
	};

	// const settings = useSettings();
	const game = useCurrentGame();
	const dispatch = useDispatch();

	const handleNext = () => {
		dispatch(gameNext());
		setTimeout(function () {
			document.getElementById("tableContainer").scrollTo(1000, 0);
		}, 200);
	};
	const handleNew = () => {
		dispatch(newGame());
	};
	const handleCancelGame = () => {
		setConfirmCancelGameOpen(true);
	};

	const isBetPhase = game.currentPhase === 0;
	const isPostBetPhase = game.currentPhase === 1;
	const isTricksPhase = game.currentPhase === 2;
	const btnNextDisabled = !getGameCanGoNext(game);
	const totalBetOrTricks = getGameTotalBetOrTricks(game);
	const isGameDone =
		game.currentTurn === game.nbTurns - 1 && game.currentPhase === 3;
	const currentTurnNumber = game.turnNumbers[game.currentTurn];

	return (
		<div className={classes.gameContainer}>
			<div className={classes.gameInfo}>
				{game.players.length} joueurs | {game.nbTurns} tours | Mode{" "}
				{game.turnsMode === TWO_WAYS ? "aller-retour" : "aller-simple"}{" "}
				| {game.nbCards} cartes
			</div>
			<Ascenseur />

			<React.Fragment>
				<div id="tableContainer" className={classes.tableContainer}>
					<table className={classes.table}>
						<thead>
							<StyledTr isHeader={true}>
								<StyledTh
									isHeader={true}
									isFirst={true}
									key={"row_0_col_0"}
								></StyledTh>
								{game.turnNumbers.map((turnNumber, i) => {
									if (i >= game.currentTurn) {
										return null;
									}
									return (
										<StyledTh
											isHeader={true}
											isFirstScoreCol={i === 0}
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
									<StyledDivWrapper
										isCurrent={true}
										isHeader={true}
									>
										{currentTurnNumber}
									</StyledDivWrapper>
								</StyledTh>
							</StyledTr>
						</thead>
						<tbody>
							<GameTableRows />
						</tbody>
						<tfoot>
							<StyledTr isFooter={true}>
								<StyledTd
									isFooter={true}
									isFirst={true}
									key={"row_last_col_0"}
								></StyledTd>
								{game.turnNumbers.map((turnNumber, i) => {
									if (i >= game.currentTurn) {
										return null;
									}
									const bets = getBets(game, i);
									return (
										<StyledTd
											isFooter={true}
											isFirstScoreCol={i === 0}
											key={"row_last_col_" + i}
										>
											<span
												className={
													bets > i
														? classes.betsOver
														: classes.betsUnder
												}
											>
												{bets}
											</span>
										</StyledTd>
									);
								})}
								<StyledTd
									isFooter={true}
									isLast={true}
									key={"row_last_col_last"}
								>
									<StyledDivWrapper
										isWrapper={true}
										isFooter={true}
									>
										<StyledDivWrapper
											isCurrent={true}
											isFooter={true}
										>
											{game.currentPhase > 0 &&
												(() => {
													const bets = getBets(
														game,
														game.currentTurn
													);
													return (
														<span
															className={
																bets >
																currentTurnNumber
																	? classes.betsOver
																	: classes.betsUnder
															}
														>
															{bets}
														</span>
													);
												})()}
										</StyledDivWrapper>
										{(isBetPhase || isTricksPhase) && (
											<StyledDivWrapper
												isControl={true}
												isFooter={true}
											>
												<span
													className={
														classes.betTrickTotalLabel
													}
												>
													Total:
												</span>
												<span>{totalBetOrTricks}</span>
											</StyledDivWrapper>
										)}
									</StyledDivWrapper>
								</StyledTd>
							</StyledTr>
						</tfoot>
					</table>
				</div>
				<div className={classes.nextStepWrapper}>
					{isGameDone ? (
						<Button
							variant="contained"
							size="small"
							endIcon={<ArrowCircleRightIcon />}
							onClick={handleNew}
						>
							Nouvelle partie
						</Button>
					) : (
						<React.Fragment>
							<Button
								onClick={handleCancelGame}
								variant="outlined"
							>
								Abandonner
							</Button>
							<Button
								variant="contained"
								size="small"
								disabled={btnNextDisabled}
								endIcon={
									isBetPhase || isTricksPhase ? (
										<CheckCircleIcon />
									) : (
										<ArrowCircleRightIcon />
									)
								}
								onClick={handleNext}
							>
								{isBetPhase
									? "Confirmer les paris"
									: isPostBetPhase
									? "Passer au décompte"
									: isTricksPhase
									? "Confirmer les levées"
									: "Tour suivant"}
							</Button>
						</React.Fragment>
					)}
				</div>

				<Dialog
					open={confirmCancelGameOpen}
					onClose={handleConfirmCancelGameClose}
					aria-labelledby="alert-dialog-title"
				>
					<DialogTitle id="alert-dialog-title">
						{`Abandonner la partie?`}
					</DialogTitle>
					<DialogActions>
						<Button
							variant="outlined"
							onClick={handleConfirmCancelGameDisagree}
						>
							Non
						</Button>
						<Button
							variant="contained"
							onClick={handleConfirmCancelGameClose}
							autoFocus
						>
							Oui
						</Button>
					</DialogActions>
				</Dialog>
			</React.Fragment>
		</div>
	);
};

export default withStyles(styles, { name: "Game" })(Game);
