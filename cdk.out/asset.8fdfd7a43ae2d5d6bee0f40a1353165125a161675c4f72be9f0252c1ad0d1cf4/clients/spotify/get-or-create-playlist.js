"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getOrCreatePlaylist = void 0;
const create_playlist_1 = require("./create-playlist");
const get_all_user_playlists_1 = require("./get-all-user-playlists");
exports.getOrCreatePlaylist = async ({ accessToken, userId, playlistName }) => {
    const playlists = await get_all_user_playlists_1.getAllUserPlaylists({
        accessToken,
        userId
    });
    const found = (playlists || []).find((playlist) => playlist.name == playlistName);
    if (found) {
        return found;
    }
    return await create_playlist_1.createPlaylist({ accessToken, userId, playlistName });
};
