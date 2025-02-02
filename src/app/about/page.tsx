import Link from 'next/link';
import { Caption, Container } from '@/components/ui';
import { getCrosswordData, NytStatsResponse } from '@/lib/services/getCrosswordData';
import styles from './page.module.scss';

function parseCrosswordData(data: NytStatsResponse | undefined) {
	if (typeof data === 'undefined') {
		return '.';
	}

	if (data.results.streaks.current_streak === 0) {
		return " (although I haven't completed today's puzzle yet).";
	}

	return `. I'm on a ${data.results.streaks.current_streak} day streak!`;
}

export default async function About() {
	const data = await getCrosswordData();

	const message = parseCrosswordData(data);

	return (
		<Container className={styles.container}>
			<Caption>
				Hey! I&apos;m a software engineer based in Los Angeles, currently building MES applications at{' '}
				<Link href={'https://rivian.com'} target='_blank' rel='noreferrer noopener'>
					Rivian
				</Link>
				.<br />
				<br />
				In the past, I led the development of multiple of E&#8288;-&#8288;Commerce applications as the founding engineer at{' '}
				<Link href={'https://paireyewear.com'} target='_blank' rel='noreferrer noopener'>
					Pair Eyewear
				</Link>
				. Before that, I did freelance design and development work as part of{' '}
				<Link href={'https://sight.nyc'} target='_blank' rel='noreferrer noopener'>
					Sight
				</Link>
				, an indie design studio based in Brooklyn.
				<br />
				<br /> In my own time, I&apos;m passionate about a variety of topics including creative coding, creating and discussing
				music, and the NYT Crossword{message}
			</Caption>
		</Container>
	);
}
