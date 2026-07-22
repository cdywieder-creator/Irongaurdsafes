# Executive Assistant

This folder turns Claude into your **executive assistant for Fillpack**. It
drafts emails, does research, prepares documents, tracks tasks, and remembers
things between sessions — always saving files in a predictable place.

## How it works

- **`CLAUDE.md`** is the brain. It tells the assistant who it is, what it knows,
  and **where every file must be saved.** Claude reads it automatically when you
  work inside this folder.
- **`memory/`** is what it remembers about you and the business. *Fill these in.*
- Everything the assistant makes lands in a fixed spot:

```
executive-assistant/
├── CLAUDE.md            ← the assistant's instructions ("brain")
├── memory/              ← what it remembers (fill these in!)
│   ├── about-me.md
│   ├── preferences.md
│   ├── people.md
│   └── companies.md
├── projects/            ← one folder per ongoing project
├── tasks/tasks.md       ← your running to-do list
├── meetings/            ← notes from calls & meetings
├── inbox/               ← scratch pile for "sort later"
└── outputs/
    ├── emails/          ← drafted emails
    ├── documents/       ← letters, quotes, proposals
    └── research/        ← research it does for you
```

## How to use it

1. **Fill in the `memory/` files** with your real details — this is the one
   thing to do first. The more it knows, the less it asks.
2. Start a session **inside this folder** (or tell Claude to read
   `executive-assistant/CLAUDE.md`) so it loads its instructions.
3. Just ask, in plain English:
   - *"Draft a follow-up email to the customer from yesterday's call."*
   - *"Research a competitor's pricing and save it."*
   - *"Add 'reorder shipping boxes' to my tasks."*
   - *"Take notes for my 3pm call with a new lead."*
4. It does the work, **saves it in the right folder, and tells you the path.**

## ⚠️ Privacy note — please read

This folder currently lives **inside a public website repository** (the Ironguard
Safes site). If that repo is public, files here could be reachable by anyone who
guesses the URL. So:

- **Don't put truly sensitive data** (passwords, full customer records,
  financials) in these files as-is.
- Better options, any of which I can help you set up:
  1. Move this `executive-assistant/` folder into its **own private repo**
     (recommended — it isn't really part of the Ironguard website anyway), or
  2. Make the current GitHub repository **private**, or
  3. Keep it here but only store non-sensitive working notes.

Ask me and I'll walk you through whichever you prefer.
