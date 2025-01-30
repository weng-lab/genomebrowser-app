'use client'
import { useBrowserState, GenomeBrowser, BigWigTrackProps, DefaultBigWig, BrowserActionType, TranscriptTrack, DefaultBigBed, BigBedTrackProps, GQLWrapper } from "@weng-lab/genomebrowser";
import { bigWigExample, bigBedExample, transcriptExample, importanceExample, phyloPExample, motifExample } from "./example";
import useMount from "@/app/hooks/useMount";
import TrackModal from "../components/trackModal";
import { useEffect, useState } from "react";
import ControlSection from "./controls";

function randomId() {
    return Math.random().toString(36).substring(2, 6)
}

export default function Browser() {
    const [browserState, browserDispatch] = useBrowserState({
        domain: { chromosome: "chr11", start: 5220000, end: 5420000 },
        width: 1500,
        tracks: [transcriptExample, bigWigExample, bigBedExample, motifExample],
        highlights: [
        ]
    });

    useEffect(() => {
        if (browserState.domain.end - browserState.domain.start <= 2000) {
            browserDispatch({ type: BrowserActionType.ADD_TRACK, track: importanceExample });
            browserDispatch({ type: BrowserActionType.ADD_TRACK, track: phyloPExample });
        } else {
            browserDispatch({ type: BrowserActionType.DELETE_TRACK, id: importanceExample.id });
            browserDispatch({ type: BrowserActionType.DELETE_TRACK, id: phyloPExample.id });
        }
    }, [browserState.domain.end - browserState.domain.start])

    const [isOpen, setIsOpen] = useState(false);
    return (
        <div className="w-full h-screen">
            <div className="flex flex-row pl-4 mb-2 h-10 bg-[#000F9F] text-white drop-shadow-2xl font-bold items-center justify-center">
                UMass Chan Genome Browser on Human (GRCh38/hg38)

            </div>
            <div className="flex flex-col items-center">
                <ControlSection browserState={browserState} browserDispatch={browserDispatch} setIsOpen={setIsOpen} />
                <div className="shadow-2xl w-[90%] overflow-hidden">
                    <GQLWrapper>
                        <GenomeBrowser width={"100%"} browserState={browserState} browserDispatch={browserDispatch}>
                            <TranscriptTrack {...transcriptExample} />
                        </GenomeBrowser>
                    </GQLWrapper>
                </div>
            </div>
            <TrackModal
                isOpen={isOpen}
                onClose={() => setIsOpen(false)}
                browserDispatch={(url, name, color) => {
                    const track = createTrack(url, name, color);
                    browserDispatch({ type: BrowserActionType.ADD_TRACK, track: track });
                    setIsOpen(false);
                }}
            />
        </div>
    );
}

function createTrack(url: string, name: string, color: string) {
    const fileExtension = url.split('.').pop();
    switch (fileExtension) {
        case "bigWig":
        case "bw":
            return {
                ...DefaultBigWig,
                title: name,
                id: randomId(),
                color: color,
                url: url,
                height: 100,
            } as BigWigTrackProps
        case "bigBed":
        case "bb":
            return {
                ...DefaultBigBed,
                title: name,
                id: randomId(),
                color: color,
                url: url,
                height: 75,
                rowHeight: 12,
            } as BigBedTrackProps
        default:
            console.log("Error making track");
            return bigWigExample
    }
}


