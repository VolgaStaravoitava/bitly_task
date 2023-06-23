export interface BitlinkRequest {
    long_url?: string
    domain?: string
    group_guid?: string
    title?: string
    tags?: string[]
    deeplinks?: Deeplink[]
}

export interface Bitlink {
    references: any
    link: string
    id: string
    long_url: string
    title: string
    archived: string
    created_at: string
    created_by: string
    client_id: string
    custom_bitlinks: string[]
    tags: string[]
    launchpad_ids: string[]
    deeplinks: Deeplink[]
    is_deleted: string
    campaign_ids: string[]
}

export interface Deeplink {
    guid: string
    bitlink: string
    app_uri_path: string
    install_url: string
    app_guid: string
    os: string
    install_type: string
    created: string
    modified: string
    brand_guid: string
}
