'use client';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { Caption, Container, Flex } from '@/components/ui';
import { getMyPlaylists } from '@/lib/services/spotify';
import Palette from '@/components/Palette';
import styles from './page.module.scss';

export default function Playlists() {
	const [playlists, setPlaylists] = useState<Playlist[]>([]);

	const [active, setActive] = useState(19);

	useEffect(() => {
		const fetcher = async () => {
			const res = await fetch('/api/playlists');
			const { playlists } = await res.json();
			setPlaylists(playlists);
		};

		fetcher();
	}, []);

	return (
		<>
			{/* {playlists.length > 0 && <Palette source={playlists[active].images[0]} />} */}
			<div className={styles.container}>
				{playlists.map((playlist, i) => {
					const number = parseInt(playlist.name.split(' - ')[0].split('rn')[1]);

					if (playlist.name.includes('rn') && (number < 10 || Number.isNaN(number))) {
						return null;
					}

					const season = playlist.name.split(' - ')[1];

					return (
						<div
							key={playlist.id}
							// href={`${playlist.uri}`}
							onClick={() => setActive(i)}
						>
							<Flex column gap={2}>
								<img src={playlist.images?.[0].url} alt={`a cover image for playlist ${playlist.name}`} />
								<Caption>{season}</Caption>
							</Flex>
						</div>
					);
				})}
			</div>
		</>
	);
}
