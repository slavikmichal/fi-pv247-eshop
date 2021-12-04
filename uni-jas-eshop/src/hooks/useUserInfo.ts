import { getDoc } from '@firebase/firestore';
import { useEffect, useState } from 'react';

import {
	getProduct,
	Product,
	UserInfo,
	userInfoDocument
} from '../utils/firebase';

import useLoggedInUser from './useLoggedInUser';

const useUserInfo = () => {
	const user = useLoggedInUser();
	const [userInfo, setUserInfo] = useState<UserInfo>();

	useEffect(() => {
		const getUserInfo = async () => {
			const userDoc = userInfoDocument(user?.uid ?? 'notExists');
			const snap = await getDoc(userDoc);
			if (snap.exists()) {
				setUserInfo(snap.data());
			}
		};
		getUserInfo();
	}, [user]);

	return userInfo;
};

export default useUserInfo;
