const clientId = '67948dda46f94739882afa25c610facd';
const redirectUri = 'http://localhost:3000/';
const spotifyAccountsUrl = 'https://accounts.spotify.com/authorize';

let accessToken;

const Spotify = {

    getAccessToken() {
        if (accessToken) {
            return accessToken;
        }

        const accessTokenMatch = window.location.href.match(/access_token=([^&]*)/);
        const expiresInMatch = window.location.href.match(/expires_in=([^&]*)/);

        if (accessTokenMatch && expiresInMatch) {
            accessToken = accessTokenMatch[1];
            const expiresIn = Number(expiresInMatch[1]);
            window.setTimeout(() => accessToken = '', expiresIn * 1000);
            window.history.pushState('Access Token', null, '/');
            return accessToken;
        } else {
            const scope = 'user-read-private user-read-email playlist-modify-public';
            window.location = `${spotifyAccountsUrl}?client_id=${clientId}&response_type=token&scope=${encodeURIComponent(scope)}&redirect_uri=${encodeURIComponent(redirectUri)}`;
        }
    },

    async search(term) {
        const accessToken = Spotify.getAccessToken();
        const response = await fetch(`https://api.spotify.com/v1/search?type=track&q=${encodeURIComponent(term)}`, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        });
        const jsonResponse = await response.json();
        if (!jsonResponse.tracks) {
            return [];
        }
        return jsonResponse.tracks.items.map(track => ({
            id: track.id,
            name: track.name,
            artist: track.artists[0].name,
            album: track.album.name,
            uri: track.uri
        }));
    },

    async getUserID() {
        const accessToken = this.getAccessToken();
        const headers = {Authorization: `Bearer ${accessToken}`};
        const response = await fetch('https://api.spotify.com/v1/me', {headers: headers});
        const jsonResponse = await response.json();
        return jsonResponse.id;
    },

    async createPlaylist(userID, name) {
        const accessToken = this.getAccessToken();
        const headers = {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json'
        };
        const body = JSON.stringify({name: name});
        const response = await fetch(`https://api.spotify.com/v1/users/${userID}/playlists`, {
            headers: headers,
            method: 'POST',
            body: body
        });
        const jsonResponse = await response.json();
        return jsonResponse.id;
    },

    async addTracksToPlaylist(playlistID, trackURIs) {
        const accessToken = this.getAccessToken();
        const headers = {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json'
        };
        const body = JSON.stringify({uris: trackURIs});
        await fetch(`https://api.spotify.com/v1/playlists/${playlistID}/tracks`, {
            headers: headers,
            method: 'POST',
            body: body
        });
    },

}

export default Spotify;

