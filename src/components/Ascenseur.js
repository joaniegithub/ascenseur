import { withStyles } from "@material-ui/core/styles";
import { useCurrentGame, overrideCurrentTurn, overrideCurrentPhase } from "store/actions";
import { useDispatch } from "react-redux";
import * as React from "react";
import { colors } from "styles/styles";
import DoubleArrowIcon from "@mui/icons-material/DoubleArrow";
import { Button } from "@material-ui/core";

const textStyle = {
	textAlign: "center",
	textTransform: "uppercase",
	color: "#fff",
	fontWeight: 600,
	lineHeight: "16px",
	fontSize: "14px",
};

const styles = () => ({
	turnNumbers: {
		display: "flex",
		justifyContent: "space-around",
		...textStyle,
		fontSize: "16px",
		fontWeight: 500,
		width: "100%",
		backgroundColor: colors.primary.focus,
		borderBottom: "#fff 1px solid",
	},
	currentTurnLi: {
		backgroundColor: colors.secondary.main,
		padding: "0px 5px",
		margin: "0 -4px",
	},
	turnLi: {
		// padding: "3px 3px",
	},
	spanTurn: {
		padding: "3px 3px",
		display: "block",
	},
	buttonTurn: {
		padding: "3px 3px",
		display: "block",
		border: "none",
		outline: "none",
		background: "none",
		...textStyle,
		fontSize: "16px",
		fontWeight: 500,
		cursor: "pointer",
		fontFamily: "Lato",
	},

	phases: {
		display: "flex",
		justifyContent: "space-around",
		width: "100%",
		...textStyle,
		backgroundColor: colors.primary.main,
		marginBottom: "10px",
	},
	currentPhaseLi: {
		backgroundColor: colors.secondary.main,
		width: "25%",
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
	},
	phaseLi: {
		width: "25%",
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
	},
	spanPhase: {
		padding: "2px 2px",
		display: "block",
	},
	buttonPhase: {
		padding: "0",
		border: "none",
		outline: "none",
		background: "none",
		...textStyle,
		cursor: "pointer",
		fontFamily: "Lato",
	},
});

const Ascenseur = (props) => {
	const { classes } = props;

	const dispatch = useDispatch();
	const game = useCurrentGame();
	const isOverride = game.overrideMode;

	const handleClickOverrideTurn = (_turn) => {
		dispatch(overrideCurrentTurn(_turn));
	};
	const handleClickOverridePhase = (_phase) => {
		dispatch(overrideCurrentPhase(_phase));
	};

	return (
		<React.Fragment>
			<ul className={classes.turnNumbers}>
				{game.turnNumbers.map((turnNumber, index) => {
					return (
						<li
							className={
								game.currentTurn === index ? classes.currentTurnLi : classes.turnLi
							}
							key={`turn_${index}`}
						>
							{isOverride && index <= game.overrideTurn ? (
								<button
									className={classes.buttonTurn}
									onClick={() => handleClickOverrideTurn(index)}
								>
									{turnNumber}
								</button>
							) : (
								<span className={classes.spanTurn}>{turnNumber}</span>
							)}
						</li>
					);
				})}
			</ul>
			<ul className={classes.phases}>
				{["Contrat", "Joute", "Décompte", "Pointage"].map((phase, index) => {
					return (
						<li
							className={
								game.currentPhase === index
									? classes.currentPhaseLi
									: classes.phaseLi
							}
							key={`phase_${index}`}
						>
							{isOverride &&
							(index <= game.overridePhase ||
								game.currentTurn < game.overrideTurn) ? (
								<span className={classes.spanPhase}>
									<button
										className={classes.buttonPhase}
										onClick={() => handleClickOverridePhase(index)}
									>
										{phase}
									</button>
								</span>
							) : (
								<span className={classes.spanPhase}>{phase}</span>
							)}
						</li>
					);
				})}
			</ul>
		</React.Fragment>
	);
};

export default withStyles(styles, { name: "Ascenseur" })(Ascenseur);
