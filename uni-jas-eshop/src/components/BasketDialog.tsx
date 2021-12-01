import { Box, Dialog, DialogTitle, Paper } from '@mui/material';
import { FC } from 'react';

import useShoppingBasket from '../hooks/useShoppingBasket';

import BasketProduct from './BasketProduct';

type BasketDialogProps = {
	open: boolean;
	onClose: () => void;
};

const BasketDialog: FC<BasketDialogProps> = props => {
	const { open, onClose } = props;
	const basketProducts = useShoppingBasket();

	return (
		<Dialog open={open} onClose={onClose}>
			<DialogTitle>Shopping basket</DialogTitle>
			{basketProducts?.length ? (
				basketProducts.map(p => (
					<BasketProduct
						key={p.product_id}
						productId={p.product_id}
						amount={p.amount}
					/>
				))
			) : (
				<Paper sx={{ width: 600, padding: 4 }}>
					No products in your basket yet.
				</Paper>
			)}
		</Dialog>
	);
};

export default BasketDialog;
