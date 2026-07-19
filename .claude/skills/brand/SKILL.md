---
name: brand
description: |
  Enter a brand session — the one-word way to scope all content work to one brand/folder.
  Sets the active brand (persisted in social-pages/.active), loads its full knowledge
  bank (profile, calendar, learnings) into context, and shows a status dashboard. All
  shortcut skills (/plan, /produce) and the heavy skills read this context automatically.
  Onboards the brand first if its folder doesn't exist.

  Triggers:
  - "/brand <name>", "switch to <brand>", "work on <brand>", "open <brand> session"
  - "which brand am i on", "brand status"
---

# brand — enter a brand's session

## `/brand <name>` (or "work on <brand>")

1. Resolve `<name>` → slug → `social-pages/<slug>/`.
   - **Exists** → activate. **Doesn't exist** → offer to onboard now (social-manager
     op 1: copy `_template/`, fill from what's known + one consolidated question).
2. Write the slug to `social-pages/.active` (plain text, one line). This is the session
   state — it persists across conversations until changed.
3. Load context: read `page.md` (identity, voice, pillars, constraints), `calendar.md`,
   `performance.md` **Learnings**. Keep them in working memory for the whole session.
4. Show the dashboard (compact):
   ```
   ● <Brand> — active
   Voice: <3 adjectives> · Pillars: <list> · Goal: <north star>
   Calendar: <n> planned / <n> drafted / <n> awaiting approval · next slot: <day/format>
   Top learnings: <2 bullets>
   Suggested next: /plan (calendar thin) or /produce next (drafts waiting)
   ```

## `/brand` with no name → show the active brand's dashboard (or list available brands
under `social-pages/` if none is active).

## Rules

- Every other skill that needs a page and gets none: read `social-pages/.active` FIRST —
  only ask "which brand?" if that file is missing/stale.
- Switching brands mid-conversation is fine — restate the new dashboard so context is
  visibly swapped. Never mix two brands' voices/assets in one operation.
- `.active` is local state — never commit it (social-pages/* is already gitignored
  except `_template/`).
