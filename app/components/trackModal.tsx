"use client"

import { useState, useEffect } from 'react'
import { HexColorPicker } from 'react-colorful'

interface TrackModalProps {
    isOpen: boolean
    onClose: () => void
    browserDispatch: (url: string, name: string, color: string) => void
}

export default function TrackModal({ isOpen, onClose, browserDispatch }: TrackModalProps) {
    const [url, setUrl] = useState('')
    const [name, setName] = useState('')
    const [color, setColor] = useState('#000000')

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden'
        } else {
            document.body.style.overflow = 'unset'
        }
        return () => {
            document.body.style.overflow = 'unset'
        }
    }, [isOpen])

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        browserDispatch(url, name, color)
        onClose()
    }

    const exampleUrls = [
        { description: "CTCF ChIP-seq signal", url: "https://downloads.wenglab.org/CTCF_All_ENCODE_MAR20_2024_merged.bw" },
        { description: "H3K27ac ChIP-seq signal", url: "https://downloads.wenglab.org/H3K27ac_All_ENCODE_MAR20_2024_merged.bw" },
        { description: "H3K4me3 ChIP-seq signal", url: "https://downloads.wenglab.org/H3K4me3_All_ENCODE_MAR20_2024_merged.bw" },
        { description: "DNase-seq signal", url: "https://downloads.wenglab.org/DNAse_All_ENCODE_MAR20_2024_merged.bw" }
    ]

    if (!isOpen) return null

    return (
        <div className="fixed inset-0 z-50">
            {/* Backdrop */}
            <div
                className="fixed inset-0 bg-black bg-opacity-30"
                onClick={onClose}
            />

            {/* Modal Container with Example URLs */}
            <div className="fixed inset-0 flex items-center justify-center p-4">
                <div className="flex gap-4 max-w-3xl">
                    {/* Main Modal */}
                    <div className="bg-white rounded-lg shadow-xl p-6 w-[400px] relative">
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-lg font-medium">Add a new track</h2>
                            <button
                                onClick={onClose}
                                className="p-1 hover:bg-gray-100 rounded-full"
                            >
                                ✕
                            </button>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700">
                                    Track URL
                                </label>
                                <input
                                    type="url"
                                    value={url}
                                    onChange={(e) => setUrl(e.target.value)}
                                    className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700">
                                    Track Name
                                </label>
                                <input
                                    type="text"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700">
                                    Color
                                </label>
                                <div className="flex items-center gap-2">
                                    <HexColorPicker color={color} onChange={setColor} />
                                </div>
                            </div>

                            <div className="mt-6 flex justify-end">
                                <button
                                    type="submit"
                                    className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                >
                                    Add Track
                                </button>
                            </div>
                        </form>
                    </div>

                    {/* Example URLs Box */}
                    <div className="bg-white rounded-lg shadow-xl p-6 w-[300px] h-fit">
                        <h3 className="text-lg font-medium mb-4">Example Tracks</h3>
                        <ul className="space-y-2">
                            {exampleUrls.map((example, index) => (
                                <li
                                    key={index}
                                    className="text-sm cursor-pointer hover:bg-gray-100 p-2 rounded"
                                    onClick={() => {
                                        setUrl(example.url)
                                        setName(example.description)
                                    }}
                                >
                                    <div className="font-medium">{example.description}</div>
                                    <div className="text-gray-600 break-all">{example.url}</div>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}
