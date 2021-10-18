import React, {useState} from 'react'
import useLocalStorage from 'use-local-storage'
import useKeyboard from './hooks/useKeyboard'
import useAnimationFrame from './hooks/useAnimationFrame'
import {mapAsDuration} from './lib/util'
import timer from './lib/timer'
import colors from './lib/colors'
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

  const [timerState, setTimerState] = useLocalStorage('timer-state', {})
  const [timerEvents, setTimerEvents] = useLocalStorage('timer-events', [])

  const countdownTimer = timer({
    direction: 'down',
    duration: mapAsDuration(timerDuration),
    threshold: mapAsDuration(timerThreshold),
  }, timerState, timerEvents)

  const [laps, setLaps] = useState(countdownTimer.getLaps() ?? [])
  const [ellapsedTime, setEllapsedTime] = useState(countdownTimer.getEllapsedTimeString())

  const [editMode, setEditMode] = useState(false)

  const patchUnmarshalledTimerState = () => {
    setTimerState({...timerState, ...countdownTimer.getState()})
    setTimerEvents([...countdownTimer.getEvents()])
    setLaps([...countdownTimer.getLaps()])
  }

  const setUnmarshalledTimerState = () => {
    setTimerState({...countdownTimer.getState()})
    setTimerEvents([...countdownTimer.getEvents()])
    setLaps([...countdownTimer.getLaps()])
  }

  const renderButton = (command, callback = patchUnmarshalledTimerState) => (<button
    title={command}
    className={`App-button-${command} ${
      command === 'lap' &&
      (timerEvents[timerEvents.length - 1] || {}).type === 'lap' ? 'spinPulse' : ''
    }`}
    style={{
      '--pulse-delay': `${mapAsDuration(timerThreshold)}ms`,
    }}
    onMouseDown={() => {
      countdownTimer[command] && countdownTimer[command]()
      callback()
    }}></button>)

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


  useKeyboard(({code}) => {
    switch (code) {
      case 32: // spacebar
        countdownTimer.lap()
        patchUnmarshalledTimerState()
        break
      case 8: // backspace
        countdownTimer.abortLap()
        patchUnmarshalledTimerState()
        break
    }
  })

  useAnimationFrame(
    () => setEllapsedTime(countdownTimer.getEllapsedTimeString()),
    () => !timerState.running || timerState.paused,
    [timerState.running, timerState.paused])


  return (
    <div className="App">
      <header className="App-header">
        <h1 className="App-title">countdown</h1>
      </header>
      <div className="App-top-menu">
        {renderButton('config', () => setEditMode(!editMode))}
      </div>
      {editMode ?
      (<div className="App-config-modal">
        <label className="App-config-label">threshold</label>
        <div className="App-config-box">
          {renderThresholdTimeSegmentInput('hours')}
          {renderThresholdTimeSegmentInput('minutes')}
          {renderThresholdTimeSegmentInput('seconds')}
          {renderThresholdTimeSegmentInput('milliseconds')}
        </div>
        <label className="App-config-label">duration</label>
        <div className="App-config-box">
          {renderDurationTimeSegmentInput('hours')}
          {renderDurationTimeSegmentInput('minutes')}
          {renderDurationTimeSegmentInput('seconds')}
          {renderDurationTimeSegmentInput('milliseconds')}
        </div>
      </div>
      ) : (
      <main className="App-main">

        <pre className="App-time-display">{ellapsedTime}</pre>
        <nav className="App-controls">
          {renderButton(
            timerState.running ?
              timerState.paused ? 'resume' : 'pause' :
                'start')}
          {renderButton('stop')}
          {renderButton('lap')}
          {renderButton('clear', setUnmarshalledTimerState)}
        </nav>

        <div className="App-laps-display">
          {laps.map(({startTime, endTime, duration}, key, arr) => (<span
            key={key}
            className="App-laps-item"
            style={{
              backgroundColor: colors.flatMap[key],
              paddingLeft: `${duration / (arr.reduce((accum, {duration}) => (accum += duration), 0) / 100)}%`
            }}
            >&nbsp;</span>))}
        </div>
      </main>
      )}
    </div>
  );
}

export default App;
