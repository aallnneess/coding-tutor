# coding-tutor-skill

A learning toolkit for AI coding agents. Turns Claude Code, Cursor, OpenCode, or any supported agent into a programming mentor that guides without doing the work for you.

## Skills

| Skill | Command | Purpose |
|-------|---------|---------|
| **tutor** | `/tutor` | Learn concepts while building your project |
| **challenger** | `/challenger` | Get practice challenges to reinforce learning |
| **debugger** | `/debugger` | Learn to debug systematically |
| **explainer** | `/explainer` | Deep-dive into code, libraries, concepts |
| **reviewer** | `/reviewer` | Get mentor-style code review |
| **lecture** | `/lecture <topic>` | Grok concepts through Socratic dialogue |

## Install

Install a skill:

```bash
npx coding-tutor-skill --skill tutor
npx coding-tutor-skill --skill lecture
npx coding-tutor-skill --skill debugger
```

Auto-detects your agent. Or specify one explicitly:

```bash
npx coding-tutor-skill --skill tutor --agent claude-code
npx coding-tutor-skill --skill tutor --agent cursor
npx coding-tutor-skill --skill tutor --agent opencode
```

List available skills:

```bash
npx coding-tutor-skill
```

Print raw prompt for manual install:

```bash
npx coding-tutor-skill --skill tutor --print
```

## Usage Examples

```
/tutor          → Start learning while building your project
/challenger     → Get a coding challenge for what you just learned
/debugger       → Get guided through finding a bug yourself
/explainer      → Understand unfamiliar code or library
/reviewer       → Get your code reviewed with specific feedback
/lecture https  → Deep-dive into how HTTPS works
```

## Philosophy

All skills share the same teaching philosophy:

- **You do the work** — skills guide, they don't write code for you
- **Learning by building** — concepts anchored to your active project
- **Learning by analogy** — new concepts mapped to what you know
- **One concept at a time** — no overwhelming knowledge dumps

## Project Structure

```
coding-tutor/
├── tutor/
│   └── skill.md
├── challenger/
│   └── skill.md
├── debugger/
│   └── skill.md
├── explainer/
│   └── skill.md
├── reviewer/
│   └── skill.md
├── lecture/
│   └── skill.md
├── bin/
│   └── install.js
└── package.json
```

## Supported Agents

| Agent | Status |
|-------|--------|
| Claude Code | Supported |
| Cursor | Supported |
| OpenCode | Supported |
| Other | Use `--print` for manual install |
