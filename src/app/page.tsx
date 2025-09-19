"use client";

import { bigBedExample, transcriptExample } from "@/tracks/example";
import { getMOHDTrack } from "@/tracks/MOHD";
import Controls from "@/ui/Controls";
import HighlightDialog from "@/ui/HighlightDialog";
import { expandCoordinates } from "@/utils/coordinates";
import { Search } from "@mui/icons-material";
import HighlightIcon from "@mui/icons-material/Highlight";
import {
  Box,
  Button,
  Container,
  IconButton,
  Paper,
  useTheme,
} from "@mui/material";
import {
  Browser,
  createBrowserStore,
  createTrackStore,
  Domain,
  GQLWrapper,
  Vibrant,
  Transcript,
  Rect,
} from "@weng-lab/genomebrowser";
import { GenomeSearch, Result } from "@weng-lab/ui-components";
import { useEffect, useMemo, useState } from "react";

export default function HomePage() {
  const trackStore = useMemo(() => createTrackStore([]), []);
  const browserStore = useMemo(
    () =>
      createBrowserStore({
        domain: {
          chromosome: "chr13",
          start: 33400000,
          end: 33420000,
        },
        marginWidth: 100,
        trackWidth: 1400,
        multiplier: 3,
      }),
    []
  );

  const theme = useTheme();
  const editTrack = trackStore((state) => state.editTrack);
  const insertTrack = trackStore((state) => state.insertTrack);
  const addHighlight = browserStore((state) => state.addHighlight);
  const removeHighlight = browserStore((state) => state.removeHighlight);
  const setDomain = browserStore((state) => state.setDomain);

  const [highlightDialogOpen, setHighlightDialogOpen] = useState(false);

  const handeSearchSubmit = (r: Result) => {
    if (r.type === "Gene") {
      editTrack("gene-track", {
        geneName: r.title,
      });
    }
    addHighlight({
      domain: r.domain as Domain,
      color: highlightColor(r),
      id: r.title as string,
    });
    setDomain(expandCoordinates(r.domain as Domain));
  };

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

    for (let i = 1; i <= 1; i++) {
      const track = getMOHDTrack(i);
      insertTrack(track);
    }
  }, []);

  return (
    <Container maxWidth="xl" sx={{ mt: 2, pb: 2 }}>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        sx={{ marginBlock: 2 }}
      >
        <GenomeSearch
          size="small"
          assembly="GRCh38"
          onSearchSubmit={handeSearchSubmit}
          queries={["Gene", "SNP", "cCRE", "Coordinate"]}
          geneLimit={3}
          sx={{ width: "400px" }}
          slots={{
            button: (
              <IconButton sx={{ color: theme.palette.primary.main }}>
                <Search />
              </IconButton>
            ),
          }}
          slotProps={{
            input: {
              label: "Change browser region",
              sx: {
                backgroundColor: theme.palette.background.paper,
                borderRadius: "4px",
                "& label.Mui-focused": {
                  color: theme.palette.primary.main,
                },
                "& .MuiOutlinedInput-root": {
                  backgroundColor: theme.palette.background.paper,
                  borderRadius: "4px",
                  "&.Mui-focused fieldset": {
                    borderColor: theme.palette.primary.main,
                  },
                  "& fieldset": {
                    borderRadius: "4px",
                  },
                },
              },
            },
          }}
        />
        <Controls browserStore={browserStore} />
        <Button
          variant="contained"
          startIcon={<HighlightIcon />}
          size="small"
          onClick={() => setHighlightDialogOpen(true)}
        >
          View Current Highlights
        </Button>
      </Box>

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
      <HighlightDialog
        browserStore={browserStore}
        open={highlightDialogOpen}
        setOpen={setHighlightDialogOpen}
      />
    </Container>
  );
}

function highlightColor(r: Result) {
  return Vibrant[4];
}
