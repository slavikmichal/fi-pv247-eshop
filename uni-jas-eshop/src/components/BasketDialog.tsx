import { Box, Dialog, DialogTitle, Paper } from '@mui/material';
import { FC, useEffect, useState } from 'react';

import useShoppingBasket from '../hooks/useShoppingBasket';
import { useSetSnack } from '../hooks/useSnack';

import BasketProduct from './BasketProduct';

type BasketDialogProps = {
	open: boolean;
	onClose: () => void;
};

const BasketDialog: FC<BasketDialogProps> = props => {
	const { open, onClose } = props;
	const basketProducts = useShoppingBasket();
	const [removed, setRemoved] = useState<boolean>(false);
	const setSnack = useSetSnack();

	useEffect(() => {
		setSnack({
			openInit: removed,
			severity: 'success',
			text: 'Product was removed from the basket',
			onClose: () => setRemoved(false)
		});
	}, [removed]);

	return (
		<Dialog open={open} onClose={onClose}>
			<DialogTitle>Shopping basket</DialogTitle>
			{basketProducts?.length ? (
				basketProducts.map(p => (
					<BasketProduct
						key={p.product_id}
						productId={p.product_id}
						amount={p.amount}
						onRemoved={() => setRemoved(true)}
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
