import { withStyles } from "@material-ui/core/styles";
import { useCurrentGame } from "store/actions";
import * as React from "react";

const styles = () => ({
	turnNumbers: {
		display: "flex",
		justifyContent: "space-around",
		color: "#fff",
		fontWeight: 600,
		fontSize: "16px",
		width: "100%",
		backgroundColor: "#37868d",
		borderBottom: "#2e6b70 2px solid",
	},
	currentTurn: {
		backgroundColor: "#7db8bd",
		padding: "3px 4px",
	},
	turn: {
		padding: "3px 2px",
	},

	phases: {
		display: "flex",
		justifyContent: "space-around",
		color: "#fff",
		fontWeight: 600,
		fontSize: "14px",
		lineHeight: "16px",
		width: "100%",
		backgroundColor: "#37868d",
		marginBottom: "10px",
	},
	currentPhase: {
		backgroundColor: "#7db8bd",
		padding: "3px 4px",
		width: "25%",
		textAlign: "center",
		textTransform: "uppercase",
	},
	phase: {
		padding: "3px 2px",
		width: "25%",
		textAlign: "center",
		textTransform: "uppercase",
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
				{["Pari", "Joute", "Décompte", "Fin"].map((phase, index) => {
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
