/* eslint-disable @typescript-eslint/ban-ts-comment */
type RgbValue = {
	r: number;
	g: number;
	b: number;
};

type HslValue = {
	h: number;
	s: number;
	l: number;
};

/**
 * 	Given a one-dimensional array containing image data in RGBA order,
 *  as integers in the range 0 to 255, this function returns an array of RGB color objects.
 * */
export const buildRgb = (imageData: ImageData['data']) => {
	const rgbValues: RgbValue[] = [];
	for (let i = 0; i < imageData.length; i += 4) {
		const rgb = {
			r: imageData[i],
			g: imageData[i + 1],
			b: imageData[i + 2],
		};
		rgbValues.push(rgb);
	}
	return rgbValues;
};

const findBiggestColorRange = (rgbValues: RgbValue[]) => {
	let rMin = Number.MAX_VALUE;
	let gMin = Number.MAX_VALUE;
	let bMin = Number.MAX_VALUE;

	let rMax = Number.MIN_VALUE;
	let gMax = Number.MIN_VALUE;
	let bMax = Number.MIN_VALUE;

	rgbValues.forEach(pixel => {
		rMin = Math.min(rMin, pixel.r);
		gMin = Math.min(rMin, pixel.g);
		bMin = Math.min(rMin, pixel.b);

		rMax = Math.max(rMin, pixel.r);
		gMax = Math.max(rMin, pixel.g);
		bMax = Math.max(rMin, pixel.b);
	});

	const rRange = rMax - rMin;
	const gRange = gMax - gMin;
	const bRange = bMax - bMin;

	const biggestRange = Math.max(rRange, gRange, bRange);
	switch (biggestRange) {
		case rRange:
			return 'r';
		case gRange:
			return 'g';
		case bRange:
			return 'b';
		default:
			return 'r';
	}
};

/**
 * 	Uses the [median-cut](https://en.wikipedia.org/wiki/Median_cut) algorithm
 */
export const quantizeColor = (rgbValues: RgbValue[], depth: number): RgbValue[] => {
	const MAX_DEPTH = 5;
	if (depth === MAX_DEPTH || rgbValues.length === 0) {
		const color = rgbValues.reduce(
			(prev, curr) => {
				prev.r += curr.r;
				prev.g += curr.g;
				prev.b += curr.b;

				return prev;
			},
			{
				r: 0,
				g: 0,
				b: 0,
			}
		);
		color.r = Math.round(color.r / rgbValues.length);
		color.g = Math.round(color.g / rgbValues.length);
		color.b = Math.round(color.b / rgbValues.length);
		return [color];
	}

	// Find the color channel with the biggest range
	const channelToSortBy = findBiggestColorRange(rgbValues);

	// Sort pixels by that channel
	rgbValues.sort((a, b) => a[channelToSortBy] - b[channelToSortBy]);

	// Divide the list in half
	const mid = rgbValues.length / 2;

	// Repeat the process for each half until we have the desired number of colors
	// eslint-disable-next-line prettier/prettier
	return [
		...quantizeColor(rgbValues.slice(0, mid), depth + 1),
		...quantizeColor(rgbValues.slice(mid + 1), depth + 1),
	]

};

const rgbComponentToHexComponent = (c: number) => {
	const hex = c.toString(16);
	return hex.length === 1 ? `0${hex}` : hex;
};

const rgbToHex = ({ r, g, b }: RgbValue) => {
	return ('#' + rgbComponentToHexComponent(r) + rgbComponentToHexComponent(g) + rgbComponentToHexComponent(b)).toUpperCase();
};

/**
 * Convert HSL to Hex
 * this entire formula can be found in stackoverflow, credits to @icl7126 !!!
 * https://stackoverflow.com/a/44134328/17150245
 */
const hslToHex = (hslColor: HslValue) => {
	const hslColorCopy = { ...hslColor };
	hslColorCopy.l /= 100;
	const a = (hslColorCopy.s * Math.min(hslColorCopy.l, 1 - hslColorCopy.l)) / 100;
	const f = (n: number) => {
		const k = (n + hslColorCopy.h / 30) % 12;
		const color = hslColorCopy.l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
		return Math.round(255 * color)
			.toString(16)
			.padStart(2, '0');
	};

	return `#${f(0)}${f(8)}${f(4)}`.toUpperCase();
};

