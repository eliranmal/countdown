import React, {useState, useEffect} from 'react';
// import logo from './logo.svg';
import {loadObject, saveObject} from './lib/storage'
import {serialize} from './lib/object'
import timer from './lib/timer'
import './App.css';

const timerConfig = {
  direction: 'down',
}
let countdownTimer = timer(timerConfig)

function App() {

  const [ellapsedTime, setEllapsedTime] = useState(countdownTimer.getEllapsedTimeString())
  const [state, setState] = useState(countdownTimer.getState())
  const [laps, setLaps] = useState(countdownTimer.getLaps())

  useEffect(() => {
    // load application state from storage, in case the tab was closed/refreshed
    const appState = loadObject('countdown-state')
    setState(appState.state)
    setLaps(appState.laps)
    countdownTimer = timer(timerConfig, appState.state, appState.events)
    console.log('countdownTimer', countdownTimer)
  }, [])

  useEffect(() => {
    // when the tab is closed/refreshed, save application state to storage
    const unloadListener = saveObject.bind(null, 'countdown-state', {
      state: countdownTimer.getState(),
      events: countdownTimer.getEvents(),
      laps: countdownTimer.getLaps(),
    })
    window.addEventListener('beforeunload', unloadListener)
    return () => {
      window.removeEventListener('beforeunload', unloadListener)
    }
  }, [])

  useEffect(() => {
    let reqId = window.requestAnimationFrame(function step() {
      setEllapsedTime(countdownTimer.getEllapsedTimeString())
      if (state.running && !state.paused) {
        reqId = window.requestAnimationFrame(step)
      }
    })
    return () => {
      window.cancelAnimationFrame(reqId)
    }
  }, [state])

  return (
    <div className="App">
      <header className="App-header">
        <h1 className="App-title">countdown</h1>
      </header>
      <main className="App-main">
        <code>
          {(countdownTimer.getLaps() || []).map(lapData => <p>{lapData}</p>)}
        </code>
        <pre className="App-time-counter">
          {ellapsedTime}
        </pre>
        <nav className="App-controls">

          {/* todo - bind keyboard events */}
          {/* todo - don't setState, do it more selectively. what do we really need here? */}
          <button className={`App-button-${state.running ? state.paused ? 'resume' : 'pause' : 'start'}`} onMouseDown={() => countdownTimer[state.running ? state.paused ? 'resume' : 'pause' : 'start']() && setState({...state, ...countdownTimer.getState()})}></button>
          <button className="App-button-stop" onMouseDown={() => countdownTimer.stop() && setState({...state, ...countdownTimer.getState()})}></button>
          <button className="App-button-lap" onMouseDown={() => countdownTimer.lap() && setState({...state, ...countdownTimer.getState()})}></button>
          <button className="App-button-clear" onMouseDown={() => countdownTimer.clear() && setState({...state, ...countdownTimer.getState()})}></button>
        </nav>
      </main>
      {/*
      <div>
        <pre>
          state: {serialize(state, null, 2)}
        </pre>
        <pre>
          laps: {serialize(laps, null, 2)}
        </pre>
      </div>
      */}
    </div>
  );
}

export default App;
