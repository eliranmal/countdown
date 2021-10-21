import React, {useState} from 'react'
import useLocalStorage from 'use-local-storage'
import ReactTooltip from 'react-tooltip'

import Timer from './components/timer/Timer'
import Button from './components/button/Button'

import './App.css'


function App() {

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

  const [editMode, setEditMode] = useState(false)

  const renderTimeSegmentInput = (segmentKey, timeObj, onChange) => (<input type="number"
    className={`App-config-input App-config-input-${segmentKey}`}
    value={timeObj[segmentKey]}
    onChange={onChange} />)

  const renderDurationTimeSegmentInput = segmentKey => renderTimeSegmentInput(
    segmentKey, timerDuration, e => setTimerDuration({
      ...timerDuration,
      [segmentKey]: +e.target.value,
    }))

  const renderThresholdTimeSegmentInput = segmentKey => renderTimeSegmentInput(
    segmentKey, timerThreshold, e => setTimerThreshold({
      ...timerThreshold,
      [segmentKey]: +e.target.value,
    }))


  return (
    <div className="App">
      <ReactTooltip
        place="bottom"
        effect="solid"
        delayShow={420}
        border
        multiline
      />
      <header className="App-header">
        <h1 className="App-title">countdown</h1>
      </header>
      <div className="App-top-menu">
        <Button
          icon="cog"
          tooltip="config"
          onMouseDown={() => setEditMode(!editMode)}
        />
      </div>
      {editMode ?
      (<div className="App-config-modal">
        <label className="App-config-label">threshold</label>
        <div className="App-config-box">
          {['hours', 'minutes', 'seconds', 'milliseconds']
              .map(renderThresholdTimeSegmentInput)}
        </div>
        <label className="App-config-label">duration</label>
        <div className="App-config-box">
          {['hours', 'minutes', 'seconds', 'milliseconds']
              .map(renderDurationTimeSegmentInput)}
        </div>
      </div>
      ) : (
      <main className="App-main">
        <Timer
          initialTime={timerDuration}
          lapThreshold={timerThreshold}
          />
      </main>
      )}
    </div>
  );
}

export default App;
