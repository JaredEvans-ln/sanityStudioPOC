import React from "react";
import HeroBanner from "../../components/HeroBanner";

export default function HeroBannerPreview(props: { document: any; }) {
  const { document } = props;

  const banner = document.displayed;

  if (!banner) return <div>Loading…</div>;

  return (
    <div style={{ border: "1px solid #ddd", padding: 16 }}>
      <HeroBanner banner={banner} />
    </div>
  );
}
