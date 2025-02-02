'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';
import { motion } from 'motion/react';
import { Caption, Flex, Heading, Spacer, Title } from './ui';
import styles from './NavBar.module.scss';

const PATHS = [
	['/', 'Home'],
	['/about', 'About'],
	['/experience', 'Experience'],
	['/playlists', 'Playlists'],
] as const;

const NavBar = ({ ...rest }) => {
	const pathname = usePathname();

	return (
		<nav className={styles.container} {...rest}>
			<Title>Ethan O&apos;Neal</Title>
			<Spacer size={0.4} />
			<div className={styles.links}>
				{PATHS.map(([href, name]) => {
					const isCurrentPage = pathname === href;
					return (
						<Link key={href} href={href} className={isCurrentPage ? styles.selected : ''}>
							<Caption>{name}</Caption>
							{/* {pathname === href && (
                <motion.div
                  className={styles.underline}
                  layoutId="underline"
                ></motion.div>
              )} */}
						</Link>
					);
				})}
			</div>
		</nav>
	);
};

export default NavBar;
