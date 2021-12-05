import { Box, Button, Dialog, DialogTitle, Paper } from '@mui/material';
import { FC, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import useLoggedInUser from '../hooks/useLoggedInUser';
import useShoppingBasket from '../hooks/useShoppingBasket';
import { useSetSnack } from '../hooks/useSnack';
import { useTranslation } from '../hooks/useTranslation';
import { decrProductInBasket, incrProductInBasket } from '../utils/firebase';

import BasketProduct from './BasketProduct';

type BasketDialogProps = {
	open: boolean;
	onClose: () => void;
};

const BasketDialog: FC<BasketDialogProps> = props => {
	const { open, onClose } = props;

	const basketProducts = useShoppingBasket();
	const setSnack = useSetSnack();
	const user = useLoggedInUser();
	const t = useTranslation();

	const [removed, setRemoved] = useState<boolean>(false);
	const [added, setAdded] = useState<boolean>(false);

	useEffect(() => {
		setSnack({
			openInit: removed,
			severity: 'success',
			text: t('product_removed'),
			onClose: () => setRemoved(false)
		});
	}, [removed]);
	useEffect(() => {
		setSnack({
			openInit: added,
			severity: 'success',
			text: t('product_added'),
			onClose: () => setAdded(false)
		});
	}, [added]);

	const handleIncrement = async (productId: string) => {
		if (user) {
			try {
				await incrProductInBasket(user.uid, productId);
				setAdded(true);
			} catch {
				console.log('error while incrementing product in basket');
			}
		}
	};
	const handleDecrement = async (productId: string) => {
		if (user) {
			try {
				await decrProductInBasket(user.uid, productId);
				setRemoved(true);
			} catch {
				console.log('error while decrementing product in basket');
			}
		}
	};

	return (
		<Dialog open={open} onClose={onClose}>
			<DialogTitle>{t('basket_label')}</DialogTitle>
			{basketProducts?.length ? (
				basketProducts.map(p => (
					<BasketProduct
						key={p.product_id}
						productId={p.product_id}
						amount={p.amount}
						onRemoved={() => setRemoved(true)}
						onIncr={() => handleIncrement(p.product_id)}
						onDecr={() => handleDecrement(p.product_id)}
					/>
				))
			) : (
				<Paper sx={{ width: 600, padding: 4 }}>{t('no_products')}</Paper>
			)}
			{basketProducts?.length && (
				<Box sx={{ margin: 3, textAlign: 'right' }}>
					<Button
						component={Link}
						to="/checkout"
						variant="contained"
						onClick={onClose}
					>
						{t('checkout')}
					</Button>
				</Box>
			)}
		</Dialog>
	);
};

export default BasketDialog;
