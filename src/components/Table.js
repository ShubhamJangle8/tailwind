import React, { useState, useEffect } from 'react'
import { Pagination } from './Pagination';


const Table = ({ filteredRequests, entries }) => {
    const [pages, setPages] = useState(Math.ceil(filteredRequests.length / entries))
    const [currPageRequests, setCurrPageRequests] = useState(filteredRequests)
    const [currPage, setCurrPage] = useState(1)
    const [flag, setFlag] = useState(0)
    let currPageRequest = filteredRequests.slice(0, entries)
    const prevPage = () => {
        if (currPage > 1)
            setCurrPage(currPage - 1)
    }
    const nextPage = () => {
        setCurrPage(currPage + 1)
    }
    // console.log(entries);
    console.log(filteredRequests)
    // setCurrPageRequests(filteredRequests.slice(0, entries))
    // useEffect(() => {
    //     setCurrPageRequests(filteredRequests.slice(0, entries))
    //     console.log(filteredRequests.slice(0, 1));
    //     console.log(currPageRequests);
    //     // if(flag === 0)
    //     //     setFlag(1)
    // }, [])
    

    return (
        <div className='my-table my-8 mx:5'>
            <div className="flex flex-col" style={{ height: '65vh', overflowY: 'scroll' }}>
                <div className="-my-2">
                    <div className="py-2 align-middle inline-block min-w-full">
                        <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th
                                            scope="col"
                                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                        >
                                            ID
                                        </th>
                                        <th
                                            scope="col"
                                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                        >
                                            Technology
                                        </th>
                                        <th
                                            scope="col"
                                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                        >
                                            Grade
                                        </th>
                                        <th
                                            scope="col"
                                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                        >
                                            Last Modified Date
                                        </th>
                                        <th
                                            scope="col"
                                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                        >
                                            Status
                                        </th>
                                        <th
                                            scope="col"
                                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                        >
                                            Cluster
                                        </th>
                                        <th scope="col" className="relative px-6 py-3">
                                            <span className="sr-only">Edit</span>
                                        </th>
                                        <th scope="col" className="relative px-6 py-3">
                                            <span className="sr-only">Delete</span>
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="text-left bg-white divide-y divide-gray-200">
                                    {currPageRequest.map((person) => (
                                        <tr key={person.id}>
                                        <td className="px-6 py-6 whitespace-nowrap">
                                                <div className="flex items-center">
                                                    <div className="ml-4">
                                                        <div className="text-sm font-medium text-gray-900">{person.id}</div>

                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-6 whitespace-nowrap">
                                                <div className="text-sm text-gray-900">{person.technology}</div>

                                            </td>
                                            <td className="px-6 py-6 whitespace-nowrap">
                                                <div className="text-sm text-gray-900">{person.grade}</div>

                                            </td>
                                            <td className="px-6 py-6 whitespace-nowrap">
                                                <div className="text-sm text-gray-900">{person.lastmodifieddate}</div>

                                            </td>
                                            <td className="px-6 py-6 whitespace-nowrap">
                                                <div className="text-sm text-gray-900">{person.status}</div>

                                            </td>
                                            <td className="px-6 py-6 whitespace-nowrap">
                                                <div className="text-sm text-gray-900">{person.cluster}</div>

                                            </td>

                                            <td className="px-6 py-6 whitespace-nowrap text-right text-sm font-medium">
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 hover:cursor-pointer" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                                                </svg>
                                            </td>
                                            <td className="px-6 py-6 whitespace-nowrap text-right text-sm font-medium hover:cursor-pointer">
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                                                </svg>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
            <div>
                <div className=' my-4'>
                    <div className='flex justify-center cursor-pointer'>
                        <div className='p-3 bg-blue-400  rounded-2xl rounded-r-none' onClick={prevPage}>
                            <button>Previous</button></div>
                        {/* {[...Array(pages + 1).keys()].slice(1)
                            .map(() => <div className='py-3 px-4 border'>
                                <button>{currPage}</button></div>)} */}
                                <button className='py-3 px-4 border'>{currPage}</button>
                        <div className='p-3 bg-blue-400 rounded-2xl rounded-l-none' onClick={nextPage}>
                            <button>Next</button></div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Table
