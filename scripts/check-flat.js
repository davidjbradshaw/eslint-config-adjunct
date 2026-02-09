const adj = require('../index.js')
const cfgs = adj()
let bad = []
cfgs.forEach((c, i) => {
  if (!c || typeof c !== 'object' || Array.isArray(c)) bad.push(i)
})
console.log('Total configs:', cfgs.length)
console.log('Non-object entries at indices:', bad)
