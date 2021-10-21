import React from 'react'

import Icon from '../icon/Icon'

import './Button.css'


const baseIconProps = {
  size: '50%',
  color: '#ccc',
}

const iconPropMap = {
  play: { ...baseIconProps, style: {
    marginRight: '-6%',
    marginLeft: '6%',
  }},
  stop: { ...baseIconProps, size: '45%' },
  pause: baseIconProps,
  eject: { ...baseIconProps, style: {
    marginRight: '-6%',
    transform: 'rotate(90deg)',
  }},
  rotate: { ...baseIconProps, size: '65%', style: {
    marginRight: '-4%',
    marginLeft: '4%',
    transform: 'rotate(90deg)',
  }},
  io: { ...baseIconProps, size: '60%', style: {
    marginTop: '-6%',
  } },
  cog: { ...baseIconProps, size: '55%' },
}

const Button = ({text = '', icon, tooltip, className, ...props}) => (<button
  data-tip={tooltip}
  className={`cd-button ${className}`}
  {...props}
  >{<Icon
    name={icon} {...(
      icon in iconPropMap ? iconPropMap[icon] : {}
    )} />}{text}</button>)


export default Button
