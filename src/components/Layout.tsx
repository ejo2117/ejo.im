'use client';
import { Inter } from 'next/font/google';
import cn from 'classnames';
import { usePathname } from 'next/navigation';
import NavBar from '@/components/NavBar';
import styles from './Layout.module.scss';

const inter = Inter({ subsets: ['latin'] });

const CENTERED_PATHS = ['/', '/playlists'];

export function OffsetLayout({ children }: { children: React.ReactNode }) {
	const classes = cn(styles.main, inter.className);

	return (
		<html lang='en'>
			<body>
				<main className={classes}>
					<section className={styles.frame}>
						<div className={styles.view}>
							<NavBar />
							<div className={styles.content}>{children}</div>
						</div>
					</section>
				</main>
			</body>
		</html>
	);
}

export function CenteredLayout({ children }: { children: React.ReactNode }) {
	const pathname = usePathname() || '';
	const classes = cn(styles.main, inter.className);
	const viewClass = styles[`view${CENTERED_PATHS.includes(pathname) ? 'Centered' : ''}`];
	const contentClass = styles[`content${CENTERED_PATHS.includes(pathname) ? 'Centered' : ''}`];

	return (
		<html lang='en'>
			<body>
				<main className={classes}>
					<section className={styles.frame}>
						<div className={viewClass}>
							<NavBar />
							<div className={contentClass}>{children}</div>
						</div>
					</section>
				</main>
			</body>
		</html>
	);
}
