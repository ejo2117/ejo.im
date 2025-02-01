// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { getMyPlaylists, getPlaylist } from '@/lib/services/spotify';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	const { id: playlistId } = JSON.parse(req.body);

	const playlistResponse = await getPlaylist(playlistId);

	if (typeof playlistResponse.error === 'string') {
		res.status(500).json(playlistResponse);
	}

	res.status(200).json({ playlist: playlistResponse.data });
}
