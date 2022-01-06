import { withStyles } from "@material-ui/core/styles";
import * as React from "react";
import { mainPadding } from "styles/styles";

const styles = () => ({
	footer: {
		display: "flex !important",
		flexDirection: "row",
		justifyContent: "space-between",
		...mainPadding,
		backgroundColor: "#fafafa",
		paddingTop: "4px",
		paddingBottom: "4px",
	},
	footerLinks: {
		display: "block",
	},
	footerCopyright: {
		display: "block",
		fontSize: "12px",
		lineHeight: "20px",
		width: "100%",
		textAlign: "right",
		margin: "0",
	},
});

const Footer = (props) => {
	const { classes } = props;

	return (
		<React.Fragment>
			<div className={classes.footer}>
				<p className={classes.footerCopyright}>Ascenseur Companion @2021 Joanie Lessnick</p>
			</div>
		</React.Fragment>
	);
};

export default withStyles(styles, { name: "Footer" })(Footer);
