# 参与贡献

感谢你对 ReactPress Theme Starter 的关注。本仓库是 [ReactPress](https://github.com/fecommunity/reactpress) 官方 Headless 访客站主题。

**English:** [CONTRIBUTING.md](./CONTRIBUTING.md)

---

## 贡献方式

- 通过 [GitHub Issues](https://github.com/fecommunity/reactpress-theme-starter/issues) 报告 Bug 或提出功能建议
- 改进文档（README、注释、Mock 数据）
- 修复 Bug 或优化主题组件 UI/UX
- 扩展 Mock API，便于本地开发

较大改动（新路由、破坏性 API 假设、大规模重构）请先开 Issue 讨论范围。

---

## 开发环境

### 前置要求

- Node.js **20+**
- pnpm **9+**（本仓库仅使用 pnpm）

### 快速开始（Mock 模式 — 无需后台）

```bash
git clone https://github.com/fecommunity/reactpress-theme-starter.git
cd reactpress-theme-starter
pnpm install
pnpm dev:mock
```

浏览器访问 **http://localhost:3001**。

### 对接真实 API

将 [`.env.example`](./.env.example) 复制为 `.env`，配置 ReactPress API 地址后运行 `pnpm dev`。

完整配置、脚本与部署说明见 [README_zh.md](./README_zh.md)。

---

## 项目约定

| 领域      | 约定                                                                                                 |
| :-------- | :--------------------------------------------------------------------------------------------------- |
| 包管理器  | 仅使用 `pnpm`，勿提交 `package-lock.json` / `yarn.lock`                                              |
| 技术栈    | Next.js 15 App Router、React 19、Tailwind CSS 4                                                      |
| 数据层    | `@fecommunity/reactpress-toolkit` — 避免在主题中重复实现 API 客户端                                  |
| 图片      | 主题 UI 图片使用 [`ThemeImage`](./components/shared/ThemeImage.tsx)（`next/image`）                  |
| Mock 数据 | 英文示例内容位于 [`lib/mock-api/data.ts`](./lib/mock-api/data.ts)                                    |
| 提交信息  | [Conventional Commits](https://www.conventionalcommits.org/) — 如 `feat:`、`fix:`、`docs:`、`chore:` |

---

## 质量检查

提交 Pull Request 前请运行：

```bash
pnpm run check        # ESLint + Prettier
pnpm run typecheck    # TypeScript（tsc --noEmit）
```

### 冒烟测试（可选）

Mock 开发服务器运行中：

```bash
pnpm dev:mock &
node scripts/smoke-pages.mjs http://127.0.0.1:3001
```

---

## Pull Request 指南

1. 从 `master`（或 `main`）拉分支，命名清晰，如 `fix/search-hero-a11y`。
2. **范围** — 保持 PR 聚焦，尽量一次只做一个逻辑变更。
3. **测试** — UI 改动可手动验证，在 PR 描述中说明测试内容。
4. **文档** — 行为或安装步骤变更时同步更新 README / CONTRIBUTING。
5. **勿提交密钥** — 不要提交 `.env`、API Key、Token 或内部 URL。

---

## 行为准则

本项目遵循 [Contributor Covenant 行为准则](./CODE_OF_CONDUCT.md)。参与即表示同意遵守。

---

## 获取帮助

- [ReactPress 文档](https://reactpress.surge.sh/)
- [ReactPress 源码](https://github.com/fecommunity/reactpress)
- [GitHub Issues](https://github.com/fecommunity/reactpress-theme-starter/issues)
