import { withStyles } from "@material-ui/core/styles";
import { wrapperForAbsolute, mainPadding, colors } from "styles/styles";
import ElevatorIcon from "@mui/icons-material/Elevator";
import * as React from "react";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import LockIcon from "@mui/icons-material/Lock";
import { useCurrentGame, changeOverrideMode } from "store/actions";
import { useDispatch } from "react-redux";
import IconButton from "@mui/material/IconButton";
import InstallMobileIcon from "@mui/icons-material/InstallMobile";
import InstallDesktopIcon from "@mui/icons-material/InstallDesktop";

const styles = () => ({
	header: {
		position: "relative",
		display: "flex !important",
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
		...wrapperForAbsolute,
		...mainPadding,
		backgroundColor: "#fafafa",
		paddingTop: "4px",
		paddingBottom: "4px",
	},
	mainTitle: {
		fontFamily: "Staatliches",
		fontSize: "24px",
		lineHeight: "40px",
		margin: "0",
		display: "flex",
		alignItems: "center",
	},
});

const Header = (props) => {
	const { classes, deferredPrompt } = props;
	const game = useCurrentGame();
	const dispatch = useDispatch();

	const [showInstallButton, setShowInstallButton] = React.useState(true);

	const handleClickLock = () => {
		dispatch(changeOverrideMode());
	};

	const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
		navigator.userAgent
	);

	// Installation must be done by a user gesture! Here, the button click
	const handleClickInstall = (e) => {
		// hide our user interface that shows our A2HS button
		// Show the prompt
		deferredPrompt.prompt();
		// Wait for the user to respond to the prompt
		deferredPrompt.userChoice.then((choiceResult) => {
			if (choiceResult.outcome === "accepted") {
				console.log("User accepted the A2HS prompt");
				setShowInstallButton(false);
			} else {
				console.log("User dismissed the A2HS prompt");
			}
		});
	};

	return (
		<div className={classes.header}>
			<h1 className={classes.mainTitle}>
				<ElevatorIcon
					color="primary"
					sx={{
						fontSize: 32,
						marginRight: "4px",
					}}
				/>
				Ascenseur Compagnon
			</h1>

			<div>
				{game && (
					<IconButton
						aria-label="close"
						onClick={handleClickLock}
						size="small"
						sx={{
							color: "#ccc",
						}}
					>
						{game.overrideMode ? <LockOpenIcon /> : <LockIcon />}
					</IconButton>
				)}

				{deferredPrompt && showInstallButton && (
					<IconButton
						aria-label="close"
						onClick={handleClickInstall}
						size="small"
						sx={{
							color: "#ccc",
						}}
					>
						{isMobile ? <InstallMobileIcon /> : <InstallDesktopIcon />}
					</IconButton>
				)}
			</div>

			{/*<div className={classes.bgSwitcherContainer}>
				<IconButton onClick={handlePreviousBg}>
					<ArrowBackIosNewIcon />
				</IconButton>
				<IconButton onClick={handleNextBg}>
					<ArrowForwardIosIcon />
				</IconButton>
			</div>*/}
		</div>
	);
};

export default withStyles(styles, { name: "Header" })(Header);
