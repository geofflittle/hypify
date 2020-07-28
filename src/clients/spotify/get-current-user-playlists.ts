import got, { OptionsOfJSONResponseBody } from "got/dist/source"

import { Playlist } from "./models/playlist"

export interface GetCurrentUserPlaylistsProps {
    accessToken: string
    limit?: number
    offset?: number
}

export interface GetCurrentUserPlaylistsResponse {
    href: string
    items: Playlist[]
    limit: number
    next: string
    offset: number
    previous: string
    total: number
}

export const getCurrentUserPlaylists = async ({
    accessToken,
    limit,
    offset
}: GetCurrentUserPlaylistsProps): Promise<GetCurrentUserPlaylistsResponse> => {
    const queryParams = [...(limit ? [["limit", limit]] : [[]]), ...(offset ? [["offset", offset]] : [[]])]
        .filter((o) => !!o && o.length > 0)
        .map(([k, v]) => `${k}=${encodeURIComponent(v)}`)
        .join("&")
    const reqUrl = `https://api.spotify.com/v1/me/playlists?${queryParams}`
    const reqOpts: OptionsOfJSONResponseBody = {
        responseType: "json",
        headers: { Authorization: `Bearer ${accessToken}` }
    }
    console.log({ module: "spotify-client", method: "getCurrentUserPlaylists", reqUrl, reqOpts })
    const res = await got.get<GetCurrentUserPlaylistsResponse>(reqUrl, reqOpts)
    console.log({
        module: "spotify-client",
        method: "getCurrentUserPlaylists",
        resStatusCode: res.statusCode,
        resHeaders: res.headers,
        resBody: res.body
    })
    return res.body
}
