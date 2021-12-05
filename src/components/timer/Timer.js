import React, {useRef, useState, useEffect} from 'react'
import useLocalStorage from 'use-local-storage'
import {
  useAnimationFrame,
  useKeyboard,
  mapKeyboardEvents,
} from '@eliranmal/react-hooks'
import ReactTooltip from 'react-tooltip'

import timer from '../../lib/timer'
import {flatMap as colors} from '../../lib/colors'
import {mapAsDuration, durationAsString} from '../../lib/util'
import useAnimationEvent from '../../hooks/useAnimationEvent'

import Button from '../button/Button'

import './Timer.css'


const Timer = ({initialTime, lapThreshold, direction}) => {

  const [timerState, setTimerState] = useLocalStorage('timer-state', {})
  const [timerEvents, setTimerEvents] = useLocalStorage('timer-events', [])

  const countdownTimer = useRef(timer({
    direction,
    duration: mapAsDuration(initialTime),
    threshold: mapAsDuration(lapThreshold),
  }, timerState, timerEvents)).current

  const [notification, setNotification] = useState('')
  const [laps, setLaps] = useState(countdownTimer.getLaps() ?? [])
  const [isThresholdAnimationActive, setThresholdAnimationActive] = useState(false)
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
    clear: 'io',
    stop: 'stop',
    start: 'play',
    lap: 'rotate',
    pause: 'pause',
    resume: 'eject',
  }

  const renderButton = (command, callback = patchUnmarshalledTimerState, props) => (<Button
      icon={commandIconMap[command]}
      tooltip={command}
      className={'cd-timer-button'}
      onMouseDown={() => countdownTimer[command] && countdownTimer[command]() && callback()}
      {...props}
    />)

  useKeyboard(mapKeyboardEvents([
    // spacebar
    [32, () => {
      countdownTimer.lap()
      patchUnmarshalledTimerState()
    }],
    // backspace
    [8, () => {
      countdownTimer.abortLap()
      patchUnmarshalledTimerState()
    }],
  ]))

  useAnimationEvent(
    'pulse',
    () => setNotification('lap threshold reached'),
    () => {
      setNotification('')
      setThresholdAnimationActive(false)
    },
  )

  useAnimationFrame(
    () => setEllapsedTime(countdownTimer.getEllapsedTimeString()),
    () => !timerState.running || timerState.paused
  )

  useEffect(() => {
    ReactTooltip.rebuild()
  }, [timerState])


  return (
    <div className="cd-timer">
      <pre className="cd-timer-time-display">{ellapsedTime}</pre>
      <nav className="cd-timer-controls">
        {renderButton(
          timerState.running ?
            timerState.paused ? 'resume' : 'pause' :
              'start')}
        {renderButton('stop')}
        {renderButton('lap', () => {
          patchUnmarshalledTimerState()
          setThresholdAnimationActive(true)
          setNotification('lap started, waiting for threshold...')
        }, { style: {
            animation: isThresholdAnimationActive ? `pulse 4s linear ${mapAsDuration(lapThreshold)}ms` : void 0,
          }}
        )}
        {renderButton('clear', setUnmarshalledTimerState)}
      </nav>

      <span className={
          `cd-timer-laps-spinner ${(timerEvents[timerEvents.length - 1] || {}).type === 'lap' ?
            'cd-timer-laps-spinner-active' : ''}`
          }
        ><span className="cd-timer-laps-notification">{notification}</span></span>

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
          ></span>))).call(null, laps.reduce((accum, {duration}) => (accum += duration), 0))}
      </div>
    </div>
  );
}

export default Timer;
