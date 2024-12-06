'use client'
import { useBrowserState, GenomeBrowser, BigWigTrackProps, DefaultBigWig, BrowserActionType, TranscriptTrack } from "@weng-lab/genomebrowser";
import { bigWigExample, bigBedExample, transcriptExample } from "./example";
import { useEffect } from "react";

const colors = ["#e60049", "#0bb4ff", "#50e991", "#e6d800", "#9b19f5", "#ffa300", "#dc0ab4", "#b3d4ff", "#00bfa0"]

function randomId() {
  return Math.random().toString(36).substring(2, 6)
}


export default function Home() {
  const [browserState, browserDispatch] = useBrowserState({
    domain: { chromosome: "chr11", start: 5220000, end: 5420000 },
    preRenderedWidth: 850,
    width: 1000,
    zoomLevel: 148,
    delta: 0,
    tracks: [bigWigExample]
  });

  useEffect(() => {
    browserDispatch({ type: BrowserActionType.ADD_TRACK, track: bigBedExample })
  }, [])

  return (
    <div>
      <GenomeBrowser browserState={browserState} browserDispatch={browserDispatch}>
        <TranscriptTrack {...transcriptExample} />
      </GenomeBrowser>
    </div>
  );
}
