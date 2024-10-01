import React, { useState } from 'react'
import { SubMenuNational } from '../components/SubMenuNational';
import { DashboardNational } from '../components/DashboardNational';

export const National = () => {

    const [selectedSport, setSelectedSport] = useState('Volleyball');
    const [selectedCategory, setSelectedCategory] = useState('MM');
    const [selectedSubTab, setSelectedSubTab] = useState('Results');
    const [selectedGender, setSelectedGender] = useState('Men');
    const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());

    return (
        <>
            <SubMenuNational selectedSport={selectedSport} setSelectedSport={setSelectedSport} selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} selectedSubTab={selectedSubTab} setSelectedSubTab={setSelectedSubTab} selectedGender={selectedGender} setSelectedGender={setSelectedGender} selectedYear={selectedYear} setSelectedYear={setSelectedYear} />
            <DashboardNational selectedSport={selectedSport} selectedCategory={selectedCategory} selectedSubTab={selectedSubTab} selectedGender={selectedGender} selectedYear={selectedYear} />
        </>

    )
}
