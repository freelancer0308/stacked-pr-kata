---
theme: default
title: Stacked Pull Requests
info: |
  三分鐘介紹 GitHub Stacked Pull Requests，聚焦 Developer 與 Reviewer 的 Before / After。
colorSchema: light
aspectRatio: 16/9
canvasWidth: 1280
transition: slide-left
mdc: true
fonts:
  sans: Inter, Noto Sans TC
  mono: JetBrains Mono
---

<div class="eyebrow">Stacked Pull Requests · 3 min</div>

# 下一個改動依賴還沒 Merge 的 PR，怎麼辦？

<p class="subtitle">大型功能有先後關係，但我們不想等，也不想讓 Reviewer 一次吞下所有變更。</p>

<div class="two-col">
  <v-click>
    <div class="choice-card">
      <h3><span class="choice-index">A</span>全部放進一個 PR</h3>
      <p>Developer 可以一路做完，Reviewer 卻要同時理解 Entity、ModelSpec、ApiSpec 與 ServiceImpl。</p>
      <p><strong>結果：一個很完整，也很難讀的 diff。</strong></p>
    </div>
  </v-click>

  <v-click>
    <div class="choice-card">
      <h3><span class="choice-index">B</span>自己串相依 Branches</h3>
      <p>每個 PR 比較聚焦，但 base、rebase、force push、merge 順序都要自己維護。</p>
      <p><strong>結果：Reviewer 輕鬆一點，Developer 多管很多事。</strong></p>
    </div>
  </v-click>
</div>

<v-click>
  <div class="existing-stack">
    <span>hunger_api 已經在手工做：</span>
    <strong>PR #699</strong><span class="arrow">→</span>
    <strong>PR #702</strong><span class="arrow">→</span>
    <strong>PR #713</strong>
  </div>
</v-click>

<!--
大功能常有順序，例如 Entity、ModelSpec、ApiSpec、ServiceImpl。下一步依賴前一步，但前面的 PR 還沒 merge。
我們通常不是全部塞進一個大 PR，就是自己從 feature branch 再切 branch。
其實 hunger_api 的 #699、#702、#713 已經在手工做這件事了。
-->

---

<div class="eyebrow">After</div>

# GitHub 正式知道這些 PR 是一條 Stack

<p class="subtitle">Git 結構沒有變；差別是依賴順序成為 GitHub 看得懂、工具能維護的資訊。</p>

<div class="slide-two-grid">
  <StackDiagram />

  <div>
    <v-click>
      <div class="command-card">
        <div class="terminal-bar"><span></span><span></span><span></span></div>
        <pre><span class="prompt">$</span> gh stack add
<span class="prompt">$</span> gh stack submit
<span class="prompt">$</span> gh stack sync</pre>
      </div>
      <p class="command-hint">建立下一層、送出整條 stack、同步 cascading rebase。</p>
    </v-click>
  </div>
</div>

<!--
Stacked PR 沒有發明新的 Git 結構，底層一樣是 branch。
差別是 GitHub 正式知道它們的順序，而且每個 PR 只顯示自己這一層的 diff。
Developer 可以在前一個 PR 還沒 merge 時繼續往上做，工具負責維護 base、push 和 cascading rebase。
-->

---

<div class="eyebrow">Why it matters</div>

# Developer 少管 Branch，Reviewer 少讀雜訊

<div class="role-grid">
  <v-click>
    <div class="role-card developer">
      <div class="role-label">Developer</div>
      <h3>不中斷下一段工作</h3>
      <ul>
        <li>不必等前一層 merge</li>
        <li>工具維護 PR 的 base 與順序</li>
        <li>一次同步整條 stack</li>
      </ul>
    </div>
  </v-click>

  <v-click>
    <div class="role-card reviewer">
      <div class="role-label">Reviewer</div>
      <h3>依照責任逐層閱讀</h3>
      <ul>
        <li>從 bottom 往 top review</li>
        <li>每次只看一個 concern</li>
        <li>Generated code 不再淹沒主要邏輯</li>
      </ul>
    </div>
  </v-click>
</div>

<v-click>
  <div class="repo-examples">
    <span><strong>Backend</strong>　Entity → ModelSpec → ApiSpec → ServiceImpl</span>
    <span><strong>Frontend</strong>　API Client → State / Hooks → UI</span>
    <span>同一條 stack 限同一個 repository</span>
  </div>
</v-click>

<v-click>
  <div class="closing-row">
    <div class="closing-line">不是把 PR 變多，而是把<span>閱讀順序</span>說清楚。</div>
    <a class="kata-link" href="https://github.com/freelancer0308/stacked-pr-kata" target="_blank">
      <strong>10 分鐘 Kata ↗</strong>
      <span>github.com/freelancer0308/stacked-pr-kata</span>
    </a>
  </div>
</v-click>

