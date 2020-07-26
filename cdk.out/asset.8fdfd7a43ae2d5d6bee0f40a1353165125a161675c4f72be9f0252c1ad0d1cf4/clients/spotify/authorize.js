"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authorize = void 0;
const source_1 = __importDefault(require("got/dist/source"));
exports.authorize = async ({ clientId, redirectUri, scopes }) => {
    const queryParams = [
        ["client_id", clientId],
        ["response_type", "code"],
        ["redirect_uri", redirectUri],
        ...(scopes ? [["scope", scopes.join(" ")]] : [[]])
    ]
        .map(([k, v]) => `${k}=${encodeURIComponent(v)}`)
        .join("&");
    const reqUrl = `https://accounts.spotify.com/authorize?${queryParams}`;
    const reqOpts = {
        followRedirect: false
    };
    console.log({ module: "spotify-client", method: "authorize", reqUrl, reqOpts });
    const res = await source_1.default.get(reqUrl, reqOpts);
    console.log({
        module: "spotify-client",
        method: "authorize",
        resStatusCode: res.statusCode,
        resHeaders: res.headers,
        resBody: res.body
    });
    if (!res.headers.location) {
        throw new Error("No location");
    }
    return {
        location: res.headers.location
    };
};
