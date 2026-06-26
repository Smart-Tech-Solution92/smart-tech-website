type BackdropTheme = 'hero' | 'soft' | 'twilight' | 'midnight' | 'aurora' | 'gallery' | 'dawn';

const themes: Record<
  BackdropTheme,
  { base: string; glowA: string; glowB: string; gridOpacity: string; gridColor?: string }
> = {
  hero: {
    base: 'linear-gradient(180deg, #eef4ff 0%, #f4f7fb 55%, #e8eef8 100%)',
    glowA: 'rgba(59,130,246,0.14)',
    glowB: 'rgba(14,165,233,0.1)',
    gridOpacity: '0.04',
    gridColor: 'rgba(37,99,235,0.06)',
  },
  soft: {
    base: 'linear-gradient(180deg, #f1f5f9 0%, #e8eef6 50%, #dfe8f4 100%)',
    glowA: 'rgba(59,130,246,0.1)',
    glowB: 'rgba(99,102,241,0.08)',
    gridOpacity: '0.05',
    gridColor: 'rgba(37,99,235,0.06)',
  },
  twilight: {
    base: 'linear-gradient(180deg, #eef4ff 0%, #e2eaf5 50%, #f8fafc 100%)',
    glowA: 'rgba(59,130,246,0.12)',
    glowB: 'rgba(14,165,233,0.1)',
    gridOpacity: '0.06',
    gridColor: 'rgba(37,99,235,0.06)',
  },
  midnight: {
    base: 'linear-gradient(180deg, #f0f6ff 0%, #e8f0fe 50%, #f8fafc 100%)',
    glowA: 'rgba(59,130,246,0.14)',
    glowB: 'rgba(14,165,233,0.1)',
    gridOpacity: '0.05',
    gridColor: 'rgba(37,99,235,0.06)',
  },
  aurora: {
    base: 'linear-gradient(180deg, #eef4ff 0%, #f0f9ff 50%, #f8fafc 100%)',
    glowA: 'rgba(56,189,248,0.12)',
    glowB: 'rgba(99,102,241,0.1)',
    gridOpacity: '0.05',
    gridColor: 'rgba(37,99,235,0.06)',
  },
  gallery: {
    base: 'linear-gradient(135deg, #faf8f5 0%, #f0f6ff 45%, #ede9fe 100%)',
    glowA: 'rgba(99,102,241,0.12)',
    glowB: 'rgba(37,99,235,0.1)',
    gridOpacity: '0.06',
    gridColor: 'rgba(99,102,241,0.05)',
  },
  dawn: {
    base: 'linear-gradient(180deg, #fffbeb 0%, #f0f6ff 55%, #f8fafc 100%)',
    glowA: 'rgba(251,191,36,0.1)',
    glowB: 'rgba(59,130,246,0.1)',
    gridOpacity: '0.05',
    gridColor: 'rgba(37,99,235,0.05)',
  },
};

export function SectionBackdrop({ theme }: { theme: BackdropTheme }) {
  const t = themes[theme];

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="absolute inset-0" style={{ background: t.base }} />
      <div
        className="absolute -left-24 top-10 h-80 w-80 rounded-full blur-[120px]"
        style={{ background: t.glowA }}
      />
      <div
        className="absolute -right-16 bottom-0 h-72 w-72 rounded-full blur-[110px]"
        style={{ background: t.glowB }}
      />
      <div
        className="absolute inset-0"
        style={{
          opacity: Number(t.gridOpacity) * 5,
          backgroundImage: `linear-gradient(${t.gridColor ?? 'rgba(37,99,235,0.06)'} 1px, transparent 1px), linear-gradient(90deg, ${t.gridColor ?? 'rgba(37,99,235,0.06)'} 1px, transparent 1px)`,
          backgroundSize: '56px 56px',
        }}
      />
    </div>
  );
}
