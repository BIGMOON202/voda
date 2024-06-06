import React, { useState } from 'react'
import { SubMenu } from '../components/SubMenu';
import { Dashboard } from '../components/Dashboard';

export const Sports = ({ }) => {

    const [selectedSport, setSelectedSport] = useState('Volleyball');
    const [selectedSubTab, setSelectedSubTab] = useState('Standings');
    const [selectedGender, setSelectedGender] = useState('Men');

    return (
        <>
            <SubMenu selectedSport={selectedSport} setSelectedSport={setSelectedSport} selectedSubTab={selectedSubTab} setSelectedSubTab={setSelectedSubTab} selectedGender={selectedGender} setSelectedGender={setSelectedGender}/>
            <Dashboard selectedSport={selectedSport} setSelectedSport={setSelectedSport} selectedSubTab={selectedSubTab} setSelectedSubTab={setSelectedSubTab} selectedGender={selectedGender} setSelectedGender={setSelectedGender}/>
        </>

    )
}
