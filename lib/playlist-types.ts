export type PlaylistKind = "album" | "film" | "game"

export type PlaylistItem = {
  title: string
  by?: string
  year?: number
  cover?: string
  link?: string
}

export type PlaylistNow = {
  kind: PlaylistKind
  title: string
  by?: string
  cover?: string
  link?: string
}

export type PlaylistData = {
  now?: PlaylistNow
  albums: PlaylistItem[]
  films: PlaylistItem[]
  games: PlaylistItem[]
}
