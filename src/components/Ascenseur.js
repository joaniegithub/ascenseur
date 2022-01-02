import { withStyles } from "@material-ui/core/styles";
import { useCurrentGame } from "store/actions";
import * as React from "react";
import { colors } from "styles/styles";
import DoubleArrowIcon from "@mui/icons-material/DoubleArrow";

const styles = () => ({
	turnNumbers: {
		display: "flex",
		justifyContent: "space-around",
		color: "#fff",
		fontWeight: 600,
		fontSize: "16px",
		width: "100%",
		backgroundColor: colors.primary.main,
		borderBottom: "#fff 1px solid",
	},
	currentTurn: {
		backgroundColor: colors.secondary.main,
		padding: "3px 8px",
		margin: "0 -4px",
	},
	turn: {
		padding: "3px 3px",
	},

	phases: {
		display: "flex",
		justifyContent: "space-around",
		color: "#fff",
		fontWeight: 600,
		fontSize: "14px",
		lineHeight: "16px",
		width: "100%",
		backgroundColor: colors.primary.main,
		marginBottom: "10px",
	},
	currentPhase: {
		backgroundColor: colors.secondary.main,
		padding: "3px 4px",
		width: "25%",
		textAlign: "center",
		textTransform: "uppercase",
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
	},
	phase: {
		padding: "3px 2px",
		width: "25%",
		textAlign: "center",
		textTransform: "uppercase",
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
	},
});

const Ascenseur = (props) => {
	const { classes } = props;

	const game = useCurrentGame();

	return (
		<React.Fragment>
			<ul className={classes.turnNumbers}>
				{game.turnNumbers.map((turnNumber, index) => {
					return (
						<li
							className={
								game.currentTurn === index
									? classes.currentTurn
									: classes.turn
							}
							key={`turn_${index}`}
						>
							{turnNumber}
						</li>
					);
				})}
			</ul>
			<ul className={classes.phases}>
				{[
					<React.Fragment>
						{"Pari"}
						<DoubleArrowIcon
							sx={{
								fontSize: 16,
								marginLeft: "4px",
							}}
						/>
					</React.Fragment>,
					<React.Fragment>
						{"Joute"}
						<DoubleArrowIcon
							sx={{
								fontSize: 16,
								marginLeft: "4px",
							}}
						/>
					</React.Fragment>,
					<React.Fragment>
						{"Décompte"}
						<DoubleArrowIcon
							sx={{
								fontSize: 16,
								marginLeft: "4px",
							}}
						/>
					</React.Fragment>,
					"Pointage",
				].map((phase, index) => {
					return (
						<li
							className={
								game.currentPhase === index
									? classes.currentPhase
									: classes.phase
							}
							key={`phase_${index}`}
						>
							{phase}
						</li>
					);
				})}
			</ul>
		</React.Fragment>
	);
};

export default withStyles(styles, { name: "Ascenseur" })(Ascenseur);
