"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handler = void 0;
const sm_facade_1 = require("ts-core/dist/facades/aws/sm-facade");
const spotify_client_1 = require("../clients/spotify-client");
const save_and_update_current_playlist_1 = require("../services/save-and-update-current-playlist");
const ts_core_1 = require("ts-core");
exports.handler = async () => {
    const env = verifyEnv();
    console.log({ module: "current-playlist-updater", method: "handler", env });
    const clientIdSecret = await sm_facade_1.getSecretValue({ secretArn: env.HYPIFY_CLIENT_ID_SECRET_ARN });
    const clientSecretSecret = await sm_facade_1.getSecretValue({ secretArn: env.HYPIFY_CLIENT_SECRET_SECRET_ARN });
    const refreshTokenSecret = await sm_facade_1.getSecretValue({ secretArn: env.SPOTIFY_REFRESH_TOKEN_SECRET_ARN });
    const refreshTokenRes = await spotify_client_1.refreshToken({
        clientId: clientIdSecret.value,
        clientSecret: clientSecretSecret.value,
        refreshToken: refreshTokenSecret.value
    });
    await save_and_update_current_playlist_1.saveAndUpdateCurrentPlaylist({
        accessToken: refreshTokenRes.access_token,
        userId: env.USER_ID
    });
};
const verifyEnv = () => ({
    USER_ID: ts_core_1.verifyPropDefined(process.env, "USER_ID"),
    HYPIFY_CLIENT_ID_SECRET_ARN: ts_core_1.verifyPropDefined(process.env, "HYPIFY_CLIENT_ID_SECRET_ARN"),
    HYPIFY_CLIENT_SECRET_SECRET_ARN: ts_core_1.verifyPropDefined(process.env, "HYPIFY_CLIENT_SECRET_SECRET_ARN"),
    SPOTIFY_REFRESH_TOKEN_SECRET_ARN: ts_core_1.verifyPropDefined(process.env, "SPOTIFY_REFRESH_TOKEN_SECRET_ARN")
});
