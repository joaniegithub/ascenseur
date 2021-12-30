import { withStyles } from "@material-ui/core/styles";
import { Box } from "@mui/system";
import Layout from "layout/Layout";
import { useCurrentGame } from "store/actions";
import React from "react";
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
