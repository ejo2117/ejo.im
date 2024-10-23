import { useState, useEffect } from 'react';

/*
 * Note: This hook could be affected by the browser.
 * For example, for Safari the window dimensions are not accurate.
 * Safari takes the width of the scroll bar into account, while Chrome does not.
 */
function getWindowDimensions() {
	if (typeof window === 'undefined') {
		return {
			width: 0,
			height: 0,
		};
	}
	const { width = 0, height = 0 } = window.visualViewport ?? {};
	return {
		width,
		height,
	};
}

export default function useWindowDimensions() {
	const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());

	useEffect(() => {
		function handleResize() {
			setWindowDimensions(getWindowDimensions());
		}
		window.addEventListener('resize', handleResize);
		return () => {
			window.removeEventListener('resize', handleResize);
		};
	}, []);

	return windowDimensions;
}
