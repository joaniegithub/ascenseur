import { withStyles } from "@material-ui/core/styles";
import IconButton from "@mui/material/IconButton";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import React from "react";
import CloseIcon from "@mui/icons-material/Close";
import { Box } from "@mui/material";
import { Grid } from "@mui/material";
import { Typography } from "@material-ui/core";
import { styled } from "@mui/material/styles";

const styles = () => ({
	box: {
		padding: "30px",
	},
});

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
	"& .MuiDialogContent-root": {
		padding: theme.spacing(2),
	},
	"& .MuiDialogActions-root": {
		padding: theme.spacing(1),
	},
}));

const BootstrapDialogTitle = (props) => {
	const { children, onClose, ...other } = props;

	return (
		<DialogTitle sx={{ m: 0, p: 2 }} {...other}>
			{children}
			{onClose ? (
				<IconButton
					aria-label="close"
					onClick={onClose}
					sx={{
						position: "absolute",
						right: 8,
						top: 8,
						color: (theme) => theme.palette.grey[500],
					}}
				>
					<CloseIcon />
				</IconButton>
			) : null}
		</DialogTitle>
	);
};

const InfoModal = (props) => {
	const { classes, openInfoModal, onCloseInfoModal } = props;

	const [playerName, setPlayerName] = React.useState("");

	const handleChangePlayerName = (event) => {
		setPlayerName(event.target.value);
	};
	const handleCloseCancel = () => {
		onCloseInfoModal();
		setPlayerName("");
	};
	const handleClose = () => {
		onCloseInfoModal(playerName);
		setPlayerName("");
	};

	return (
		<BootstrapDialog
			onClose={handleClose}
			aria-labelledby="customized-dialog-title"
			open={openInfoModal}
		>
			<BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose}>
				Qu'est-ce que l'Ascenseur?
			</BootstrapDialogTitle>
			<DialogContent dividers>
				<Typography gutterBottom paragraph>
					Se joue de 4 à 6 joueurs avec un jeu de cinquante-deux cartes selon les
					spécifications suivantes : à cinq joueurs, deux 2 sont retirés ; à six joueurs
					on retire tous les 2.
				</Typography>
				<Typography gutterBottom paragraph>
					Le jeu consiste en une série de manches se jouant avec un nombre de cartes en
					main d'abord croissant puis ensuite décroissant. Le premier tour se joue à une
					carte, le second à deux cartes, le troisième à trois cartes, et ainsi de suite,
					jusqu'à ce qu'à une manche où toutes les cartes sont distribuées. À partir du
					tour suivant, on passe au mode de distribution décroissante.
				</Typography>
				<Typography gutterBottom paragraph>
					Chaque manche consiste en 4 phases: la distribution des cartes, l'annonce du
					contrat, la joute, le décompte.
				</Typography>
				<Typography gutterBottom paragraph>
					<strong>1. La distribution des cartes:</strong>
					Le donneur distribue <em>n</em> cartes (varie en fonction du numéro de manche
					auquel on est rendu) à chaque joueur. Il place le talon au centre, retourne la
					carte du dessus face visible qui désignera la couleur de l'atout.
				</Typography>
				<Typography gutterBottom paragraph>
					<strong>2. L'annonce du contrat:</strong> En commençant par le jouer suivant le
					donneur, chaque joueur annonce le nombre de levées qu'il pense remporter durant
					cette manche. Le nombre annoncé par chacun ne doit pas dépasser le nombre de
					levées à remporter durant la manche (c'est-à-dire le nombre de cartes que chaque
					joueur a en main) et la somme des nombres annoncés par chacun ne doit pas
					totaliser exactement le nombre de levées (sinon il y aurait possibilité que tous
					les joueurs soient gagnants et le jeu ne souhaite pas celà).
				</Typography>
			</DialogContent>
		</BootstrapDialog>
	);
};

export default withStyles(styles, { name: "InfoModal" })(InfoModal);
