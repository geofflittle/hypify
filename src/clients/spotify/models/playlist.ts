export interface Playlist {
    collaborative: boolean
    description: string
    external_urls: {
        spotify: string
    }
    href: string
    id: string
    images: {
        width: number
        height: number
        url: string
    }
    name: string
    owner: {
        display_name: string
        external_urls: string[]
        href: string
        id: string
        type: string
        uri: string
    }
    public: boolean
    snapshot_id: string
    tracks: {
        href: string
        total: number
    }
    type: string
    uri: string
}
