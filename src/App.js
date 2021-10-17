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
    duration: 1000 * 10, // todo - expose as input
    threshold: 1000 * 10, // todo - expose as input
  }, timerState, timerEvents)

  const [laps, setLaps] = useState(countdownTimer.getLaps())
  const [ellapsedTime, setEllapsedTime] = useState(countdownTimer.getEllapsedTimeString())

  const timerPatchUnmarshall = () => {
    setTimerState({...timerState, ...countdownTimer.getState()})
    setTimerEvents([...countdownTimer.getEvents()])
  }

  const timerSetUnmarshall = () => {
    setTimerState({...countdownTimer.getState()})
    setTimerEvents([...countdownTimer.getEvents()])
  }

  const renderButton = (command, callback = timerPatchUnmarshall) => (<button
    title={command}
    className={`App-button-${command}`}
    onMouseDown={() => {
      countdownTimer[command]()
      callback()
    }}></button>)

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
        <pre className="App-time-display">{ellapsedTime}</pre>
        <nav className="App-controls">
          {/* todo - bind keyboard events */}
          {renderButton(timerState.running ? timerState.paused ? 'resume' : 'pause' : 'start')}
          {renderButton('stop')}
          {renderButton('lap', () => {
            timerPatchUnmarshall()
            setLaps([...countdownTimer.getLaps()])
          })}
          {renderButton('clear', () => {
            timerSetUnmarshall()
            setLaps([...countdownTimer.getLaps()])
          })}
        </nav>
        <code className="App-laps-display">
          {(laps || [])
            .map((lapData, key) => <p key={key}>{lapData}</p>)}
        </code>
      </main>
    </div>
  );
}

export default App;
