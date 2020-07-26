"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserPlaylists = void 0;
const source_1 = __importDefault(require("got/dist/source"));
exports.getUserPlaylists = async ({ accessToken, userId, limit, offset }) => {
    const queryParams = [...(limit ? [["limit", limit]] : [[]]), ...(offset ? [["offset", offset]] : [[]])]
        .filter((o) => !!o && o.length > 0)
        .map(([k, v]) => `${k}=${encodeURIComponent(v)}`)
        .join("&");
    const reqUrl = `https://api.spotify.com/v1/users/${userId}/playlists?${queryParams}`;
    const reqOpts = {
        responseType: "json",
        headers: {
            Authorization: `Bearer ${accessToken}`
        }
    };
    console.log({ module: "spotify-client", method: "getUserPlaylists", reqUrl, reqOpts });
    const res = await source_1.default.get(reqUrl, reqOpts);
    console.log({
        module: "spotify-client",
        method: "getUserPlaylists",
        resStatusCode: res.statusCode,
        resHeaders: res.headers,
        resBody: res.body
    });
    return res.body;
};
