import {
    DefaultTranscript,
    BigBedTrackProps, BigWigTrackProps, TranscriptTrackProps,
    DefaultBigBed, DefaultBigWig, TranscriptHumanVersion
} from "@weng-lab/genomebrowser"

const colors = ["#e60049", "#0bb4ff", "#50e991", "#e6d800", "#9b19f5", "#ffa300", "#dc0ab4", "#b3d4ff", "#00bfa0"]

function randomId() {
    return Math.random().toString(36).substring(2, 6)
}

export const bigWigExample: BigWigTrackProps = {
    ...DefaultBigWig,
    id: randomId(),
    title: "bigwig",
    height: 100,
    url: "https://downloads.wenglab.org/DNAse_All_ENCODE_MAR20_2024_merged.bw",
    color: colors[Math.floor(Math.random() * colors.length)]
}

export const bigBedExample: BigBedTrackProps = {
    ...DefaultBigBed,
    id: randomId(),
    title: "bigbed",
    height: 75,
    rowHeight: 12,
    color: colors[Math.floor(Math.random() * colors.length)],
    url: "https://downloads.wenglab.org/GRCh38-cCREs.DCC.bigBed"
}

export const transcriptExample: TranscriptTrackProps = {
    ...DefaultTranscript,
    id: randomId(),
    title: "transcript",
    rowHeight: 12,
    color: colors[Math.floor(Math.random() * colors.length)],
    assembly: "GRCh38",
    queryType: "gene",
    version: TranscriptHumanVersion.V47,
    height: 100
}
