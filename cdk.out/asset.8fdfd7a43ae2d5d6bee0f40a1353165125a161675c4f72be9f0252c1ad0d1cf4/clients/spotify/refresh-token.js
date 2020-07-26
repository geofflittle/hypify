"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.refreshToken = void 0;
const source_1 = __importDefault(require("got/dist/source"));
exports.refreshToken = async ({ clientId, clientSecret, refreshToken }) => {
    const reqUrl = "https://accounts.spotify.com/api/token";
    const reqOpts = {
        responseType: "json",
        headers: {
            Authorization: `Basic ${Buffer.from([clientId, clientSecret].join(":")).toString("base64")}`
        },
        form: {
            grant_type: "refresh_token",
            refresh_token: refreshToken
        }
    };
    console.log({ module: "spotify-client", method: "refreshToken", reqUrl, reqOpts });
    const res = await source_1.default.post(reqUrl, reqOpts);
    console.log({
        module: "spotify-client",
        method: "refreshToken",
        resStatusCode: res.statusCode,
        resHeaders: res.headers,
        resBody: res.body
    });
    return res.body;
};
