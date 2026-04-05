# coding-tutor-skill

A coding tutor skill for AI agents. Turns Claude Code, Cursor, or any supported agent into a programming mentor that teaches through building and analogy.

## Install

```bash
npx coding-tutor-skill
```

Auto-detects your agent. Or specify one explicitly:

```bash
npx coding-tutor-skill --agent claude-code
npx coding-tutor-skill --agent cursor
```

Print the raw prompt for manual install in any other agent:

```bash
npx coding-tutor-skill --print
```

## Usage

After install, start a session:

```
/tutor
```

The tutor will ask what you're building and what you already know — then guide you through it step by step.

## Teaching approach

- **Learning by building** — every concept is anchored to your active project
- **Learning by analogy** — new concepts are mapped to things you already know
- **You write the code** — the tutor explains and reviews, never writes for you
- **One concept at a time** — no jumping ahead

## Supported agents

| Agent | Status |
|---|---|
| Claude Code | ✅ |
| Cursor | ✅ |
| Other | Use `--print` for manual install |
