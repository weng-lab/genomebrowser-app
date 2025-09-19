import {
  Vibrant,
  TrackType,
  DisplayMode,
  MethylCConfig,
} from "@weng-lab/genomebrowser";

// 01 to 15
export function getMOHDTrack(num: number): MethylCConfig {
  const id = "EB1000" + num.toString().padStart(2, "0");
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
          url: `https://users.wenglab.org/mezaj/${id}/${id}_cpg_pos.bw`,
        },
        chg: {
          url: `https://users.wenglab.org/mezaj/${id}/${id}_chg_pos.bw`,
        },
        chh: {
          url: `https://users.wenglab.org/mezaj/${id}/${id}_chh_pos.bw`,
        },
        depth: {
          url: `https://users.wenglab.org/mezaj/${id}/${id}_coverage_pos.bw`,
        },
      },
      minusStrand: {
        cpg: {
          url: `https://users.wenglab.org/mezaj/${id}/${id}_cpg_neg.bw`,
        },
        chg: {
          url: `https://users.wenglab.org/mezaj/${id}/${id}_chg_neg.bw`,
        },
        chh: {
          url: `https://users.wenglab.org/mezaj/${id}/${id}_chh_neg.bw`,
        },
        depth: {
          url: `https://users.wenglab.org/mezaj/${id}/${id}_coverage_neg.bw`,
        },
      },
    },
  } as MethylCConfig;
}
