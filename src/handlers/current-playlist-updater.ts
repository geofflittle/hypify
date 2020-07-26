import { ScheduledHandler } from "aws-lambda"
import { getSecretValue } from "ts-core/dist/facades/aws/sm-facade"
import { refreshToken } from "../clients/spotify-client"
import { saveAndUpdateCurrentPlaylist } from "../services/save-and-update-current-playlist"
import { verifyPropDefined } from "ts-core"

export const handler: ScheduledHandler = async () => {
    const env = verifyEnv()
    console.log({ module: "current-playlist-updater", method: "handler", env })
    const clientIdSecret = await getSecretValue({ secretArn: env.HYPIFY_CLIENT_ID_SECRET_ARN })
    const clientSecretSecret = await getSecretValue({ secretArn: env.HYPIFY_CLIENT_SECRET_SECRET_ARN })
    const refreshTokenSecret = await getSecretValue({ secretArn: env.SPOTIFY_REFRESH_TOKEN_SECRET_ARN })
    const refreshTokenRes = await refreshToken({
        clientId: clientIdSecret.value,
        clientSecret: clientSecretSecret.value,
        refreshToken: refreshTokenSecret.value
    })
    await saveAndUpdateCurrentPlaylist({
        accessToken: refreshTokenRes.access_token,
        userId: env.USER_ID
    })
}

export interface CurrentPlaylistUpdaterEnv {
    USER_ID: string
    HYPIFY_CLIENT_ID_SECRET_ARN: string
    HYPIFY_CLIENT_SECRET_SECRET_ARN: string
    SPOTIFY_REFRESH_TOKEN_SECRET_ARN: string
}

const verifyEnv = (): CurrentPlaylistUpdaterEnv => ({
    USER_ID: verifyPropDefined(process.env, "USER_ID"),
    HYPIFY_CLIENT_ID_SECRET_ARN: verifyPropDefined(process.env, "HYPIFY_CLIENT_ID_SECRET_ARN"),
    HYPIFY_CLIENT_SECRET_SECRET_ARN: verifyPropDefined(process.env, "HYPIFY_CLIENT_SECRET_SECRET_ARN"),
    SPOTIFY_REFRESH_TOKEN_SECRET_ARN: verifyPropDefined(process.env, "SPOTIFY_REFRESH_TOKEN_SECRET_ARN")
})
