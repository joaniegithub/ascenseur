export const getGameCanGoNext = (game) => {
	if (game.currentPhase === 0) {
		// Betting phase
		let total = 0;
		const bets = game.players.find((player) => {
			if (player.bets[game.currentTurn] !== undefined) {
				console.log(player.name, player.bets[game.currentTurn]);
				total += player.bets[game.currentTurn];
				return false;
			}
			return true;
		});
		const nb = (bets && bets.length) || 0;
		const valid = nb === 0 && total !== game.turnNumbers[game.currentTurn];
		return valid;
	}

	if (game.currentPhase === 2) {
		// Betting phase
		let total = 0;
		const tricks = game.players.find((player) => {
			if (player.tricks[game.currentTurn] !== undefined) {
				console.log(player.name, player.tricks[game.currentTurn]);
				total += player.tricks[game.currentTurn];
				return false;
			}
			return true;
		});
		const nb = (tricks && tricks.length) || 0;
		const valid = nb === 0 && total === game.turnNumbers[game.currentTurn];
		return valid;
	}

	if (game.currentPhase === 1 || game.currentPhase === 3) {
		return true;
	}
};

export const getGameTotalBetOrTricks = (game) => {
	// let total = 0;
	// const newTotal = checkedOils.reduce((a, b) => {
	// 	return a + (b.percent ? b.percent : 0);
	// }, 0);
	console.log(game.currentTurn);
	const total = game.players.reduce((a, b) => {
		// if (player[betsOrtricksProp][game.currentTurn] !== undefined) {
		const betsOrtricksProp = game.currentPhase === 0 ? b.bets : b.tricks;
		console.log(b.name, betsOrtricksProp[game.currentTurn]);
		// 	total += player[betsOrtricksProp][game.currentTurn];
		// 	return false;
		// }
		// return true;
		console.log(betsOrtricksProp);
		return (
			a +
			(betsOrtricksProp[game.currentTurn]
				? betsOrtricksProp[game.currentTurn]
				: 0)
		);
	}, 0);
	return total;
};
