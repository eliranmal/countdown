import React, {useRef, useState, useEffect} from 'react'
import {iterator as colors} from '../../lib/colors'
import { ReactSVG } from 'react-svg'

import './Icon.css'


const Icon = ({ name, color, size = '24px', ...props }) => {

  // true value signals that the icon color should be chosen internally
  const iconColor = color === true ?
    colors.next() :
      color || 'var(--redhat)'

  return <ReactSVG
    src={require(`../../images/icons/${name}.svg`).default}
    className="cd-icon"
    style={{
      '--icon-size': size,
      '--icon-color': iconColor,
      ...props.style
    }}
  />
}


export default Icon
