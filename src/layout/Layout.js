import { withStyles } from "@material-ui/core/styles";
import { Container } from "@mui/material";
import Header from "layout//Header";
import Footer from "layout/Footer";
import * as React from "react";

const images = [
	"arab_tile",
	"bush",
	"circuit",
	"full-bloom",
	"gplaypattern",
	"greek-vase",
	"herringbone",
	"hotel-wallpaper",
	"more-leaves",
	"moroccan-flower",
	"moroccan-flower-dark",
	"morocco-blue",
	"new_year_background",
	"regal",
	"ripples",
	"tree_bark",
	"trees",
];

const styles = () => ({
	container: {
		backgroundColor: "#fff",
		margin: "0",
		padding: "0 !important",

		minHeight: "100%",
		display: "flex !important",
		flexDirection: "column",
	},
	main: {
		// margin: "0 16px",
		flexGrow: 1,
	},
});

const Layout = (props) => {
	const { classes } = props;

	return (
		<Container className={classes.container} maxWidth="md">
			<Header images={images} />
			<div className={classes.main}>{props.children}</div>
			<Footer />
		</Container>
	);
};
export default withStyles(styles, { name: "Layout" })(Layout);