/**
 * Convert RGB values to HSL
 * This formula can be
 * found here https://www.niwa.nu/2013/05/math-behind-colorspace-conversions-rgb-hsl/
 */
const convertRGBtoHSL = (rgbValues: RgbValue[]) => {
	return rgbValues.map(pixel => {
		let hue = 0;
		let saturation = 0;
		let luminance = 0;

		// change range from 0-255 to 0-1
		const redOpposite = pixel.r / 255;
		const greenOpposite = pixel.g / 255;
		const blueOpposite = pixel.b / 255;

		const Cmax = Math.max(redOpposite, greenOpposite, blueOpposite);
		const Cmin = Math.min(redOpposite, greenOpposite, blueOpposite);

		const difference = Cmax - Cmin;

		luminance = (Cmax + Cmin) / 2.0;

		if (luminance <= 0.5) {
			saturation = difference / (Cmax + Cmin);
		} else if (luminance >= 0.5) {
			saturation = difference / (2.0 - Cmax + Cmin);
		}

		/*
		 *   If Red is max,   then Hue = (G-B)/(max-min)
		 *   If Green is max, then Hue = 2.0 + (B-R)/(max-min)
		 *   If Blue is max,  then Hue = 4.0 + (R-G)/(max-min)
		 */

		const maxColorValue = Math.max(pixel.r, pixel.g, pixel.b);
		if (maxColorValue === pixel.r) {
			hue = (greenOpposite - blueOpposite) / difference;
		} else if (maxColorValue === pixel.g) {
			hue = 2.0 + (blueOpposite - redOpposite) / difference;
		} else {
			hue = 4.0 + (greenOpposite - blueOpposite) / difference;
		}

		hue = hue * 60; // find the sector of 60 degrees to which the color belongs

		// it should always be a positive angle
		if (hue < 0) {
			hue = hue + 360;
		}

		// when all three of R,G,B are equal, we get a neutral color: white, grey, or black
		if (difference === 0) {
			return false;
		}

		return {
			h: Math.round(hue) + 180,
			s: parseFloat(saturation * 100).toFixed(2),
			l: parseFloat(luminance * 100).toFixed(2),
		};
	});
};

/**
 * Using relative luminance we order the brightness of the colors
 * the fixed values and further explanation about this topic
 * can be found here -> https://en.wikipedia.org/wiki/Luma_(video)
 */
const orderByLuminance = (rgbValues: RgbValue[]) => {
	const calculateLuminance = (p: RgbValue) => {
		return 0.2126 * p.r + 0.7152 * p.g + 0.0722 * p.b;
	};

	return rgbValues.sort((a, b) => calculateLuminance(b) - calculateLuminance(a));
};

/**
 * Calculate the color distance or difference between 2 colors
 *
 * further explanation of this topic
 * can be found here -> https://en.wikipedia.org/wiki/Euclidean_distance
 * note: this method is not accuarate for better results use Delta-E distance metric.
 */
const calculateColorDifference = (color1: RgbValue, color2: RgbValue) => {
	const rDifference = Math.pow(color2.r - color1.r, 2);
	const gDifference = Math.pow(color2.g - color1.g, 2);
	const bDifference = Math.pow(color2.b - color1.b, 2);

	return rDifference + gDifference + bDifference;
};

export const buildPalette = (colorList: RgbValue[]) => {
	const result = [];

	const orderedByColor = orderByLuminance(colorList);
	const hslColors = convertRGBtoHSL(orderedByColor);

	for (let i = 0; i < orderedByColor.length; i++) {
		const hexColor = rgbToHex(orderedByColor[i]);
		// @ts-ignore
		const hexColorComplementary = hslToHex(hslColors[i]);

		if (i > 0) {
			const difference = calculateColorDifference(orderedByColor[i], orderedByColor[i - 1]);

			// if the distance is less than 120 we omit that color
			if (difference < 120) {
				continue;
			}
		}

		result.push({
			primary: hexColor,
			complement: `hsl(${hslColors[i].h}, ${hslColors[i].s}%, ${hslColors[i].l}%)`,
		});
	}

	return result;
};
