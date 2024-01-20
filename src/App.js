import { withStyles } from "@material-ui/core/styles";
import { Box } from "@mui/system";
import Layout from "layout/Layout";
import { openRules, useCurrentGame, useShowRules } from "store/actions";
import React from "react";
import NewGame from "components/NewGame";
import Game from "components/Game";
import InfoModal from "components/InfoModal";
import { useDispatch } from "react-redux";

const styles = () => ({
	box: {
		padding: "14px 0",
		display: "flex",
		flexDirection: "column",
		alignItems: "flex-start",
		justifyContent: "center",

		minHeight: "480px",
	},
});

const AscenseurApp = (props) => {
	const { classes } = props;
	const dispatch = useDispatch();
	const [deferredPrompt, setDeferredPrompt] = React.useState(undefined);

	const currentGame = useCurrentGame();
	const showRules = useShowRules();

	const handleCloseInfoModal = () => {
		dispatch(openRules(false));
	};

	React.useEffect(() => {
		window.addEventListener("beforeinstallprompt", function (event) {
			// Prevent Chrome 67 and earlier from automatically showing the prompt
			event.preventDefault();
			// Stash the event so it can be triggered later.
			setDeferredPrompt(event);
		});
	}, []);

	return (
		<Layout deferredPrompt={deferredPrompt}>
			<Box className={classes.box}>
				{currentGame && currentGame.currentTurn >= 0 ? <Game /> : <NewGame />}
				<InfoModal openInfoModal={showRules} onCloseInfoModal={handleCloseInfoModal} />
			</Box>
		</Layout>
	);
};

export default withStyles(styles, { name: "AscenseurApp" })(AscenseurApp);
