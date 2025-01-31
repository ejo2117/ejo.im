// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { getMyPlaylists } from '@/lib/services/spotify';
import type { NextApiRequest, NextApiResponse } from 'next';

type Data = {
	playlists: Playlist[];
};

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
	const playlists = await getMyPlaylists();

	res.status(200).json({ playlists: playlists });
}
