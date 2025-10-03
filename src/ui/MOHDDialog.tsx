import {
  Box,
  DialogContent,
  Typography,
  Button,
  Checkbox,
  FormControlLabel,
  FormGroup,
} from "@mui/material";
import { DialogTitle } from "@mui/material";
import { Dialog } from "@mui/material";
import { TrackStoreInstance } from "@weng-lab/genomebrowser";
import { getMOHDTrack } from "@/tracks/MOHD";

export default function MOHDDialog({
  open,
  setOpen,
  trackStore,
}: {
  open: boolean;
  setOpen: (open: boolean) => void;
  trackStore: TrackStoreInstance;
}) {
  const insertTrack = trackStore((state) => state.insertTrack);
  const removeTrack = trackStore((state) => state.removeTrack);
  const tracks = trackStore((state) => state.tracks);

  const trackNumbers = Array.from({ length: 15 }, (_, i) => i + 1);

  // Get existing MOHD track IDs
  const existingMOHDTracks = new Set(
    tracks
      .map((track) => track.id)
      .filter((id) => id.startsWith("EB1000"))
  );

  const handleToggle = (trackNum: number) => {
    const trackId = `EB1000${trackNum.toString().padStart(2, "0")}`;

    if (existingMOHDTracks.has(trackId)) {
      // Remove the track if it exists
      removeTrack(trackId);
    } else {
      // Add the track if it doesn't exist
      const track = getMOHDTrack(trackNum);
      insertTrack(track);
    }
  };

  const handleSelectAll = () => {
    trackNumbers.forEach((num) => {
      const trackId = `EB1000${num.toString().padStart(2, "0")}`;
      if (!existingMOHDTracks.has(trackId)) {
        const track = getMOHDTrack(num);
        insertTrack(track);
      }
    });
  };

  const handleDeselectAll = () => {
    existingMOHDTracks.forEach((trackId) => {
      removeTrack(trackId);
    });
  };

  return (
    <Dialog open={open} onClose={() => setOpen(false)} maxWidth="sm" fullWidth>
      <DialogTitle>Manage MOHD Tracks</DialogTitle>
      <DialogContent>
        <Box display="flex" gap={2} mb={2}>
          <Button variant="outlined" size="small" onClick={handleSelectAll}>
            Select All
          </Button>
          <Button variant="outlined" size="small" onClick={handleDeselectAll}>
            Deselect All
          </Button>
        </Box>

        <FormGroup>
          <Box
            display="grid"
            gridTemplateColumns="repeat(3, 1fr)"
            gap={1}
            mb={2}
          >
            {trackNumbers.map((num) => {
              const trackId = `EB1000${num.toString().padStart(2, "0")}`;
              const isExisting = existingMOHDTracks.has(trackId);
              return (
                <FormControlLabel
                  key={num}
                  control={
                    <Checkbox
                      checked={isExisting}
                      onChange={() => handleToggle(num)}
                      size="small"
                    />
                  }
                  label={<Typography variant="body2">{trackId}</Typography>}
                />
              );
            })}
          </Box>
        </FormGroup>
      </DialogContent>
    </Dialog>
  );
}
