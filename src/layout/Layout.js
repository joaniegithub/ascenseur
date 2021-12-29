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
	},
	main: {
		// margin: "0 16px",
	},
});

const Layout = (props) => {
	const { classes } = props;
	const [mainClassName, setMainClassName] = React.useState("");

	const handlerBgTileChange = (bgTileIndex) => {
		setMainClassName(`main main_${images[bgTileIndex]}`);
	};

	// React.useEffect(() => {
	// 	setMainClassName(`main main_${images[bgTileIndex]}`);
	// }, [bgTileIndex]);

	return (
		<div className={mainClassName}>
			<Container className={classes.container}>
				<Header onBgTileChange={handlerBgTileChange} images={images} />
				<div className={classes.main}>{props.children}</div>
				<Footer />
			</Container>
		</div>
	);
};
export default withStyles(styles, { name: "Layout" })(Layout);
