# Commit Message Skill

Use this skill when the user asks to generate, improve, or validate a Git commit message.

## Purpose

Generate concise Git commit messages that follow Conventional Commits and accurately describe the provided diff, staged changes, or implementation summary.

## Inputs

Use the best available source of truth in this order:

- The diff or change summary provided by the user.
- The current staged diff from `git diff --cached` when the user asks for a commit message for staged changes.
- The current working tree diff from `git diff` when staged changes are not available and the user asks for a commit message for local changes.
- The user's plain-language description when no repository diff is available.

Do not invent changes that are not visible in the provided input or repository diff.

## Workflow

1. Inspect the relevant changes before writing the commit message.
2. Identify the single best Conventional Commit type.
3. Add a scope only when the changes clearly affect one module, package, feature, or config area.
4. Write the subject in imperative mood.
5. Write the body as a short bullet list of concrete changes.
6. Return only the commit message unless the user explicitly asks for explanation or alternatives.

## Allowed Types

- `feat`: add user-facing functionality.
- `fix`: fix a bug or incorrect behavior.
- `docs`: change documentation only.
- `style`: change formatting without changing behavior.
- `refactor`: restructure code without changing behavior.
- `test`: add or update tests.
- `chore`: update tooling, dependencies, configuration, generated files, or maintenance tasks.

## Format

Return the commit message exactly in this format:

```text
<type>(<scope>): <short imperative description>

- <imperative bullet>
- <imperative bullet>
```

If there is no clear scope, omit it:

```text
<type>: <short imperative description>

- <imperative bullet>
- <imperative bullet>
```

## Rules

- Do not wrap the final commit message in Markdown code fences unless the user asks for formatted examples.
- Do not add introductions, explanations, signatures, or closing comments when returning the final commit message.
- Keep the subject concise, preferably under 72 characters.
- Separate the subject and body with exactly one blank line.
- Make the body mandatory for non-trivial changes.
- Use hyphen bullets only.
- Keep each bullet focused on one concrete change.
- Prefer imperative wording, for example `Add`, `Fix`, `Update`, `Remove`, `Refactor`.
- Do not use past tense such as `Added`, `Fixed`, or `Updated`.
- Do not include issue IDs, breaking-change footers, or co-author trailers unless the user provides them or explicitly asks for them.

## Examples

```text
feat(auth): add password reset flow

- Add reset token request endpoint
- Add password reset form validation
- Show confirmation state after successful request
```

```text
chore: initialize Next.js app

- Add App Router project structure
- Add TypeScript and ESLint configuration
- Add default Git ignore rules
```
