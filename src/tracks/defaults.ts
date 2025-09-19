import { BigBedConfig, BigWigConfig, DisplayMode, TrackType } from "@weng-lab/genomebrowser";

export const defaultBigWig: Partial<BigWigConfig> = {
  titleSize: 12,
  height: 40,
  trackType: TrackType.BigWig,
  displayMode: DisplayMode.Full,
};

export const defaultBigBed: Partial<BigBedConfig> = {
  titleSize: 12,
  height: 25,
  trackType: TrackType.BigBed,
  displayMode: DisplayMode.Dense,
};
