const client_id = process.env.SPOTIFY_CLIENT_ID;
const client_secret = process.env.SPOTIFY_CLIENT_SECRET;

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
            const filtered = getFeaturedPlaylists(data.items);
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

/** 
 * From a list of playlists, returns playlists with the "rn" prefix,
 * or best-of-year playlists, which have a 4 digit name
 * */
const getFeaturedPlaylists = (playlists: Playlist[]) => {

    // TODO: this isn't working for "2022"
    // const exactlyFourDigits = new RegExp(/^202\d{1}$/g)

    return playlists.filter(p => {
        return p.name.slice(0,2) === 'rn'
    })
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