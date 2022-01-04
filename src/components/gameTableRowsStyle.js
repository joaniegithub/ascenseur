import { styled } from "@mui/system";
import { colors } from "styles/styles";

// export const colors = [
// 	"#005d5d",
// 	"#FF7043",
// 	"#33b1ff",
// 	"#EC407A",
// 	"#f6c85f",
// 	"#46d39a",
// 	"#8b6ec3",
// 	"#a6d177",
// 	"#78909C",
// 	"#dd0000",
// 	"#004cab",
// 	"#efb4cd",
// ];

const getStyledTableRowProperties = ({ isHeader, isFooter, isEven, isWinner }) => {
	let bgColor = "#fff";
	if (isHeader || isFooter) {
		bgColor = "#eaeaea";
	} else if (isWinner) {
		bgColor = colors.secondary.main;
	} else {
		bgColor = isEven ? "#ffffff" : "#fafafa";
	}
	return {
		position: "relative",
		height: "40px",
		width: "100%",
		...(!isFooter && {
			borderBottom: "1px solid #ddd",
		}),
		backgroundColor: bgColor,
	};
};
const shouldFowardPropTrFunction = (prop) =>
	prop !== "isHeader" && prop !== "isFooter" && prop !== "isEven" && prop !== "isWinner";
export const StyledTr = styled("tr", {
	shouldForwardProp: shouldFowardPropTrFunction,
})(getStyledTableRowProperties);

const baseCell = {
	minWidth: "44px",
	textAlign: "center",
	boxSizing: "border-box",
	verticalAlign: "middle",
	height: "100%",
};
const getStyledTableCellProperties = ({
	isHeader,
	isFooter,
	isFirst,
	isLast,
	isFirstScoreCol,
	isEven,
	isWinner,
	isDealer,
}) => {
	let bgColor = "transparent";
	if (isWinner) {
		bgColor = colors.secondary.main;
	} else if (isHeader || isFooter) {
		bgColor = "#eaeaea";
	} else if (isFirst || isLast) {
		bgColor = isEven ? "#fafafa" : "#f2f2f2";
	}
	let maxWidth = "44px";
	if (isFirst) {
		maxWidth = "100px";
	} else if (isLast) {
		maxWidth = "initial";
	}
	return {
		...baseCell,
		maxWidth,
		...(isLast && {
			width: "100%",
		}),

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

		padding: isLast ? "0" : isHeader || isFooter || isFirst ? "6px 10px" : "0",
		position: isFirst || isLast ? "sticky" : "relative",
		zIndex: isFirst || isLast ? 2 : 1,
		...(isFirst && { left: 0 }),
		...(isLast && { right: 0 }),
		textAlign: isFirst ? "left" : "center",
		backgroundColor: bgColor,
		...(isFirst && {
			whiteSpace: "nowrap",
			overflow: "hidden",
			textOverflow: "ellipsis",
		}),

		...(isDealer && {
			// position: "relative",
			paddingRight: "24px",
			"&::after": {
				content: "'D'",
				display: "block",
				width: "16px",
				height: "16px",
				lineHeight: "16px",
				color: "#fff",
				backgroundColor: colors.primary.main,
				fontSize: "11px",
				fontWeight: 400,
				textAlign: "center",
				// paddingLeft: "6px",
				position: "absolute",
				top: "4px",
				right: "4px",
				borderRadius: "10px",
			},
		}),
	};
};
const shouldFowardPropFunction = (prop) =>
	prop !== "isHeader" &&
	prop !== "isFooter" &&
	prop !== "isFirst" &&
	prop !== "isLast" &&
	prop !== "isFirstScoreCol" &&
	prop !== "isEven" &&
	prop !== "isWinner" &&
	prop !== "isDealer";
export const StyledTh = styled("th", {
	shouldForwardProp: shouldFowardPropFunction,
})(getStyledTableCellProperties);
export const StyledTd = styled("td", {
	shouldForwardProp: shouldFowardPropFunction,
})(getStyledTableCellProperties);

