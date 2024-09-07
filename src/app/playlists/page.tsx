import { Caption, Container } from "@/components/ui";
import { getMyPlaylists } from "@/lib/services/spotify";

export default async function Playlists() {

    const playlists = await getMyPlaylists();


    return (
        <Container>
            {playlists.map(playlist => {
                return <Caption key={playlist.id}>{playlist.name}</Caption>
            })}
        </Container>
    )
}