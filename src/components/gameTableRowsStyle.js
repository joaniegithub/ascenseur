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

const styleCell = {
	// width: "32px",
	maxWidth: "44px",
	minWidth: "44px",
	textAlign: "center",
	boxSizing: "border-box",
	width: "100%",
	verticalAlign: "middle",
	borderBottom: "1px solid #ddd",
	// borderLeft: "1px solid #ddd",
	// boxSizing: "border-box",
	// display: "flex",
	// flexDirection: "row",
	// justifyContent: "flex-start",
};
const styleHeaderCell = {
	...styleCell,
	padding: "6px 10px",
	fontWeight: "bold",
};
const styleStickyCell = {
	...styleCell,
	padding: "6px 10px",
	position: "sticky",
	zIndex: 2,
	fontWeight: "bold",
	// border: "1px solid #bbb",
};
const styleFirstColCell = {
	...styleStickyCell,
	maxWidth: "100px",
	left: 0,
	textAlign: "left",
};
const styleLastColCell = {
	...styleStickyCell,
	maxWidth: "60px",
	minWidth: "60px",
	padding: "0 4px",
	right: 0,
	textAlign: "center",
};

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
	},
	tableRow: {
		position: "relative",
		height: "64px",
	},
	headerTableCell: {
		...styleHeaderCell,
		borderTop: "1px solid #ddd",
		// borderLeft: "1px solid #ddd",
		backgroundColor: "#eaeaea",
	},
	footerTableCell: {
		...styleHeaderCell,
		borderbottom: "1px solid #ddd",
		// borderLeft: "1px solid #ddd",
		backgroundColor: "#eaeaea",
	},
	firstColTableCell: {
		...styleFirstColCell,
		backgroundColor: "#fafafa",

		"&::after": {
			content: "o",
			width: "2px",
			height: "100%",
			position: "absolute",
			backgroundColor: "#bbb",
		},
	},
	firstColTableCellEven: {
		...styleFirstColCell,
		backgroundColor: "#f2f2f2",
	},
	firstColTableCellHeader: {
		...styleFirstColCell,
		backgroundColor: "#f2f2f2",
		borderTop: "1px solid #ddd",
	},
	firstColTableCellFooter: {
		...styleFirstColCell,
		backgroundColor: "#f2f2f2",
		borderBottom: "1px solid #ddd",
	},
	tableCell: {
		...styleCell,
		position: "relative",
		backgroundColor: "#ffffff",
	},
	tableCellEven: {
		...styleCell,
		position: "relative",
		backgroundColor: "#fafafa",
	},
	tableCellCurrent: {
		...styleCell,
		position: "relative",
		borderLeft: "1px solid #ddd",
		borderRight: "1px solid #ddd",
		backgroundColor: "#ffffff",
	},
	tableCellEvenCurrent: {
		...styleCell,
		position: "relative",
		borderLeft: "1px solid #ddd",
		borderRight: "1px solid #ddd",
		backgroundColor: "#fafafa",
	},
	lastColTableCell: {
		...styleLastColCell,
		backgroundColor: "#fafafa",
	},
	lastColTableCellEven: {
		...styleLastColCell,
		backgroundColor: "#f2f2f2",
	},
	lastColTableCellHeader: {
		...styleLastColCell,
		backgroundColor: "#f2f2f2",
		borderTop: "1px solid #ddd",
	},
	lastColTableCellFooter: {
		...styleLastColCell,
		backgroundColor: "#f2f2f2",
		borderBottom: "1px solid #ddd",
		fontSize: "12px",
	},
	lastColTableCellExpanded: {
		...styleLastColCell,
		backgroundColor: "#fafafa",
		maxWidth: "100px",
	},
	lastColTableCellExpandedEven: {
		...styleLastColCell,
		backgroundColor: "#f2f2f2",
		maxWidth: "100px",
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
		color: "#222",
		fontSize: "12px",
		padding: "4px 6px",
		fontWeight: "500",
	},
	scoreTrickResult: {
		color: "#000",
		fontSize: "12px",
		padding: "4px 6px",
		fontWeight: "500",
	},
	scoreTrickResultMissed: {
		color: "#c70037",
		fontSize: "12px",
		padding: "4px 6px",
		fontWeight: "500",
	},
	scoreResult: {
		color: "#000",
		fontSize: "18px",
		fontWeight: "bold",
		padding: "6px 6px",
	},
	scoreResultMissed: {
		color: "#c70037",
		fontSize: "18px",
		fontWeight: "bold",
		padding: "6px 6px",
	},

	nextStepWrapper: {
		display: "flex",
		flexDirection: "row",
		justifyContent: "flex-end",
	},
});
