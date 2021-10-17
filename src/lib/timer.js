import {patch} from './object'

const init = ({
  direction = 'up',
  duration = 30 * 1000,
  // todo - implement
  threshold = 10 * 1000,
} = {}, stateSnapshot, eventsSnapshot) => {

  let state = stateSnapshot ?? {}
  let events = eventsSnapshot ?? []

  const setState = newState => (state = newState)
  const patchState = newState => patch(state, newState)
  const setEvents = newEvents => (events = newEvents)

  const resolveLaps = () => events
    .filter(({type}) => type === 'lap')
    .map(({timestamp}) => timestamp)
  // todo - use reduce to compare prev time and curr time, and add that as 'duration'


  const getEvents = () => events ?? []
  const getState = () => state ?? {}
  const getLaps = resolveLaps

  const _getEllapsedTime = () => events
  // todo - extract some of this to a utilty that transforms the absolute data
  // (global timestamps) to relative data (the timer period sums), then share with resolveLaps()
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

  const getEllapsedTimeString = () => {
    const time = getEllapsedTime()
    const pad = (str, length = 2) => `${str}`.padStart(length, '0')
    const parseSegment = (timestamp, padLength) => pad(Math.abs(Math[time < 0 ? 'ceil' : 'floor'](timestamp)), padLength)
    return `${time < 0 ? '-' : ' '}${[
      parseSegment(time / 1000 / 60 / 60),
      parseSegment(time / 1000 / 60),
      parseSegment(time / 1000),
      parseSegment(time % 1000, 3),
    ].join(':')} `
  }

  const command = (type, actionFn = () => {}, eventPredicate = () => 1) => (time = Date.now()) => {
    actionFn(time)
    eventPredicate() && events.push({
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
  const clear = () => !state.running && setState({}) && setEvents([])

  return {
    start,
    pause,
    resume,
    stop,
    lap,
    clear,
    getState,
    getLaps,
    getEvents,
    getEllapsedTime,
    getEllapsedTimeString,
  }

}

export default init
