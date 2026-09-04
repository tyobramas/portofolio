import { useEffect, useRef } from 'react'

// ─── Source code to animate ──────────────────────────────────
const LINES: readonly string[] = [
  '// NeuralAgent.ts — AI Portfolio Engine v2.0',
  "import { OpenAI }   from 'openai'",
  "import { Pinecone } from '@pinecone-database/pinecone'",
  "import { LangChain } from 'langchain/core'",
  "import type { ModelConfig, AgentMemory } from './types'",
  '',
  'const config: ModelConfig = {',
  "  model:          'gpt-4-turbo-preview',",
  '  temperature:    0.72,',
  '  maxTokens:      4096,',
  "  embeddingModel: 'text-embedding-3-large',",
  '}',
  '',
  'interface AgentMemory {',
  '  id:        string',
  '  content:   string',
  '  embedding: number[]',
  '  createdAt: Date',
  '}',
  '',
  'class NeuralAgent {',
  '  private llm:    OpenAI',
  '  private db:     Pinecone',
  '  private chain:  LangChain',
  '  private memory: AgentMemory[] = []',
  '',
  '  constructor(private cfg: ModelConfig) {',
  '    this.llm   = new OpenAI({ apiKey: process.env.OPENAI_KEY })',
  '    this.db    = new Pinecone({ apiKey: process.env.PINECONE_KEY })',
  '    this.chain = new LangChain({ llm: this.llm })',
  '  }',
  '',
  '  async embed(text: string): Promise<number[]> {',
  '    const { data } = await this.llm.embeddings.create({',
  "      model: 'text-embedding-3-large',",
  '      input: text,',
  '    })',
  '    return data[0].embedding',
  '  }',
  '',
  '  async think(query: string): Promise<string> {',
  '    const vec     = await this.embed(query)',
  '    const context = await this.retrieve(vec, 5)',
  '    const prompt  = this.buildPrompt(context, query)',
  '',
  '    const res = await this.llm.chat.completions.create({',
  '      model:       this.cfg.model,',
  '      temperature: this.cfg.temperature,',
  '      messages: [',
  "        { role: 'system', content: SYSTEM_PROMPT },",
  "        { role: 'user',   content: prompt },",
  '      ],',
  '    })',
  '',
  "    const answer = res.choices[0].message.content ?? ''",
  '    await this.memorize(query, answer)',
  '    return answer',
  '  }',
  '',
  '  private async retrieve(',
  '    vec: number[],',
  '    topK: number',
  '  ): Promise<AgentMemory[]> {',
  '    const { matches } = await this.db.query({',
  '      vector: vec, topK, includeMetadata: true,',
  '    })',
  '    return matches.map(m => m.metadata as AgentMemory)',
  '  }',
  '',
  '  private async memorize(q: string, a: string) {',
  '    const content = `Q: ${q}\\nA: ${a}`',
  '    const values  = await this.embed(content)',
  '    await this.db.upsert([{',
  '      id:       crypto.randomUUID(),',
  '      values,',
  '      metadata: { content, createdAt: new Date() },',
  '    }])',
  '  }',
  '}',
  '',
  'export const agent = new NeuralAgent(config)',
  '',
  '// ─── RAG Pipeline ─────────────────────────────────────────',
  'class RAGPipeline {',
  '  async query(question: string): Promise<string> {',
  '    const vec  = await agent.embed(question)',
  '    const docs = await vectorDB.similaritySearch(vec, 8)',
  "    const ctx  = docs.map(d => d.pageContent).join('\\n\\n')",
  '    return agent.think(`${ctx}\\n\\nQuestion: ${question}`)',
  '  }',
  '}',
  '',
  '// ─── Training Pipeline ────────────────────────────────────',
  'async function train(dataset: Dataset, epochs: number) {',
  '  const model     = new TransformerModel({ layers: 12, heads: 8 })',
  '  const optimizer = new AdamW(model.parameters(), { lr: 3e-4 })',
  '',
  '  for (let e = 0; e < epochs; e++) {',
  '    let totalLoss = 0',
  '    for (const batch of dataset.batches(32)) {',
  '      const logits = model.forward(batch.input)',
  '      const loss   = F.crossEntropy(logits, batch.labels)',
  '      optimizer.zeroGrad()',
  '      loss.backward()',
  '      optimizer.step()',
  '      totalLoss += loss.item()',
  '    }',
  '    const avg = (totalLoss / dataset.size).toFixed(4)',
  "    console.log(`[epoch ${e + 1}/${epochs}] loss: ${avg}`)",
  '  }',
  '}',
  '',
  'export default new RAGPipeline()',
]

// ─── Tokenizer ────────────────────────────────────────────────
type TT = 'kw' | 'ty' | 'str' | 'cmt' | 'num' | 'op' | 'txt'
interface Token { type: TT; text: string }

const KW = new Set([
  'import','export','from','const','let','var','function','async','await',
  'return','class','extends','new','this','interface','type','private',
  'public','readonly','static','Promise','process','crypto','console',
  'true','false','null','undefined','void','for','of','in','let','if',
  'else','typeof','instanceof','default','abstract',
])

