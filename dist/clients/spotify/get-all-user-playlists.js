"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllUserPlaylists = void 0;
const get_user_playlists_1 = require("./get-user-playlists");
exports.getAllUserPlaylists = async ({ accessToken, userId }) => {
    const limit = 50;
    let offset = 0;
    let next;
    const playlists = [];
    do {
        const res = await get_user_playlists_1.getUserPlaylists({ accessToken, userId, limit, offset });
        playlists.push(...res.items);
        next = res.next;
        offset += limit;
    } while (next);
    return playlists;
};
