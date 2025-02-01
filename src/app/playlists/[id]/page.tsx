'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { Caption, Flex } from '@/components/ui';
import Palette from '@/components/Palette';

const Page = ({ params }: { params: { id: string } }) => {
	const [playlist, setPlaylist] = useState<Playlist>();

	useEffect(() => {
		const fetcher = async () => {
			const res = await fetch('/api/playlist', {
				method: 'POST',
				body: JSON.stringify({ id: params.id }),
				next: { revalidate: 3600 * 12 },
			});
			const { playlist } = await res.json();
			setPlaylist(playlist);
		};

		fetcher();
	}, [params.id]);

	if (!playlist) {
		return <div>Loading...</div>;
	}

	const cover = playlist.images[0];
	const coverSrc = cover.url;
	const season = playlist.name.split(' - ')[1];

	return (
		<Flex column>
			<Flex column gap={2} style={{ maxWidth: '300' }}>
				<img src={coverSrc} alt={`a cover image for playlist ${playlist.name}`} />
				<Caption>{season}</Caption>
			</Flex>
			<Palette source={cover} />
		</Flex>
	);
};

export default Page;
