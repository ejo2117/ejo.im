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
            const data: TokenErrorResponse | TokenSuccessResponse = await res.json();
            return data;
        } catch (error) {
            console.error(`Error parsing JSON: ${error}`)
        }
    
    } catch (error) {
        console.error(`Error fetching Token: ${error}`)    
    }
    
};