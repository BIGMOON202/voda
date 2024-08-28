import React, { useState } from 'react'
import { SubMenu } from '../components/SubMenu';
import { DashboardPRHSAA } from '../components/DashboardPRHSAA';

export const PRHSAA = ({ }) => {

    const [selectedSport, setSelectedSport] = useState('Volleyball');
    const [selectedSubTab, setSelectedSubTab] = useState('Standings');
    const [selectedGender, setSelectedGender] = useState('Men');
    const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());

    return (
        <>
            <SubMenu selectedSport={selectedSport} setSelectedSport={setSelectedSport} selectedSubTab={selectedSubTab} setSelectedSubTab={setSelectedSubTab} selectedGender={selectedGender} setSelectedGender={setSelectedGender} selectedYear={selectedYear} setSelectedYear={setSelectedYear}/>
            <DashboardPRHSAA selectedSport={selectedSport} setSelectedSport={setSelectedSport} selectedSubTab={selectedSubTab} setSelectedSubTab={setSelectedSubTab} selectedGender={selectedGender} setSelectedGender={setSelectedGender} selectedYear={selectedYear}/>
        </>

    )
}
