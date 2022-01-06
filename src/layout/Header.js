import { withStyles } from "@material-ui/core/styles";
import { wrapperForAbsolute, mainPadding, colors } from "styles/styles";
import ElevatorIcon from "@mui/icons-material/Elevator";
import * as React from "react";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import LockIcon from "@mui/icons-material/Lock";
import { useCurrentGame, changeOverrideMode } from "store/actions";
import { useDispatch } from "react-redux";
import IconButton from "@mui/material/IconButton";

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
	const { classes } = props;
	const game = useCurrentGame();
	const dispatch = useDispatch();

	const handleClickLock = () => {
		dispatch(changeOverrideMode());
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
				Ascenseur Companion
			</h1>

			<IconButton
				aria-label="close"
				onClick={handleClickLock}
				size="small"
				sx={{
					color: colors.primary.focus,
				}}
			>
				{game.overrideMode ? <LockOpenIcon /> : <LockIcon />}
			</IconButton>

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
