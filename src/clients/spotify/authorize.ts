import got from "got/dist/source"

export type Scope =
    | "playlist-read-collaborative"
    | "playlist-modify-public"
    | "playlist-read-private"
    | "playlist-modify-private"

export interface AuthorizeProps {
    clientId: string
    redirectUri: string
    scopes?: Scope[]
}

export interface AuthorizeResponse {
    location: string
}

export const authorize = async ({ clientId, redirectUri, scopes }: AuthorizeProps): Promise<AuthorizeResponse> => {
    const queryParams = [
        ["client_id", clientId],
        ["response_type", "code"],
        ["redirect_uri", redirectUri],
        ...(scopes ? [["scope", scopes.join(" ")]] : [[]])
    ]
        .map(([k, v]) => `${k}=${encodeURIComponent(v)}`)
        .join("&")
    const reqUrl = `https://accounts.spotify.com/authorize?${queryParams}`
    const reqOpts = {
        followRedirect: false
    }
    console.log({ module: "spotify-client", method: "authorize", reqUrl, reqOpts })
    const res = await got.get(reqUrl, reqOpts)
    console.log({
        module: "spotify-client",
        method: "authorize",
        resStatusCode: res.statusCode,
        resHeaders: res.headers,
        resBody: res.body
    })
    if (!res.headers.location) {
        throw new Error("No location")
    }
    return {
        location: res.headers.location
    }
}
