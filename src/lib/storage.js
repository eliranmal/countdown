import {serialize, deserialize} from './object'


const load = key => window.localStorage && window.localStorage.getItem(key)

const save = (key, obj) => window.localStorage && window.localStorage.setItem(key, obj)


export const loadObject = key => deserialize(load(key))

export const saveObject = (key, obj) => save(key, serialize(obj))
