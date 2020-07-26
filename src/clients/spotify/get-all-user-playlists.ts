import { Playlist } from "./models/playlist"
import { getUserPlaylists } from "./get-user-playlists"

export interface GetAllUserPlaylistsProps {
    accessToken: string
    userId: string
}

export type GetAllUserPlaylistsResponse = Playlist[]

export const getAllUserPlaylists = async ({
    accessToken,
    userId
}: GetAllUserPlaylistsProps): Promise<GetAllUserPlaylistsResponse> => {
    const limit = 50
    let offset = 0
    let next
    const playlists = []
    do {
        const res = await getUserPlaylists({ accessToken, userId, limit, offset })
        playlists.push(...res.items)
        next = res.next
        offset += limit
    } while (next)
    return playlists
}
