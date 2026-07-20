import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "夜泣き・ワンオペ愚痴の駆け込み寺",

    short_name: "夜泣き愚痴",

    description:
      "匿名で育児の気持ちを吐き出せる場所",

    start_url: "/",

    display: "standalone",

    background_color: "#0f0f14",

    theme_color: "#0f0f14",

    lang: "ja",

    icons: [
      {
        src: "public/favicon.ico",
        sizes: "any",
        type: "image/x-icon",
      },
      {
        src: "/apple-icon.png",
        sizes: "180x180",
        type: "image/png",
      },
    ],
  };
}