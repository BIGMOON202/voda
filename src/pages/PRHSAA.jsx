import React, { useState } from 'react'
import { SubMenu } from '../components/SubMenu';
import { PRHSAADashboard } from '../components/PRHSAADashboard';

export const PRHSAA = ({ }) => {

    const [selectedSport, setSelectedSport] = useState('Volleyball');
    const [selectedSubTab, setSelectedSubTab] = useState('Standings');
    const [selectedGender, setSelectedGender] = useState('Men');
    const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());

    return (
        <>
            <SubMenu selectedSport={selectedSport} setSelectedSport={setSelectedSport} selectedSubTab={selectedSubTab} setSelectedSubTab={setSelectedSubTab} selectedGender={selectedGender} setSelectedGender={setSelectedGender} selectedYear={selectedYear} setSelectedYear={setSelectedYear}/>
            <PRHSAADashboard selectedSport={selectedSport} setSelectedSport={setSelectedSport} selectedSubTab={selectedSubTab} setSelectedSubTab={setSelectedSubTab} selectedGender={selectedGender} setSelectedGender={setSelectedGender} selectedYear={selectedYear}/>
        </>

    )
}
