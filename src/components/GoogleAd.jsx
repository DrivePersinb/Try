import React, { useEffect } from "react";

// Replace with your Google AdSense IDs!
const AD_CLIENT = "ca-pub-1234567890123456";
const AD_SLOT_MAP = {
  top: "1234567890",
  inline: "0987654321"
};

export default function GoogleAd({ slot = "top" }) {
  useEffect(() => {
    if(window) {
      try {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      } catch(e) { /* Adblock or error */ }
    }
  }, []);
  return (
    <div style={{ width: "100%", textAlign: "center", margin: "24px 0" }}>
      <ins className="adsbygoogle"
        style={{ display: "block", width: "100%", minHeight: 60, background: "#111" }}
        data-ad-client={AD_CLIENT}
        data-ad-slot={AD_SLOT_MAP[slot] || AD_SLOT_MAP.top}
        data-ad-format="auto"
        data-full-width-responsive="true"></ins>
    </div>
  );
}