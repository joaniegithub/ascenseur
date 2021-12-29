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

export const editSettings = (_settingsData) => {
	// console.log(_settingsData, 'settings');
	return {
		type: constants.EDIT_SETTINGS,
		settings: _settingsData,
	};
};

export const setStep = (_step) => {
	// console.log(_settingsData, 'settings');
	return {
		type: constants.SET_STEP,
		step: _step,
	};
};

export const newGame = () => {
	// console.log(_settingsData, 'settings');
	return {
		type: constants.NEW_GAME,
	};
};
export const addPlayer = (_playerName) => {
	// console.log(_settingsData, 'settings');
	return {
		type: constants.ADD_PLAYER,
		playerName: _playerName,
	};
};
export const setNbTurns = (_nbTurns, _turnNumbers) => {
	// console.log(_settingsData, 'settings');
	return {
		type: constants.SET_NB_TURNS,
		nbTurns: _nbTurns,
		turnNumbers: _turnNumbers,
	};
};
export const startGame = () => {
	// console.log(_settingsData, 'settings');
	return {
		type: constants.START_GAME,
	};
};
export const gameNext = () => {
	// console.log(_settingsData, 'settings');
	return {
		type: constants.GAME_NEXT,
	};
};
export const gameSetBet = (_player, _bet) => {
	// console.log(_settingsData, 'settings');
	return {
		type: constants.GAME_SET_BET,
		player: _player,
		bet: _bet,
	};
};
export const gameSetTricks = (_player, _tricks) => {
	// console.log(_settingsData, 'settings');
	return {
		type: constants.GAME_SET_TRICKS,
		player: _player,
		tricks: _tricks,
	};
};
// export const saveSettingsProperty = (_settingProperty) => {
// 	// console.log(_settingsData, 'settings');
// 	return {
// 		type: constants.SAVE_SETTING_PROPERTY_SETTINGS,
// 		settings: {...state.settings, _settingProperty},
// 	};
// };
