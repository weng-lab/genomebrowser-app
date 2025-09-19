import { Vibrant, TrackType, DisplayMode, MethylCConfig } from "@weng-lab/genomebrowser";

// 01 to 15 samples
export function getMOHDTrack(num: number): MethylCConfig {
  const URL = "https://users.wenglab.org/mezaj/mohd";
  const id = "EB1000" + num.toString().padStart(2, "0");
  const path = `${URL}/${id}/${id}`;
  return {
    id: id,
    trackType: TrackType.MethylC,
    displayMode: DisplayMode.Split,
    title: id,
    titleSize: 12,
    height: 80,
    color: Vibrant[1],
    colors: {
      cpg: "#648bd8", // rgb(100, 139, 216)
      chg: "#ff944d", // rgb(255, 148, 77)
      chh: "#ff00ff", // rgb(25, 14, 25)
      depth: "#525252", // rgb(82, 82, 82)
    },
    urls: {
      plusStrand: {
        cpg: {
          url: `${path}_cpg_pos.bw`,
        },
        chg: {
          url: `${path}_chg_pos.bw`,
        },
        chh: {
          url: `${path}_chh_pos.bw`,
        },
        depth: {
          url: `${path}_coverage_pos.bw`,
        },
      },
      minusStrand: {
        cpg: {
          url: `${path}_cpg_neg.bw`,
        },
        chg: {
          url: `${path}_chg_neg.bw`,
        },
        chh: {
          url: `${path}_chh_neg.bw`,
        },
        depth: {
          url: `${path}_coverage_neg.bw`,
        },
      },
    },
  } as MethylCConfig;
}
