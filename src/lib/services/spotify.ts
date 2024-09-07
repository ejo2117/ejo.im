const client_id = process.env.SPOTIFY_CLIENT_ID;
const client_secret = process.env.SPOTIFY_CLIENT_SECRET;

type TokenErrorResponse = {
    failed: true;
    error: string;
    error_description: string;
}

type TokenSuccessResponse = {
    failed: false;
    access_token: string;
    token_type: string;
    expires_in: number;
}

type TokenResponse = TokenErrorResponse | TokenSuccessResponse;

type UserPlaylistsSuccessResponse = {
    failed: false
    data: UserPlaylists['items'];
}

type UserPlaylists = {
    href: string;
    limit: number;
    next: string;
    offset: number;
    previous: string;
    total: number;
    items: Array<Playlist>
}

type UserPlaylistsErrorResponse = {
    failed: true
    error: string;
}

type UserPlaylistsResponse = UserPlaylistsErrorResponse | UserPlaylistsSuccessResponse;

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

export const getSpotifyAccessToken = async (): Promise<TokenResponse> => {
    try {
        const res = await fetch('https://accounts.spotify.com/api/token', {
            'method': 'POST',
            'headers': {
                'Authorization': 'Basic ' + (Buffer.from(client_id + ':' + client_secret).toString('base64')),
                'Content-Type': 'application/x-www-form-urlencoded' 
            },
            'body': new URLSearchParams({
                'grant_type': 'client_credentials'
            })
        });

        try {
            const data = await res.json();

            if(Object.hasOwn(data, 'error')) {
                data.failed = true;
                return data;
            }

            data.failed = false;
            return data;
        } catch (error) {            
            return {
                failed: true,
                error: 'User error.',
                error_description: `Error parsing JSON: ${error}`, 
            };
        }
    
    } catch (error) {
        return {
            failed: true,
            error: 'User error.',
            error_description: `Error parsing JSON: ${error}`, 
        };
    }
    
};

export const getUserPlaylists = async (userId: string, authToken: string): Promise<UserPlaylistsResponse> => {
    
    if (!userId) {
        return {
            failed: true,
            error: 'No User Id provided.'
        };
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
            const data: UserPlaylists = await res.json();
            const filtered = getRnPlaylists(data.items);
            return {
                failed: false,
                data: filtered
            }
        } catch (error) {
            return {
                failed: true,
                error: `Error parsing JSON: ${error}` 
            };
        }
    } catch (error) {
        return {
            failed: true,
            error: `Error fetching Playlists: ${error}` 
        };
    }

}

/** Returns playlists with the "rn" prefix from a list of playlists */
const getRnPlaylists = (playlists: Playlist[]) => {
    return playlists.filter(p => p.name.slice(0,2) === 'rn')
}


export const getMyPlaylists = async () => {
 
    const tokenResponse = await getSpotifyAccessToken();

    if (tokenResponse.failed) {
       // handle token error 
       return []
    }

    const playlistsResponse = await getUserPlaylists(process.env.SPOTIFY_USER_ID!, tokenResponse.access_token)

    if (playlistsResponse.failed) {
        // handle playlist error
        return []
    }

    return playlistsResponse.data
}