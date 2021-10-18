import React, {useState} from 'react'
import useLocalStorage from 'use-local-storage'
import useKeyboard from './hooks/useKeyboard'
import useAnimationFrame from './hooks/useAnimationFrame'
import colors from './lib/colors'
import timer from './lib/timer'
import './App.css'

function App() {

  const [timerDuration, setTimerDuration] = useLocalStorage('timer-duration', 1000 * 12)

  const [timerState, setTimerState] = useLocalStorage('timer-state', {})
  const [timerEvents, setTimerEvents] = useLocalStorage('timer-events', [])

  const countdownTimer = timer({
    direction: 'down',
    duration: timerDuration, // todo - expose as input
    threshold: 1000 * 10, // todo - expose as input, and implement!
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
    className={`App-button-${command}  ${
      command === 'lap' &&
      (timerEvents[timerEvents.length - 1] || {}).type === 'lap' ? 'spinning' : ''
    }`}
    onMouseDown={() => {
      countdownTimer[command] && countdownTimer[command]()
      callback()
    }}></button>)

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
        <input type="time" className="App-duration-input" />
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
