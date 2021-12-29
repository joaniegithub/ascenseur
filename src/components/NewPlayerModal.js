import { withStyles } from "@material-ui/core/styles";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import React from "react";

const styles = () => ({
	box: {
		padding: "30px",
	},
	// gridItemButtons: {
	// 	width: "100%",
	// 	display: "flex",
	// 	flexDirection: "row",
	// 	justifyContent: "flex-end",
	// },
});
const NewPlayerModal = (props) => {
	const { classes, openNewPlayer, onCloseNewPlayer } = props;

	const [playerName, setPlayerName] = React.useState("");

	const handleChangePlayerName = (event) => {
		setPlayerName(event.target.value);
	};
	const handleCloseCancel = () => {
		onCloseNewPlayer();
		setPlayerName("");
	};
	const handleClose = () => {
		onCloseNewPlayer(playerName);
		setPlayerName("");
	};

	return (
		<Dialog open={openNewPlayer}>
			<DialogTitle>Nouveau joueur</DialogTitle>
			<DialogContent>
				<DialogContentText>
					To subscribe to this website, please enter your email
					address here. We will send updates occasionally.
				</DialogContentText>
				<TextField
					autoFocus
					margin="dense"
					id="name"
					label="Nom du joueur"
					type="emaitextl"
					fullWidth
					variant="standard"
					onChange={handleChangePlayerName}
					value={playerName}
				/>
			</DialogContent>
			<DialogActions>
				<Button onClick={handleCloseCancel} variant="outlined">
					Annuler
				</Button>
				<Button
					onClick={handleClose}
					disabled={!playerName}
					variant="contained"
				>
					Ajouter
				</Button>
			</DialogActions>
		</Dialog>
	);
};

export default withStyles(styles, { name: "NewPlayerModal" })(NewPlayerModal);
