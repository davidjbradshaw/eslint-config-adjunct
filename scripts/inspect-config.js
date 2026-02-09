const adj = require('../index.js')
const cfgs = adj()
const arrays = []
const sonar = []
const envs = []
for (let i = 0; i < cfgs.length; i++) {
  const c = cfgs[i]
  if (Array.isArray(c.plugins)) arrays.push(i)
  if (c && c.plugins && !Array.isArray(c.plugins) && c.plugins.sonarjs) sonar.push(i)
  if (c && 'env' in c) envs.push(i)
}
console.log('Plugins arrays at indices:', arrays)
console.log('Configs registering sonarjs at indices:', sonar)
sonar.forEach((i)=>{
  const c=cfgs[i]
  console.log('IDX', i, 'keys', Object.keys(c), 'name', c.name)
})
console.log('Configs containing env at indices:', envs)
envs.forEach((i)=>{
  const c=cfgs[i]
  console.log('ENV IDX', i, 'keys', Object.keys(c), 'name', c.name)
  const ruleKeys = c.rules ? Object.keys(c.rules) : []
  console.log('first rules', ruleKeys.slice(0,10))
})

// Trace no-use-extend-native rule and plugin registration
let nueIndex = -1
for (let i = 0; i < cfgs.length; i++) {
  const c = cfgs[i]
  if (c.rules && c.rules['no-use-extend-native/no-use-extend-native']) {
    nueIndex = i
    break
  }
}
if (nueIndex !== -1) {
  console.log('no-use-extend-native rule at index', nueIndex)
  for (let i = Math.max(0, nueIndex - 3); i <= nueIndex; i++) {
    const c = cfgs[i]
    const hasPluginMap = c && c.plugins && !Array.isArray(c.plugins)
    const hasPlugin = hasPluginMap && !!c.plugins['no-use-extend-native']
    console.log('  idx', i, 'keys', Object.keys(c), 'hasPluginMap', hasPluginMap, 'hasPlugin', hasPlugin)
    if (hasPlugin) {
      const p = c.plugins['no-use-extend-native']
      console.log('   plugin export keys', Object.keys(p))
      console.log('   plugin rule keys', p.rules && Object.keys(p.rules))
    }
  }
}
