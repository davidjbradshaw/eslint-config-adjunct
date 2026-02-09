const mod = require(process.argv[2])
const plugin = mod && (mod.default || mod)
console.log('Export keys:', Object.keys(plugin))
console.log('Rule keys:', plugin.rules && Object.keys(plugin.rules))
