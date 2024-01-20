import { withStyles } from "@material-ui/core/styles";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import { IconButton } from "@mui/material";
import * as React from "react";

const styles = () => ({
	wrapperValue: {
		display: "flex",
		alignContent: "center",
		alignItems: "center",
		height: "100%",
	},
	labelValue: {
		fontWeight: 600,
		margin: "0",
		width: "24px",
		display: "block",
	},
});

const NumSelector = (props) => {
	const { classes, value: valueProps, handleUpdateQty, min, max } = props;
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

	return (
		<div className={classes.wrapperValue}>
			<IconButton disabled={value <= 0} size="small" onClick={handleRemove}>
				<RemoveCircleOutlineIcon sx={{ fontSize: 28 }} />
			</IconButton>
			<span className={classes.labelValue}>{value}</span>
			<IconButton disabled={value >= max} size="small" onClick={handleAdd}>
				<AddCircleOutlineIcon sx={{ fontSize: 28 }} />
			</IconButton>
		</div>
	);
};

export default withStyles(styles, { name: "NumSelector" })(NumSelector);
