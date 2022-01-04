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
				<Typography gutterBottom>
					On peut jouer à ce jeu en étant de quatre à six joueurs.
				</Typography>
				<Typography gutterBottom>
					La personne qui distribue les cartes doit le faire dans le sens des aiguilles
					d’une montre et donner une carte à chacun des joueurs. Celui qui est à sa gauche
					doit distribuer deux cartes de la même manière que son prédécesseur (mais une
					carte à la fois). Après le tour ira encore à cela qui est à gauche, etc. jusqu’à
					ce qu’il y ait un maximum de huit cartes lorsqu’il y a six joueurs, dix cartes à
					cinq et treize à quatre joueurs).
				</Typography>
				<Typography gutterBottom>
					Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Vivamus
					sagittis lacus vel augue laoreet rutrum faucibus dolor auctor.
				</Typography>
				<Typography gutterBottom>
					Aenean lacinia bibendum nulla sed consectetur. Praesent commodo cursus magna,
					vel scelerisque nisl consectetur et. Donec sed odio dui. Donec ullamcorper nulla
					non metus auctor fringilla.
				</Typography>
			</DialogContent>
		</BootstrapDialog>
	);
};

export default withStyles(styles, { name: "InfoModal" })(InfoModal);
