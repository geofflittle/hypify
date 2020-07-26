import got, { OptionsOfJSONResponseBody } from "got/dist/source"

import { PlaylistItem } from "./models/playlist-items"

export interface GetPlaylistItemsProps {
    accessToken: string
    playlistId: string
}

export interface GetPlaylistItemsResponse {
    href: string
    items: PlaylistItem[]
    limit: number
    next: string
    offset: number
    previous: string
    total: number
}

export const getPlaylistItems = async ({
    accessToken,
    playlistId
}: GetPlaylistItemsProps): Promise<GetPlaylistItemsResponse> => {
    const reqUrl = `https://api.spotify.com/v1/playlists/${playlistId}/tracks`
    const reqOpts: OptionsOfJSONResponseBody = {
        responseType: "json",
        headers: {
            Authorization: `Bearer ${accessToken}`
        }
    }
    console.log({ module: "spotify-client", method: "getPlaylistItems", reqUrl, reqOpts })
    const res = await got.get<GetPlaylistItemsResponse>(reqUrl, reqOpts)
    console.log({
        module: "spotify-client",
        method: "getPlaylistItems",
        resStatusCode: res.statusCode,
        resHeaders: res.headers,
        resBody: res.body
    })
    return res.body
}
