import { withStyles } from "@material-ui/core/styles";
import * as React from "react";
import { openRules } from "store/actions";
import { mainPadding } from "styles/styles";
import { useDispatch } from "react-redux";
import { Link } from "@mui/material";

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
	const dispatch = useDispatch();

	const handleClickRules = () => {
		dispatch(openRules(true));
	};

	return (
		<React.Fragment>
			<div className={classes.footer}>
				<Link onClick={() => handleClickRules()} size="small" component="button">
					Règlements
				</Link>
				<p className={classes.footerCopyright}>Ascenseur Compagnon @2021 Joanie Lessnick</p>
			</div>
		</React.Fragment>
	);
};

export default withStyles(styles, { name: "Footer" })(Footer);