function tokenizeLine(line: string): Token[] {
  if (/^\s*\/\//.test(line)) return [{ type: 'cmt', text: line }]

  const rx = /('(?:[^'\\]|\\.)*'|"(?:[^"\\]|\\.)*"|`[^`]*`)|(\b\d+\.?\d*(?:e[+-]?\d+)?\b)|(\/\/.*$)|([a-zA-Z_$][a-zA-Z0-9_$]*)|(.)/gs
  const toks: Token[] = []
  let m: RegExpExecArray | null

  while ((m = rx.exec(line)) !== null) {
    if (m[1])      toks.push({ type: 'str', text: m[1] })
    else if (m[2]) toks.push({ type: 'num', text: m[2] })
    else if (m[3]) toks.push({ type: 'cmt', text: m[3] })
    else if (m[4]) {
      const w = m[4]
      const t: TT = KW.has(w) ? 'kw' : /^[A-Z]/.test(w) ? 'ty' : 'txt'
      toks.push({ type: t, text: w })
    } else if (m[5]) {
      toks.push({ type: 'op', text: m[5] })
    }
  }

  return toks
}

// ─── Colours ──────────────────────────────────────────────────
function tokenColor(t: TT): string {
  switch (t) {
    case 'kw':  return '#22d3ee'                    // cyan
    case 'ty':  return '#86efac'                    // light green
    case 'str': return '#4ade80'                    // green
    case 'cmt': return 'rgba(69,130,130,0.75)'     // muted teal
    case 'num': return '#67e8f9'                    // sky cyan
    case 'op':  return 'rgba(160,200,210,0.70)'    // muted
    case 'txt': return 'rgba(210,245,248,0.88)'    // near-white
  }
}

