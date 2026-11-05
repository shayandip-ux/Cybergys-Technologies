import { spawn } from 'node:child_process'

const npmCommand = process.platform === 'win32' ? 'npm.cmd' : 'npm'
const services = [
  ['client', ['run', 'dev', '--workspace=client']],
  ['server', ['run', 'dev', '--workspace=server']],
]

let stopping = false

const children = services.map(([name, args]) => {
  const child = spawn(npmCommand, args, { stdio: 'inherit' })
  child.on('exit', (code) => {
    if (code && !stopping) {
      console.error(`${name} exited with code ${code}`)
      shutdown(code)
    }
  })
  return child
})

function shutdown(exitCode = 0) {
  if (stopping) return
  stopping = true
  children.forEach((child) => child.kill('SIGTERM'))
  process.exit(exitCode)
}

process.on('SIGINT', () => shutdown())
process.on('SIGTERM', () => shutdown())
