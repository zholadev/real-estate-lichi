import dynamic from "next/dynamic";

const ZoomContainer = dynamic(() => import('./ui/ZoomContainer'), {ssr: false})

export {ZoomContainer}
