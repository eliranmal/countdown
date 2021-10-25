import React from 'react'

import './Settings.css'


const Settings = ({
  timerDuration,
  timerThreshold,
  timerDirection,
  setTimerDuration,
  setTimerThreshold,
  setTimerDirection,
}) => {

  const renderTimeSegmentInput = (segmentKey, timeObj, onChange) => (<input type="number"
    className={`cd-settings-input cd-settings-input-${segmentKey}`}
    key={segmentKey}
    value={timeObj[segmentKey]}
    onChange={onChange} />)

  const renderDurationTimeSegmentInput = segmentKey => renderTimeSegmentInput(
    segmentKey, timerDuration, e => setTimerDuration({
      ...timerDuration,
      [segmentKey]: +e.target.value,
    }))

  const renderThresholdTimeSegmentInput = segmentKey => renderTimeSegmentInput(
    segmentKey, timerThreshold, e => setTimerThreshold({
      ...timerThreshold,
      [segmentKey]: +e.target.value,
    }))


  return (
    <div className="cd-settings">
      {/* todo - the wrapper is part of the modal behavior; extract a modal component! */}
      <div className="cd-settings-wrapper">
        <div
          className="cd-settings-field"
          data-tip="sets the initial time for the timer (hours / minutes / seconds / milliseconds)"
          >
          <label className="cd-settings-label">initial duration</label>
          <div className="cd-settings-input-box">
            {['hours', 'minutes', 'seconds', 'milliseconds']
              .map(renderDurationTimeSegmentInput)}
          </div>
        </div>
        <div
          className="cd-settings-field"
          data-tip="a notification will be shown every time a lap exceeds this value (hours / minutes / seconds / milliseconds)"
          >
          <label className="cd-settings-label">lap threshold</label>
          <div className="cd-settings-input-box">
            {['hours', 'minutes', 'seconds', 'milliseconds']
              .map(renderThresholdTimeSegmentInput)}
          </div>
        </div>
        <div
          className="cd-settings-field"
          data-tip="whether to count backwards (the default) or forwards. experimental!"
          >
          <label
            className="cd-settings-label"
            htmlFor="cd-settings-input-direction"
            >direction</label>
          <input
            className="cd-settings-input"
            type="checkbox"
            id="cd-settings-input-direction"
            data-checked="up"
            data-unchecked="down"
            onChange={e => setTimerDirection(e.target.checked ? 'up' : 'down')}
            />
        </div>
      </div>
    </div>
  );
}


export default Settings
