import got, { OptionsOfJSONResponseBody } from "got/dist/source"

export interface GetAccessTokenProps {
    clientId: string
    clientSecret: string
    code: string
    redirectUri: string
}

export interface GetAccessTokenResponse {
    access_token: string
    token_type: string
    scope: string
    expires_in: string
    refresh_token: string
}

export const getAccessToken = async ({
    clientId,
    clientSecret,
    code,
    redirectUri
}: GetAccessTokenProps): Promise<GetAccessTokenResponse> => {
    const reqUrl = "https://accounts.spotify.com/api/token"
    const reqOpts: OptionsOfJSONResponseBody = {
        responseType: "json",
        headers: {
            Authorization: `Basic ${Buffer.from([clientId, clientSecret].join(":")).toString("base64")}`
        },
        form: {
            grant_type: "authorization_code",
            code: code,
            redirect_uri: redirectUri
        }
    }
    console.log({ module: "spotify-client", method: "getAccessToken", reqUrl, reqOpts })
    const res = await got.post<GetAccessTokenResponse>(reqUrl, reqOpts)
    console.log({
        module: "spotify-client",
        method: "getAccessToken",
        resStatusCode: res.statusCode,
        resHeaders: res.headers,
        resBody: res.body
    })
    return res.body
}
