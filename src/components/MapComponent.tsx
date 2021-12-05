import { FC } from 'react';
import {
	ComposableMap,
	Geographies,
	Geography,
	Marker
} from 'react-simple-maps';

import { useTranslation } from '../hooks/useTranslation';

const MapComponent: FC = () => {
	const t = useTranslation();

	return (
		<ComposableMap
			projection="geoAzimuthalEqualArea"
			projectionConfig={{
				rotate: [-19.5, -49, 0],
				scale: 10000
			}}
		>
			<Geographies geography="https://raw.githubusercontent.com/zcreativelabs/react-simple-maps/master/topojson-maps/world-110m.json">
				{({ geographies }) =>
					geographies
						.filter(d => d.properties.REGION_UN === 'Europe')
						.map(geo => (
							<Geography
								key={geo.rsmKey}
								geography={geo}
								fill="#EAEAEC"
								stroke="#D6D6DA"
							/>
						))
				}
			</Geographies>
			<Marker coordinates={[18.6228223, 48.7653067]}>
				<circle r={10} fill="#FF4E00" stroke="#fff" strokeWidth={2} />
				<text
					textAnchor="middle"
					y="25"
					style={{ fontFamily: 'system-ui', fill: '#5D5A6D' }}
				>
					Uni-Jas
				</text>
			</Marker>
			<Marker coordinates={[19.5, 48.8]}>
				<text
					textAnchor="middle"
					y="0"
					style={{ fontSize: 21, fontFamily: 'system-ui', fill: '#5D5A6D' }}
				>
					{t('slovakia')}
				</text>
			</Marker>
		</ComposableMap>
	);
};

export default MapComponent;
