import React, { useState, useEffect, useRef } from 'react'
import Header from './Header'
import Table from './Table'
import axios from 'axios'

const RequestListPage = () => {
    const [search, setSearch] = useState('')
    const [mainObj, setMainObj] = useState({})
    const [entries, setEntries] = useState(6)
    const [currPage, setCurrPage] = useState(1)
    const [statusArr, setStatusArr] = useState([])
    const statArr = useRef(statusArr)
    const [gradeArr, setGradeArr] = useState([])
    const [clusterArr, setClusterArr] = useState([])
    const [subClusterArr, setSubClusterArr] = useState([])
    const [checkedClusterArr, setCheckedClusterArr] = useState([])
    const [changed, setChanged] = useState(false)
    const [checked, setChecked] = useState(false)


    const maxEntries = useRef(entries)
    const clusterMap = {
        A: ['ACLUS001', 'ACLUS002', 'ACLUS003', 'ACLUS004', 'ACLUS005'],
        B: ['BCLUS001', 'BCLUS002', 'BCLUS003', 'BCLUS004', 'BCLUS005'],
        C: ['CCLUS001', 'CCLUS002', 'CCLUS003', 'CCLUS004', 'CCLUS005'],
        D: ['DCLUS001', 'DCLUS002', 'DCLUS003', 'DCLUS004', 'DCLUS005'],
        E: ['ECLUS001', 'ECLUS002', 'ECLUS003', 'ECLUS004', 'ECLUS005']
    }

    const requests = [
        {
            'id': 1,
            'technology': 'Python & Django',
            'grade': 'C1',
            'lastmodifieddate': '18-08-2021',
            'status': 'Open',
            'cluster': 'DSI'

        },
        {
            'id': 2,
            'technology': 'Java & Spring',
            'grade': 'A5',
            'lastmodifieddate': '19-08-2021',
            'status': 'Closed',
            'cluster': 'R&S'

        },
        {
            'id': 3,
            'technology': 'Angular',
            'grade': 'B1',
            'lastmodifieddate': '10-08-2021',
            'status': 'On Hold',
            'cluster': 'R&E'

        },
        {
            'id': 4,
            'technology': 'Python',
            'grade': 'A4',
            'lastmodifieddate': '02-08-2021',
            'status': 'In progress',
            'cluster': 'Multi-Channel'

        },
        {
            'id': 5,
            'technology': 'Java & Spring  boot',
            'grade': 'A4',
            'lastmodifieddate': '01-08-2021',
            'status': 'Cancelled',
            'cluster': 'R&S'

        },
        {
            'id': 6,
            'technology': 'Manual Testing',
            'grade': 'B2',
            'lastmodifieddate': '30-08-2021',
            'status': 'Withdrawn',
            'cluster': 'R&E'
        },
        {
            'id': 7,
            'technology': 'Manual Testing',
            'grade': 'B2',
            'lastmodifieddate': '30-08-2021',
            'status': 'Withdrawn',
            'cluster': 'R&E'
        },
        {
            'id': 8,
            'technology': 'Manual Testing',
            'grade': 'B2',
            'lastmodifieddate': '30-08-2021',
            'status': 'Withdrawn',
            'cluster': 'R&E'
        },
        {
            'id': 9,
            'technology': 'Manual Testing',
            'grade': 'B2',
            'lastmodifieddate': '30-08-2021',
            'status': 'Withdrawn',
            'cluster': 'R&E'
        },
        {
            'id': 10,
            'technology': 'Manual Testing',
            'grade': 'B2',
            'lastmodifieddate': '30-08-2021',
            'status': 'Withdrawn',
            'cluster': 'R&E'
        }

    ]

    let filteredRequests = []
    const [filterRequests, setFilterRequests] = useState([])

    // filteredRequests = requests.filter((req) => {
    //     let si = (currPage - 1) * entries
    //     let ei = si + entries
    //     return req.id > si && req.id <= ei
    // })

    const searchEntries = (e, filteredRequests) => {
        // console.log(e.target.value);
        // console.log(filteredRequests);

        setSearch(e.target.value)
        filteredRequests = filteredRequests.filter((req) => {
            return req.technology.includes(e.target.value) || req.id.toString().includes(e.target.value)
        })
        // setTimeout(console.log(filteredRequests), 1000);
    }

    const changeEntries = (val) => {
        if (val > 0) {
            // console.log(val);
            setEntries(val)
        }
    }

    const fillStatusArray = (e) => {
        const { name, checked } = e.target
        let arr = []
        if (checked === true) {
            arr = [...statusArr, e.target.name]
        }
        else {
            arr = statusArr.filter((status) => {
                return status != name
            })
        }
        setStatusArr(arr)
        // console.log(arr)
        setMainObj({ ...mainObj, 'status': arr })
        // setTimeout(() => console.log(mainObj), 5000);
    }


    const fillGradeArray = (e) => {
        const { name, checked } = e.target
        let arr = []
        if (checked === true)
            arr = [...gradeArr, e.target.name]
        else
            arr = gradeArr.filter((grade) => {
                return grade != name
            })
        setGradeArr(arr)
        setMainObj({ ...mainObj, 'grade': arr })
        // console.log(arr)
    }

    const fillClusterArray = (e) => {
        const { name, checked } = e.target
        let arr = clusterArr
        // let subArr = []
        if (checked === true) {
            arr = [...clusterArr, e.target.name]
            setClusterArr(arr)
        }
        else {
            arr = arr.filter((cluster) => {
                return cluster != name
            })
            setClusterArr(arr)
        }
        fillSubClusterArray(arr)
        setMainObj({ ...mainObj, 'cluster': arr })
        // console.log(arr)
    }
    // let uniqueSubClusters = []
    const fillSubClusterArray = (arr) => {
        let subArr = []
        // console.log(clusterMap['A'])
        // console.log(arr, 'arr'); // A B C
        arr.forEach((cluster) => {
            if (clusterMap[`${cluster}`].length === 1)
                subArr = [...subArr, clusterMap[`${cluster}`]]
            else {
                let subArray = clusterMap[`${cluster}`]
                subArray.forEach(subArrElement => {
                    subArr = [...subArr, subArrElement]
                })
            }
        })
        subArr = subArr.sort() // A- 1 A,B - 1,2
        setSubClusterArr(subArr)

    }

    const manageSubClusters = (e) => {
        const { name, checked } = e.target
        let arr = checkedClusterArr
        // let subArr = []
        if (checked === true) {
            arr = [...checkedClusterArr, e.target.name]
            setCheckedClusterArr(arr)
        }
        else {
            arr = arr.filter((subCluster) => {
                return subCluster != name
            })
            setCheckedClusterArr(arr)
        }
        setMainObj({ ...mainObj, 'subCluster': arr })

    }

    useEffect(() => {
        axios.get('http://localhost:8000/requests').then((res) => {
            // console.log(res.data);
            setFilterRequests(res.data)
            // console.log((filterRequests));
        }).catch(err => {
            console.log(err);
        })
    }, [])

    const filter = () => {
        axios.post('http://localhost:8000/requests', mainObj).then((res) => {
            console.log(res.data);
            setFilterRequests(res.data)
            // console.log((filteredRequests));
        }).catch(err => {
            console.log(err);
        })
    }
    const reset = () => {
        setChecked(false)
    }

    // console.log(mainObj);

    return (
        <div className="flex flex-col">
            <div className='h-[8.5vh]'>
                <Header />
            </div>
            <div className="mid-container flex justify-center h-[80vh]">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
                <div className='lg:flex'>
                    <div className="w-[25vw] accordian-container lg:h-[91.5vh] lg:flex md:flex-col lg:justify-center bg-blue-50 hidden lg:block">
                        <div className='hidden md:block'>
                            <div>
                                <div className="accordion" id="accordionExample">
                                    <div className="accordion-item bg-white border border-gray-200">
                                        <h2 className="accordion-header mb-0" id="headingOne">
                                            <button
                                                className="
          accordion-button
          relative
          flex
          items-center
          w-full
          py-4
          px-5
          text-base text-gray-800 text-left
          bg-white
          border-0
          rounded-none
          transition
          focus:outline-none
        "
                                                type="button"
                                                data-bs-toggle="collapse"
                                                data-bs-target="#collapseOne"
                                                aria-expanded="true"
                                                aria-controls="collapseOne"
                                            >
                                                Status
                                            </button>
                                        </h2>
                                        <div
                                            id="collapseOne"
                                            className="accordion-collapse collapse show"
                                            aria-labelledby="headingOne"
                                            data-bs-parent="#accordionExample"
                                        >
                                            <div className="accordion-body py-4 px-5">
                                                <div className="form-check pl-5">
                                                    <input className="form-check-input appearance-none h-4 w-4 border border-2 border-gray-300 rounded-sm bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer" type="checkbox" value="" id="flexCheckDefault" name='Open' onChange={fillStatusArray} />
                                                    <span className="form-check-label inline-block text-gray-800 w-[14vw] text-left">
                                                        Open
                                                    </span>
                                                </div>
                                                <div className="form-check pl-5">
                                                    <input className="form-check-input appearance-none h-4 w-4 border border-2 border-gray-300 rounded-sm bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer" type="checkbox" value="" id="flexCheckDefault" name='In Progress' onChange={fillStatusArray} />
                                                    <span className="form-check-label inline-block text-gray-800 w-[14vw] text-left">
                                                        In Progress
                                                    </span>
                                                </div>
                                                <div className="form-check pl-5">
                                                    <input className="form-check-input appearance-none h-4 w-4 border border-2 border-gray-300 rounded-sm bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer" type="checkbox" value="" id="flexCheckDefault" name='On Hold' onChange={fillStatusArray} />
                                                    <span className="form-check-label inline-block text-gray-800 w-[14vw] text-left">
                                                        On Hold
                                                    </span>
                                                </div>
                                                <div className="form-check pl-5">
                                                    <input className="form-check-input appearance-none h-4 w-4 border border-2 border-gray-300 rounded-sm bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer" type="checkbox" value="" id="flexCheckDefault" name='Closed' onChange={fillStatusArray} />
                                                    <span className="form-check-label inline-block text-gray-800 w-[14vw] text-left">
                                                        Closed
                                                    </span>
                                                </div>
                                                <div className="form-check pl-5">
                                                    <input className="form-check-input appearance-none h-4 w-4 border border-2 border-gray-300 rounded-sm bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer" type="checkbox" value="" id="flexCheckDefault" name='Cancelled' onChange={fillStatusArray} />
                                                    <span className="form-check-label inline-block text-gray-800 w-[14vw] text-left">
                                                        Cancelled
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="accordion-item bg-white border border-gray-200">
                                        <h2 className="accordion-header mb-0" id="headingTwo">
                                            <button
                                                className="
          accordion-button
          collapsed
          relative
          flex
          items-center
          w-full
          py-4
          px-5
          text-base text-gray-800 text-left
          bg-white
          border-0
          rounded-none
          transition
          focus:outline-none
        "
                                                type="button"
                                                data-bs-toggle="collapse"
                                                data-bs-target="#collapseTwo"
                                                aria-expanded="false"
                                                aria-controls="collapseTwo"
                                            >
                                                Grade
                                            </button>
                                        </h2>
                                        <div
                                            id="collapseTwo"
                                            className="accordion-collapse collapse"
                                            aria-labelledby="headingTwo"
                                            data-bs-parent="#accordionExample"
                                        >
                                            <div className="accordion-body py-4 px-5">
                                                <div className="form-check pl-5">
                                                    <input className="form-check-input appearance-none h-4 w-4 border border-2 border-gray-300 rounded-sm bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer" type="checkbox" value="" name="A4" id="flexCheckDefault" onChange={fillGradeArray} />
                                                    <span className="form-check-label inline-block text-gray-800 w-[14vw] text-left">
                                                        Analyst
                                                    </span>
                                                </div>
                                                <div className="form-check pl-5">
                                                    <input className="form-check-input appearance-none h-4 w-4 border border-2 border-gray-300 rounded-sm bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer" type="checkbox" value="" name="A5" id="flexCheckDefault" onChange={fillGradeArray} />
                                                    <span className="form-check-label inline-block text-gray-800 w-[14vw] text-left">
                                                        Senior Analyst
                                                    </span>
                                                </div>
                                                <div className="form-check pl-5">
                                                    <input className="form-check-input appearance-none h-4 w-4 border border-2 border-gray-300 rounded-sm bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer" type="checkbox" value="" name="B1" id="flexCheckDefault" onChange={fillGradeArray} />
                                                    <span className="form-check-label inline-block text-gray-800 w-[14vw] text-left">
                                                        Assoscitate Consultant
                                                    </span>
                                                </div>
                                                <div className="form-check pl-5">
                                                    <input className="form-check-input appearance-none h-4 w-4 border border-2 border-gray-300 rounded-sm bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer" type="checkbox" value="" name="B2" id="flexCheckDefault" onChange={fillGradeArray} />
                                                    <span className="form-check-label inline-block text-gray-800 w-[14vw] text-left">
                                                        Consultant
                                                    </span>
                                                </div>
                                                <div className="form-check pl-5">
                                                    <input className="form-check-input appearance-none h-4 w-4 border border-2 border-gray-300 rounded-sm bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer" type="checkbox" value="" name="B3" id="flexCheckDefault" onChange={fillGradeArray} />
                                                    <span className="form-check-label inline-block text-gray-800 w-[14vw] text-left">
                                                        Senior Consultant
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="accordion-item bg-white border border-gray-200">
                                        <h2 className="accordion-header mb-0" id="headingThree">
                                            <button
                                                className="
          accordion-button
          collapsed
          relative
          flex
          items-center
          w-full
          py-4
          px-5
          text-base text-gray-800 text-left
          bg-white
          border-0
          rounded-none
          transition
          focus:outline-none
        "
                                                type="button"
                                                data-bs-toggle="collapse"
                                                data-bs-target="#collapseThree"
                                                aria-expanded="false"
                                                aria-controls="collapseThree"
                                            >
                                                Cluster
                                            </button>
                                        </h2>
                                        <div
                                            id="collapseThree"
                                            className="accordion-collapse collapse"
                                            aria-labelledby="headingThree"
                                            data-bs-parent="#accordionExample"
                                        >
                                            <div className="accordion-body py-4 px-5">
                                                <div className="form-check pl-5">
                                                    <input className="form-check-input appearance-none h-4 w-4 border border-2 border-gray-300 rounded-sm bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer" type="checkbox" value="" id="flexCheckDefault" name='A' onChange={fillClusterArray} />
                                                    <span className="form-check-label inline-block text-gray-800 w-[14vw] text-left">
                                                        DSI
                                                    </span>
                                                </div>
                                                <div className="form-check pl-5">
                                                    <input className="form-check-input appearance-none h-4 w-4 border border-2 border-gray-300 rounded-sm bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer" type="checkbox" value="" id="flexCheckDefault" name='B' onChange={fillClusterArray} />
                                                    <span className="form-check-label inline-block text-gray-800 w-[14vw] text-left">
                                                        R & S - Range & Supply
                                                    </span>
                                                </div>
                                                <div className="form-check pl-5">
                                                    <input className="form-check-input appearance-none h-4 w-4 border border-2 border-gray-300 rounded-sm bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer" type="checkbox" value="" id="flexCheckDefault" name='C' onChange={fillClusterArray} />
                                                    <span className="form-check-label inline-block text-gray-800 w-[14vw] text-left">
                                                        R & E
                                                    </span>
                                                </div>
                                                <div className="form-check pl-5">
                                                    <input className="form-check-input appearance-none h-4 w-4 border border-2 border-gray-300 rounded-sm bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer" type="checkbox" value="" id="flexCheckDefault" name='D' onChange={fillClusterArray} />
                                                    <span className="form-check-label inline-block text-gray-800 w-[14vw] text-left">
                                                        Multi - Channel
                                                    </span>
                                                </div>
                                                <div className="form-check pl-5">
                                                    <input className="form-check-input appearance-none h-4 w-4 border border-2 border-gray-300 rounded-sm bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer" type="checkbox" value="" id="flexCheckDefault" name='E' onChange={fillClusterArray} />
                                                    <span className="form-check-label inline-block text-gray-800 w-[14vw] text-left">
                                                        R & S - Supply Execution
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className={subClusterArr.length > 0 ? "accordion-item bg-white border border-gray-200" : "accordion-item bg-white border-0 border-gray-200"}>
                                        {
                                            subClusterArr.length > 0 ? <div>
                                                <h2 className="accordion-header mb-0" id="headingFour">
                                                    <button
                                                        className="
          accordion-button
          collapsed
          relative
          flex
          items-center
          w-full
          py-4
          px-5
          text-base text-gray-800 text-left
          bg-white
          border-0
          rounded-none
          transition
          focus:outline-none
        "
                                                        type="button"
                                                        data-bs-toggle="collapse"
                                                        data-bs-target="#collapseFour"
                                                        aria-expanded="false"
                                                        aria-controls="collapseFour"
                                                    >
                                                        Sub-Cluster
                                                    </button>
                                                </h2>
                                                <div
                                                    id="collapseFour"
                                                    className="accordion-collapse collapse"
                                                    aria-labelledby="headingFour"
                                                    data-bs-parent="#accordionExample"
                                                >
                                                    <div className="accordion-body py-4 px-5 h-[20vh] overflow-y-auto">
                                                        {
                                                            subClusterArr.map((subCluster, index) => { // a : [1, 2]
                                                                return (
                                                                    <div className="form-check pl-5" key={index}>
                                                                        <input className="form-check-input appearance-none h-4 w-4 border border-2 border-gray-300 rounded-sm bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer" type="checkbox" value="" id="flexCheckDefault" name={subCluster} onClick={manageSubClusters} />
                                                                        <span className="form-check-label inline-block text-gray-800 w-[14vw] text-left">
                                                                            {`${subCluster}`}
                                                                        </span>
                                                                    </div>
                                                                )
                                                            }
                                                            )
                                                        }
                                                    </div>
                                                </div>
                                            </div>

                                                :
                                                <div className="hidden p-0 m-0 b-0"></div>
                                        }

                                    </div>
                                    <div className="accordion-item bg-white border border-gray-200">
                                        <h2 className="accordion-header mb-0" id="headingFive">
                                            <button
                                                className="
          accordion-button
          collapsed
          relative
          flex
          items-center
          w-full
          py-4
          px-5
          text-base text-gray-800 text-left
          bg-white
          border-0
          rounded-none
          transition
          focus:outline-none
        "
                                                type="button"
                                                data-bs-toggle="collapse"
                                                data-bs-target="#collapseFive"
                                                aria-expanded="false"
                                                aria-controls="collapseFive"
                                            >
                                                Duration
                                            </button>
                                        </h2>
                                        <div
                                            id="collapseFive"
                                            className="accordion-collapse collapse"
                                            aria-labelledby="headingFive"
                                            data-bs-parent="#accordionExample"
                                        >
                                            <div className="accordion-body py-4 px-5">
                                                Dates
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex justify-around">
                                        <button className="bg-red-200" onClick={reset}>Reset</button>
                                        <button className='bg-blue-200' onClick={filter}>Apply</button>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="table-container w-[75vw] my-7">
                        <div className='search-entries flex flex-col items-center md:flex md:flex-row md:justify-evenly md:items-center'>
                            <div>
                                <input type="text" className='border rounded-xl w-96 p-5 h-10 mb-2 md:mb-0 focus:outline-none' placeholder="Type to search" value={search} onChange={(e) => searchEntries(e, filteredRequests)}></input>
                            </div>
                            <div className="flex items-center">
                                <input type="number" className='border rounded-xl p-4 w-28 h-10 mt-2 md:mt-0 focus:outline-none' placeholder="entries" value={entries} onChange={(e) => changeEntries(e.target.value)}></input>
                                <span className="ml-3">entries</span>
                            </div>
                        </div>
                        <div className=''>
                            <Table filteredRequests={filterRequests} entries={entries} />
                        </div>

                    </div>
                </div>

            </div>

        </div>
    )
}

export default RequestListPage