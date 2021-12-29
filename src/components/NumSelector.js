import { withStyles } from "@material-ui/core/styles";
import AddIcon from "@mui/icons-material/Add";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import RemoveIcon from "@mui/icons-material/Remove";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import { IconButton } from "@mui/material";
import * as React from "react";

const styles = () => ({
	// 	iconButton: {
	// 		padding: '2px',
	// 		'svg': {
	// 			width: '20px',
	// 			height: '20px',
	// 		},
	// 	}
	wrapperValue: {
		// position: "absolute",
		// right: "30px",
		// top: 0,
		// bottom: 0,
		backgroundColor: "#fff",
	},
	backgroundColorClass: {
		backgroundColor: "#fafafa",
		display: "flex",
		alignContent: "center",
		alignItems: "center",
		height: "100%",
	},
	backgroundColorClassEven: {
		backgroundColor: "#f2f2f2",
		display: "flex",
		alignContent: "center",
		alignItems: "center",
		height: "100%",
	},
	// labelValue: {
	// 	fontWeight: "bold",
	// 	fontFamily: "Shadows Into Light",
	// 	fontSize: "20px",
	// 	margin: "0 4px",
	// },
});

const NumSelector = (props) => {
	const {
		classes,
		value: valueProps,
		handleUpdateQty,
		index,
		min,
		max,
	} = props;
	const [value, setValue] = React.useState(valueProps);

	const handleRemove = () => {
		updateValue(Math.max(value - 1, min));
	};
	const handleAdd = () => {
		updateValue(Math.min(value + 1, max));
	};
	const updateValue = (newQty) => {
		setValue(newQty);
		handleUpdateQty(newQty);
	};

	const getBgClss = (index) => {
		return index % 2 === 1
			? classes.backgroundColorClassEven
			: classes.backgroundColorClass;
	};

	return (
		<div className={classes.wrapperValue}>
			<div className={getBgClss(index)}>
				<IconButton
					disabled={value <= 0}
					size="small"
					onClick={handleRemove}
				>
					<RemoveCircleOutlineIcon sx={{ fontSize: 28 }} />
				</IconButton>
				<IconButton
					disabled={value >= max}
					size="small"
					onClick={handleAdd}
				>
					<AddCircleOutlineIcon sx={{ fontSize: 28 }} />
				</IconButton>
			</div>
		</div>
	);
};

export default withStyles(styles, { name: "NumSelector" })(NumSelector);
