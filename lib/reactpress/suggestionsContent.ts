const REACTPRESS_GITHUB = 'https://github.com/fecommunity/reactpress'
const REACTPRESS_SITE = 'https://reactpress.surge.sh/'

const suggestionsHtmlEn = `
<p>Thank you for using ReactPress. We welcome your ideas, bug reports, and documentation feedback.</p>
<h2>Share your thoughts</h2>
<ul>
<li>Report bugs or UX issues on the <a href="${REACTPRESS_GITHUB}/issues" rel="noopener noreferrer">GitHub issue tracker</a>.</li>
<li>Suggest features for the CLI, admin console, or theme toolkit.</li>
<li>Share deployment guides for platforms beyond Vercel.</li>
<li>Tell us which documentation topics need clearer examples.</li>
</ul>
<h2>Contributing</h2>
<p>ReactPress is open source under the MIT license. Fork the repository, run <code>pnpm install</code> and <code>pnpm run dev</code>, and open a pull request. Meaningful contributions are credited in the README.</p>
<h2>Related reading</h2>
<ul>
<li><a href="/article/what-is-reactpress/">What is ReactPress?</a></li>
<li><a href="/article/quick-start/">Quick Start with ReactPress</a></li>
<li><a href="${REACTPRESS_SITE}" rel="noopener noreferrer">Official documentation</a></li>
<li><a href="${REACTPRESS_GITHUB}" rel="noopener noreferrer">GitHub repository</a></li>
</ul>
`.trim()

const suggestionsHtmlZh = `
<p>感谢使用 ReactPress。欢迎反馈想法、Bug 与文档改进建议。</p>
<h2>分享你的想法</h2>
<ul>
<li>在 <a href="${REACTPRESS_GITHUB}/issues" rel="noopener noreferrer">GitHub Issue</a> 反馈 Bug 或体验问题。</li>
<li>为 CLI、管理端或主题工具包提出功能建议。</li>
<li>分享 Vercel 之外平台的部署实践经验。</li>
<li>告诉我们哪些文档主题需要更清晰的示例。</li>
</ul>
<h2>参与贡献</h2>
<p>ReactPress 基于 MIT 协议开源。Fork 仓库后执行 <code>pnpm install</code> 与 <code>pnpm run dev</code>，提交 Pull Request 即可参与贡献。</p>
<h2>延伸阅读</h2>
<ul>
<li><a href="/article/what-is-reactpress/">什么是 ReactPress？</a></li>
<li><a href="/article/quick-start/">ReactPress 快速上手</a></li>
<li><a href="${REACTPRESS_SITE}" rel="noopener noreferrer">官方文档</a></li>
<li><a href="${REACTPRESS_GITHUB}" rel="noopener noreferrer">GitHub 仓库</a></li>
</ul>
`.trim()

/** Theme starter fallback — switches with visitor locale on the suggestions page. */
export function getSuggestionsPageHtml(locale: string, cmsHtml?: string) {
  if (locale === 'zh') return suggestionsHtmlZh
  return cmsHtml?.trim() || suggestionsHtmlEn
}
