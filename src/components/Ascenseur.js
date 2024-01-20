import { withStyles } from "@material-ui/core/styles";
import { useCurrentGame, overrideCurrentTurn, overrideCurrentPhase } from "store/actions";
import { useDispatch } from "react-redux";
import * as React from "react";
import { colors } from "styles/styles";
import { styled } from "@mui/system";
// import DoubleArrowIcon from "@mui/icons-material/DoubleArrow";

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
		boxShadow: "0px 2px 5px rgba(0, 0, 30, 0.3)",
	},
	phases: {
		display: "flex",
		justifyContent: "space-around",
		width: "100%",
		...textStyle,
		backgroundColor: colors.primary.main,
		marginBottom: "10px",
	},
});

const getStyledButtonProperties = ({ isNumber }) => {
	return {
		display: "block",
		border: "none",
		outline: "none",
		background: "none",
		...textStyle,
		fontFamily: "Lato",
		cursor: "pointer",

		padding: isNumber ? "3px 3px" : "2px 2px",

		...(isNumber && {
			fontSize: "16px",
			fontWeight: 500,
		}),
	};
};
const shouldFowardPropButtonFunction = (prop) => prop !== "isNumber";
export const StyledButton = styled("button", {
	shouldForwardProp: shouldFowardPropButtonFunction,
})(getStyledButtonProperties);

const getStyledSpanProperties = ({ isNumber }) => {
	return {
		display: "block",
		padding: isNumber ? "3px 3px" : "2px 2px",
	};
};
const shouldFowardPropSpanFunction = (prop) => prop !== "isNumber";
export const StyledSpan = styled("span", {
	shouldForwardProp: shouldFowardPropSpanFunction,
})(getStyledSpanProperties);

const getStyledLiProperties = ({ isCurrent, isNumber, isOverrideValue, isOverride }) => {
	return {
		backgroundColor: isCurrent
			? colors.primary.main
			: isOverrideValue && isOverride
			? "rgba(0,0,0,0.5)"
			: "transparent",
		...(isNumber && {
			padding: "0px 5px",
			margin: "0 -4px",
		}),
		...(!isNumber && {
			width: "25%",
			display: "flex",
			alignItems: "center",
			justifyContent: "center",
		}),
	};
};
const getStyledLiPropertiesSecondary = ({ isCurrent, isNumber, isOverrideValue, isOverride }) => {
	return {
		...getStyledLiProperties({ isCurrent, isNumber, isOverrideValue, isOverride }),
		backgroundColor: isCurrent
			? colors.secondary.main
			: isOverrideValue && isOverride
			? "rgba(0,0,0,0.5)"
			: "transparent",
	};
};
const shouldFowardPropLiFunction = (prop) =>
	prop !== "isCurrent" &&
	prop !== "isNumber" &&
	prop !== "isOverrideValue" &&
	prop !== "isOverride";
export const StyledLi = styled("li", {
	shouldForwardProp: shouldFowardPropLiFunction,
})(getStyledLiProperties);
export const StyledLiSecondary = styled("li", {
	shouldForwardProp: shouldFowardPropLiFunction,
})(getStyledLiPropertiesSecondary);

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
						<StyledLi
							isCurrent={game.currentTurn === index}
							isNumber={true}
							isOverrideValue={index === game.overrideTurn}
							isOverride={isOverride}
							key={`turn_${index}`}
						>
							{isOverride && index <= game.overrideTurn ? (
								<StyledButton
									isNumber={true}
									onClick={() => handleClickOverrideTurn(index)}
								>
									{turnNumber}
								</StyledButton>
							) : (
								<StyledSpan isNumber={true}>{turnNumber}</StyledSpan>
							)}
						</StyledLi>
					);
				})}
			</ul>
			<ul className={classes.phases}>
				{["Contrat", "Joute", "Décompte", "Pointage"].map((phase, index) => {
					return (
						<StyledLiSecondary
							isCurrent={game.currentPhase === index}
							isNumber={false}
							isOverrideValue={index === game.overridePhase}
							isOverride={isOverride}
							key={`phase_${index}`}
						>
							{isOverride &&
							(index <= game.overridePhase ||
								game.currentTurn < game.overrideTurn) ? (
								<span className={classes.spanPhase}>
									<StyledButton
										isNumber={false}
										onClick={() => handleClickOverridePhase(index)}
									>
										{phase}
									</StyledButton>
								</span>
							) : (
								<StyledSpan
									style={{ color: game.currentPhase === index ? "#000" : "#fff" }}
									isNumber={false}
								>
									{phase}
								</StyledSpan>
							)}
						</StyledLiSecondary>
					);
				})}
			</ul>
		</React.Fragment>
	);
};

export default withStyles(styles, { name: "Ascenseur" })(Ascenseur);
