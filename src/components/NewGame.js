import { withStyles } from "@material-ui/core/styles";
import {
	useCurrentGame,
	// useSettings,
	newGame,
	addPlayer,
	deletePlayer,
	swapPlayer,
	setNbTurns,
	startGame,
} from "store/actions";
import { useDispatch } from "react-redux";
import Button from "@mui/material/Button";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import PlayCircleIcon from "@mui/icons-material/PlayCircle";
import React from "react";
import NewPlayerModal from "components/NewPlayerModal";
import { secondTitle } from "styles/styles";
import FormLabel from "@mui/material/FormLabel";
import FormControlUnstyled from "@mui/base/FormControlUnstyled";
import { ONE_WAY, TWO_WAYS } from "store/constants";
import CancelIcon from "@mui/icons-material/Cancel";
import ArrowCircleUpIcon from "@mui/icons-material/ArrowCircleUp";
import ArrowCircleDownIcon from "@mui/icons-material/ArrowCircleDown";
import { IconButton } from "@material-ui/core";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";

const styles = () => ({
	secondTitle: { ...secondTitle },
	wrapper: {
		padding: "0 12px",
		width: "100%",
		boxSizing: "border-box",
	},
	wrapperRows: {
		width: "100%",
		display: "flex",
		flexDirection: "column",
		justifyContent: "flex-start",
		margin: "16px 0",
	},
	rows: {
		width: "100%",
		display: "flex",
		flexDirection: "column",
		justifyContent: "flex-start",
		margin: "0",
	},
	row: {
		padding: "6px 10px",
		margin: "3px 0 !important",
		width: "100%",
		boxSizing: "border-box",
		display: "flex",
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		backgroundColor: "#fafafa",
		fontWeight: 500,
	},
	wrapperPlayerbuttons: {
		display: "flex",
		flexDirection: "row",
		justifyContent: "flex-end",
		alignItems: "center",
	},
	wrapperbutton: {
		margin: "4px 0",
		width: "100%",
		display: "flex",
		flexDirection: "row",
		justifyContent: "flex-start",
	},
	buttonGroupContainer: {
		width: "100%",
		margin: "4px 0 16px",
	},
	buttonGroupWrapper: {
		width: "100%",
		display: "flex",
		flexDirection: "row",
		justifyContent: "flex-start",
		// alignItems: "center",
	},
	buttonGroupLabel: {
		width: "100%",
		display: "flex",
		flexDirection: "row",
		justifyContent: "flex-start",
	},
	toggleButton: {
		fontWeight: "bold",
		"> span": {
			padding: "6px",
		},
	},
	toggleButtonText: {
		padding: "0 6px",
	},
});

