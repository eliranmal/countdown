import React, {useState, useEffect} from 'react'
import useLocalStorage from 'use-local-storage'
import {loadObject, saveObject} from './lib/storage'
import timer from './lib/timer'
import './App.css'

function App() {

  const [timerState, setTimerState] = useLocalStorage('timer-state', {})
  const [timerEvents, setTimerEvents] = useLocalStorage('timer-events', [])

  const countdownTimer = timer({
    direction: 'down',
  }, timerState, timerEvents)

  const [laps, setLaps] = useState(countdownTimer.getLaps())
  const [ellapsedTime, setEllapsedTime] = useState(countdownTimer.getEllapsedTimeString())

  const patchTimerData = () => {
    setTimerState({...timerState, ...countdownTimer.getState()})
    setTimerEvents([...countdownTimer.getEvents()])
  }

  const setTimerData = () => {
    setTimerState({...countdownTimer.getState()})
    setTimerEvents([...countdownTimer.getEvents()])
  }

  const renderButton = (command, callback = patchTimerData) => (<button
    title={command}
    className={`App-button-${command}`}
    onMouseDown={() => countdownTimer[command]() && callback()}
  ></button>)

  useEffect(() => {
    let reqId = window.requestAnimationFrame(function step() {
      setEllapsedTime(countdownTimer.getEllapsedTimeString())
      if (timerState.running && !timerState.paused) {
        reqId = window.requestAnimationFrame(step)
      }
    })
    return () => {
      window.cancelAnimationFrame(reqId)
    }
  }, [timerState.running, timerState.paused])

  return (
    <div className="App">
      <header className="App-header">
        <h1 className="App-title">countdown</h1>
      </header>
      <main className="App-main">
        <code>
          {(countdownTimer.getLaps() || [])
            .map((lapData, key) => <p key={key}>{lapData}</p>)}
        </code>
        <pre className="App-time-display">
          {ellapsedTime}
        </pre>
        <nav className="App-controls">
          {/* todo - bind keyboard events */}
          {/* todo - don't setState, do it more selectively. what do we really need here? */}
          {renderButton(timerState.running ? timerState.paused ? 'resume' : 'pause' : 'start')}
          {renderButton('stop')}
          {renderButton('lap')}
          {renderButton('clear', setTimerData)}
        </nav>
      </main>
    </div>
  );
}

export default App;
