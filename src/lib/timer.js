import {patch} from './object'
import {durationAsString} from './util'

const init = ({
  direction = 'up',
  duration = 30 * 1000,
  threshold = 5 * 1000,
} = {}, stateSnapshot, eventsSnapshot) => {

  let state = stateSnapshot ?? {}
  let events = eventsSnapshot ?? []

  const setState = newState => (state = newState)
  const patchState = newState => patch(state, newState)
  const setEvents = newEvents => (events = newEvents)

  const resolveLaps = () => events
    .reduce((accum, {type, timestamp}, index, arr) => {
      const {type: prevType, timestamp: prevTimestamp} = arr[index - 1] ?? {}
      if (
          (prevType === 'start' && type === 'lap') ||
          (prevType === 'lap' && ['lap', 'stop', 'pause'].includes(type))) {
        accum.push({
          endTime: timestamp,
          startTime: prevTimestamp,
          duration: timestamp - prevTimestamp,
        })
      }
      return accum
    }, [])

  const getEvents = () => events ?? []
  const getState = () => state ?? {}
  const getLaps = resolveLaps

  const _getEllapsedTime = () => events
    .filter(({type}) => ['start', 'stop', 'pause', 'resume'].includes(type))
    .reduce((accum, {timestamp, type}, index, arr) => {
      const {timestamp: prevTimestamp, type: prevType} = arr[index - 1] ?? {}
      if (state.running && !state.paused && !arr[index + 1]) {
        accum += Date.now() - timestamp
      } else if ((type === 'pause' || type === 'stop') &&
        (prevType === 'start' || prevType === 'resume')) {
        accum += (timestamp - prevTimestamp)
      }
      return accum
    }, 0)

  const getEllapsedTime = (ellapsedTime = _getEllapsedTime()) => direction === 'up' ? ellapsedTime : duration - ellapsedTime

  const getEllapsedTimeString = () => durationAsString(getEllapsedTime(), true)

  const command = (type, actionFn = () => {}, eventPredicate = () => 1) => (time = Date.now()) => {
    actionFn(time)
    return eventPredicate() && events.push({
      type,
      timestamp: time,
    })
  }

  const start = command(
    'start',
    time => !state.running && patchState({running: true}))
  const pause = command(
    'pause',
    () => state.running && !state.paused && patchState({paused: true}))
  const resume = command(
    'resume',
    () => state.paused && state.paused && patchState({paused: false}))
  const stop = command(
    'stop',
    time => state.running && patchState({running: false}))
  const lap = command(
    'lap',
    void 0,
    () => state.running && !state.paused)
  const abortLap = () => {
    if (state.running && !state.paused &&
      (events[events.length - 1] || {}).type === 'lap') {
      events.pop()
    }
  }
  const clear = () => !state.running && setState({}) && setEvents([])

  return {
    start,
    pause,
    resume,
    stop,
    lap,
    abortLap,
    clear,
    getState,
    getLaps,
    getEvents,
    getEllapsedTime,
    getEllapsedTimeString,
  }
}

export default init
