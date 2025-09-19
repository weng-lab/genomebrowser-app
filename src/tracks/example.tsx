import {
  BigBedConfig,
  BigWigConfig,
  BulkBedConfig,
  DisplayMode,
  MethylCConfig,
  MotifConfig,
  TrackType,
  TranscriptConfig,
  Vibrant,
} from "@weng-lab/genomebrowser";

export const bigWigExample: BigWigConfig = {
  id: "1",
  title: "DNAse (avg.)",
  titleSize: 12,
  height: 40,
  color: Vibrant[6],
  trackType: TrackType.BigWig,
  displayMode: DisplayMode.Full,
  url: "https://downloads.wenglab.org/DNAse_All_ENCODE_MAR20_2024_merged.bw",
};

export const bigBedExample: BigBedConfig = {
  id: "2",
  title: "ENCODE cCREs",
  titleSize: 12,
  height: 20,
  color: Vibrant[7],
  trackType: TrackType.BigBed,
  displayMode: DisplayMode.Dense,
  url: "https://downloads.wenglab.org/GRCh38-cCREs.DCC.bigBed",
};

export const transcriptExample: TranscriptConfig = {
  id: "3",
  title: "GENCODE Genes v47",
  shortLabel: "Genes",
  titleSize: 12,
  height: 50,
  color: Vibrant[8],
  trackType: TrackType.Transcript,
  assembly: "GRCh38",
  version: 47,
  displayMode: DisplayMode.Squish,
};

export const motifExample: MotifConfig = {
  id: "4",
  title: "Motif",
  titleSize: 12,
  height: 100,
  color: Vibrant[1],
  peakColor: Vibrant[3],
  trackType: TrackType.Motif,
  displayMode: DisplayMode.Squish,
  assembly: "GRCh38",
  consensusRegex: "gcca[cg][ct]ag[ag]gggcgc",
  peaksAccession: "ENCFF992CTF",
};

export const bulkBedExample: BulkBedConfig = {
  id: "5",
  title: "ChromHMM example data",
  titleSize: 12,
  height: 30,
  gap: 2,
  color: Vibrant[2],
  trackType: TrackType.BulkBed,
  displayMode: DisplayMode.Full,
  datasets: [
    {
      name: "ChIP Dataset 1",
      url: "https://downloads.wenglab.org/ChIP_ENCSR000AKA-ENCSR000AKC-ENCSR000AKF-ENCSR000AKE-ENCSR000AKD-ENCSR000AOX.bigBed",
    },
    {
      name: "ChIP Dataset 2",
      url: "https://downloads.wenglab.org/ChIP_ENCSR000EWA-ENCSR000AKP-ENCSR000EWC-ENCSR000DWB-ENCSR000EWB-ENCSR000APE.bigBed",
    },
    {
      name: "ChIP Dataset 3",
      url: "https://downloads.wenglab.org/ChIP_ENCSR000ARA-ENCSR000AQW-ENCSR000AQY-ENCSR000AQX-ENCSR000ASX-ENCSR000ARZ.bigBed",
    },
  ],
} as BulkBedConfig;

export const methylCTrack: MethylCConfig = {
  id: "methylC",
  trackType: TrackType.MethylC,
  displayMode: DisplayMode.Split,
  title: "EB100001 MethylC",
  titleSize: 12,
  height: 80,
  color: "#000000",
  colors: {
    cpg: "#648bd8", // rgb(100, 139, 216)
    chg: "#ff944d", // rgb(255, 148, 77)
    chh: "#ff00ff", // rgb(25, 14, 25)
    depth: "#525252", // rgb(82, 82, 82)
  },
  urls: {
    plusStrand: {
      cpg: {
        url: "https://users.wenglab.org/mezaj/EB100001/EB100001_cpg_pos.bw",
      },
      chg: {
        url: "https://users.wenglab.org/mezaj/EB100001/EB100001_chg_pos.bw",
      },
      chh: {
        url: "https://users.wenglab.org/mezaj/EB100001/EB100001_chh_pos.bw",
      },
      depth: {
        url: "https://users.wenglab.org/mezaj/EB100001/EB100001_coverage_pos.bw",
      },
    },
    minusStrand: {
      cpg: {
        url: "https://users.wenglab.org/mezaj/EB100001/EB100001_cpg_neg.bw",
      },
      chg: {
        url: "https://users.wenglab.org/mezaj/EB100001/EB100001_chg_neg.bw",
      },
      chh: {
        url: "https://users.wenglab.org/mezaj/EB100001/EB100001_chh_neg.bw",
      },
      depth: {
        url: "https://users.wenglab.org/mezaj/EB100001/EB100001_coverage_neg.bw",
      },
    },
  },
};

export const phyloP: BigWigConfig = {
  id: "phyloP",
  trackType: TrackType.BigWig,
  displayMode: DisplayMode.Full,
  title: "hg38 PhyloP 100-way",
  titleSize: 12,
  height: 40,
  color: "#000000",
  customRange: { min: -2, max: 8 },
  url: "https://downloads.wenglab.org/hg38.phyloP100way.bw",
};
