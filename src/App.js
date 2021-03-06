import { withStyles } from "@material-ui/core/styles";
import { Box } from "@mui/system";
import Layout from "layout/Layout";
import { useCurrentGame } from "store/actions";
import React from "react";
import NewGame from "components/NewGame";
import Game from "components/Game";
import InfoModal from "components/InfoModal";

const styles = () => ({
	box: {
		padding: "14px 0",
		display: "flex",
		flexDirection: "column",
		alignItems: "flex-start",
	},
});

const AscenseurApp = (props) => {
	const { classes } = props;
	const [openInfoModal, setOpenInfoModal] = React.useState(false);

	const currentGame = useCurrentGame();

	// Modal Info
	const handleClickInfo = () => {
		setOpenInfoModal(true);
	};
	const handleCloseInfoModal = () => {
		setOpenInfoModal(false);
	};

	return (
		<Layout>
			<Box className={classes.box}>
				{currentGame && currentGame.currentTurn >= 0 ? (
					<Game />
				) : (
					<NewGame onClickInfo={handleClickInfo} />
				)}
				<InfoModal openInfoModal={openInfoModal} onCloseInfoModal={handleCloseInfoModal} />
			</Box>
		</Layout>
	);
};

export default withStyles(styles, { name: "AscenseurApp" })(AscenseurApp);
