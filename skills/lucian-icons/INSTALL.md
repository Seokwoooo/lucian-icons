# Install lucian-icons

Download https://lucianlabs.dev/icons/downloads/lucian-icons-skill-2.0.1.zip and unzip it. The archive contains one `lucian-icons` folder with SKILL.md, CLI, catalog, per-icon code, examples and license. Node.js 18+ is required for the CLI. No package or global installation command is needed.

Claude Code: place that folder in `.claude/skills/lucian-icons/` inside a project, or `~/.claude/skills/lucian-icons/` for your user. Invoke `/lucian-icons` followed by your request. Natural-language requests naming the skill also work.

Codex: place it in `.agents/skills/lucian-icons/` inside a project, or `~/.agents/skills/lucian-icons/` for your user. Use `/skills` to select it or mention `$lucian-icons` in your request. Restart Codex if a newly installed skill does not appear.

Examples:

- 이 사이트의 아이콘을 Lucian Icons로 통일해줘.
- 삭제 버튼에 뚜껑이 열리는 쓰레기통 아이콘을 적용해줘.
- 알림 버튼의 벨 아이콘을 읽지 않은 알림 수에 맞춰 바꿔줘.
- 다운로드의 진행과 완료 상태에 맞춰 아이콘을 바꿔줘.

Official documentation checked on 2026-10-14:
https://code.claude.com/docs/en/skills
https://developers.openai.com/codex/skills

A full repository checkout can also be installed by copying `skills/lucian-icons` to the locations above. This documentation does not assume an npm package or marketplace entry exists.
