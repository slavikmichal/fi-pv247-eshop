import { AlertColor } from '@mui/material';
import {
	createContext,
	Dispatch,
	FC,
	SetStateAction,
	useContext,
	useState
} from 'react';

type SnackState = {
	openInit: boolean;
	severity: AlertColor;
	text: string;
	onClose: () => void;
};
const SnackContext = createContext<
	[SnackState | undefined, Dispatch<SetStateAction<SnackState | undefined>>]
>(undefined as never);

export const SnackProvider: FC = ({ children }) => {
	const snackState = useState<SnackState>();

	return (
		<SnackContext.Provider value={snackState}>{children}</SnackContext.Provider>
	);
};

export const useSnackState = (): SnackState | undefined =>
	useContext(SnackContext)[0];

export const useSetSnack = () => useContext(SnackContext)[1];
