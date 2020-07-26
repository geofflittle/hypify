import got, { OptionsOfJSONResponseBody } from "got/dist/source"

import { Playlist } from "./models/playlist"

export interface GetPlaylistProps {
    accessToken: string
    playlistId: string
}

export type GetPlaylistResponse = Playlist | undefined

export const getPlaylist = async ({ accessToken, playlistId }: GetPlaylistProps): Promise<GetPlaylistResponse> => {
    const reqUrl = `https://api.spotify.com/v1/playlists/${playlistId}`
    const reqOpts: OptionsOfJSONResponseBody = {
        responseType: "json",
        headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json"
        }
    }
    console.log({ module: "spotify-client", method: "getPlaylist", reqUrl, reqOpts })
    const res = await got.get<Playlist | undefined>(reqUrl, reqOpts)
    console.log({
        module: "spotify-client",
        method: "getPlaylist",
        resStatusCode: res.statusCode,
        resHeaders: res.headers,
        resBody: res.body
    })
    return res.body
}
