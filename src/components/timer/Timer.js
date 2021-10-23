import React, {useState, useEffect} from 'react'
import useLocalStorage from 'use-local-storage'
import ReactTooltip from 'react-tooltip'

import useKeyboard from '../../hooks/useKeyboard'
import useAnimationEvent from '../../hooks/useAnimationEvent'
import useAnimationFrame from '../../hooks/useAnimationFrame'
import timer from '../../lib/timer'
import {flatMap as colors} from '../../lib/colors'
import {mapAsDuration, durationAsString} from '../../lib/util'

import Button from '../button/Button'

import './Timer.css'


const Timer = ({initialTime, lapThreshold}) => {

  const [timerState, setTimerState] = useLocalStorage('timer-state', {})
  const [timerEvents, setTimerEvents] = useLocalStorage('timer-events', [])

  const countdownTimer = timer({
    direction: 'down',
    duration: mapAsDuration(initialTime),
    threshold: mapAsDuration(lapThreshold),
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

  let tooltipHandleRef = React.createRef()

  const renderButton = (command, callback = patchUnmarshalledTimerState) => {
    const isLapStarted = command === 'lap' &&
      (timerEvents[timerEvents.length - 1] || {}).type === 'lap'

    return <Button
      icon={commandIconMap[command]}
      tooltip={command}
      className={`cd-timer-button ${isLapStarted ? 'cd-animation-pulse' : ''}`}
      style={isLapStarted ? {
        '--pulse-delay': `${mapAsDuration(lapThreshold)}ms`,
      } : null}
      onMouseDown={() => {
        countdownTimer[command] && countdownTimer[command]()
        callback()
      }}
    />
  }

  // todo - move keybinding into Button
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

  useAnimationEvent(
    'pulse',
    () => ReactTooltip.show(tooltipHandleRef),
    () => ReactTooltip.hide(tooltipHandleRef),
    [tooltipHandleRef]
  )

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

      <div
        ref={ref => (tooltipHandleRef = ref)}
        className="cd-timer-notification"
        data-tip="lap threshold reached"
        data-place="top"
      ></div>
      <div className={`cd-timer-laps ${laps.length ? '' : 'cd-timer-laps-hidden'}`}>
        {(lapsSum => laps.map(({startTime, endTime, duration}, index, arr) => (<span
          key={index}
          className="cd-timer-lap"
          style={{
            backgroundColor: index === 0 || colors[index],
            paddingLeft: `${duration / (lapsSum / 100)}%`
          }}
          data-tip={`
start time: ${new Date(startTime).toLocaleString()}<br/>
end time: ${new Date(endTime).toLocaleString()}<br/>
duration: ${durationAsString(duration)}<br/>`
          }
          >&nbsp;</span>))).call(null, laps.reduce((accum, {duration}) => (accum += duration), 0))}
      </div>
    </div>
  );
}

export default Timer;
