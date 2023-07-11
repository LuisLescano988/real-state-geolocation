import dynamic from "next/dynamic";

const MapView = dynamic(() => import("./components/MapView"), { ssr:false })
const AllMarker = dynamic(() => import("./components/allMarkers"), { ssr:false })


export default function Home() {
  return (
    <main >
      <div >
        <AllMarker/>
      </div>      
    </main>
  )
}
