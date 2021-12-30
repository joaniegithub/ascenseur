import { withStyles } from "@material-ui/core/styles";
import {
	useCurrentGame,
	// useSettings,
	newGame,
	addPlayer,
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
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import { ONE_WAY, TWO_WAYS } from "store/constants";

const styles = () => ({
	secondTitle: { ...secondTitle },
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
		justifyContent: "flex-start",
		backgroundColor: "#fafafa",
	},
	wrapperbutton: {
		margin: "4px 0",
		width: "100%",
	},
	buttonGroupWrapper: {
		width: "100%",
	},
});

const NewGame = (props) => {
	const { classes } = props;

	const [openNewPlayer, setOpenNewPlayer] = React.useState(false);
	const [nbPlayers, setNbPlayers] = React.useState(0);
	const [nbTurnsMode, setNbTurnsMode] = React.useState(0);

	let nbCards = 52 - (52 % nbPlayers);

	const nbTurnsOneWay = Math.floor(nbCards / nbPlayers);
	const nbTurnsTwoWays = Math.floor(nbCards / nbPlayers) * 2 - 1;

	const getTurnNumbers = (_nbTurns, _nbTurnsMode) => {
		const turns = [];
		for (let i = 1; i <= _nbTurns; i++) {
			turns.push(i);
		}
		if (_nbTurnsMode === TWO_WAYS) {
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

	const handleChangeNbTurns = (event) => {
		const tmpNbTurnsMode = event.target.value;
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

	React.useEffect(() => {
		if (
			currentGame &&
			currentGame.players &&
			currentGame.players.length > 0
		) {
			setNbPlayers(currentGame.players.length);
		}
	}, [currentGame]);
	console.log(nbTurnsMode);

	return (
		<React.Fragment>
			{currentGame ? (
				<React.Fragment>
					<h2 className={classes.secondTitle}>Liste des joueurs</h2>
					{currentGame.players && (
						<div className={classes.wrapperRows}>
							<ul className={classes.rows}>
								{currentGame.players.map((player, index) => {
									return (
										<li className={classes.row} key={index}>
											{player.name}
										</li>
									);
								})}
							</ul>
							<div className={classes.wrapperbutton}>
								<Button
									variant="text"
									size="small"
									startIcon={<AddCircleIcon />}
									onClick={handleClickOpenNewPlayer}
								>
									Ajouter un joueur
								</Button>
							</div>
						</div>
					)}
					<div className={classes.wrapperbutton}>
						<FormControl
							component="fieldset"
							className={classes.buttonGroupWrapper}
						>
							<FormLabel component="legend">
								Nombre de tours:
							</FormLabel>
							<ToggleButtonGroup
								color="primary"
								value={nbTurnsMode}
								exclusive
								onChange={handleChangeNbTurns}
							>
								<ToggleButton value={ONE_WAY}>
									{nbTurnsOneWay}
								</ToggleButton>
								<ToggleButton value={TWO_WAYS}>
									{nbTurnsTwoWays}
								</ToggleButton>
							</ToggleButtonGroup>
						</FormControl>
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
		</React.Fragment>
	);
};

export default withStyles(styles, { name: "NewGame" })(NewGame);
