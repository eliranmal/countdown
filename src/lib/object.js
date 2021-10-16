
// mutates obj!
export const patch = (obj = {}, newObj = {}) => Object.assign(obj, newObj)

export const serialize = (...args) => args.length ? JSON.stringify(...args) : ''

export const deserialize = string => JSON.parse(string ?? '{}')
