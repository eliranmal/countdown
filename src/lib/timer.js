import {patch} from './object'

// the result of: new Date(1970, 0, 1).getTime()
const EPOCH = -7200000

// todo - optionally accept a storage object with known crud api, and compse it
const init = ({
  direction = 'up',
  duration = 30 * 1000,
  threshold = 10 * 1000,
} = {}, stateSnapshot = {}, eventsSnapshot) => {

  let laps = []
  let state = stateSnapshot ?? {}

  // {
  //   type: 'play|stop|pause|resume|lap',
  //   timestamp: 210010010010000,
  // }
  let events = eventsSnapshot ?? []

  const setState = newState => patch(state, newState)
  const setLaps = newLaps => patch(laps, newLaps)

  const resolveLaps = (state, lapTimestamps) =>
  (lapTimestamps || [])
  .map(time => time - state.startTime)
  // todo - use reduce to compare prev time and curr time, and add that as 'duration'

  // ----------------------------------------------------------------
  // todo - extract method (see below) and continue from there
  .filter(({type}) => type === 'lap')
  .map(val => val)


  const getEvents = () => events
  const getState = () => state
  const getLaps = () => resolveLaps(state, events)

  const _getEllapsedTime = () => events
  // todo - extract some of this to a utilty that transforms the absolute data (global timestamps) to relative data (the timer period sums), then share with resolveLaps()
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
    ].join(':')}`
  }

  const command = (type, callback) => (time = Date.now()) => callback(time) && events.push({
    type,
    timestamp: time,
  })

  const start = command('start',
  time => !state.running && setState({running: true, startTime: time}))
  const pause = command('pause',
  () => state.running && !state.paused && setState({paused: true}))
  const resume = command('resume',
  () => state.running && state.paused && setState({paused: false}))
  const stop = command('stop',
  time => state.running && setState({endTime: time, running: false}))
  const lap = command('lap',
  time => state.running && !state.paused && setLaps([...laps, time]))
  const clear = () => !state.running && (state = {}) && (events = [])

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
