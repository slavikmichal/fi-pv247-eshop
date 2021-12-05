import {
	createContext,
	Dispatch,
	FC,
	SetStateAction,
	useContext,
	useEffect,
	useState
} from 'react';
import { User } from 'firebase/auth';

import { onAuthChanged } from '../utils/firebase';

type UserState = [User | undefined, Dispatch<SetStateAction<User | undefined>>];

const UserContext = createContext<UserState>(undefined as never);

export const UserProvider: FC = ({ children }) => {
	const userState = useState<User>();

	// Setup onAuthChanged once when component is mounted
	useEffect(() => {
		onAuthChanged(u => userState[1](u ?? undefined));
	}, []);

	return (
		<UserContext.Provider value={userState}>{children};</UserContext.Provider>
	);
};

const useLoggedInUser = () => useContext(UserContext)[0];
export default useLoggedInUser;
