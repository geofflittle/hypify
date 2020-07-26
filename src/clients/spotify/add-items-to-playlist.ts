import got, { OptionsOfJSONResponseBody } from "got/dist/source"

export interface AddItemsToPlaylistProps {
    accessToken: string
    playlistId: string
    trackUris: string[]
}

export interface AddItemsToPlaylistResponse {
    snapshot_id: string
}

export const addItemsToPlaylist = async ({
    accessToken,
    playlistId,
    trackUris
}: AddItemsToPlaylistProps): Promise<AddItemsToPlaylistResponse> => {
    const reqUrl = `https://api.spotify.com/v1/playlists/${playlistId}/tracks`
    const reqOpts: OptionsOfJSONResponseBody = {
        responseType: "json",
        headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ uris: trackUris })
    }
    console.log({ module: "spotify-client", method: "addItemsToPlaylist", reqUrl, reqOpts })
    const res = await got.post<AddItemsToPlaylistResponse>(reqUrl, reqOpts)
    console.log({
        module: "spotify-client",
        method: "addItemsToPlaylist",
        resStatusCode: res.statusCode,
        resHeaders: res.headers,
        resBody: res.body
    })
    return res.body
}
