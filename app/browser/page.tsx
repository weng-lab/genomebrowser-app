'use client'

import { useBrowserState, GenomeBrowser, BigWigTrackProps, DefaultBigWig, BrowserActionType, DefaultBigBed, BigBedTrackProps, GQLWrapper } from "@weng-lab/genomebrowser";
import { bigWigExample, bigBedExample, transcriptExample } from "../(root)/example";

export default function Browser() {
    const [browserState, browserDispatch] = useBrowserState({
        domain: { chromosome: "chr11", start: 5220000, end: 5420000 },
        width: 1500,
        tracks: [transcriptExample, bigBedExample, bigWigExample],
        highlights: [
        ]
    });

    return (
        <GenomeBrowser width={"95%"} browserState={browserState} browserDispatch={browserDispatch} />
    )
}