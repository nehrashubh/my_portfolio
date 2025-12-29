/**
 * ===========================================
 * SCANLINE OVERLAY COMPONENT
 * ===========================================
 * Creates the classic CRT monitor scanline effect.
 * This is a fixed overlay that sits on top of all content.
 */

const ScanlineOverlay = () => {
  return (
    <>
      {/* Scanline effect - subtle horizontal lines */}
      <div className="scanlines" aria-hidden="true" />
      
      {/* CRT vignette effect - darker edges */}
      <div 
        className="pointer-events-none fixed inset-0 z-[9998]"
        aria-hidden="true"
        style={{
          background: `
            radial-gradient(
              ellipse at center,
              transparent 0%,
              transparent 60%,
              rgba(0, 0, 0, 0.4) 100%
            )
          `,
        }}
      />
    </>
  );
};

export default ScanlineOverlay;
