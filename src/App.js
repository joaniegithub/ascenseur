import { withStyles } from "@material-ui/core/styles";
import { Box } from "@mui/system";
import Layout from "layout/Layout";
import {
	useCurrentGame,
	useSettings,
	editSettings,
	newGame,
	addPlayer,
} from "store/actions";
import { useDispatch } from "react-redux";
import Button from "@mui/material/Button";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import PlayCircleIcon from "@mui/icons-material/PlayCircle";
import React from "react";
import NewPlayerModal from "components/NewPlayerModal";
import { styled } from "@mui/system";
import { secondTitle } from "styles/styles";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import NewGame from "components/NewGame";
import Game from "components/Game";

const styles = () => ({
	box: {
		padding: "16px 0",
		display: "flex",
		flexDirection: "column",
		alignItems: "flex-start",
	},
});

const AscenseurApp = (props) => {
	const { classes } = props;

	const currentGame = useCurrentGame();

	// const getClss = (index) => {
	// 	return index % 2 === 1 ? classes.rowEven : classes.row;
	// };

	// React.useEffect(() => {
	// 	if (
	// 		currentGame &&
	// 		currentGame.players &&
	// 		currentGame.players.length > 0
	// 	) {
	// 		setNbPlayers(currentGame.players.length);
	// 	}
	// }, [currentGame]);

	// React.useEffect(() => {
	// 	if (currentGame && currentGame.players) {
	// 		setNbPlayers(currentGame.players.length);
	// 	}
	// }, [nbPlayers]);

	return (
		<Layout>
			<Box className={classes.box}>
				{currentGame && currentGame.currentTurn >= 0 ? (
					<Game />
				) : (
					<NewGame />
				)}
			</Box>
		</Layout>
	);
};

export default withStyles(styles, { name: "AscenseurApp" })(AscenseurApp);