const NewGame = (props) => {
	const { classes } = props;

	const [openNewPlayer, setOpenNewPlayer] = React.useState(false);
	const [nbPlayers, setNbPlayers] = React.useState(0);
	const [nbTurnsMode, setNbTurnsMode] = React.useState(0);

	let nbCards = 52 - (52 % nbPlayers);

	const nbTurnsOneWay = Math.floor(nbCards / nbPlayers) || "";
	const nbTurnsTwoWays = Math.floor(nbCards / nbPlayers) * 2 - 1 || "";
	console.log(nbTurnsOneWay);
	console.log(nbTurnsTwoWays);

	const getTurnNumbers = (_nbTurns, _nbTurnsMode) => {
		const turns = [];
		for (let i = 1; i <= _nbTurns; i++) {
			turns.push(i);
		}
		console.log("_nbTurnsMode=" + _nbTurnsMode);
		console.log("TWO_WAYS=" + TWO_WAYS);
		if (_nbTurnsMode === TWO_WAYS) {
			console.log("_nbTurnsMode=" + _nbTurnsMode);
			for (let i = _nbTurns - 1; i > 0; i--) {
				turns.push(i);
			}
		}
		console.log(turns);
		return turns;
	};

	const handleClickOpenNewPlayer = () => {
		setOpenNewPlayer(true);
	};

	const handleChangeNbTurns = (event, val) => {
		const tmpNbTurnsMode = parseInt(val);
		setNbTurnsMode(tmpNbTurnsMode);
		console.log(tmpNbTurnsMode);
		const nbTurns =
			tmpNbTurnsMode === ONE_WAY ? nbTurnsOneWay : nbTurnsTwoWays;
		const turnNumbers = getTurnNumbers(nbTurnsOneWay, tmpNbTurnsMode);
		dispatch(setNbTurns(nbTurns, tmpNbTurnsMode, turnNumbers, nbCards));
	};

	const handleCloseNewPlayer = (_playerName) => {
		setOpenNewPlayer(false);
		if (_playerName) {
			dispatch(addPlayer(_playerName));
		}
	};

	// const settings = useSettings();
	const currentGame = useCurrentGame();
	const dispatch = useDispatch();

	const handleClickNewGame = () => {
		dispatch(newGame());
	};
	const handleClickStart = () => {
		dispatch(startGame());
	};
	const handleDeletePlayer = (player) => {
		dispatch(deletePlayer(player));
	};
	const handleSwapDownPlayer = (player) => {
		dispatch(swapPlayer(player, 1));
	};
	const handleSwapUpPlayer = (player) => {
		dispatch(swapPlayer(player, -1));
	};

	React.useEffect(() => {
		if (
			currentGame &&
			currentGame.players &&
			currentGame.players.length > 0
		) {
			setNbPlayers(currentGame.players.length);
			setNbTurnsMode(currentGame.turnsMode || 0);
		}
	}, [currentGame]);

	if (!currentGame) {
		return null;
	}
	return (
		<div className={classes.wrapper}>
			{currentGame ? (
				<React.Fragment>
					<h2 className={classes.secondTitle}>Liste des joueurs</h2>
					{currentGame.players && (
						<div className={classes.wrapperRows}>
							{currentGame.players &&
							currentGame.players.length > 0 ? (
								<ul className={classes.rows}>
									{currentGame.players.map(
										(player, index) => {
											return (
												<li
													className={classes.row}
													key={index}
												>
													{index + 1}. {player.name}
													<div
														className={
															classes.wrapperPlayerbuttons
														}
													>
														<IconButton
															size="small"
															onClick={(e) =>
																handleSwapDownPlayer(
																	player
																)
															}
														>
															<ArrowCircleDownIcon
																sx={{
																	fontSize: 28,
																}}
															/>
														</IconButton>
														<IconButton
															size="small"
															onClick={(e) =>
																handleSwapUpPlayer(
																	player
																)
															}
														>
															<ArrowCircleUpIcon
																sx={{
																	fontSize: 28,
																}}
															/>
														</IconButton>
														<IconButton
															size="small"
															onClick={(e) =>
																handleDeletePlayer(
																	player
																)
															}
														>
															<CancelIcon
																sx={{
																	fontSize: 28,
																}}
															/>
														</IconButton>
													</div>
												</li>
											);
										}
									)}
								</ul>
							) : (
								<div className={classes.row}>
									Ajouter au moins 2 joueurs
								</div>
							)}
							<div className={classes.wrapperbutton}>
								<Button
									color="secondary"
									variant="contained"
									size="small"
									startIcon={<AddCircleIcon />}
									onClick={handleClickOpenNewPlayer}
								>
									Ajouter un joueur
								</Button>
							</div>
						</div>
					)}
					<div className={classes.buttonGroupContainer}>
						<div
							component="fieldset"
							className={classes.buttonGroupWrapper}
						>
							<FormLabel
								component="legend"
								className={classes.buttonGroupLabel}
							>
								Nombre de tours:
							</FormLabel>
							<ToggleButtonGroup
								color="primary"
								value={nbTurnsMode}
								exclusive
								onChange={handleChangeNbTurns}
								disabled={nbTurnsOneWay === ""}
							>
								<ToggleButton
									value={ONE_WAY}
									size="small"
									className={classes.toggleButton}
								>
									<ArrowUpwardIcon />
									<span className={classes.toggleButtonText}>
										{nbTurnsOneWay || "..."}
									</span>
								</ToggleButton>
								<ToggleButton
									value={TWO_WAYS}
									size="small"
									className={classes.toggleButton}
								>
									<ArrowUpwardIcon />
									<ArrowDownwardIcon />
									<span className={classes.toggleButtonText}>
										{nbTurnsTwoWays || "..."}
									</span>
								</ToggleButton>
							</ToggleButtonGroup>
						</div>
					</div>
					<div className={classes.wrapperbutton}>
						<Button
							variant="contained"
							size="small"
							disabled={
								!(
									currentGame.players.length >= 2 &&
									currentGame.nbTurns > 0
								)
							}
							endIcon={<PlayCircleIcon />}
							onClick={handleClickStart}
						>
							Commencer
						</Button>
					</div>
				</React.Fragment>
			) : (
				<div className={classes.wrapperbutton}>
					<Button
						variant="contained"
						size="small"
						endIcon={<AddCircleIcon />}
						onClick={handleClickNewGame}
					>
						Nouvelle partie
					</Button>
				</div>
			)}
			<NewPlayerModal
				openNewPlayer={openNewPlayer}
				onCloseNewPlayer={handleCloseNewPlayer}
			/>
		</div>
	);
};

export default withStyles(styles, { name: "NewGame" })(NewGame);