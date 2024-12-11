'use client'
import { useBrowserState, GenomeBrowser, BigWigTrackProps, DefaultBigWig, BrowserActionType, TranscriptTrack, Controls, DefaultBigBed, BigBedTrackProps } from "@weng-lab/genomebrowser";
import { bigWigExample, bigBedExample, transcriptExample } from "./example";
import useMount from "@/app/hooks/useMount";
import TrackModal from "../components/trackModal";
import { useState } from "react";

function randomId() {
    return Math.random().toString(36).substring(2, 6)
}

export default function Browser() {
    const [browserState, browserDispatch] = useBrowserState({
        domain: { chromosome: "chr11", start: 5220000, end: 5420000 },
        width: 1500,
        tracks: [bigWigExample],
        highlights: [
            { domain: { chromosome: "chr11", start: 5280000, end: 5290000 }, color: "red" }
        ]
    });

    useMount(() => {
        browserDispatch({ type: BrowserActionType.ADD_TRACK, track: bigBedExample });
    });
    const [isOpen, setIsOpen] = useState(false);
    return (
        <div className="w-full h-screen">
            <div className="flex flex-col items-center">
                <div className="flex items-center justify-center w-full pb-2 relative">
                    <button
                        className="px-6 py-3 text-xl font-bold bg-white rounded-md shadow-lg absolute left-1/4"
                        onClick={() => {
                            setIsOpen(true);
                        }}
                    >
                        Add Track
                    </button>
                    <div className="rounded-lg shadow-md bg-white p-2 w-fit font-bold">
                        <Controls domain={browserState.domain} dispatch={browserDispatch} />
                    </div>
                </div>
                <div className="shadow-2xl overflow-hidden">
                    <GenomeBrowser browserState={browserState} browserDispatch={browserDispatch}>
                        <TranscriptTrack {...transcriptExample} />
                    </GenomeBrowser>
                </div>
                <div className="mt-5 p-2.5 border border-red-500 rounded-md bg-red-50 text-red-700">
                    <strong>Note:</strong> This page is a demo and there may be bugs.
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


