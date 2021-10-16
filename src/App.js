import React, {useState, useEffect} from 'react';
// import logo from './logo.svg';
import {loadObject, saveObject} from './lib/storage'
import {serialize} from './lib/object'
import timer from './lib/timer'
import './App.css';

let countdownTimer = timer({
  direction: 'down',
  duration: 1000 * 2,
})

function App() {

  const [ellapsedTime, setEllapsedTime] = useState(countdownTimer.getEllapsedTimeString())
  const [state, setState] = useState(countdownTimer.getState())
  const [laps, setLaps] = useState(countdownTimer.getLaps())

  useEffect(() => {
    // load application state from storage, in case the tab was closed/refreshed
    const appState = loadObject('countdown-state')
    setState(appState.state)
    setLaps(appState.laps)
  }, [])

  useEffect(() => {
    // when the tab is closed/refreshed, save application state to storage
    const unloadListener = saveObject.bind(null, 'countdown-state', {
      state: countdownTimer.getState(),
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

        {/* todo - bind keyboard events */}
        <button onMouseDown={() => countdownTimer.start() && setState({...state, ...countdownTimer.getState()})}>start</button>
        <button onMouseDown={() => countdownTimer.pause() && setState({...state, ...countdownTimer.getState()})}>pause</button>
        <button onMouseDown={() => countdownTimer.resume() && setState({...state, ...countdownTimer.getState()})}>resume</button>
        <button onMouseDown={() => countdownTimer.stop() && setState({...state, ...countdownTimer.getState()})}>stop</button>
        <button onMouseDown={() => countdownTimer.lap() && setState({...state, ...countdownTimer.getState()})}>lap</button>
        <button onMouseDown={() => countdownTimer.clear() && setState({...state, ...countdownTimer.getState()})}>clear</button>
      </header>
      <hr/>
      <main className="App-main">
        <code>
          {(countdownTimer.getLaps() || []).map(lapData => <p>{lapData}</p>)}
        </code>
        <pre>
          {ellapsedTime}
        </pre>
      </main>
      <hr/>
      <div>
        <pre>
          state: {serialize(state, null, 2)}
        </pre>
        <pre>
          laps: {serialize(laps, null, 2)}
        </pre>
      </div>
    </div>
  );
}

export default App;
