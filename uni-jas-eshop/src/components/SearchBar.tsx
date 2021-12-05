import { Grid, IconButton, InputBase, Paper, Typography } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { ChangeEvent, SyntheticEvent, useState } from 'react';

import useProducts from '../hooks/useProducts';
import { useLanguage } from '../hooks/useTranslation';

import SearchProduct from './SearchProduct';

const SearchBar = () => {
	const [searchPattern, setSearchPattern] = useState<string>('');
	const products = useProducts();
	const [lang, _setLang] = useLanguage();
	const [hide, setHide] = useState<boolean>(false);

	const filterProducts = () => {
		if (searchPattern.trim().length < 1) {
			return [];
		}

		if (lang === 'en') {
			return products.filter(
				p => p['name-en'].indexOf(searchPattern.trim()) !== -1
			);
		}
		return products.filter(
			p => p['name-sk'].indexOf(searchPattern.trim()) !== -1
		);
	};

	const filteredProducts = filterProducts();

	return (
		<Grid container direction="column">
			<Grid item>
				<Paper
					component="div"
					sx={{
						p: '2px 4px',
						display: 'flex',
						alignItems: 'center'
					}}
				>
					<InputBase
						sx={{ ml: 1, flex: 1 }}
						placeholder="Search"
						inputProps={{ 'aria-label': 'search' }}
						onChange={(e: ChangeEvent) =>
							setSearchPattern((e.target as HTMLInputElement).value)
						}
						onClick={() => setHide(false)}
						onBlur={e => {
							if (
								!e.relatedTarget ||
								e.relatedTarget.className.indexOf('SearchItem') === -1
							) {
								setHide(true);
							}
						}}
					/>
					<IconButton sx={{ p: '10px' }} aria-label="search">
						<SearchIcon />
					</IconButton>
				</Paper>
			</Grid>

			<Grid item>
				<Paper
					component="div"
					sx={{
						p: '2px 4px',
						alignItems: 'center',
						position: 'absolute',
						width: '35rem',
						maxHeight: '300px',
						overflowY: 'scroll',
						display: searchPattern.trim().length < 1 || hide ? 'none' : 'block'
					}}
					tabIndex={0}
				>
					{filteredProducts.length ? (
						filteredProducts.map(p => (
							<SearchProduct
								key={p.id}
								product={p}
								onClick={() => setHide(true)}
							/>
						))
					) : (
						<Typography sx={{ height: '40px', marginTop: '20px' }}>
							No products found
						</Typography>
					)}
				</Paper>
			</Grid>
		</Grid>
	);
};
export default SearchBar;
