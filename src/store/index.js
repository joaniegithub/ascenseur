import reducer from "store/reducer";
import { createStore } from "redux";

// convert object to string and store in localStorage
function saveToLocalStorage(state) {
	try {
		const stateToSave = { ...state };
		const serialisedState = JSON.stringify(stateToSave);
		localStorage.setItem("AscenseurStore", serialisedState);
	} catch (e) {
		console.warn(e);
	}
}

// load string from localStarage and convert into an Object
// invalid output must be undefined
function loadFromLocalStorage() {
	try {
		const serialisedState = localStorage.getItem("AscenseurStore");
		if (serialisedState === null) return undefined;
		const parsedState = JSON.parse(serialisedState);
		return parsedState;
	} catch (e) {
		console.warn(e);
		return undefined;
	}
}

// create our store from our rootReducers and use loadFromLocalStorage
// to overwrite any values that we already have saved
const storeAscenseur = createStore(reducer, loadFromLocalStorage());

// listen for store changes and use saveToLocalStorage to
// save them to localStorage
storeAscenseur.subscribe(() => saveToLocalStorage(storeAscenseur.getState()));

export default storeAscenseur;
