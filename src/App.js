import React, {useState, useEffect} from 'react'
import useLocalStorage from 'use-local-storage'
import ReactTooltip from 'react-tooltip'

import Settings from './pages/settings/Settings'
import Button from './components/button/Button'
import Timer from './components/timer/Timer'

import './App.css'


const App = () => {

  const [timerThreshold, setTimerThreshold] = useLocalStorage('timer-threshold', {
    hours: 0,
    minutes: 0,
    seconds: 3,
    milliseconds: 45,
  })
  const [timerDuration, setTimerDuration] = useLocalStorage('timer-duration', {
    hours: 0,
    minutes: 0,
    seconds: 12,
    milliseconds: 345,
  })
  const [timerDirection, setTimerDirection] = useLocalStorage('timer-direction')

  const [isSettingsVisible, setSettingsVisible] = useState(false)

  useEffect(() => {
    ReactTooltip.rebuild()
  }, [isSettingsVisible])


  return (
    <div className="cd-app">
      <ReactTooltip
        place="bottom"
        effect="solid"
        delayShow={420}
        border
        multiline
      />
      <header className="cd-app-header">
        <h1 className="cd-app-title">countdown</h1>
      </header>
      <div className="cd-app-top-menu">
        <Button
          className="cd-app-top-menu-item"
          icon="cog"
          tooltip={`${isSettingsVisible ? 'hide ' : 'show '}settings`}
          onClick={() => setSettingsVisible(!isSettingsVisible)}
        />
      </div>
      {isSettingsVisible ? (<Settings
          timerDuration={timerDuration}
          timerThreshold={timerThreshold}
          timerDirection={timerDirection}
          setTimerDuration={setTimerDuration}
          setTimerThreshold={setTimerThreshold}
          setTimerDirection={setTimerDirection}
        />) : (<Timer
          initialTime={timerDuration}
          lapThreshold={timerThreshold}
          direction={timerDirection}
        />
      )}
    </div>
  )
}


export default App