const getStyledCellWrapperProperties = ({
	isCurrent,
	isHeader,
	isFooter,
	isControl,
	isWrapper,
	isWinner,
}) => {
	let bgColor = "transparent";
	if (isWinner && isCurrent) {
		bgColor = colors.primary.main;
	} else if (isCurrent) {
		bgColor = colors.secondary.main;
	}
	return {
		display: "flex",
		flexDirection: isWrapper || isFooter ? "row" : "column",
		justifyContent: isWrapper ? "flex-start" : "center",
		alignItems: "center",
		height: "100%",
		minHeight: isHeader || isFooter ? "40px" : "56px",
		width: isWrapper ? "100%" : isControl ? "110px" : "44px",
		backgroundColor: bgColor,
	};
};
const shouldFowardPropCellWrapperFunction = (prop) =>
	prop !== "isHeader" &&
	prop !== "isFooter" &&
	prop !== "isCurrent" &&
	prop !== "isControl" &&
	prop !== "isWrapper" &&
	prop !== "isWinner";
export const StyledDivWrapper = styled("div", {
	shouldForwardProp: shouldFowardPropCellWrapperFunction,
})(getStyledCellWrapperProperties);

export const gameTableRowsStyles = () => ({
	gameContainer: {
		width: "100%",
		padding: "0 0 12px 0",
	},
	gameInfo: {
		margin: "0 12px 6px",
		fontSize: "12px",
	},
	tableContainer: {
		display: "flex",
		flexDirection: "row",
		justifyContent: "flex-start",
		overflowX: "auto",
		width: "100%",
		overflowY: "visible",
		padding: 0,
		margin: "0 0 12px 0",
	},
	table: {
		position: "relative",
		borderCollapse: "separate" /* Don't collapse */,
		paddingBottom: "12px",
		minWidth: "100%",
	},
	tableRow: {
		position: "relative",
		height: "64px",
	},

	dealer: {
		paddingLeft: "6px",
		"&::before": {
			content: "'D'",
			display: "block",
		},
	},

	currentVal: {
		padding: "6px 6px 2px",
	},

	scoreTrickData: {
		display: "flex",
		flexDirection: "row",
		justifyContent: "center",
		width: "100%",
		fontSize: "12px",
		lineHeight: "24px",
		background: "rgba(0,78,86,0.25)",
	},
	scoreTrickBet: {
		color: "#3a6366",
		fontSize: "12px",
		padding: "0px 6px",
		fontWeight: "500",
	},
	scoreTrickBetMissed: {
		color: "#fff",
		fontSize: "12px",
		padding: "0px 6px",
		fontWeight: "500",
		textDecoration: "line-through",
	},
	scoreTrickResult: {
		color: "#3a6366",
		fontSize: "12px",
		padding: "0px 6px",
		fontWeight: "500",
	},
	scoreTrickResultMissed: {
		color: "#fff",
		fontSize: "12px",
		padding: "0px 6px",
		fontWeight: "500",
	},
	scoreResult: {
		color: "#000",
		fontSize: "16px",
		fontWeight: 600,
		padding: "0 6px",
		lineHeight: "32px",
	},
	scoreResultMissed: {
		color: "#c70037",
		fontSize: "16px",
		fontWeight: 600,
		padding: "0 6px",
		lineHeight: "32px",
	},

	betsUnder: {
		minWidth: "10px",
		display: "inline-block",
		marginTop: "8px",
		paddingTop: "2px",
		fontWeight: 300,
		fontSize: "14px",
		borderTop: "#000 1px solid",
	},
	betsOver: {
		minWidth: "10px",
		display: "inline-block",
		marginBottom: "8px",
		paddingBottom: "2px",
		// fontWeight: 700,
		fontWeight: 300,
		fontSize: "14px",
		borderBottom: "#000 1px solid",
	},

	nextStepWrapper: {
		display: "flex",
		flexDirection: "row",
		justifyContent: "space-between",
		padding: "0 12px",
	},
	betTrickTotalLabel: {
		color: "#888",
		fontWeight: 500,
		padding: "0 6px 0 0",
	},
});
