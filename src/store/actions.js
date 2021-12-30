import * as constants from "store/constants";
import { useSelector } from "react-redux";

export const useSettings = () => {
	return useSelector((state) => {
		return state.settings;
	});
};
export const useCurrentGame = () => {
	return useSelector((state) => {
		return state.currentGame;
	});
};

// export const editSettings = (_settingsData) => {
// 	return {
// 		type: constants.EDIT_SETTINGS,
// 		settings: _settingsData,
// 	};
// };

export const setStep = (_step) => {
	return {
		type: constants.SET_STEP,
		step: _step,
	};
};

export const newGame = () => {
	return {
		type: constants.NEW_GAME,
	};
};
export const addPlayer = (_playerName) => {
	return {
		type: constants.ADD_PLAYER,
		playerName: _playerName,
	};
};
export const setNbTurns = (_nbTurns, _turnsMode, _turnNumbers, _nbCards) => {
	return {
		type: constants.SET_NB_TURNS,
		nbTurns: _nbTurns,
		turnsMode: _turnsMode,
		turnNumbers: _turnNumbers,
		nbCards: _nbCards,
	};
};
export const startGame = () => {
	return {
		type: constants.START_GAME,
	};
};
export const gameNext = () => {
	return {
		type: constants.GAME_NEXT,
	};
};
export const gameSetBet = (_player, _bet) => {
	return {
		type: constants.GAME_SET_BET,
		player: _player,
		bet: _bet,
	};
};
export const gameSetTricks = (_player, _tricks) => {
	return {
		type: constants.GAME_SET_TRICKS,
		player: _player,
		tricks: _tricks,
	};
};
