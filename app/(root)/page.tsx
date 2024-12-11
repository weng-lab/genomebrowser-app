'use client'
import { useBrowserState, GenomeBrowser, BigWigTrackProps, DefaultBigWig, BrowserActionType, TranscriptTrack, Controls } from "@weng-lab/genomebrowser";
import { bigWigExample, bigBedExample, transcriptExample } from "./example";
import useMount from "@/app/hooks/useMount";

const colors = ["#e60049", "#0bb4ff", "#50e991", "#e6d800", "#9b19f5", "#ffa300", "#dc0ab4", "#b3d4ff", "#00bfa0"]

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

    return (
        <div className="w-full h-screen">
            <div className="flex flex-col items-center">
                <div className="flex items-center gap-4 pb-2">
                    <button
                        className="px-12 py-3 text-lg shift-button"
                        onClick={() => browserDispatch({
                            type: BrowserActionType.ADD_TRACK,
                            track: { ...bigBedExample, id: randomId(), color: colors[Math.floor(Math.random() * colors.length)] }
                        })}
                    >
                        Add Track
                    </button>
                    <div className="relative rounded-lg shadow-md bg-white p-2 w-fit">
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
        </div>
    );
}
