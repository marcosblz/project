import React, { useState, useRef, useEffect } from 'react';
import { X, ZoomIn, ZoomOut, Download, Home, FileText } from 'lucide-react';
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
    // Método 1: Fetch y crear blob
    fetch('/CV_Marcos_Baeza.jpg')
      .then(response => response.blob())
      .then(blob => {
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = 'CV_Marcos_Baeza.jpg';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        window.URL.revokeObjectURL(url);
      })
      .catch(error => {
        console.error('Error descargando CV:', error);
        // Fallback: abrir en nueva ventana
        window.open('/CV_Marcos_Baeza.jpg', '_blank');
      });
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
    <div className="fixed inset-0 bg-black/95 backdrop-blur-sm z-50 flex items-center justify-center p-2 sm:p-4">
      <div
        ref={viewerRef}
        className="w-[98vw] h-[98vh] sm:w-[95vw] sm:h-[95vh] max-w-6xl bg-background/95 backdrop-blur-md border border-border rounded-xl sm:rounded-2xl shadow-2xl overflow-hidden flex flex-col"
      >
        {/* Header */}
        <div className="bg-card/90 backdrop-blur-sm border-b border-border px-3 sm:px-6 py-3 sm:py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2 sm:space-x-3 min-w-0 flex-1">
            <div className="w-8 sm:w-10 h-8 sm:h-10 bg-gradient-to-br from-accent to-accent/80 rounded-lg flex items-center justify-center flex-shrink-0">
              <FileText className="w-4 sm:w-5 h-4 sm:h-5 text-white" />
            </div>
            <div className="min-w-0 flex-1">
              <h3 className="text-sm sm:text-lg lg:text-xl font-bold text-foreground truncate">CV - Marcos Baeza</h3>
              <p className="text-xs sm:text-sm text-muted-foreground">Desarrollador Back-End</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-1 sm:space-x-2 flex-shrink-0">
            {/* Zoom Controls */}
            <div className="hidden sm:flex items-center space-x-1 bg-muted/50 rounded-lg border border-border px-2 sm:px-3 py-1.5 sm:py-2">
              <button
                onClick={handleZoomOut}
                className="p-1 sm:p-1.5 hover:bg-accent/10 hover:text-accent rounded transition-colors duration-200"
                title="Alejar (tecla -)"
              >
                <ZoomOut className="w-3 sm:w-4 h-3 sm:h-4" />
              </button>
              <span className="text-xs sm:text-sm font-medium min-w-[2.5rem] sm:min-w-[3.5rem] text-center text-foreground">
                {Math.round(scale * 100)}%
              </span>
              <button
                onClick={handleZoomIn}
                className="p-1 sm:p-1.5 hover:bg-accent/10 hover:text-accent rounded transition-colors duration-200"
                title="Acercar (tecla +)"
              >
                <ZoomIn className="w-3 sm:w-4 h-3 sm:h-4" />
              </button>
            </div>

            {/* Mobile Zoom Controls */}
            <div className="flex sm:hidden items-center space-x-1">
              <button
                onClick={handleZoomOut}
                className="p-2 bg-muted/50 hover:bg-accent/10 hover:text-accent rounded-lg transition-colors duration-200 border border-border"
                title="Alejar"
              >
                <ZoomOut className="w-4 h-4" />
              </button>
              <button
                onClick={handleZoomIn}
                className="p-2 bg-muted/50 hover:bg-accent/10 hover:text-accent rounded-lg transition-colors duration-200 border border-border"
                title="Acercar"
              >
                <ZoomIn className="w-4 h-4" />
              </button>
            </div>

            <button
              onClick={handleDownload}
              className="p-2 sm:p-2.5 bg-muted/50 hover:bg-accent/10 hover:text-accent rounded-lg transition-colors duration-200 border border-border"
              title="Descargar CV"
            >
              <Download className="w-4 sm:w-5 h-4 sm:h-5" />
            </button>

            <button
              onClick={handleClose}
              className="p-2 sm:p-2.5 hover:bg-muted/50 rounded-lg transition-colors duration-200 border border-border"
              title="Cerrar (Esc)"
            >
              <X className="w-4 sm:w-5 h-4 sm:h-5 text-foreground" />
            </button>
          </div>
        </div>

        {/* CV Viewer */}
        <div
          className="flex-1 overflow-hidden bg-muted/20 relative flex items-center justify-center touch-pan-x touch-pan-y"
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          onTouchStart={(e) => {
            const touch = e.touches[0];
            setIsDragging(true);
            setDragStart({
              x: touch.clientX - position.x,
              y: touch.clientY - position.y
            });
          }}
          onTouchMove={(e) => {
            if (isDragging && e.touches[0]) {
              e.preventDefault();
              const touch = e.touches[0];
              setPosition({
                x: touch.clientX - dragStart.x,
                y: touch.clientY - dragStart.y
              });
            }
          }}
          onTouchEnd={() => setIsDragging(false)}
          style={{ cursor: isDragging ? 'grabbing' : 'grab' }}
        >
          <img
            ref={imageRef}
            src="/CV_Marcos_Baeza.jpg"
            alt="CV Marcos Baeza"
            className="max-w-none select-none shadow-2xl rounded-lg border border-border/20 touch-none"
            style={{
              transform: `translate(${position.x}px, ${position.y}px) scale(${scale})`,
              transition: isDragging ? 'none' : 'transform 0.2s ease-out',
              imageRendering: 'crisp-edges',
              maxHeight: '90vh',
              maxWidth: '90vw'
            }}
            draggable={false}
          />

          {/* Instructions */}
          <div className="absolute bottom-2 sm:bottom-4 left-2 sm:left-4 right-2 sm:right-auto bg-card/95 backdrop-blur-sm text-foreground px-3 sm:px-4 py-2 sm:py-3 rounded-lg text-xs sm:text-sm border border-border shadow-lg">
            <div className="flex items-center space-x-2 justify-center sm:justify-start">
              <div className="w-2 h-2 bg-accent rounded-full animate-pulse flex-shrink-0"></div>
              <span className="text-center sm:text-left">
                <span className="hidden sm:inline">Arrastra para mover • Rueda del ratón para zoom</span>
                <span className="sm:hidden">Arrastra para mover • Pellizca para zoom</span>
              </span>
            </div>
          </div>

          {/* Mobile Reset Button */}
          <div className="absolute top-4 left-4 sm:hidden">
            <button
              onClick={handleResetView}
              className="p-3 bg-card/90 backdrop-blur-sm text-foreground rounded-lg border border-border shadow-lg hover:bg-card transition-colors duration-200"
              title="Restablecer vista"
            >
              <span className="text-xs font-medium">Reset</span>
            </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CVViewer;