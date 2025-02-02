import React, { FC, forwardRef } from 'react';
import cn from 'classnames';
import Balancer from 'react-wrap-balancer';
import styles from './Label.module.scss';

/**
 *  Label
 *
 * @default
 * - Size: 1.2rem
 * - Weight: 400
 * - Height: 1.4rem
 * - Family: Inter
 */
const Label: FC<TypographyProps<HTMLSpanElement>> = forwardRef(
	({ children, style, className, withBalancer = false, bold, light, ...rest }, forwardedRef) => {
		const classes = cn(styles.default, { [styles.bold]: bold }, { [styles.light]: light }, className);

		return (
			<span
				className={classes}
				ref={forwardedRef}
				style={{
					...style,
				}}
				{...rest}
			>
				{withBalancer ? <Balancer>{children}</Balancer> : children}
			</span>
		);
	}
);

Label.displayName = 'Label';

export default Label;
