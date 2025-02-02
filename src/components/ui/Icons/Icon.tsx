import React, { ReactNode } from 'react';
import * as AccessibleIcon from '@radix-ui/react-accessible-icon';
import styles from './Icon.module.scss';

type IconProps = {
	label: string;
	children: ReactNode;
};

const Icon = ({ label, children }: IconProps) => {
	return (
		<div className={styles.container}>
			<AccessibleIcon.Root label={label}>{children}</AccessibleIcon.Root>
		</div>
	);
};

export default Icon;
