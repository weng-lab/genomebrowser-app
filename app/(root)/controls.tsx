import { BrowserState, Controls } from "@weng-lab/genomebrowser";
import { Dispatch } from "react";

export default function ControlSection({ browserState, browserDispatch, setIsOpen }: {
    browserState: BrowserState,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    browserDispatch: Dispatch<any>,
    setIsOpen: (isOpen: boolean) => void
}) {
    return (
        <>
            <div className="flex items-center justify-center w-full pb-2 relative align-middle" >
                <div className="flex flex-row rounded-lg shadow-md bg-white p-2 w-fit font-bold align-middle">
                    <div className="flex items-center justify-center align-middle h-full">
                        <button
                            className="hover:bg-gray-300 mr-4 ml-6 px-4 py-1 h-8 text-lg font-bold bg-white rounded-md shadow-lg my-auto"
                            onClick={() => {
                                setIsOpen(true);
                            }}
                        >
                            Add Track
                        </button>
                    </div>
                    <Controls domain={browserState.domain} dispatch={browserDispatch} />
                </div>
            </div>
        </>
    )
}