import { Track, getLastWeeksTop50 } from "../clients/hypem-client"
import {
    addItemsToPlaylist,
    getAllCurrentUserPlaylists,
    getCurrentUserPlaylists,
    getOrCreatePlaylist,
    getPlaylistItems,
    removeItemsFromPlaylist,
    searchForTrack
} from "../clients/spotify-client"

import { Playlist } from "../clients/spotify/models/playlist"
import { asyncReduce } from "ts-core"

type Month = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12
type Season = "Winter" | "Spring" | "Summer" | "Fall"

const monthToSeason: { [key in Month]: Season } = {
    1: "Winter",
    2: "Winter",
    3: "Spring",
    4: "Spring",
    5: "Spring",
    6: "Summer",
    7: "Summer",
    8: "Summer",
    9: "Fall",
    10: "Fall",
    11: "Fall",
    12: "Winter"
}

export interface SaveAndUpdateCurrentPlaylistProps {
    accessToken: string
    userId: string
}

export const saveAndUpdateCurrentPlaylist = async ({
    accessToken,
    userId
}: SaveAndUpdateCurrentPlaylistProps): Promise<void> => {
    const srcPlaylist = await getOrCreatePlaylist({
        accessToken,
        userId,
        playlistName: "Current"
    })
    const dstPlaylist = await getOrCreatePlaylist({
        accessToken,
        userId,
        playlistName: getDestinationPlaylistName()
    })
    await copyAndClearTracks(accessToken, srcPlaylist, dstPlaylist)

    const hypemTop50 = await getLastWeeksTop50()
    const hypemTop50TrackUris = await asyncReduce(
        hypemTop50,
        async (acc: string[], cur: Track): Promise<string[]> => {
            const trackUri = await searchAndGetTrackUri(accessToken, cur.artist, cur.title)
            return acc.concat(trackUri ? [trackUri] : [])
        },
        []
    )

    const dwPlaylist = (await getAllCurrentUserPlaylists({ accessToken })).find(
        (playlist) => playlist.name == "Discover Weekly"
    )
    if (!dwPlaylist) {
        throw new Error("No Discover Weekly playlist")
    }
    const dwpItems = await getPlaylistItems({ accessToken, playlistId: dwPlaylist.id })
    const dwTrackUris = dwpItems.items.map((item) => item.track.uri)

    await addItemsToPlaylist({
        accessToken,
        playlistId: srcPlaylist.id,
        trackUris: hypemTop50TrackUris.concat(dwTrackUris)
    })
}

const getDestinationPlaylistName = () => {
    const date = new Date()
    const year = date.getFullYear()
    const month = (date.getMonth() + 1) as Month
    const season = monthToSeason[month]
    return `${year} ${season}`
}

const copyAndClearTracks = async (accessToken: string, srcPlaylist: Playlist, dstPlaylist: Playlist) => {
    const getPlaylistItemsRes = await getPlaylistItems({
        accessToken,
        playlistId: srcPlaylist.id
    })
    if (getPlaylistItemsRes.items.length <= 0) {
        return
    }
    const trackUris = getPlaylistItemsRes.items.map((item) => item.track.uri)
    await addItemsToPlaylist({
        accessToken,
        playlistId: dstPlaylist.id,
        trackUris: trackUris
    })
    await removeItemsFromPlaylist({
        accessToken,
        playlistId: srcPlaylist.id,
        trackUris
    })
}

const searchAndGetTrackUri = async (
    accessToken: string,
    artist: string,
    title: string
): Promise<string | undefined> => {
    const searchRes = await searchForTrack({
        accessToken,
        artist,
        title
    })
    if (searchRes.tracks.items.length <= 0) {
        return undefined
    }
    return searchRes.tracks.items[0].uri
}
