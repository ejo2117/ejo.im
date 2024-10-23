import React, { FC, forwardRef } from 'react';
import cn from 'classnames';
import Balancer from 'react-wrap-balancer';
import styles from './Body.module.scss';

/**
 *  Body
 *
 * @default
 * - Size: 1.6rem
 * - Weight: 400
 * - Height: 2.4rem
 * - Family: Inter
 */
const Body: FC<TypographyProps<HTMLParagraphElement>> = forwardRef(
	({ children, style, className, withBalancer = false, bold, italic, large, ...rest }, forwardedRef) => {
		const classes = cn(
			styles.default,
			{ [styles.bold]: bold },
			{ [styles.italic]: italic },
			{ [styles.large]: large },
			className
		);

		return (
			<p
				className={classes}
				ref={forwardedRef}
				style={{
					...style,
				}}
				{...rest}
			>
				{withBalancer ? <Balancer>{children}</Balancer> : children}
			</p>
		);
	}
);

Body.displayName = 'Body';

export default Body;
