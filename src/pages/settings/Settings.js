import React from 'react'

import './Settings.css'


const Settings = ({timerThreshold, setTimerThreshold, timerDuration, setTimerDuration}) => {

  const renderTimeSegmentInput = (segmentKey, timeObj, onChange) => (<input type="number"
    className={`cd-settings-input cd-settings-input-${segmentKey}`}
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
      <label className="cd-settings-label">threshold</label>
      <div className="cd-settings-box">
        {['hours', 'minutes', 'seconds', 'milliseconds']
            .map(renderThresholdTimeSegmentInput)}
      </div>
      <label className="cd-settings-label">duration</label>
      <div className="cd-settings-box">
        {['hours', 'minutes', 'seconds', 'milliseconds']
            .map(renderDurationTimeSegmentInput)}
      </div>
    </div>
  );
}


export default Settings
