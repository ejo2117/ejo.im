type TokenErrorResponse = {
	failed: true;
	error: string;
	error_description: string;
};

type TokenSuccessResponse = {
	failed: false;
	access_token: string;
	token_type: string;
	expires_in: number;
};

type TokenResponse = TokenErrorResponse | TokenSuccessResponse;

type UserPlaylistsSuccessResponse = {
	failed: false;
	data: UserPlaylists['items'];
};

type UserPlaylists = {
	href: string;
	limit: number;
	next: string;
	offset: number;
	previous: string;
	total: number;
	items: Array<Playlist>;
};

type UserPlaylistsErrorResponse = {
	failed: true;
	error: string;
};

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
};
