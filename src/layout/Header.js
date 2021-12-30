import { withStyles } from "@material-ui/core/styles";
import { wrapperForAbsolute, mainPadding } from "styles/styles";
import ElevatorIcon from "@mui/icons-material/Elevator";
import * as React from "react";

const styles = () => ({
	header: {
		position: "relative",
		display: "flex !important",
		flexDirection: "row",
		alignItems: "center",
		...wrapperForAbsolute,
		...mainPadding,
		backgroundColor: "#fafafa",
		paddingTop: "4px",
		paddingBottom: "4px",
	},
	mainTitle: {
		fontFamily: "Shadows Into Light",
		fontSize: "24px",
		lineHeight: "40px",
		margin: "0",
		display: "flex",
		alignItems: "center",
	},
});

const Header = (props) => {
	const { classes } = props;
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
