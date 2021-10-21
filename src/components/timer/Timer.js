import React, {useState} from 'react'
import useLocalStorage from 'use-local-storage'
import useKeyboard from '../../hooks/useKeyboard'
import useAnimationFrame from '../../hooks/useAnimationFrame'
import {mapAsDuration, durationAsString} from '../../lib/util'
import timer from '../../lib/timer'
import {flatMap as colors} from '../../lib/colors'
import ReactTooltip from 'react-tooltip'
import Button from '../button/Button'

import './Timer.css'


const Timer = () => {

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

  const commandIconMap = {
    start: 'play',
    pause: 'pause',
    resume: 'eject',
    stop: 'stop',
    lap: 'rotate',
    clear: 'io',
  }

  const renderButton = (command, callback = patchUnmarshalledTimerState) => {
    const isLapStarted = command === 'lap' &&
      (timerEvents[timerEvents.length - 1] || {}).type === 'lap'

    return <Button
      icon={commandIconMap[command]}
      tooltip={command}
      className={`cd-timer-button ${isLapStarted ? 'cd-animation-pulse' : ''}`}
      style={isLapStarted ? {
        '--pulse-delay': `${mapAsDuration(timerThreshold)}ms`,
      } : null}
      onMouseDown={() => {
        countdownTimer[command] && countdownTimer[command]()
        callback()
      }}
    />
  }


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
      default:
        break
    }
  })

  useAnimationFrame(
    () => setEllapsedTime(countdownTimer.getEllapsedTimeString()),
    () => !timerState.running || timerState.paused,
    [timerState.running, timerState.paused])


  return (
    <div className="cd-timer">
      <pre className="cd-timer-time-display">{ellapsedTime}</pre>
      <nav className="cd-timer-controls">
        {renderButton(
          timerState.running ?
            timerState.paused ? 'resume' : 'pause' :
              'start')}
        {renderButton('stop')}
        {renderButton('lap')}
        {renderButton('clear', setUnmarshalledTimerState)}
      </nav>

      <div className="cd-timer-laps">
        {laps.map(({startTime, endTime, duration}, key, arr) => (<span
          key={key}
          className="cd-timer-lap"
          style={{
            backgroundColor: colors[key],
            paddingLeft: `${duration / (arr.reduce((accum, {duration}) => (accum += duration), 0) / 100)}%`
          }}
          data-tip={`
start time: ${new Date(startTime).toLocaleString()}<br/>
end time: ${new Date(endTime).toLocaleString()}<br/>
duration: ${durationAsString(duration)}<br/>`
          }
          >&nbsp;</span>))}
      </div>
    </div>
  );
}

export default Timer;
