"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAccessToken = void 0;
const source_1 = __importDefault(require("got/dist/source"));
exports.getAccessToken = async ({ clientId, clientSecret, code, redirectUri }) => {
    const reqUrl = "https://accounts.spotify.com/api/token";
    const reqOpts = {
        responseType: "json",
        headers: {
            Authorization: `Basic ${Buffer.from([clientId, clientSecret].join(":")).toString("base64")}`
        },
        form: {
            grant_type: "authorization_code",
            code: code,
            redirect_uri: redirectUri
        }
    };
    console.log({ module: "spotify-client", method: "getAccessToken", reqUrl, reqOpts });
    const res = await source_1.default.post(reqUrl, reqOpts);
    console.log({
        module: "spotify-client",
        method: "getAccessToken",
        resStatusCode: res.statusCode,
        resHeaders: res.headers,
        resBody: res.body
    });
    return res.body;
};
