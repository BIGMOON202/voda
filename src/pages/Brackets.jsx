import React, { useState } from 'react'
import { BracketsSubMenu } from '../components/Brackets/BracketsSubMenu'
import { JRVarsityFemenino } from '../components/Brackets/JRVarsityFemenino'
import { SoccerJRVarisityMasculino } from '../components/Brackets/SoccerJRVarisityMasculino'

export const Brackets = () => {
  const [selectedTab, setSelectedTab] = useState("Torneo Marista");
  const [selectedSubTab, setSelectedSubTab] = useState("JR Varsity Femenino");
  return (
    <>
      <BracketsSubMenu selectedTab={selectedTab} setSelectedTab={setSelectedTab} selectedSubTab={selectedSubTab} setSelectedSubTab={setSelectedSubTab} />
      {selectedSubTab == "JR Varsity Femenino" && (<JRVarsityFemenino />)}
      {selectedSubTab == "Soccer JR Varisity Masculino" && (<SoccerJRVarisityMasculino />)}
    </>
  )
}