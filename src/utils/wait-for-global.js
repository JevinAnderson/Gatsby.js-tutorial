const globals = {}

export function waitForGlobal(key) {
  if (typeof window === 'undefined') return Promise.reject('This tool is meant to be used only on client side logic')

  if (globals[key]) return globals[key]

  const promise = new Promise(resolve => {
    const interval = setInterval(() => {
      const global = window[key]
      if (global) {
        clearInterval(interval)
        resolve(global)
      }
    }, 250)
  })

  return (globals[key] = promise)
}

export default waitForGlobal
