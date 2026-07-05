/**
 * /ui-test — Component showcase page
 *
 * Displays every UI primitive in isolation so the design can be reviewed
 * before any real pages are assembled. Remove this route before launch.
 */
import Button from "@/components/ui/Button";
import Container from "@/components/ui/Container";
import SectionWrapper from "@/components/ui/SectionWrapper";
import Heading from "@/components/ui/Heading";

// ── Divider ───────────────────────────────────────────────────────────────────
function ShowcaseDivider({ label }: { label: string }) {
  return (
    <div className="border-t border-border-dark pt-4 mb-8">
      <p className="font-body text-muted-darker text-[10px] tracking-[0.25em] uppercase">
        {label}
      </p>
    </div>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────────
export default function UITestPage() {
  return (
    <div>
      {/* ── 1. HEADING SCALE ─────────────────────────────────────────────── */}
      <SectionWrapper theme="dark" id="headings-dark">
        <ShowcaseDivider label="Heading — dark context" />
        <div className="space-y-6">
          <Heading level="h1" size="display">Display — We build bold.</Heading>
          <Heading level="h1" size="h1">H1 — Primary Page Heading</Heading>
          <Heading level="h2" size="h2">H2 — Section Heading</Heading>
          <Heading level="h3" size="h3">H3 — Sub-section / Card Title</Heading>
          <Heading level="h4" size="h4">H4 — Label / Callout</Heading>
          <Heading level="h2" size="h2" accent>H2 — Accent variant (lime)</Heading>
        </div>
      </SectionWrapper>

      <SectionWrapper theme="light" id="headings-light">
        <ShowcaseDivider label="Heading — light context" />
        <div className="space-y-6">
          <Heading level="h1" size="display">Display — We build bold.</Heading>
          <Heading level="h2" size="h2">H2 — Section Heading</Heading>
          <Heading level="h3" size="h3">H3 — Card Title</Heading>
          <Heading level="h2" size="h2" accent>H2 — Accent variant (lime)</Heading>
        </div>
      </SectionWrapper>

      {/* ── 2. BUTTON VARIANTS ───────────────────────────────────────────── */}
      <SectionWrapper theme="dark" id="buttons-dark">
        <ShowcaseDivider label="Button — dark context" />
        <div className="flex flex-wrap gap-4 items-center">
          <Button variant="primary" size="default">Primary default</Button>
          <Button variant="primary" size="lg">Primary large</Button>
          <Button variant="primary" size="sm">Primary small</Button>
        </div>
        <div className="flex flex-wrap gap-4 items-center mt-6">
          <Button variant="secondary" size="default" className="text-white border-border-dark">Secondary default</Button>
          <Button variant="secondary" size="lg" className="text-white border-border-dark">Secondary large</Button>
        </div>
        <div className="flex flex-wrap gap-4 items-center mt-6">
          <Button variant="ghost" size="default" className="text-muted-dark">Ghost default</Button>
          <Button variant="ghost" size="lg" className="text-muted-dark">Ghost large →</Button>
        </div>
        <div className="flex flex-wrap gap-4 items-center mt-6">
          <Button variant="primary" href="/contact">Primary as Link →</Button>
          <Button variant="secondary" href="/work" className="text-white border-border-dark">Secondary as Link →</Button>
        </div>
        <div className="mt-6">
          <Button variant="primary" disabled>Disabled state</Button>
        </div>
      </SectionWrapper>

      <SectionWrapper theme="light" id="buttons-light">
        <ShowcaseDivider label="Button — light context" />
        <div className="flex flex-wrap gap-4 items-center">
          <Button variant="primary" size="default">Primary default</Button>
          <Button variant="primary" size="lg">Primary large</Button>
        </div>
        <div className="flex flex-wrap gap-4 items-center mt-6">
          <Button
            variant="secondary"
            size="default"
            className="text-foreground-dark border-foreground-dark hover:border-accent hover:text-accent focus-visible:ring-offset-background"
          >
            Secondary (light bg)
          </Button>
        </div>
        <div className="flex flex-wrap gap-4 items-center mt-6">
          <Button
            variant="ghost"
            size="default"
            className="text-muted-light focus-visible:ring-offset-background"
          >
            Ghost (light bg) →
          </Button>
        </div>
      </SectionWrapper>

      {/* ── 3. CONTAINER WIDTHS ──────────────────────────────────────────── */}
      <SectionWrapper theme="dark" id="containers" noContainer>
        <Container>
          <ShowcaseDivider label="Container — standard (1360px max)" />
          <div className="h-16 bg-surface-dark border border-border-dark flex items-center justify-center">
            <p className="font-body text-muted-dark text-xs tracking-widest uppercase">
              Standard container — 1360px max, responsive padding
            </p>
          </div>
        </Container>
        <Container narrow className="mt-6">
          <div className="h-16 bg-surface-dark border border-accent/30 flex items-center justify-center">
            <p className="font-body text-muted-dark text-xs tracking-widest uppercase">
              Narrow container — 740px max (prose / articles)
            </p>
          </div>
        </Container>
      </SectionWrapper>

      {/* ── 4. SECTIONWRAPPER THEMES ─────────────────────────────────────── */}
      <SectionWrapper theme="light" id="sw-light">
        <ShowcaseDivider label='SectionWrapper theme="light"' />
        <p className="font-body text-sm text-muted-light">
          Background: <code className="text-xs bg-surface-light px-2 py-0.5">#FAFAF8</code> · Text inherits dark foreground.
          Vertical padding: 64px mobile / 96px tablet / 128px desktop.
        </p>
      </SectionWrapper>

      <SectionWrapper theme="dark" id="sw-dark">
        <ShowcaseDivider label='SectionWrapper theme="dark"' />
        <p className="font-body text-sm text-muted-dark">
          Background: <code className="text-xs bg-surface-dark px-2 py-0.5 text-muted-dark">#0A0A0A</code> · Text inherits white.
          Vertical padding: 64px mobile / 96px tablet / 128px desktop.
        </p>
      </SectionWrapper>

      {/* ── 5. TYPOGRAPHY SPECIMENS ──────────────────────────────────────── */}
      <SectionWrapper theme="light" id="typography">
        <ShowcaseDivider label="Typography specimens" />
        <div className="space-y-8 max-w-2xl">
          <div>
            <p className="font-body text-[10px] tracking-[0.2em] uppercase text-muted-lighter mb-2">Display font (Plus Jakarta Sans)</p>
            <p className="font-display font-bold text-3xl text-foreground-dark">
              The quick brown fox jumps over the lazy dog.
            </p>
          </div>
          <div>
            <p className="font-body text-[10px] tracking-[0.2em] uppercase text-muted-lighter mb-2">Body font (DM Mono)</p>
            <p className="font-body text-base text-muted-light leading-relaxed">
              We partner with founders, marketing teams, and product leaders to
              create digital experiences that drive measurable business outcomes.
              Not templates. Not shortcuts. Craft.
            </p>
          </div>
          <div>
            <p className="font-body text-[10px] tracking-[0.2em] uppercase text-muted-lighter mb-2">Accent color #C8FF00</p>
            <p className="font-display font-extrabold text-2xl text-foreground-dark">
              We build{" "}
              <span className="text-accent">something bold</span>{" "}
              together.
            </p>
          </div>
        </div>
      </SectionWrapper>
    </div>
  );
}
