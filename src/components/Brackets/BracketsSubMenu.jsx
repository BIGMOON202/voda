import React from 'react'

export const BracketsSubMenu = ({ selectedTab, setSelectedTab, selectedSubTab, setSelectedSubTab }) => {
    return (
        <>
            <div className='ml-[60px] mt-[30px]'>
                <p className='text-[25px] font-bold text-red-600'>{selectedTab}</p>
            </div>
            <div className="ml-[40px] mt-[15px] mb-[15px] p-[4px] h-[56px] rounded-[12px] flex items-center bg-[#F8FAFC]">
                {/* SubTabs */}
                <div
                    onClick={() => setSelectedSubTab("JR Varsity Femenino")}
                    className={`w-[200px] h-[48px] place-content-center rounded-[12px] hover: cursor-pointer ${selectedSubTab === "JR Varsity Femenino" ? "bg-[#94ACC4]/30" : ""
                        }`}
                >
                    <p
                        className={`text-center text-[18px] ${selectedSubTab === "JR Varsity Femenino" ? "font-bold" : ""
                            }`}
                    >
                        JR Varsity Femenino
                    </p>
                </div>
                <div
                    onClick={() => setSelectedSubTab("JR Varsity Masculino")}
                    className={`w-[200px] h-[48px] place-content-center rounded-[12px] hover: cursor-pointer ${selectedSubTab === "JR Varsity Masculino" ? "bg-[#94ACC4]/30" : ""
                        }`}
                >
                    <p
                        className={`text-center text-[18px] ${selectedSubTab === "JR Varsity Masculino" ? "font-bold" : ""
                            }`}
                    >
                        JR Varsity Masculino
                    </p>
                </div>
                <div
                    onClick={() => setSelectedSubTab("Varsity Femenino")}
                    className={`w-[160px] h-[48px] place-content-center rounded-[12px] hover: cursor-pointer ${selectedSubTab === "Varsity Femenino" ? "bg-[#94ACC4]/30" : ""
                        }`}
                >
                    <p
                        className={`text-center text-[18px] ${selectedSubTab === "Varsity Femenino" ? "font-bold" : ""
                            }`}
                    >
                        Varsity Femenino
                    </p>
                </div>
                <div
                    onClick={() => setSelectedSubTab("Varsity Masculino")}
                    className={`w-[160px] h-[48px] place-content-center rounded-[12px] hover: cursor-pointer ${selectedSubTab === "Varsity Masculino" ? "bg-[#94ACC4]/30" : ""
                        }`}
                >
                    <p
                        className={`text-center text-[18px] ${selectedSubTab === "Varsity Masculino" ? "font-bold" : ""
                            }`}
                    >
                        Varsity Masculino
                    </p>
                </div>
                <div
                    onClick={() => setSelectedSubTab("Soccer - Varisity Femenino")}
                    className={`w-[240px] h-[48px] place-content-center rounded-[12px] hover: cursor-pointer ${selectedSubTab === "Soccer - Varisity Femenino" ? "bg-[#94ACC4]/30" : ""
                        }`}
                >
                    <p
                        className={`text-center text-[18px] ${selectedSubTab === "Soccer - Varisity Femenino" ? "font-bold" : ""
                            }`}
                    >
                        Soccer - Varisity Femenino
                    </p>
                </div>
                <div
                    onClick={() => setSelectedSubTab("Soccer - Varisity Masculino")}
                    className={`w-[240px] h-[48px] place-content-center rounded-[12px] hover: cursor-pointer ${selectedSubTab === "Soccer - Varisity Masculino" ? "bg-[#94ACC4]/30" : ""
                        }`}
                >
                    <p
                        className={`text-center text-[18px] ${selectedSubTab === "Soccer - Varisity Masculino" ? "font-bold" : ""
                            }`}
                    >
                        Soccer - Varisity Masculino
                    </p>
                </div>
            </div>
        </>

    )
}
