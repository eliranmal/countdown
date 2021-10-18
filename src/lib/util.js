
export const durationAsString = (time, withSign) => {
  const {hours, minutes, seconds, milliseconds} = durationAsMap(time)
  return `${withSign ? (time < 0 ? '-' : ' ') : ''}${
    [hours, minutes, seconds].join(':')
  }.${milliseconds}${withSign ? ' ' : ''}`
}

export const padNumber = (str, length = 2) => `${str}`.padStart(length, '0')

export const durationAsMap = time => {
  const parseSegment = (timestamp, padLength) => {
    return padNumber(Math.abs(Math[time < 0 ? 'ceil' : 'floor'](timestamp)), padLength)
  }
  return {
    hours: parseSegment(time / 1000 / 60 / 60),
    minutes: parseSegment((time / 1000 / 60) % 60),
    seconds: parseSegment((time / 1000) % 60),
    milliseconds: parseSegment(time % 1000, 3),
  }
}

export const mapAsDuration = ({hours, minutes, seconds, milliseconds}) => {
  return (hours * 60 * 60 * 1000) + (minutes * 60 * 1000) + (seconds * 1000) + milliseconds
}
