export interface AlfredIcon {
    type?: string
    path: string
}

export interface AlfredItemMod {
    valid?: boolean
    arg?: string
    subtitle?: string
    icon?: AlfredIcon
}

export interface AlfredItemMods {
    alt?: AlfredItemMod
    cmd?: AlfredItemMod
}

export interface AlfredItemText {
    copy?: string
    largetype?: string
}

export interface AlfredItem {
    uid?: string
    type?: "default" | "file" | "file:skipcheck"
    title: string
    subtitle?: string
    arg?: string
    autocomplete?: string
    match?: string
    valid?: boolean
    mods?: AlfredItemMods
    icon?: AlfredIcon
    text?: AlfredItemText
    quicklookurl?: string
}