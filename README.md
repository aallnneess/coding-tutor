# coding-tutor-skill

A learning toolkit for AI coding agents. Turns Claude Code, Cursor, OpenCode, Codex, or any supported agent into a programming mentor that guides without doing the work for you.

## Skills

| Skill | Command | Purpose |
|-------|---------|---------|
| **tutor** | `/tutor` | Learn concepts while building your project |
| **challenger** | `/challenger` | Get practice challenges to reinforce learning |
| **debugger** | `/debugger` | Learn to debug systematically |
| **explainer** | `/explainer` | Deep-dive into code, libraries, concepts |
| **reviewer** | `/reviewer` | Get mentor-style code review |
| **lecture** | `/lecture <topic>` | Grok concepts through Socratic dialogue |
| **course-builder** | `/course` | Transform any syllabus into a personalized learning course |
| **interviewer** | `/interviewer` | Simulate a technical interview at junior, middle, or senior level |

## Install

Install a skill:

```bash
npx coding-tutor-skill --skill tutor
npx coding-tutor-skill --skill lecture
npx coding-tutor-skill --skill debugger
npx coding-tutor-skill --skill course-builder
```

Auto-detects your agent. Or specify one explicitly:

```bash
npx coding-tutor-skill --skill tutor --agent claude-code
npx coding-tutor-skill --skill tutor --agent cursor
npx coding-tutor-skill --skill tutor --agent opencode
npx coding-tutor-skill --skill tutor --agent codex
npx coding-tutor-skill --skill tutor --agent kilo-code
```

Kilo Code support is for the Kilo Code extension in VS Code. It installs a read-only Coding Tutor agent to:

```text
~/.config/kilo/agent/coding-tutor.md
```

Then select **Coding Tutor** from the Kilo Code VS Code agent picker.

Install from a cloned repository:

```bash
git clone https://github.com/zeufack/coding-tutor.git
cd coding-tutor
node ./bin/install.js --skill tutor --agent codex
```

Use this local install path when testing repository changes or when you want to install without `npx`.

For Codex, the installer writes the skill to:

```text
$CODEX_HOME/skills/<skill-name>/SKILL.md
```

If `CODEX_HOME` is not set, it falls back to:

```text
~/.codex/skills/<skill-name>/SKILL.md
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
/course         → Build a personalized course from any syllabus
/interviewer    → Run a technical interview (junior/middle/senior, assistant/challenge/guide)
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
├── course-builder/
│   └── skill.md
├── interviewer/
│   └── skill.md
├── kilo-code/
│   └── agent/
│       └── coding-tutor.md
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
| Codex | Supported |
| Kilo Code for VS Code | Supported |
| Other | Use `--print` for manual install |
