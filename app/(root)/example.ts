import {
    DefaultTranscript,
    BigBedTrackProps, BigWigTrackProps, TranscriptTrackProps,
    DefaultBigBed, DefaultBigWig, TranscriptHumanVersion,
    TrackType,
    DisplayMode,
    // ImportanceTrackProps,
    // DefaultImportance,
    // MotifTrackProps,
    // DefaultMotif
} from "@weng-lab/genomebrowser"

const pastels = ["#e60049", "#0bb4ff", "#50e991", "#e6d800", "#9b19f5", "#ffa300", "#dc0ab4", "#b3d4ff", "#00bfa0"]
export function randomPastel(): string {
    return pastels[Math.floor(Math.random() * pastels.length)]
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
    color: randomPastel()
}

export const bigBedExample: BigBedTrackProps = {
    ...DefaultBigBed,
    id: randomId(),
    title: "ENCODE V4 cCREs",
    height: 75,
    rowHeight: 12,
    color: randomPastel(),
    url: "https://downloads.wenglab.org/GRCh38-cCREs.DCC.bigBed"
}

export const transcriptExample: TranscriptTrackProps = {
    ...DefaultTranscript,
    id: randomId(),
    title: "GENCODE Genes",
    rowHeight: 12,
    color: randomPastel(),
    assembly: "GRCh38",
    queryType: "gene",
    version: TranscriptHumanVersion.V47,
    height: 100,
    props: {
        // geneName: "OR51B4",
    }
}

// export const importanceExample: ImportanceTrackProps = {
//     ...DefaultImportance,
//     signalURL: "gs://gcp.wenglab.org/hg38.phyloP100way.bigWig",
//     id: "importance",
//     title: "importance",
//     height: 100,
//     color: randomPastel(),
//     displayMode: DisplayMode.FULL,
//     trackType: TrackType.IMPORTANCE,
//     url: "gs://gcp.wenglab.org/hg38.2bit"
// }
// export const motifExample: MotifTrackProps = {
//     ...DefaultMotif,
//     id: randomId(),
//     title: "motif",
//     height: 100,
//     color: randomPastel(),
//     rowHeight: 12,
//     assembly: "GRCh38",
//     consensusRegex: "gcca[cg][ct]ag[ag]gggcgc",
//     peaksAccession: "ENCFF992CTF",
//     occurences: false
// }