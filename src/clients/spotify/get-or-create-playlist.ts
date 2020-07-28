import { Playlist } from "./models/playlist"
import { createPlaylist } from "./create-playlist"
import { getAllCurrentUserPlaylists } from "../spotify-client"
import { getAllUserPlaylists } from "./get-all-user-playlists"

export interface GetOrCreatePlaylistProps {
    accessToken: string
    userId: string
    playlistName: string
}

export type GetOrCreatePlaylistResponse = Playlist

export const getOrCreatePlaylist = async ({
    accessToken,
    userId,
    playlistName
}: GetOrCreatePlaylistProps): Promise<GetOrCreatePlaylistResponse> => {
    const playlists = await getAllCurrentUserPlaylists({ accessToken })
    const found = (playlists || []).find((playlist) => playlist.name == playlistName)
    if (found) {
        return found
    }
    return await createPlaylist({ accessToken, userId, playlistName })
}
