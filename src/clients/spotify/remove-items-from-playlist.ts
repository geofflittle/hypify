import got, { OptionsOfJSONResponseBody } from "got/dist/source"

export interface RemoveItemsFromPlaylistProps {
    accessToken: string
    playlistId: string
    trackUris: string[]
}

export interface RemoveItemsFromPlaylistResponse {
    snapshot_id: string
}

export const removeItemsFromPlaylist = async ({
    accessToken,
    playlistId,
    trackUris
}: RemoveItemsFromPlaylistProps): Promise<RemoveItemsFromPlaylistResponse> => {
    const reqUrl = `https://api.spotify.com/v1/playlists/${playlistId}/tracks`
    const reqOpts: OptionsOfJSONResponseBody = {
        responseType: "json",
        headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ tracks: trackUris.map((trackUri) => ({ uri: trackUri })) })
    }
    console.log({ module: "spotify-client", method: "removeItemsFromPlaylist", reqUrl, reqOpts })
    const res = await got.delete<RemoveItemsFromPlaylistResponse>(reqUrl, reqOpts)
    console.log({
        module: "spotify-client",
        method: "removeItemsFromPlaylist",
        resStatusCode: res.statusCode,
        resHeaders: res.headers,
        resBody: res.body
    })
    return res.body
}
