"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.addItemsToPlaylist = void 0;
const source_1 = __importDefault(require("got/dist/source"));
exports.addItemsToPlaylist = async ({ accessToken, playlistId, trackUris }) => {
    const reqUrl = `https://api.spotify.com/v1/playlists/${playlistId}/tracks`;
    const reqOpts = {
        responseType: "json",
        headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ uris: trackUris })
    };
    console.log({ module: "spotify-client", method: "addItemsToPlaylist", reqUrl, reqOpts });
    const res = await source_1.default.post(reqUrl, reqOpts);
    console.log({
        module: "spotify-client",
        method: "addItemsToPlaylist",
        resStatusCode: res.statusCode,
        resHeaders: res.headers,
        resBody: res.body
    });
    return res.body;
};
