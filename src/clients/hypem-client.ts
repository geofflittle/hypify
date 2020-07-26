import got, { OptionsOfJSONResponseBody } from "got"

import { asyncReduce } from "ts-core"

export interface GetPopularTracksProps {
    mode?: "now" | "lastweek" | "noremix" | "remix"
    page?: number
    count?: number
}

export interface Track {
    itemid: string
    artist: string
    title: string
    dateposted: number
    siteid: number
    sitename: string
    posturl: string
    postid: number
    loved_count: number
    posted_count: number
    thumb_url: string
    thumb_url_medium: string
    thumb_url_large: string
    time: number
    description: string
    itunes_link: string
    rank: number
}

export type GetPopularTracksResponse = Track[]

export const getPopularTracks = async ({
    mode,
    page,
    count
}: GetPopularTracksProps): Promise<GetPopularTracksResponse> => {
    const reqUrl = `https://api.hypem.com/v2/popular?${mode ? "&mode=" + mode : ""}${page ? "&page=" + page : ""}${
        count ? "&count=" + count : ""
    }`
    const reqOpts: OptionsOfJSONResponseBody = {
        responseType: "json"
    }
    console.log({
        module: "hypem-client",
        method: "getLastWeeksPopularTracks",
        reqUrl,
        reqOpts
    })
    const res = await got.get<GetPopularTracksResponse>(reqUrl, reqOpts)
    console.log({
        module: "hypem-client",
        method: "getLastWeeksPopularTracks",
        resBody: res.body
    })
    return res.body
}

export type GetLastWeeksTop50Response = Track[]

export const getLastWeeksTop50 = async (): Promise<GetLastWeeksTop50Response> => {
    return asyncReduce(
        [1, 2, 3],
        async (acc: Track[], cur: number): Promise<Track[]> =>
            acc.concat(await getPopularTracks({ mode: "lastweek", page: cur })),
        []
    )
}
