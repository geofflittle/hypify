import got, { OptionsOfJSONResponseBody } from "got/dist/source"

import { Playlist } from "./models/playlist"

export interface CreatePlaylistProps {
    accessToken: string
    userId: string
    playlistName: string
}

export type CreatePlaylistResponse = Playlist

export const createPlaylist = async ({
    accessToken,
    userId,
    playlistName
}: CreatePlaylistProps): Promise<CreatePlaylistResponse> => {
    const reqUrl = `https://api.spotify.com/v1/users/${userId}/playlists`
    const reqOpts: OptionsOfJSONResponseBody = {
        responseType: "json",
        headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ name: playlistName })
    }
    console.log({ module: "spotify-client", method: "createPlaylist", reqUrl, reqOpts })
    const res = await got.post<CreatePlaylistResponse>(reqUrl, reqOpts)
    console.log({
        module: "spotify-client",
        method: "createPlaylist",
        resStatusCode: res.statusCode,
        resHeaders: res.headers,
        resBody: res.body
    })
    return res.body
}
