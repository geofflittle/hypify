import got, { OptionsOfJSONResponseBody } from "got/dist/source"

import { Playlist } from "./models/playlist"

export interface GetUserPlaylistsProps {
    accessToken: string
    userId: string
    limit?: number
    offset?: number
}

export interface GetUserPlaylistsResponse {
    href: string
    items: Playlist[]
    limit: number
    next: string
    offset: number
    previous: string
    total: number
}

export const getUserPlaylists = async ({
    accessToken,
    userId,
    limit,
    offset
}: GetUserPlaylistsProps): Promise<GetUserPlaylistsResponse> => {
    const queryParams = [...(limit ? [["limit", limit]] : [[]]), ...(offset ? [["offset", offset]] : [[]])]
        .filter((o) => !!o && o.length > 0)
        .map(([k, v]) => `${k}=${encodeURIComponent(v)}`)
        .join("&")
    const reqUrl = `https://api.spotify.com/v1/users/${userId}/playlists?${queryParams}`
    const reqOpts: OptionsOfJSONResponseBody = {
        responseType: "json",
        headers: {
            Authorization: `Bearer ${accessToken}`
        }
    }
    console.log({ module: "spotify-client", method: "getUserPlaylists", reqUrl, reqOpts })
    const res = await got.get<GetUserPlaylistsResponse>(reqUrl, reqOpts)
    console.log({
        module: "spotify-client",
        method: "getUserPlaylists",
        resStatusCode: res.statusCode,
        resHeaders: res.headers,
        resBody: res.body
    })
    return res.body
}
