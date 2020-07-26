import got, { OptionsOfJSONResponseBody } from "got/dist/source"

export interface RefreshTokenProps {
    clientId: string
    clientSecret: string
    refreshToken: string
}

export interface RefreshTokenResponse {
    access_token: string
    token_type: string
    scope: string
    expires_in: number
}

export const refreshToken = async ({
    clientId,
    clientSecret,
    refreshToken
}: RefreshTokenProps): Promise<RefreshTokenResponse> => {
    const reqUrl = "https://accounts.spotify.com/api/token"
    const reqOpts: OptionsOfJSONResponseBody = {
        responseType: "json",
        headers: {
            Authorization: `Basic ${Buffer.from([clientId, clientSecret].join(":")).toString("base64")}`
        },
        form: {
            grant_type: "refresh_token",
            refresh_token: refreshToken
        }
    }
    console.log({ module: "spotify-client", method: "refreshToken", reqUrl, reqOpts })
    const res = await got.post<RefreshTokenResponse>(reqUrl, reqOpts)
    console.log({
        module: "spotify-client",
        method: "refreshToken",
        resStatusCode: res.statusCode,
        resHeaders: res.headers,
        resBody: res.body
    })
    return res.body
}
