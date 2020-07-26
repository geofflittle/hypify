"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeItemsFromPlaylist = void 0;
const source_1 = __importDefault(require("got/dist/source"));
exports.removeItemsFromPlaylist = async ({ accessToken, playlistId, trackUris }) => {
    const reqUrl = `https://api.spotify.com/v1/playlists/${playlistId}/tracks`;
    const reqOpts = {
        responseType: "json",
        headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ tracks: trackUris.map((trackUri) => ({ uri: trackUri })) })
    };
    console.log({ module: "spotify-client", method: "removeItemsFromPlaylist", reqUrl, reqOpts });
    const res = await source_1.default.delete(reqUrl, reqOpts);
    console.log({
        module: "spotify-client",
        method: "removeItemsFromPlaylist",
        resStatusCode: res.statusCode,
        resHeaders: res.headers,
        resBody: res.body
    });
    return res.body;
};
