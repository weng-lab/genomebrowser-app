import { Search, LibraryAdd } from "@mui/icons-material";
import { Paper, Box, Button, IconButton, Typography, useTheme } from "@mui/material";
import { BrowserStoreInstance, Domain, TrackStoreInstance, Vibrant } from "@weng-lab/genomebrowser";
import { GenomeSearch, Result } from "@weng-lab/ui-components";
import ControlButtons from "./DomainButtons";
import HighlightIcon from "@mui/icons-material/Highlight";
import HighlightDialog from "./HighlightDialog";
import MOHDDialog from "./MOHDDialog";
import { useState } from "react";
import { expandCoordinates } from "@/utils/coordinates";

export default function Controls({
  browserStore,
  trackStore,
}: {
  browserStore: BrowserStoreInstance;
  trackStore: TrackStoreInstance;
}) {
  const domain = browserStore((state) => state.domain);
  const editTrack = trackStore((state) => state.editTrack);
  const addHighlight = browserStore((state) => state.addHighlight);
  const setDomain = browserStore((state) => state.setDomain);
  const [highlightDialogOpen, setHighlightDialogOpen] = useState(false);
  const [mohdDialogOpen, setMohdDialogOpen] = useState(false);
  const theme = useTheme();

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

  return (
    <Paper
      elevation={5}
      sx={{
        paddingInline: 1,
        paddingBlock: 0.1,
        mt: 2,
      }}
    >
      <Box
        display="flex"
        flexDirection="row"
        justifyContent="space-between"
        alignItems="center"
        sx={{ marginBlock: 2 }}
      >
        <Typography variant="h6" fontWeight="bold">
          {domain.chromosome}:{domain.start.toLocaleString()}-{domain.end.toLocaleString()}
        </Typography>
        <Box display="flex" flexDirection="row" gap={2}>
          <Button
            variant="contained"
            startIcon={<LibraryAdd />}
            size="medium"
            onClick={() => setMohdDialogOpen(true)}
          >
            Add Track
          </Button>
          <Button
            variant="contained"
            startIcon={<HighlightIcon />}
            size="medium"
            onClick={() => setHighlightDialogOpen(true)}
          >
            View Highlights
          </Button>
        </Box>
      </Box>
      <Box display="flex" justifyContent="space-between" alignItems="center" sx={{ marginBlock: 2 }}>
        <GenomeSearch
          size="small"
          assembly="GRCh38"
          onSearchSubmit={handeSearchSubmit}
          queries={["Gene", "SNP", "cCRE", "Coordinate"]}
          geneLimit={3}
          sx={{ width: "350px" }}
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
        <ControlButtons browserStore={browserStore} />
      </Box>
      <HighlightDialog browserStore={browserStore} open={highlightDialogOpen} setOpen={setHighlightDialogOpen} />
      <MOHDDialog trackStore={trackStore} open={mohdDialogOpen} setOpen={setMohdDialogOpen} />
    </Paper>
  );
}

function highlightColor(r: Result) {
  return Vibrant[4];
}
