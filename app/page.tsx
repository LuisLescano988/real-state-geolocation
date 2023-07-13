"use client";
import dynamic from "next/dynamic";

const AllMarker = dynamic(() => import("./components/AllMarkers"), {
  ssr: false,
});

export default function Home() {
  return (
    <div>
      <AllMarker/>
    </div>
  );
}
