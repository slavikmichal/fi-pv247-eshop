import { Box } from '@mui/system';
import { FC, useState } from 'react';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

type Props = {
	onChange?: (val: number) => void;
	initVal?: number;
	onIncr?: () => void;
	onDecr?: () => void;
};

const NumericInput: FC<Props> = props => {
	const { onChange, initVal, onIncr, onDecr } = props;

	const [val, setVal] = useState<number>(initVal ?? 1);

	const incrVal = () => {
		setVal(val + 1);
		if (onChange) {
			onChange(val + 1);
		}
		if (onIncr) {
			onIncr();
		}
	};
	const decrVal = () => {
		if (val > 0) {
			setVal(val - 1);
			if (onChange) {
				onChange(val - 1);
			}
			if (onDecr) {
				onDecr();
			}
		}
	};

	const style = {
		alignItems: 'center',
		backgroundColor: '#f1f1f1',
		border: '1px solid #cfcfcf',
		color: '#00af62',
		cursor: 'pointer',
		justifyContent: 'center',
		paddingBottom: '3px'
	};

	return (
		<Box
			component="div"
			sx={{ display: 'flex', flexDirection: 'row', position: 'relative' }}
		>
			<Box
				component="div"
				onClick={decrVal}
				sx={{ ...style, borderRadius: '6px 0 0 6px' }}
			>
				<RemoveIcon sx={{ verticalAlign: 'text-top' }} />
			</Box>
			<Box
				component="div"
				sx={{
					border: '1px solid #cfcfcf',
					color: '#6b6b6b',
					paddingRight: '10px',
					textAlign: 'right',
					width: 50,
					fontSize: '0.9rem',
					paddingTop: '4px'
				}}
			>
				{val} ks
			</Box>
			<Box
				component="div"
				onClick={incrVal}
				sx={{ ...style, borderRadius: '0 6px 6px 0' }}
			>
				<AddIcon sx={{ verticalAlign: 'text-top' }} />
			</Box>
		</Box>
	);
};

export default NumericInput;
