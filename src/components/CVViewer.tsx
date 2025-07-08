import React, { useState, useRef, useEffect } from 'react';
import { X, ZoomIn, ZoomOut, Download, RotateCw, Home } from 'lucide-react';
import { gsap } from 'gsap';

interface CVViewerProps {
  isOpen: boolean;
  onClose: () => void;
}

const CVViewer: React.FC<CVViewerProps> = ({ isOpen, onClose }) => {
  const [scale, setScale] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  
  const viewerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    if (isOpen && viewerRef.current) {
      gsap.fromTo(viewerRef.current,
        { opacity: 0, scale: 0.9 },
        { opacity: 1, scale: 1, duration: 0.3, ease: 'power2.out' }
      );
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;
      
      switch (e.key) {
        case 'Escape':
          handleClose();
          break;
        case '+':
        case '=':
          e.preventDefault();
          handleZoomIn();
          break;
        case '-':
          e.preventDefault();
          handleZoomOut();
          break;
        case 'r':
        case 'R':
          handleResetView();
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  // Mouse wheel zoom
  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      if (!isOpen) return;
      
      e.preventDefault();
      const delta = e.deltaY > 0 ? -0.1 : 0.1;
      setScale(prev => Math.max(0.5, Math.min(3, prev + delta)));
    };

    if (isOpen) {
      window.addEventListener('wheel', handleWheel, { passive: false });
    }

    return () => window.removeEventListener('wheel', handleWheel);
  }, [isOpen]);

  const handleClose = () => {
    if (viewerRef.current) {
      gsap.to(viewerRef.current, {
        opacity: 0,
        scale: 0.9,
        duration: 0.2,
        ease: 'power2.in',
        onComplete: onClose
      });
    }
  };

  const handleZoomIn = () => {
    setScale(prev => Math.min(prev + 0.25, 3));
  };

  const handleZoomOut = () => {
    setScale(prev => Math.max(prev - 0.25, 0.5));
  };

  const handleResetView = () => {
    setScale(1);
    setPosition({ x: 0, y: 0 });
  };

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = '/CV MARCOS BAEZA.jpg';
    link.download = 'CV_Marcos_Baeza.jpg';
    link.click();
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    if (e.button === 0) {
      setIsDragging(true);
      setDragStart({
        x: e.clientX - position.x,
        y: e.clientY - position.y
      });
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging) {
      setPosition({
        x: e.clientX - dragStart.x,
        y: e.clientY - dragStart.y
      });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center">
      <div
        ref={viewerRef}
        className="w-[95vw] h-[95vh] max-w-6xl bg-background border border-border rounded-lg shadow-2xl overflow-hidden flex flex-col"
      >
        {/* Header */}
        <div className="bg-muted/50 border-b border-border px-4 py-3 flex items-center justify-between">
          <h3 className="text-lg font-semibold text-foreground">CV - Marcos Baeza</h3>
          
          <div className="flex items-center space-x-2">
            {/* Zoom Controls */}
            <div className="flex items-center space-x-1 bg-background rounded-lg border border-border px-2 py-1">
              <button
                onClick={handleZoomOut}
                className="p-1 hover:bg-muted rounded transition-colors"
                title="Alejar (tecla -)"
              >
                <ZoomOut className="w-4 h-4" />
              </button>
              <span className="text-sm font-medium min-w-[3rem] text-center">
                {Math.round(scale * 100)}%
              </span>
              <button
                onClick={handleZoomIn}
                className="p-1 hover:bg-muted rounded transition-colors"
                title="Acercar (tecla +)"
              >
                <ZoomIn className="w-4 h-4" />
              </button>
            </div>

            <button
              onClick={handleResetView}
              className="p-2 hover:bg-muted rounded-lg transition-colors"
              title="Restablecer vista (tecla R)"
            >
              <Home className="w-4 h-4" />
            </button>

            <button
              onClick={handleDownload}
              className="flex items-center space-x-2 px-3 py-2 bg-accent text-white rounded-lg hover:bg-accent/90 transition-colors"
            >
              <Download className="w-4 h-4" />
              <span className="hidden sm:inline">Descargar</span>
            </button>

            <button
              onClick={handleClose}
              className="p-2 hover:bg-muted rounded-lg transition-colors"
              title="Cerrar (Esc)"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* CV Viewer */}
        <div
          className="flex-1 overflow-hidden bg-gray-100 dark:bg-gray-900 relative flex items-center justify-center"
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          style={{ cursor: isDragging ? 'grabbing' : 'grab' }}
        >
          <img
            ref={imageRef}
            src="/CV MARCOS BAEZA.jpg"
            alt="CV Marcos Baeza"
            className="max-w-none select-none shadow-2xl"
            style={{
              transform: `translate(${position.x}px, ${position.y}px) scale(${scale})`,
              transition: isDragging ? 'none' : 'transform 0.2s ease-out',
              imageRendering: 'crisp-edges'
            }}
            draggable={false}
          />

          {/* Instructions */}
          <div className="absolute bottom-4 left-4 bg-black/70 text-white px-3 py-2 rounded-lg text-sm">
            Arrastra para mover • Rueda del ratón para zoom
          </div>

          {/* Zoom level indicator */}
          <div className="absolute top-4 right-4 bg-black/70 text-white px-3 py-2 rounded-lg text-sm">
            {Math.round(scale * 100)}%
          </div>
        </div>

        {/* Status Bar */}
        <div className="bg-muted/30 border-t border-border px-4 py-2 flex items-center justify-between text-sm text-muted-foreground">
          <div className="flex items-center space-x-4">
            <span>Zoom: {Math.round(scale * 100)}%</span>
            <span>Posición: ({Math.round(position.x)}, {Math.round(position.y)})</span>
          </div>
          <div className="flex items-center space-x-2">
            <span className="w-2 h-2 bg-green-500 rounded-full"></span>
            <span>CV cargado</span>
          </div>
        </div>
      </div>

      {/* Keyboard Shortcuts */}
      <div className="absolute top-4 left-4 bg-black/70 text-white p-3 rounded-lg text-xs max-w-xs hidden lg:block">
        <h4 className="font-semibold mb-2">Atajos:</h4>
        <div className="space-y-1">
          <div><kbd className="bg-white/20 px-1 rounded">+/-</kbd> Zoom</div>
          <div><kbd className="bg-white/20 px-1 rounded">R</kbd> Restablecer</div>
          <div><kbd className="bg-white/20 px-1 rounded">Esc</kbd> Cerrar</div>
        </div>
      </div>
    </div>
  );
};

export default CVViewer;