"use client";

import { bigBedExample, bigWigExample, transcriptExample } from "@/tracks/example";
import { getMOHDTrack } from "@/tracks/MOHD";
import Controls from "@/ui/Controls";
import { Container, Paper } from "@mui/material";
import { Browser, createBrowserStore, createTrackStore, GQLWrapper, Transcript, Rect } from "@weng-lab/genomebrowser";
import { useEffect, useMemo } from "react";

export default function HomePage() {
  const trackStore = useMemo(() => createTrackStore([]), []);
  const browserStore = useMemo(
    () =>
      createBrowserStore({
        domain: {
          chromosome: "chr12",
          start: 3340000,
          end: 3342000,
        },
        marginWidth: 100,
        trackWidth: 1400,
        multiplier: 3,
      }),
    []
  );

  const insertTrack = trackStore((state) => state.insertTrack);
  const setTracks = trackStore((state) => state.setTracks);
  const addHighlight = browserStore((state) => state.addHighlight);
  const removeHighlight = browserStore((state) => state.removeHighlight);

  useEffect(() => {
    setTracks([
      {
        ...transcriptExample,
        onHover: (item: Transcript) => {
          addHighlight({
            id: item.name + "-temp" || "dsadsfd",
            domain: { start: item.coordinates.start, end: item.coordinates.end },
            color: item.color || "blue",
          });
        },
        onLeave: (item: Transcript) => {
          removeHighlight(item.name + "-temp" || "dsadsfd");
        },
        onClick: (item: Transcript) => {
          addHighlight({
            id: item.name || "dsadsfd",
            domain: {
              start: item.coordinates.start,
              end: item.coordinates.end,
            },
            color: item.color || "blue",
          });
        },
      },
      {
        ...bigBedExample,
        onHover: (rect: Rect) => {
          addHighlight({
            id: rect.name + "-temp" || "ihqoviun",
            domain: { start: rect.start, end: rect.end },
            color: rect.color || "blue",
          });
        },
        onLeave: (rect: Rect) => {
          removeHighlight(rect.name + "-temp" || "ihqoviun");
        },
        onClick: (rect: Rect) => {
          addHighlight({
            id: rect.name || "ihqoviun",
            domain: { start: rect.start, end: rect.end },
            color: rect.color || "blue",
          });
        },
      },
      {
        ...bigWigExample,
        url: "https://users.wenglab.org/mezaj/mohd/EB100001/EB100001_coverage_pos.bw",
      },
    ]);

    for (let i = 1; i <= 1; i++) {
      const track = getMOHDTrack(i);
      insertTrack(track);
    }
  }, []);

  return (
    <Container maxWidth="xl" sx={{ mt: 2, pb: 2 }}>
      <Controls browserStore={browserStore} trackStore={trackStore} />
      <Paper
        elevation={5}
        sx={{
          display: "flex",
          p: 0,
          mt: 2,
        }}
      >
        <GQLWrapper>
          <Browser browserStore={browserStore} trackStore={trackStore} />
        </GQLWrapper>
      </Paper>
    </Container>
  );
}
