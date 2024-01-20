import * as constants from "store/constants";

export const defaultSettings = {};

const defaultState = {
	name: "Ascenseur Compagnon",
	settings: defaultSettings,
	currentGame: undefined,
	showRules: false,
};

const gameDefaultState = {
	players: [],
	nbTurns: -1,
	nbCards: 50,
	turnNumbers: [],
	dealer: -1,
	currentTurn: -1,
	currentPhase: -1,
	nbCards: 52,
	overrideMode: false,
	overridePhase: -1,
	overrideTurn: -1,
};

const reducer = (state = defaultState, { type, ...payload }) => {
	// console.log(state, type, payload);
	const game = state.currentGame;

	switch (type) {
		case constants.EDIT_SETTINGS:
			return {
				...state,
				settings: { ...state.settings, ...payload.settings },
			};

		case constants.NEW_GAME:
			return {
				...state,
				currentGame: {
					...gameDefaultState,
					players: game?.players || [],
				},
			};

		case constants.ADD_PLAYER:
			const newPlayer = {
				uid: new Date().getTime(),
				name: payload.playerName,
				bets: [0],
				tricks: [],
				scores: [],
			};
			return {
				...state,
				currentGame: {
					...game,
					players: [...game.players, newPlayer],
				},
			};
		case constants.DELETE_PLAYER:
			const playerDelete = payload.player;
			const playerDeleteIndex = game.players.indexOf(playerDelete);
			game.players.splice(playerDeleteIndex, 1);
			if (payload.player.uid === game.dealer) {
				game.dealer = undefined;
			}
			return {
				...state,
				currentGame: {
					...game,
					players: [...game.players],
				},
			};
		case constants.SWAP_PLAYER:
			const playerSwap = payload.player;
			const direction = payload.direction;
			const playerSwapIndex = game.players.indexOf(playerSwap);
			const newIndex = playerSwapIndex + direction;

			game.players.splice(playerSwapIndex, 1);
			game.players.splice(newIndex, 0, playerSwap);
			return {
				...state,
				currentGame: {
					...game,
					players: [...game.players],
				},
			};

		case constants.SET_NB_TURNS:
			return {
				...state,
				currentGame: {
					...game,
					nbTurns: payload.nbTurns,
					turnsMode: payload.turnsMode,
					turnNumbers: payload.turnNumbers,
					nbCards: payload.nbCards,
				},
			};

		case constants.SET_DEALER:
			return {
				...state,
				currentGame: {
					...game,
					dealer: payload.playerUid,
				},
			};

		case constants.CHANGE_OVERRIDE_MODE:
			const newOverrideTurn = Math.max(game.currentTurn, game.overrideTurn);
			const newOverridePhase =
				game.currentTurn > game.overrideTurn // catched up
					? game.currentPhase
					: game.currentTurn === game.overrideTurn // catching up
					? Math.max(game.currentPhase, game.overridePhase)
					: game.overridePhase;

			// console.log(
			// 	"currentTurn=" +
			// 		game.currentTurn +
			// 		" overrideTurn=" +
			// 		game.overrideTurn +
			// 		" newOverrideTurn=" +
			// 		newOverrideTurn
			// );
			// console.log(
			// 	"currentcurrentPhaseTurn=" +
			// 		game.currentPhase +
			// 		" overridePhase=" +
			// 		game.overridePhase +
			// 		" newOverridePhase=" +
			// 		newOverridePhase
			// );
			return {
				...state,
				currentGame: {
					...game,
					overrideMode: !game.overrideMode,
					overrideTurn: newOverrideTurn,
					overridePhase: newOverridePhase,
				},
			};
		case constants.OVERRIDE_CURRENT_TURN:
			const turn = payload.turn;
			let phase = undefined;
			if (turn === game.overrideTurn) {
				phase = game.overridePhase;
			}
			// console.log(
			// 	(turn === game.overrideTurn) +
			// 		"currentTurn=" +
			// 		game.currentTurn +
			// 		" overrideTurn=" +
			// 		game.overrideTurn +
			// 		" (overridePhase=" +
			// 		game.overridePhase +
			// 		") turn=" +
			// 		turn
			// );
			// if (phase !== undefined) {
			// 	console.log(
			// 		"currentPhase=" +
			// 			game.currentPhase +
			// 			" overridePhase=" +
			// 			game.overridePhase +
			// 			" phase=" +
			// 			phase
			// 	);
			// }
			const newState = {
				...state,
				currentGame: {
					...game,
					currentTurn: payload.turn,
					...(phase !== undefined && { currentPhase: phase }),
				},
			};
			// console.log(newState.currentGame);
			return newState;

		case constants.OVERRIDE_CURRENT_PHASE:
			return {
				...state,
				currentGame: {
					...game,
					currentPhase: payload.phase,
				},
			};

		case constants.START_GAME:
			const firstDealer = game.players.find((player) => {
				return player.uid === game.dealer;
			});
			const indexFirstDealer = game.players.indexOf(firstDealer);
			game.dealer = indexFirstDealer;
			return {
				...state,
				currentGame: {
					...game,
					currentTurn: 0,
					currentPhase: 0,
					currentDealer: firstDealer,
				},
			};

		case constants.GAME_NEXT:
			const newPhase = (game.currentPhase + 1) % 4;
			const newTurn = newPhase === 0 ? game.currentTurn + 1 : game.currentTurn;
			if (newPhase === 0) {
				game.players.forEach((player) => {
					player.bets[newTurn] = 0;
				});
			}
			if (newPhase === 2) {
				game.players.forEach((player) => {
					player.tricks[newTurn] = 0;
				});
			}
			if (newPhase === 3) {
				game.players.forEach((player) => {
					let score = 0;
					player.tricks.forEach((tricks, i) => {
						if (player.bets[i] === tricks) {
							score += tricks + 1;
						} else {
							score -= 1;
						}
						player.scores[i] = score;
					});
				});
			}

			const thisTurnDealer = game.players[(game.dealer + newTurn) % game.players.length];
			// console.log(game.dealer, thisTurnDealer, thisTurnDealer);
			return {
				...state,
				currentGame: {
					...game,
					currentTurn: newTurn,
					currentPhase: newPhase,
					currentDealer: thisTurnDealer,
				},
			};

		case constants.GAME_SET_BET:
			payload.player.bets[game.currentTurn] = payload.bet;
			return {
				...state,
				currentGame: {
					...game,
					players: [...game.players],
				},
			};

		case constants.GAME_SET_TRICKS:
			payload.player.tricks[game.currentTurn] = payload.tricks;

			if (!payload.player.scores) {
				payload.player.scores = [];
			}
			let score = 0;
			payload.player.tricks.forEach((tricks, i) => {
				if (payload.player.bets[i] === tricks) {
					score += tricks + 1;
				} else {
					score -= 1;
				}
				payload.player.scores[i] = score;
			});

			return {
				...state,
				currentGame: {
					...game,
					players: [...game.players],
				},
			};

		case constants.SHOW_RULES:
			return {
				...state,
				showRules: payload.visibility,
			};

		// case constants.SAVE_SETTING_PROPERTY_SETTINGS:
		// 	return {
		// 		...state,
		// 		settings: { ...state.settings, ...payload.settings },
		// 	};

		default:
			return state;
	}
}; // {reducer, startState, middleware}

export default reducer;
