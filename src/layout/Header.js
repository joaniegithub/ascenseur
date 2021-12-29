import { withStyles } from "@material-ui/core/styles";
import { wrapperForAbsolute, mainPadding } from "styles/styles";
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
		display: "block",
	},
});

const Header = (props) => {
	const { classes } = props;
	return (
		<div className={classes.header}>
			<h1 className={classes.mainTitle}>Ascenseur Companion</h1>
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
