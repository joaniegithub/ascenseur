import { styled } from "@mui/system";

export const colors = [
	"#005d5d",
	"#FF7043",
	"#33b1ff",
	"#EC407A",
	"#f6c85f",
	"#46d39a",
	"#8b6ec3",
	"#a6d177",
	"#78909C",
	"#dd0000",
	"#004cab",
	"#efb4cd",
];

// export const StyledInputElement = styled("td", props)`
// 	${cssCustomInputOutput}
// `;

const baseCell = {
	minWidth: "44px",
	textAlign: "center",
	boxSizing: "border-box",
	width: "100%",
	verticalAlign: "middle",
};

const getStyledTableCellProperties = ({
	isHeader,
	isFooter,
	isFirst,
	isLast,
	isFirstScoreCol,
	isEven,
	isCurrent,
	isExpanded,
}) => {
	let bgColor = "#fff";
	if (isCurrent) {
		bgColor = "#cdcdcd";
	} else if (isHeader || isFooter) {
		bgColor = "#eaeaea";
	} else if (isFirst || isLast) {
		bgColor = isEven ? "#fafafa" : "#f2f2f2";
	} else {
		bgColor = isEven ? "#ffffff" : "#fafafa";
	}
	return {
		...baseCell,
		maxWidth:
			isFirst || (isExpanded && isLast)
				? "100px"
				: isLast
				? "60px"
				: "44px",

		...(!isFooter && {
			borderBottom: "1px solid #ddd",
		}),
		// ...(isCurrent && {
		// 	borderLeft: "1px solid #ddd",
		// 	borderRight: "1px solid #ddd",
		// }),
		...(!isFirstScoreCol &&
			!isFirst &&
			!isLast && {
				borderLeft: "1px solid #ddd",
			}),
		...(isFirst && {
			borderRight: "3px solid #ddd",
		}),
		...(isLast && {
			borderLeft: "3px solid #ddd",
		}),
		...((isHeader || isFooter || isFirst || isLast) && {
			fontWeight: 600,
		}),

		padding: isLast
			? "0 4px"
			: isHeader || isFooter || isFirst
			? "6px 10px"
			: "0",
		position: isFirst || isLast ? "sticky" : "relative",
		zIndex: isFirst || isLast ? 2 : 1,
		left: isFirst ? 0 : "initial",
		right: isLast ? 0 : "initial",
		textAlign: isFirst ? "left" : "center",
		backgroundColor: bgColor,
	};
};

const shouldFowardPropFunction = (prop) =>
	prop !== "isHeader" &&
	prop !== "isFooter" &&
	prop !== "isFirst" &&
	prop !== "isLast" &&
	prop !== "isFirstScoreCol" &&
	prop !== "isEven" &&
	prop !== "isCurrent" &&
	prop !== "isExpanded";

export const StyledTh = styled("th", {
	shouldForwardProp: shouldFowardPropFunction,
})(getStyledTableCellProperties);
export const StyledTd = styled("td", {
	shouldForwardProp: shouldFowardPropFunction,
})(getStyledTableCellProperties);

export const gameTableRowsStyles = () => ({
	gameContainer: {
		width: "100%",
	},
	tableContainer: {
		display: "flex",
		flexDirection: "row",
		justifyContent: "flex-start",
		overflowX: "scroll",
		width: "100%",
		overflowY: "visible",
		padding: 0,

		"th, tr, td": {
			margin: "0",
			whiteSpace: "nowrap",
			// borderTopWidth: "0px",
		},
	},
	table: {
		position: "relative",
		borderCollapse: "separate" /* Don't collapse */,
		paddingBottom: "12px",
	},
	tableRow: {
		position: "relative",
		height: "64px",
	},

	currentVal: {
		padding: "6px 6px 2px",
	},

	wrapperCellData: {
		display: "flex",
		flexDirection: "column",
		justifyContent: "center",
		alignItems: "center",
		height: "100%",
		width: "100%",
		position: "absolute",
		top: 0,
		bottom: 0,
		left: 0,
		right: 0,
	},

	scoreTrickData: {
		display: "flex",
		flexDirection: "row",
		justifyContent: "flex-start",
		fontSize: "12px",
	},
	scoreTrickBet: {
		color: "#000",
		fontSize: "12px",
		padding: "4px 6px",
		fontWeight: "500",
	},
	scoreTrickBetMissed: {
		color: "#444",
		fontSize: "12px",
		padding: "4px 6px",
		fontWeight: "500",
		textDecoration: "line-through",
	},
	scoreTrickResult: {
		color: "#000",
		fontSize: "12px",
		padding: "4px 6px",
		fontWeight: "500",
	},
	scoreTrickResultMissed: {
		color: "#888",
		fontSize: "12px",
		padding: "4px 6px",
		fontWeight: "500",
	},
	scoreResult: {
		color: "#000",
		fontSize: "18px",
		fontWeight: 600,
		padding: "6px 6px",
	},
	scoreResultMissed: {
		color: "#c70037",
		fontSize: "18px",
		fontWeight: 600,
		padding: "6px 6px",
	},

	nextStepWrapper: {
		display: "flex",
		flexDirection: "row",
		justifyContent: "flex-end",
		padding: "0 12px",
	},
	betTrickTotalLabel: {
		color: "#888",
		fontWeight: 500,
		// fontSize: "14px",
		padding: "0",
	},
	betTrickTTotalValue: {
		// color: "#888",
		// fontWeight: 500,
		// fontSize: "14px",
		padding: "6px 0",
	},
});
