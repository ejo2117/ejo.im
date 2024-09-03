const client_id = process.env.SPOTIFY_CLIENT_ID;
const client_secret = process.env.SPOTIFY_CLIENT_SECRET;

const authOptions = {
    url: 'https://accounts.spotify.com/api/token',
    headers: {
        'Authorization': 'Basic ' + (new Buffer.from(client_id + ':' + client_secret).toString('base64'))
    },
    form: {
        grant_type: 'client_credentials'
    },
    json: true
};

type TokenErrorResponse = {
    error: string;
    error_description: string;
}

type TokenSuccessResponse = {
    access_token: string;
    token_type: string;
    expires_in: number;
}

type UserPlaylistsResponse = {
    href: string;
    limit: number;
    next: string;
    offset: number;
    previous: string;
    total: number;
    items: Array<Playlist>
}

type Playlist = {
    collaborative: boolean;
    description: string;
    external_urls: {
        spotify: string;
    };
    href: string;
    id: string;
    images: Array<{
        url: string;
        height: number;
        width: number;
    }>;
    name: string;
    owner: {
        external_urls: {
            spotify: string;
        };
        followers: {
            href: string;
            total: number;
        };
        href: string;
        id: string;
        type: string;
        uri: string;
        display_name: string;
    };
    public: boolean;
    snapshot_id: string;
    tracks: {
        href: string;
        total: 0;
    };
    type: string;
    uri: string;
}

export const getSpotifyAccessToken = async () => {
    try {
        const res = await fetch('https://accounts.spotify.com/api/token', {
            'method': 'POST',
            'headers': {
                'Authorization': 'Basic ' + (new Buffer.from(client_id + ':' + client_secret).toString('base64')),
                'Content-Type': 'application/x-www-form-urlencoded' 
            },
            'body': new URLSearchParams({
                'grant_type': 'client_credentials'
            })
        });

        try {
            const data: TokenSuccessResponse = await res.json();
            return data;
        } catch (error) {
            console.error(`Error parsing JSON: ${error}`)
            return {} as TokenSuccessResponse
        }
    
    } catch (error) {
        console.error(`Error fetching Token: ${error}`)
        return {} as TokenSuccessResponse
    }
    
};

export const getUserPlaylists = async (userId: string, authToken: string) => {
    if (!userId) {
        return null
    }

    const endpoint = `https://api.spotify.com/v1/users/${userId}/playlists`

    try {
        const res = await fetch(endpoint, {
            'method': 'GET',
            'headers': {
                'Authorization': `Bearer ${authToken}`,
            } 
        })

        try {
            const data: UserPlaylistsResponse = await res.json();
            return getRnPlaylists(data.items);
        } catch (error) {
            console.error(`Error parsing JSON: ${error}`)    
        }
    } catch (error) {
        console.error(`Error fetching Playlists: ${error}`)     
    }

}


const getRnPlaylists = (playlists: Playlist[]) => {
    return playlists.filter(p => p.name.slice(0,2) === 'rn')
}