import React from "react";
import HeroBanner from "../../../components/HeroBanner"; // your real frontend component

export default function HeroBannerPreview(props) {
  const { document } = props;

  const banner = document.displayed;

  if (!banner) return <div>Loading…</div>;

  return (
    <div style={{ border: "1px solid #ddd", padding: 16 }}>
      <HeroBanner banner={banner} />
    </div>
  );
}
