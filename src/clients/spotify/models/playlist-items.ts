export interface PlaylistItem {
    added_at: string
    added_by: {
        external_urls: any[]
        href: string
        id: string
        type: string
        uri: string
    }
    is_local: boolean
    primary_color: any
    track: {
        album: any
        artists: any[]
        available_markets: any[]
        disc_number: number
        duration_ms: number
        episode: boolean
        explicit: boolean
        external_ids: any
        external_urls: any
        href: string
        id: string
        is_local: boolean
        name: string
        popularity: number
        preview_url: string
        track: boolean
        track_number: number
        type: string
        uri: string
    }
    video_thumbnail: any[]
}
