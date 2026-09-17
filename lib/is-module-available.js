import { createRequire } from 'node:module'

const require = createRequire(import.meta.url)

export default function isModuleAvailable(name) {
  try {
    require.resolve(name)
    return true
  } catch (error) {
    // Only ignore module-not-found errors; rethrow everything else
    if (
      error &&
      (error.code === 'MODULE_NOT_FOUND' ||
        /Cannot find module/.test(error.message))
    ) {
      return false
    }
    throw error
  }
}
