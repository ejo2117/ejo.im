import { Caption, Container } from "@/components/ui";
import { getMyPlaylists } from "@/lib/services/spotify";
import Link from "next/link";

export default async function Playlists() {

    const playlists = await getMyPlaylists();

    return (
        <ul>
            {playlists.map(playlist => {
                return (
                    <li key={playlist.id}>
                        <Link href={`/playlists/${playlist.id}`}>
                            <Caption>{playlist.name}</Caption>
                        </Link>
                    </li>
                )
            })}
        </ul>
    )
}