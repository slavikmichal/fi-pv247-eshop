import { StringLike } from '@firebase/util';
import { onSnapshot, query, where } from 'firebase/firestore';
import {
	createContext,
	Dispatch,
	FC,
	SetStateAction,
	useContext,
	useEffect,
	useState
} from 'react';

import {
	addProductToBasket,
	basketCollection,
	BasketProduct,
	removeProductFromBasket
} from '../utils/firebase';

import useLoggedInUser from './useLoggedInUser';

type BasketState = BasketProduct[] | undefined;
const BasketContext = createContext<
	[BasketState, Dispatch<SetStateAction<BasketProduct[] | undefined>>]
>(undefined as never);

export const BasketProvider: FC = ({ children }) => {
	const basketState = useState<BasketState>();
	const user = useLoggedInUser();

	useEffect(() => {
		const q = query(basketCollection, where('user_id', '==', user?.uid ?? ''));
		const unsubscribe = onSnapshot(q, snapshot => {
			basketState[1](snapshot.docs.map(doc => doc.data()));
		});
		return () => {
			unsubscribe();
		};
	}, [user]);

	return (
		<BasketContext.Provider value={basketState}>
			{children};
		</BasketContext.Provider>
	);
};

const useShoppingBasket = () => useContext(BasketContext)[0];
export default useShoppingBasket;
