  
import React from 'react';

const initialState = {
	todos: [
        { text: 'Learn React', checked: false, id: 0 },
        { text: 'Learn Anguler', checked: false, id: 1 },
        { text: 'Learn Vue', checked: false, id: 2 }
    ]
};

type StateT = typeof initialState;
type StateGetSetT = [StateT, React.Dispatch<React.SetStateAction<StateT>>];

const AppContext = React.createContext<StateGetSetT | undefined>(undefined);

type AppContextProviderProps = {
	children: React.ReactNode
};

function AppContextProvider({ children }: AppContextProviderProps) {
	const contextGetSet = React.useState(initialState);
	return (
		<AppContext.Provider value={contextGetSet}>
			{children}
		</AppContext.Provider>
	);
}

type SetPartialStateT = (newVals: Partial<StateT>) => void;
type UseAppContextT = [StateT, SetPartialStateT];

function useAppContext(): UseAppContextT {
	const [state, setState] = React.useContext(AppContext) as StateGetSetT;
	function setPartialState(newVals: Partial<StateT>) {
		setState({...state, ...newVals});
	}
	return [state, setPartialState];
}

export {AppContextProvider, useAppContext};