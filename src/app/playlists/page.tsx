import { Caption, Container, Flex } from "@/components/ui";
import { getMyPlaylists } from "@/lib/services/spotify";
import Link from "next/link";
import styles from './page.module.scss'

export default async function Playlists() {

    const playlists = await getMyPlaylists();

    return (
        <div className={styles.container}>
            {playlists.map(playlist => {

                const number = parseInt(playlist.name.split(' - ')[0].split('rn')[1])

                if (number < 10 || Number.isNaN(number)) {
                    return null;
                }

                return (
                        <Link key={playlist.id} href={`${playlist.uri}`}>
                            <Flex column gap={2} >
                                <img src={playlist.images[0].url}/>
                                <Caption>{playlist.name}</Caption>
                            </Flex>
                        </Link>
                )
            })}
        </div>
    )
}