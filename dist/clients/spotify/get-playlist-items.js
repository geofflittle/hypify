"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPlaylistItems = void 0;
const source_1 = __importDefault(require("got/dist/source"));
exports.getPlaylistItems = async ({ accessToken, playlistId }) => {
    const reqUrl = `https://api.spotify.com/v1/playlists/${playlistId}/tracks`;
    const reqOpts = {
        responseType: "json",
        headers: {
            Authorization: `Bearer ${accessToken}`
        }
    };
    console.log({ module: "spotify-client", method: "getPlaylistItems", reqUrl, reqOpts });
    const res = await source_1.default.get(reqUrl, reqOpts);
    console.log({
        module: "spotify-client",
        method: "getPlaylistItems",
        resStatusCode: res.statusCode,
        resHeaders: res.headers,
        resBody: res.body
    });
    return res.body;
};
