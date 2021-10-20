import React, {useRef, useState, useEffect} from 'react'
import {iterator as colors} from '../../lib/colors'
import './Icon.css'


const Icon = ({ name, color, size = '24px', ...props }) => {
  const IconRef = useRef(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    (async () => (
      await import(`!!@svgr/webpack?-svgo,+titleProp,+ref!../../images/icons/${name}.svg`)
    ).default)
    .call(null, setLoading(true))
    .then(iconComponent => (IconRef.current = iconComponent))
    .finally(() => setLoading(false))
  }, [name])

  if (!loading && IconRef.current) {
    // true value signals that the icon color should be choosed internally
    const iconColor = color === true ?
      colors.next() :
      color || 'var(--redhat)'
    const { current: IconComponent } = IconRef

    return <IconComponent
      className="cd-icon"
      width={size}
      height={size}
      stroke={iconColor}
      fill={iconColor}
      {...props}
    />
  }

  return <>$nbsp;</>;
}


export default Icon
