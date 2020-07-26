import got, { OptionsOfJSONResponseBody } from "got/dist/source"

import { Track } from "./models/track"

export interface SearchForTrackProps {
    accessToken: string
    artist: string
    title: string
}

export interface SearchForTrackResponse {
    tracks: {
        href: string
        items: Track[]
        limit: number
        next: string
        offset: number
        previous: string
        total: number
    }
}

export const searchForTrack = async ({
    accessToken,
    artist,
    title
}: SearchForTrackProps): Promise<SearchForTrackResponse> => {
    const query = `artist:${artist} track:${title}`
    const reqUrl = `https://api.spotify.com/v1/search?q=${encodeURIComponent(query)}&type=track&limit=1`
    const reqOpts: OptionsOfJSONResponseBody = {
        responseType: "json",
        headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json"
        }
    }
    console.log({ module: "spotify-client", method: "searchForTrack", reqUrl, reqOpts })
    const res = await got.get<SearchForTrackResponse>(reqUrl, reqOpts)
    console.log({
        module: "spotify-client",
        method: "searchForTrack",
        resStatusCode: res.statusCode,
        resHeaders: res.headers,
        resBody: res.body
    })
    return res.body
}
