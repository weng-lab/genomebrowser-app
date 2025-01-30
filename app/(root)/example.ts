import {
    DefaultTranscript,
    BigBedTrackProps, BigWigTrackProps, TranscriptTrackProps,
    DefaultBigBed, DefaultBigWig, TranscriptHumanVersion,
    MotifTrackProps,
    TrackType,
    DisplayMode,
    ImportanceTrackProps,
    DefaultImportance,
    DefaultMotif
} from "@weng-lab/genomebrowser"

const colors = ["#e60049", "#0bb4ff", "#50e991", "#e6d800", "#9b19f5", "#ffa300", "#dc0ab4", "#b3d4ff", "#00bfa0"]
function randomColor() {
    return colors[Math.floor(Math.random() * colors.length)]
}

function randomId() {
    return Math.random().toString(36).substring(2, 6)
}

export const bigWigExample: BigWigTrackProps = {
    ...DefaultBigWig,
    id: randomId(),
    title: "DNase-seq Signal",
    height: 100,
    url: "https://downloads.wenglab.org/DNAse_All_ENCODE_MAR20_2024_merged.bw",
    color: colors[Math.floor(Math.random() * colors.length)]
}

export const bigBedExample: BigBedTrackProps = {
    ...DefaultBigBed,
    id: randomId(),
    title: "ENCODE V4 cCREs",
    height: 75,
    rowHeight: 12,
    color: colors[Math.floor(Math.random() * colors.length)],
    url: "https://downloads.wenglab.org/GRCh38-cCREs.DCC.bigBed"
}

export const transcriptExample: TranscriptTrackProps = {
    ...DefaultTranscript,
    id: randomId(),
    title: "GENCODE Genes",
    rowHeight: 12,
    color: randomColor(),
    assembly: "GRCh38",
    queryType: "gene",
    version: TranscriptHumanVersion.V47,
    height: 100,
    props: {
        // geneName: "OR51B4",
    }
}


export const importanceExample: ImportanceTrackProps = {
    ...DefaultImportance,
    signalURL: "gs://gcp.wenglab.org/hg38.phyloP100way.bigWig",
    id: "importance",
    title: "importance",
    height: 100,
    color: randomColor(),
    displayMode: DisplayMode.FULL,
    trackType: TrackType.IMPORTANCE,
    url: "gs://gcp.wenglab.org/hg38.2bit"
}

export const motifExample: MotifTrackProps = {
    ...DefaultMotif,
    id: randomId(),
    title: "motif",
    height: 100,
    color: randomColor(),
    rowHeight: 12,
    assembly: "GRCh38",
    consensusRegex: "gcca[cg][ct]ag[ag]gggcgc",
    peaksAccession: "ENCFF992CTF",
    occurences: false
}

export const phyloPExample: BigWigTrackProps = {
    ...DefaultBigWig,
    id: randomId(),
    title: "PhyloP",
    height: 100,
    url: "gs://gcp.wenglab.org/hg38.phyloP100way.bigWig",
    color: randomColor(),
}