"use client";

import { bigBedExample, transcriptExample } from "@/tracks/example";
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
          chromosome: "chr19",
          start: 44904891,
          end: 44910293,
        },
        marginWidth: 100,
        trackWidth: 1400,
        multiplier: 3,
      }),
    []
  );

  const insertTrack = trackStore((state) => state.insertTrack);
  const addHighlight = browserStore((state) => state.addHighlight);
  const removeHighlight = browserStore((state) => state.removeHighlight);

  useEffect(() => {
    insertTrack({
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
    });
    insertTrack({
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
    });
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
