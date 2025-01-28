'use client'

import { useEffect, useState } from "react"
import { useQuery } from "@tanstack/react-query"
import { fetchFile, parseRecordAttributes } from "./api"

export default function TrackHub() {
    const [url, setUrl] = useState("")
    const [genomesUrl, setGenomesUrl] = useState("")

    const { data, refetch } = useQuery({
        queryKey: ['trackHub', url],
        queryFn: () => fetchFile(url),
        enabled: false
    })

    useEffect(() => {
        if (!data) return
        const trackHub = parseRecordAttributes(data)
        const baseUrl = url.split("/").slice(0, -1).join("/")
        const genomesUrl = baseUrl + "/" + trackHub[0]["genomesFile"]
        setGenomesUrl(genomesUrl)
        console.log(trackHub)
    }, [data])

    return (
        <div>
            <input
                className="border-2 mb-4 border-gray-300 rounded-md p-2"
                type="text"
                value={url}
                placeholder="Enter TrackHub URL"
                onChange={(e) => setUrl(e.target.value)}
            />
            <button
                className="border-2 border-gray-300 rounded-md p-2"
                onClick={() => refetch()}>
                Fetch
            </button>
            {data && <div>Parsed</div>}
            {genomesUrl && <div>Genomes URL: {genomesUrl}</div>}
        </div>
    )
}



// useEffect(() => {
//     if (!trackHubData) return
//     setTrackHub(trackHubData)
//     console.log(trackHubData)
// }, [trackHubData])

// useEffect(() => {
//     if (!genomesData) return
//     console.log(genomesData)
// }, [genomesData])

// useEffect(() => {
//     if (!tracksData) return
//     tracksData.forEach(track => {
//         console.log(track)

//     })
// }, [tracksData])

// const [trackHub, setTrackHub] = useState<HubFileData | null>(null)

// const { data: trackHubData } = useQuery({
//     queryKey: ['trackHub', url],
//     queryFn: () => fetchAndParseHubFile(url),
//     enabled: !!url
// })

// const { data: genomesData } = useQuery({
//     queryKey: ['genomes', url],
//     queryFn: () => fetchAndParseGenomesFile("" + trackHub?.baseUrl + trackHub?.genomesFile),
//     enabled: !!trackHub
// })

// const { data: tracksData } = useQuery({
//     queryKey: ['tracks', url],
//     queryFn: () => fetchAndParseTracksFile("" + trackHub?.baseUrl + genomesData?.[0].trackDb),
//     enabled: !!genomesData
// })