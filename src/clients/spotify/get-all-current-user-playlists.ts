import { Playlist } from "./models/playlist"
import { getCurrentUserPlaylists } from "../spotify-client"

export interface GetAllCurrentUserPlaylistsProps {
    accessToken: string
}

export type GetAllCurrentUserPlaylistsResponse = Playlist[]

export const getAllCurrentUserPlaylists = async ({
    accessToken
}: GetAllCurrentUserPlaylistsProps): Promise<GetAllCurrentUserPlaylistsResponse> => {
    const limit = 50
    let offset = 0
    let next
    const playlists = []
    do {
        const res = await getCurrentUserPlaylists({ accessToken, limit, offset })
        playlists.push(...res.items)
        next = res.next
        offset += limit
    } while (next)
    return playlists
}
