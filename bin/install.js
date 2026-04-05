#!/usr/bin/env node

import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const home = process.env.HOME || process.env.USERPROFILE

const agents = {
  'claude-code': {
    detect: path.join(home, '.claude'),
    target: path.join(home, '.claude', 'skills'),
    label: 'Claude Code',
    usage: 'Use /tutor to start a tutoring session.',
  },
  cursor: {
    detect: path.join(home, '.cursor'),
    target: path.join(home, '.cursor', 'skills'),
    label: 'Cursor',
    usage: 'Use /tutor in the Cursor chat to start a tutoring session.',
  },
}

const skillSrc = path.join(__dirname, '..', 'skills', 'tutor.md')

// Allow explicit agent override: --agent claude-code | cursor
const agentFlag = process.argv.indexOf('--agent')
const forcedAgent = agentFlag !== -1 ? process.argv[agentFlag + 1] : null

// Print raw prompt and exit
if (process.argv.includes('--print')) {
  console.log(fs.readFileSync(skillSrc, 'utf8'))
  process.exit(0)
}

function install(agentKey) {
  const agent = agents[agentKey]
  if (!agent) {
    console.error(`Unknown agent "${agentKey}". Supported: ${Object.keys(agents).join(', ')}`)
    process.exit(1)
  }

  fs.mkdirSync(agent.target, { recursive: true })
  fs.copyFileSync(skillSrc, path.join(agent.target, 'tutor.md'))

  console.log(`\n✓ coding-tutor-skill installed for ${agent.label}`)
  console.log(`  ${agent.usage}\n`)
}

if (forcedAgent) {
  install(forcedAgent)
} else {
  // Auto-detect
  const detected = Object.keys(agents).find(key =>
    fs.existsSync(agents[key].detect)
  )

  if (detected) {
    console.log(`Detected ${agents[detected].label} — installing...`)
    install(detected)
  } else {
    console.log('\nNo supported agent detected.')
    console.log('Supported agents: claude-code, cursor')
    console.log('\nOptions:')
    console.log('  npx coding-tutor-skill --agent claude-code')
    console.log('  npx coding-tutor-skill --agent cursor')
    console.log('  npx coding-tutor-skill --print   (print raw prompt)\n')
    process.exit(1)
  }
}
