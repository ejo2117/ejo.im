import React, { FC, forwardRef } from 'react';
import cn from 'classnames';
import Balancer from 'react-wrap-balancer';
import styles from './Title.module.scss';

/**
 *  Title
 *
 * @default
 * - Size: 1.8rem
 * - Weight: 600
 * - Height: 2.2rem
 * - Family: Inter
 */
const Title: FC<TypographyProps<HTMLParagraphElement>> = forwardRef(
	({ children, style, className, withBalancer = false, bold, ...rest }, forwardedRef) => {
		const classes = cn(styles.default, { [styles.bold]: bold }, className);

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

Title.displayName = 'Title';

export default Title;
