/* eslint-disable no-console */
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { buildPalette, buildRgb, quantizeColor } from '@/utils/colors';
import { Flex } from './ui';

type PaletteProps = {
	source: {
		url: string;
		height: number;
		width: number;
	};
};

const Palette = ({ source }: PaletteProps) => {
	const [palette, setPalette] = useState<Array<{ primary: string; complement: string }>>([]);

	const canvasRef = useRef<HTMLCanvasElement>(null);

	const image = useMemo(() => new Image(source.width, source.height), [source]);
	image.src = source.url;
	image.crossOrigin = 'anonymous';

	console.log({ image });

	useEffect(() => {
		const scanImage = () => {
			const canvas = canvasRef.current;

			if (!canvas) {
				throw new Error('canvas not in document');
			}
			// canvas.width = source.width;
			// canvas.height = source.height;

			const ctx = canvas.getContext('2d');

			if (!ctx) throw new Error('could not get context');

			ctx.clearRect(0, 0, canvas.width, canvas.height);

			ctx.drawImage(image, 0, 0);

			console.log('getting image data...', image.src);

			const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);

			console.log({ imageData });

			const rgbArray = buildRgb(imageData.data);

			const quantColors = quantizeColor(rgbArray, 0);

			console.log({ quantColors });

			const paletteColors = buildPalette(quantColors);
			setPalette(paletteColors);
		};

		image.onload = scanImage;
	}, [image, source]);

	// const handleClick = () => {
	// 	if (palette.length > 0) {
	// 		const canvas = canvasRef.current!;
	// 		const ctx = canvas.getContext('2d')!;

	// 	}
	// };

	return (
		<>
			<canvas style={{ position: 'relative', filter: 'initial' }} width={300} height={300} ref={canvasRef} />
			{palette.length > 0 && (
				<Flex
					gap={3}
					style={{
						flexWrap: 'wrap',
					}}
				>
					{palette.map(p => (
						<div
							key={`${p.primary}-swatch`}
							style={{ height: '64px', width: '64px', backgroundColor: p.primary, color: p.complement }}
						>
							{p.primary}
						</div>
					))}
				</Flex>
			)}
		</>
	);
};

export default Palette;
