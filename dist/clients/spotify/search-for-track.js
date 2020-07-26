"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.searchForTrack = void 0;
const source_1 = __importDefault(require("got/dist/source"));
exports.searchForTrack = async ({ accessToken, artist, title }) => {
    const query = `artist:${artist} track:${title}`;
    const reqUrl = `https://api.spotify.com/v1/search?q=${encodeURIComponent(query)}&type=track&limit=1`;
    const reqOpts = {
        responseType: "json",
        headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json"
        }
    };
    console.log({ module: "spotify-client", method: "searchForTrack", reqUrl, reqOpts });
    const res = await source_1.default.get(reqUrl, reqOpts);
    console.log({
        module: "spotify-client",
        method: "searchForTrack",
        resStatusCode: res.statusCode,
        resHeaders: res.headers,
        resBody: res.body
    });
    return res.body;
};
