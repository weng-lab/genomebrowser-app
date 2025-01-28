export interface CommonTrackSettings {
    // required
    track: string // must be unique
    type: string
    bigDataUrl: string
    shortLabel: string
    longLabel: string
    // not required, but available on all tracks
    html?: string // path to html description of track
    meta?: string
    // common optional settings, avaiable on most tracks
    color?: string // r,g,b format
    priority?: number
    altColor?: string // r,g,b format
    boxedCfg?: "on" | "off"
    chromosomes?: string[] // orignially csv
    darkerLabels?: "on"
    dataVersion?: string
    directUrl?: string
    downloadUrl?: string[] // label, url
    iframeUrl?: string
    iframeOptions?: string
    mouseOver?: string // follows a pattern, check docs
    mouseOverField?: string
    multiRegionBedUrl?: string // relative path
    otherDb?: string
    otherTwoBitUrl?: string // relative path
    pennantIcon?: string
    tableBrowser?: string
    url?: string
    urlLabel?: string
    urls?: string // label, url
    skipEmptyFields?: "on"
    skipFields?: string[]
    sepFields?: string[]
}

export interface bigBedSettings extends CommonTrackSettings {
    bigDataUrl: string // relative path
    // optional
    itemRgb?: "on"
    colorByStrand?: string //r,g,b r,g,b format
    denseCoverage?: number
    labelOnFeature?: "on" | "off"
    detailsStaticTable?: string // relative path
    detailsDynamicTable?: string
    exonArrows?: "on" | "off"
    exonNumbers?: "on" | "off"
    scoreFilter?: string
    maxItems?: number
    maxWindowCoverage?: number
    maxWindowToDraw?: number
    minGrayLevel?: number
    noScoreFilter?: "on"
    spectrum?: "on"
    scoreMax?: number
    scoreMin?: number
    thickDrawItem?: "on" | "off"
    decorator?: string
    searchIndex?: string
    searchTrix?: string
    labelFields?: string
    defaultLabelFields?: string
    labelSeparator?: string
}
