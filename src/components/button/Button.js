import React from 'react'
import Icon from '../icon/Icon'

import './Button.css'


const iconPropMap = {
  play: { size: '45%', style: {
    marginRight: '-6%',
  }},
  pause: { size: '45%' },
  eject: { size: '45%', style: {
    marginRight: '-6%',
    transform: 'rotate(90deg)',
  }},
  stop: { size: '45%' },
  rotate: { size: '60%', style: {
    marginRight: '-6%',
    transform: 'rotate(90deg)',
  }},
  io: { size: '60%', style: {
    marginTop: '-6%',
  } },
  cog: { size: '55%' },
}

const Button = ({text = '', icon, tooltip, className, ...props}) => (<button
  data-tip={tooltip}
  className={`cd-button ${className}`}
  {...props}
  ><Icon name={icon} {...iconPropMap[icon]} />{text}</button>)


export default Button
