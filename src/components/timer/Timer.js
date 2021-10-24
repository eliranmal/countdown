import React, {useState} from 'react'
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
    () => setNotification('lap threshold reached'),
    () => {
      setNotification('')
      setThresholdAnimationActive(false)
    },
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
        {renderButton('lap', () => {
          patchUnmarshalledTimerState()
          setThresholdAnimationActive(true)
          setNotification('lap started, waiting for threshold...')
          ReactTooltip.rebuild()
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