<!--
對 Developer 來說，重點是不用停下來等，也不用一直自己維護 branch 關係。
對 Reviewer 來說，重點是有明確閱讀順序，而且每次只 review 一個責任。
前端也一樣，可以把 generated API client、state 和 UI 拆開。
它不是所有 PR 都必須用的新制度，只是有線性依賴的大型變更多一個選項。
這不是只有投影片上的概念；公開 Kata 已經實際跑過 init、add、submit、sync 與 CI，想玩的人會後可以自己試。
-->

---

<div class="eyebrow">Backup · Q&A</div>

# 常見問題

<div class="qa-grid">
  <div class="qa-item"><strong>所有 PR 都適合嗎？</strong><span>不適合。小改動與獨立變更不需要 stack。</span></div>
  <div class="qa-item"><strong>可以跨 Repository 嗎？</strong><span>不行。前後端會是兩條各自的 stack。</span></div>
  <div class="qa-item"><strong>怎麼 Review／Merge？</strong><span>從 bottom 往 top；GitHub 會維護剩餘層的關係。</span></div>
  <div class="qa-item"><strong>CI 還會跑嗎？</strong><span>每一層仍套用 stack trunk 的 rules 與 required checks。</span></div>
  <div class="qa-item"><strong>常用指令？</strong><span><code>init</code>、<code>add</code>、<code>submit</code>、<code>sync</code>、<code>view</code>。</span></div>
  <div class="qa-item"><strong>現在穩定了嗎？</strong><span>目前是 GitHub Public Preview，功能可能調整。</span></div>
</div>

<!-- 備用頁，主講三分鐘時停在上一張。 -->

---

<div class="eyebrow">Backup · 延伸</div>

# 押這個工作流的不只 GitHub

<p class="subtitle">三家都在處理「agent 一次產出大量程式碼」，差別在你要付多少切換成本。</p>

<div class="cmp">
  <table>
    <thead>
      <tr>
        <th>做法</th>
        <th>它其實是什麼</th>
        <th>亮點</th>
        <th>切換成本</th>
        <th>狀態</th>
      </tr>
    </thead>
    <tbody>
      <tr class="is-ours">
        <td class="who">GitHub<span>Stacked PR</span></td>
        <td>GitHub <strong>原生功能</strong><br>只動 PR 的組織方式</td>
        <td>一層一個 PR 照順序讀<br>合併最上層可一次落地下面所有層<br>沿用既有 branch protection 與 checks</td>
        <td><strong>變動最小</strong><br>Git、hosting、CI 都不動<br>裝 <code>gh</code> 擴充、改 review 習慣</td>
        <td><span class="stage-pill">Public Preview</span><br><span class="stage-date">2026-07-30</span></td>
      </tr>
      <tr>
        <td class="who">Zed<span>Delta</span></td>
        <td>疊在<strong>現有 git repo 上</strong>的協作／審查層<br>底層是 DeltaDB</td>
        <td>對話與程式碼綁在一起，評論錨定到行、隨程式碼演進<br>Claude Code session 直接同步進 thread</td>
        <td><strong>變動小</strong><br>不取代 Git，沒開 Delta 的人<br>看到的還是普通 repo</td>
        <td><span class="stage-pill">私人 Beta</span><br><span class="stage-date">候補名單</span></td>
      </tr>
      <tr>
        <td class="who">Cursor<span>Origin</span></td>
        <td>全新 <strong>git forge</strong>，直接對位 GitHub<br>為 agent 併發重寫</td>
        <td><strong>也做 stacked PR ＋ merge queue</strong><br>由 Cursor 收購的 Graphite 團隊打造<br>agent 可直接開 repo、commit、開 PR</td>
        <td><strong>變動最大</strong><br>要把 repo 搬過去<br>（可先與 GitHub 雙向同步）</td>
        <td><span class="stage-pill">早期 Beta</span><br><span class="stage-date">付費方案，秋季上線</span></td>
      </tr>
    </tbody>
  </table>
</div>

<div class="repo-examples">
  <span>Stacked PR 不是 GitHub 自己的實驗：<strong>Graphite 做出這個工作流 → Cursor 收購它做進 Origin → GitHub 直接做成原生。</strong></span>
</div>

<!--
被問到「除了 GitHub 還有誰在做」才翻。重點一句：stacked PR 這個工作流不是 GitHub 的實驗，三家都在押。
Graphite 是把 stacked diff 做起來的公司，Cursor 把它收購了，Origin 的 stacked PR 和 merge queue 就是那個團隊做的；GitHub 則是直接把它做成原生功能。
Zed 的 Delta 走另一個方向，它不碰 Git，疊在你現有 repo 上，把對話和程式碼綁在一起，Claude Code 的 session 可以直接同步進去，所以切換成本很低。
Origin 野心最大也最貴：它是重寫的 git forge，demo 數字是每秒 22.6 個 commit、每小時 29.6 萬次 clone，但要把 repo 搬過去。8 月的早期 beta 目前看到的是 repo、PR、瀏覽和 GitHub 同步。
結論：三個裡面 GitHub 這個要動的東西最少，Git、hosting、CI 都不用碰，所以現在就能試。
-->
