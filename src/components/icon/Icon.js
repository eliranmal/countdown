import React, {useRef, useState, useEffect} from 'react'
import {iterator as colors} from '../../lib/colors'


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
    const { current: IconComponent } = IconRef
    const iconColor = color || colors.next().value

    return <IconComponent
      width={size}
      height={size}
      stroke={iconColor}
      fill={iconColor}
       {...props} />
  }

  return null;
}


export default Icon
