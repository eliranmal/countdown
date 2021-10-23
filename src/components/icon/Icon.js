import React from 'react'
import { ReactSVG } from 'react-svg'

import {iterator as colors} from '../../lib/colors'

import './Icon.css'


// true value signals that the icon color should be chosen internally
const resolveColor = color => color === true ?
  colors.next().value :
    color || 'var(--redhat)'

const Icon = ({ name, color, size = '24px', style = {}, className = '' }) => (<ReactSVG
    src={require(`../../images/icons/${name}.svg`).default}
    className={`cd-icon ${className}`}
    style={{
      '--icon-size': size,
      '--icon-color': resolveColor(color),
      ...style
    }}
  />)


export default Icon
