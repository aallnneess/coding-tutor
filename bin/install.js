#!/usr/bin/env node

import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const projectRoot = path.join(__dirname, '..')
const home = process.env.HOME || process.env.USERPROFILE
const codexHome = process.env.CODEX_HOME || path.join(home, '.codex')

const agents = {
  'claude-code': {
    detect: path.join(home, '.claude'),
    target: (skillName) => path.join(home, '.claude', 'commands'),
    filename: (skillName) => `${skillName}.md`,
    label: 'Claude Code',
    usage: (skillName) => `Use /${skillName} to start a session.`,
  },
  cursor: {
    detect: path.join(home, '.cursor'),
    target: (skillName) => path.join(home, '.cursor', 'skills'),
    filename: (skillName) => `${skillName}.md`,
    label: 'Cursor',
    usage: (skillName) => `Use /${skillName} to start a session.`,
  },
  opencode: {
    detect: path.join(home, '.config', 'opencode'),
    target: (skillName) => path.join(home, '.config', 'opencode', 'skills', skillName),
    filename: () => 'SKILL.md',
    label: 'OpenCode',
    usage: (skillName) => `Use /${skillName} to start a session.`,
  },
  codex: {
    detect: codexHome,
    target: (skillName) => path.join(codexHome, 'skills', skillName),
    filename: () => 'SKILL.md',
    label: 'Codex',
    usage: (skillName) => `Mention ${skillName} in your next Codex prompt to use this skill.`,
  },
}

// Parse --skill flag
const skillFlag = process.argv.indexOf('--skill')
const skillName = skillFlag !== -1 ? process.argv[skillFlag + 1] : null

// Parse --agent flag
const agentFlag = process.argv.indexOf('--agent')
const forcedAgent = agentFlag !== -1 ? process.argv[agentFlag + 1] : null

// List available skills
function getAvailableSkills() {
  return fs.readdirSync(projectRoot).filter(dir => {
    const skillPath = path.join(projectRoot, dir, 'skill.md')
    return fs.existsSync(skillPath)
  })
}

// Show help and available skills
function showHelp() {
  const skills = getAvailableSkills()
  console.log('\nUsage: npx coding-tutor-skill --skill <name> [--agent <agent>] [--print]')
  console.log('\nAvailable skills:', skills.join(', ') || '(none)')
  console.log('Supported agents:', Object.keys(agents).join(', '))
  console.log('\nExamples:')
  console.log('  npx coding-tutor-skill --skill tutor')
  console.log('  npx coding-tutor-skill --skill tutor --agent claude-code')
  console.log('  npx coding-tutor-skill --skill tutor --agent codex')
  console.log('  npx coding-tutor-skill --skill tutor --print\n')
  process.exit(1)
}

// If no skill specified, show help
if (!skillName) {
  showHelp()
}

// Validate skill exists
const skillSrc = path.join(projectRoot, skillName, 'skill.md')
if (!fs.existsSync(skillSrc)) {
  console.error(`\nSkill "${skillName}" not found.`)
  const skills = getAvailableSkills()
  console.log('Available skills:', skills.join(', ') || '(none)')
  process.exit(1)
}

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

  const targetDir = agent.target(skillName)
  const targetFile = agent.filename(skillName)

  fs.mkdirSync(targetDir, { recursive: true })
  fs.copyFileSync(skillSrc, path.join(targetDir, targetFile))

  console.log(`\n✓ ${skillName} skill installed for ${agent.label}`)
  console.log(`  ${agent.usage(skillName)}\n`)
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
    console.log('Supported agents:', Object.keys(agents).join(', '))
    console.log('\nSpecify an agent:')
    console.log(`  npx coding-tutor-skill --skill ${skillName} --agent claude-code`)
    console.log(`  npx coding-tutor-skill --skill ${skillName} --agent cursor`)
    console.log(`  npx coding-tutor-skill --skill ${skillName} --agent opencode`)
    console.log(`  npx coding-tutor-skill --skill ${skillName} --agent codex\n`)
    process.exit(1)
  }
}
