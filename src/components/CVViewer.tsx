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
    <div className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div
        ref={viewerRef}
        className="w-[95vw] h-[95vh] max-w-6xl bg-background/90 backdrop-blur-md border border-border rounded-2xl shadow-2xl overflow-hidden flex flex-col"
      >
        {/* Header */}
        <div className="bg-card/80 backdrop-blur-sm border-b border-border px-4 sm:px-6 py-3 sm:py-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-accent to-accent/80 rounded-lg flex items-center justify-center">
              <FileText className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="text-lg sm:text-xl font-bold text-foreground">CV - Marcos Baeza</h3>
              <p className="text-sm text-muted-foreground">Desarrollador Back-End</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            {/* Zoom Controls */}
            <div className="flex items-center space-x-1 bg-muted/50 rounded-lg border border-border px-3 py-2">
              <button
                onClick={handleZoomOut}
                className="p-1.5 hover:bg-accent/10 hover:text-accent rounded transition-colors duration-200"
                title="Alejar (tecla -)"
              >
                <ZoomOut className="w-4 h-4" />
              </button>
              <span className="text-sm font-medium min-w-[3.5rem] text-center text-foreground">
                {Math.round(scale * 100)}%
              </span>
              <button
                onClick={handleZoomIn}
                className="p-1.5 hover:bg-accent/10 hover:text-accent rounded transition-colors duration-200"
                title="Acercar (tecla +)"
              >
                <ZoomIn className="w-4 h-4" />
              </button>
            </div>

            <button
              onClick={handleDownload}
              className="p-2.5 bg-muted/50 hover:bg-accent/10 hover:text-accent rounded-lg transition-colors duration-200 border border-border"
              title="Descargar CV"
            >
              <Download className="w-4 h-4" />
            </button>

            <button
              onClick={handleClose}
              className="p-2.5 hover:bg-muted/50 rounded-lg transition-colors duration-200 border border-border"
              title="Cerrar (Esc)"
            >
              <X className="w-4 h-4 text-foreground" />
            </button>
          </div>
        </div>

        {/* CV Viewer */}
        <div
          className="flex-1 overflow-hidden bg-muted/20 relative flex items-center justify-center"
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          style={{ cursor: isDragging ? 'grabbing' : 'grab' }}
        >
          <img
            ref={imageRef}
            src="/CV_Marcos_Baeza.jpg"
            alt="CV Marcos Baeza"
            className="max-w-none select-none shadow-2xl rounded-lg border border-border/20"
            style={{
              transform: `translate(${position.x}px, ${position.y}px) scale(${scale})`,
              transition: isDragging ? 'none' : 'transform 0.2s ease-out',
              imageRendering: 'crisp-edges'
            }}
            draggable={false}
          />

          {/* Instructions */}
          <div className="absolute bottom-4 left-4 bg-card/90 backdrop-blur-sm text-foreground px-4 py-3 rounded-lg text-sm border border-border shadow-lg">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-accent rounded-full animate-pulse"></div>
              <span>Arrastra para mover • Rueda del ratón para zoom</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CVViewer;