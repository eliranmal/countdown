import * as materialUiColors from 'material-ui-colors'

const colorNames = [
  'red',
  'pink',
  'purple',
  'deepPurple',
  'indigo',
  'blue',
  'lightBlue',
  'cyan',
  'teal',
  'green',
  'lightGreen',
  'lime',
  'yellow',
  'amber',
  'orange',
  'deepOrange',
  'brown',
  'grey',
  'blueGrey',
]

const colorLevels = [
  // '50',
  // '100',
  // '200',
  '300',
  '400',
  '500',
  '600',
  '700',
  '800',
  '900',
  'A100',
  // 'A200',
  // 'A400',
  // 'A700',
]

function* generateIterator() {
  const colorNamesLength = colorNames.length
  let count = 0
  for (let level of colorLevels) {
    for (let name of colorNames) {
      count++
      yield materialUiColors[name][level]
    }
  }
  return count;
}

const flattenColorMap = () => [].concat(...colorLevels
  .map(level => colorNames
    .map(name => materialUiColors[name][level])))

export default {
  flatMap: flattenColorMap(),
  iterator: generateIterator(),
}
