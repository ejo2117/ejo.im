import Link from 'next/link';
import { Caption, Flex } from '@/components/ui';
import { getMyPlaylists } from '@/lib/services/spotify';
import styles from './page.module.scss';

export default async function Playlists() {
	const playlists = await getMyPlaylists();

	return (
		<>
			<div className={styles.container}>
				{playlists.map((playlist, i) => {
					const number = parseInt(playlist.name.split(' - ')[0].split('rn')[1]);

					if (playlist.name.includes('rn') && (number < 10 || Number.isNaN(number))) {
						return null;
					}

					const season = playlist.name.split(' - ')[1];

					return (
						<Link
							key={playlist.id}
							href={playlist.uri}
							// href={`/playlists/${playlist.id}`}
							// onClick={() => setActive(i)}
						>
							<Flex column gap={2}>
								<img src={playlist.images?.[0].url} alt={`a cover image for playlist ${playlist.name}`} />
								<Caption>{season}</Caption>
							</Flex>
						</Link>
					);
				})}
			</div>
		</>
	);
}