// ─── Component ────────────────────────────────────────────────
const CodeBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // ── Layout constants ──────────────────────────────────────
    const FS      = 13          // font-size px
    const LH      = 21          // line height px
    const TAB_H   = 34          // tab bar height
    const GUTTER  = 56          // gutter width
    const PAD     = 16          // code left padding

    const FONT    = `${FS}px 'JetBrains Mono','Fira Code',monospace`
    const TABS    = ['NeuralAgent.ts', 'model_pipeline.py', 'rag_chain.ts']

    // ── Pre-tokenize ──────────────────────────────────────────
    const tokenized = LINES.map(tokenizeLine)

    // ── State ─────────────────────────────────────────────────
    let lineIdx   = 0
    let charIdx   = 0
    let scrollOff = 0   // first visible line index
    let lastChar  = 0
    let blinkOn   = true
    let lastBlink = 0
    const CHAR_MS   = 52
    const BLINK_MS  = 520

    const resize = () => {
      canvas.width  = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener('resize', resize, { passive: true })

    // ── Draw one tokenized line ───────────────────────────────
    function drawTokens(
      cCtx: CanvasRenderingContext2D,
      toks: Token[],
      x: number, y: number,
      alpha: number,
      clipRight?: number   // clip beyond this x
    ) {
      cCtx.save()
      if (clipRight !== undefined) {
        cCtx.beginPath()
        cCtx.rect(x, y - FS - 3, clipRight - x, LH)
        cCtx.clip()
      }
      let cx = x
      for (const tok of toks) {
        cCtx.fillStyle = colorWithAlpha(tokenColor(tok.type), alpha)
        cCtx.fillText(tok.text, cx, y)
        cx += cCtx.measureText(tok.text).width
      }
      cCtx.restore()
    }

    function colorWithAlpha(c: string, a: number): string {
      if (a >= 0.999) return c
      // parse and re-emit with new alpha
      const rgba = c.match(/rgba?\(([^)]+)\)/)
      if (!rgba) return c
      const parts = rgba[1].split(',').map(s => s.trim())
      if (parts.length === 3) return `rgba(${parts[0]},${parts[1]},${parts[2]},${a.toFixed(2)})`
      return `rgba(${parts[0]},${parts[1]},${parts[2]},${(parseFloat(parts[3]) * a).toFixed(2)})`
    }

    // ── Main draw ─────────────────────────────────────────────
    let rafId: number

    const draw = (now: number) => {
      const W = canvas.width
      const H = canvas.height

      const visibleLines = Math.floor((H - TAB_H) / LH)
      const codeX = GUTTER + PAD

      // ── Advance typing ──────────────────────────────────────
      if (now - lastChar > CHAR_MS) {
        lastChar = now
        if (lineIdx < LINES.length) {
          const lineLen = LINES[lineIdx].length
          if (charIdx < lineLen) {
            charIdx++
          } else {
            // Line done — move to next
            lineIdx++
            charIdx = 0
            // Auto-scroll when cursor nears bottom
            if (lineIdx > scrollOff + visibleLines - 4) {
              scrollOff = Math.max(0, lineIdx - visibleLines + 4)
            }
          }
        } else {
          // All lines typed — restart
          lineIdx   = 0
          charIdx   = 0
          scrollOff = 0
        }
      }

      // ── Cursor blink ────────────────────────────────────────
      if (now - lastBlink > BLINK_MS) {
        lastBlink = now
        blinkOn   = !blinkOn
      }

      // ── Clear ───────────────────────────────────────────────
      ctx.clearRect(0, 0, W, H)

      // ── IDE background panel ─────────────────────────────────
      ctx.fillStyle = 'rgba(3, 10, 18, 0.92)'
      ctx.fillRect(0, 0, W, H)

      // ── Tab bar ──────────────────────────────────────────────
      ctx.fillStyle = 'rgba(2, 6, 13, 0.98)'
      ctx.fillRect(0, 0, W, TAB_H)

      // Tab bar bottom border
      ctx.fillStyle = 'rgba(34,211,238,0.10)'
      ctx.fillRect(0, TAB_H - 1, W, 1)

      ctx.font = `${FS - 1}px 'JetBrains Mono',monospace`
      let tabX = 0
      TABS.forEach((tab, i) => {
        const isActive = i === 0
        const tabW = ctx.measureText(tab).width + 32

        if (isActive) {
          ctx.fillStyle = 'rgba(3, 10, 18, 0.95)'
          ctx.fillRect(tabX, 0, tabW, TAB_H)
          // Active indicator line
          ctx.fillStyle = '#22d3ee'
          ctx.fillRect(tabX, 0, tabW, 2)
          ctx.fillStyle = 'rgba(210,245,248,0.92)'
        } else {
          ctx.fillStyle = 'rgba(130,170,180,0.45)'
        }

        ctx.fillText(tab, tabX + 16, TAB_H / 2 + FS / 2 - 1)
        // Tab right border
        ctx.fillStyle = 'rgba(34,211,238,0.06)'
        ctx.fillRect(tabX + tabW - 1, 0, 1, TAB_H)
        tabX += tabW
      })

      // ── Gutter background ────────────────────────────────────
      ctx.fillStyle = 'rgba(2, 7, 14, 0.96)'
      ctx.fillRect(0, TAB_H, GUTTER, H - TAB_H)

      // Gutter right border
      ctx.fillStyle = 'rgba(34,211,238,0.08)'
      ctx.fillRect(GUTTER - 1, TAB_H, 1, H - TAB_H)

      // ── Code lines ───────────────────────────────────────────
      ctx.font = FONT

      const firstVis = scrollOff
      const lastVis  = Math.min(scrollOff + visibleLines + 1, LINES.length - 1)

      for (let i = firstVis; i <= lastVis; i++) {
        const y = TAB_H + (i - scrollOff) * LH + LH - 4

        const isCurrentLine = i === lineIdx
        const isPastLine    = i < lineIdx

        // Active line highlight
        if (isCurrentLine) {
          ctx.fillStyle = 'rgba(34,211,238,0.04)'
          ctx.fillRect(0, TAB_H + (i - scrollOff) * LH, W, LH)
        }

        // Line number
        const lineNum = String(i + 1)
        ctx.fillStyle = isCurrentLine
          ? 'rgba(34,211,238,0.90)'
          : 'rgba(100,145,165,0.50)'
        ctx.textAlign = 'right'
        ctx.fillText(lineNum, GUTTER - 10, y)
        ctx.textAlign = 'left'

        // Draw code
        if (isPastLine) {
          // Already typed lines — slightly dimmer
          drawTokens(ctx, tokenized[i], codeX, y, 0.78)
        } else if (isCurrentLine) {
          // Currently typing — partial reveal via clip
          const partialW = ctx.measureText(LINES[i].slice(0, charIdx)).width
          const clipX    = codeX + partialW
          drawTokens(ctx, tokenized[i], codeX, y, 1.0, clipX)

          // Blinking cursor
          if (blinkOn) {
            ctx.fillStyle = '#22d3ee'
            ctx.fillRect(clipX + 1, y - FS + 1, 2, FS + 1)
            // Cursor glow
            ctx.shadowColor  = '#22d3ee'
            ctx.shadowBlur   = 8
            ctx.fillRect(clipX + 1, y - FS + 1, 2, FS + 1)
            ctx.shadowBlur   = 0
            ctx.shadowColor  = 'transparent'
          }
        }
        // Future lines: invisible
      }

      // ── Scrollbar ────────────────────────────────────────────
      const totalH    = LINES.length * LH
      const viewH     = H - TAB_H
      const thumbH    = Math.max(24, (viewH / totalH) * viewH)
      const thumbTop  = (scrollOff * LH / totalH) * viewH
      const sbX       = W - 6

      ctx.fillStyle = 'rgba(34,211,238,0.15)'
      ctx.fillRect(sbX, TAB_H + thumbTop, 3, thumbH)

      rafId = requestAnimationFrame(draw)
    }

    rafId = requestAnimationFrame(draw)

    return () => {
      cancelAnimationFrame(rafId)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      style={{ position: 'fixed', inset: 0, zIndex: -5, pointerEvents: 'none', opacity: 0.18 }}
    />
  )
}

export default CodeBackground
