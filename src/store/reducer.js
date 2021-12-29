import * as constants from "store/constants";

export const defaultSettings = {
	// font: "Shadows Into Light",
};

const defaultState = {
	name: "Ascenseur Companion",
	settings: defaultSettings,
	currentGame: undefined,
};

const gameDefaultState = {
	players: [],
	currentTurn: -1,
	nbTurns: -1,
	turnNumbers: [],
};

const reducer = (state = defaultState, { type, ...payload }) => {
	//action déconstruite = {type, name}
	// console.log(state, type, payload);
	const game = state.currentGame;

	switch (type) {
		case constants.EDIT_SETTINGS:
			return {
				...state,
				settings: { ...state.settings, ...payload.settings },
			};

		case constants.SET_STEP:
			return {
				...state,
				step: payload.step,
			};

		case constants.NEW_GAME:
			return {
				...state,
				currentGame: { ...gameDefaultState },
			};

		case constants.ADD_PLAYER:
			const newPlayer = {
				name: payload.playerName,
				bets: [],
				tricks: [],
				scores: [],
			};
			return {
				...state,
				currentGame: {
					...state.currentGame,
					players: [...state.currentGame.players, newPlayer],
				},
			};

		case constants.SET_NB_TURNS:
			return {
				...state,
				currentGame: {
					...state.currentGame,
					nbTurns: payload.nbTurns,
					turnNumbers: payload.turnNumbers,
				},
			};

		case constants.START_GAME:
			return {
				...state,
				currentGame: {
					...state.currentGame,
					currentTurn: 0,
					currentPhase: 0,
				},
			};

		case constants.GAME_NEXT:
			const newPhase = (game.currentPhase + 1) % 4;
			const newTurn =
				newPhase === 0 ? game.currentTurn + 1 : game.currentTurn; // todo: tester si fin de partie
			return {
				...state,
				currentGame: {
					...state.currentGame,
					currentTurn: newTurn,
					currentPhase: newPhase,
				},
			};

		case constants.GAME_SET_BET:
			payload.player.bets[game.currentTurn] = payload.bet;
			return {
				...state,
				currentGame: {
					...state.currentGame,
					players: [...game.players],
				},
			};

		case constants.GAME_SET_TRICKS:
			payload.player.tricks[game.currentTurn] = payload.tricks;

			let score = 0;
			if (!payload.player.scores) {
				payload.player.scores = [];
			}
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
					...state.currentGame,
					players: [...game.players],
				},
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
