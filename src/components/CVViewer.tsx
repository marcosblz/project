import React, { useState, useRef, useEffect } from 'react';
import { 
  X, 
  ZoomIn, 
  ZoomOut, 
  Download, 
  RotateCw, 
  Move, 
  Maximize2, 
  Minimize2,
  ChevronLeft,
  ChevronRight,
  Home,
  Search,
  FileText
} from 'lucide-react';
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
  const [rotation, setRotation] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages] = useState(1); // Assuming single page CV
  
  const viewerRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const cvRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    if (isOpen && viewerRef.current) {
      // Animate modal entrance
      gsap.fromTo(viewerRef.current,
        { opacity: 0, scale: 0.9 },
        { opacity: 1, scale: 1, duration: 0.3, ease: 'power2.out' }
      );
      
      // Prevent body scroll
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
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
    setRotation(0);
  };

  const handleRotate = () => {
    setRotation(prev => prev + 90);
  };

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = '/cv.pdf';
    link.download = 'Marcos_CV.pdf';
    link.click();
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    if (e.button === 0) { // Left click only
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

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center">
      <div
        ref={viewerRef}
        className={`bg-background border border-border rounded-lg shadow-2xl overflow-hidden transition-all duration-300 ${
          isFullscreen ? 'w-full h-full rounded-none' : 'w-[95vw] h-[95vh] max-w-6xl'
        }`}
      >
        {/* Header Toolbar */}
        <div className="bg-muted/50 border-b border-border px-4 py-3 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <FileText className="w-5 h-5 text-accent" />
              <h3 className="text-lg font-semibold text-foreground">CV - Marcos Baeza López</h3>
            </div>
            
            {/* Page Navigation */}
            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
              <button
                onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                disabled={currentPage === 1}
                className="p-1 hover:bg-muted rounded disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <span className="px-2">
                {currentPage} de {totalPages}
              </span>
              <button
                onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                disabled={currentPage === totalPages}
                className="p-1 hover:bg-muted rounded disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Toolbar Controls */}
          <div className="flex items-center space-x-2">
            {/* Zoom Controls */}
            <div className="flex items-center space-x-1 bg-background rounded-lg border border-border px-2 py-1">
              <button
                onClick={handleZoomOut}
                className="p-1 hover:bg-muted rounded transition-colors"
                title="Alejar"
              >
                <ZoomOut className="w-4 h-4" />
              </button>
              <span className="text-sm font-medium min-w-[3rem] text-center">
                {Math.round(scale * 100)}%
              </span>
              <button
                onClick={handleZoomIn}
                className="p-1 hover:bg-muted rounded transition-colors"
                title="Acercar"
              >
                <ZoomIn className="w-4 h-4" />
              </button>
            </div>

            {/* Action Buttons */}
            <button
              onClick={handleResetView}
              className="p-2 hover:bg-muted rounded-lg transition-colors"
              title="Restablecer vista"
            >
              <Home className="w-4 h-4" />
            </button>
            
            <button
              onClick={handleRotate}
              className="p-2 hover:bg-muted rounded-lg transition-colors"
              title="Rotar"
            >
              <RotateCw className="w-4 h-4" />
            </button>

            <button
              onClick={toggleFullscreen}
              className="p-2 hover:bg-muted rounded-lg transition-colors"
              title={isFullscreen ? "Salir de pantalla completa" : "Pantalla completa"}
            >
              {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
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
              title="Cerrar"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* CV Viewer Container */}
        <div
          ref={containerRef}
          className="flex-1 overflow-hidden bg-gray-100 dark:bg-gray-900 relative"
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          style={{ cursor: isDragging ? 'grabbing' : 'grab' }}
        >
          {/* CV Content */}
          <div
            className="absolute inset-0 flex items-center justify-center"
            style={{
              transform: `translate(${position.x}px, ${position.y}px) scale(${scale}) rotate(${rotation}deg)`,
              transition: isDragging ? 'none' : 'transform 0.2s ease-out'
            }}
          >
            <div className="bg-white shadow-2xl rounded-lg overflow-hidden max-w-[210mm] max-h-[297mm] w-full h-full">
              <iframe
                ref={cvRef}
                src="/cv.pdf"
                className="w-full h-full border-none"
                title="CV Marcos Baeza López"
                style={{ minHeight: '800px' }}
              />
            </div>
          </div>

          {/* Drag Hint */}
          {!isDragging && scale > 1 && (
            <div className="absolute bottom-4 left-4 bg-black/70 text-white px-3 py-2 rounded-lg text-sm flex items-center space-x-2">
              <Move className="w-4 h-4" />
              <span>Arrastra para mover</span>
            </div>
          )}

          {/* Zoom Hint */}
          <div className="absolute bottom-4 right-4 bg-black/70 text-white px-3 py-2 rounded-lg text-sm">
            Usa Ctrl + rueda del ratón para hacer zoom
          </div>
        </div>

        {/* Status Bar */}
        <div className="bg-muted/30 border-t border-border px-4 py-2 flex items-center justify-between text-sm text-muted-foreground">
          <div className="flex items-center space-x-4">
            <span>Zoom: {Math.round(scale * 100)}%</span>
            <span>Rotación: {rotation}°</span>
            <span>Posición: ({Math.round(position.x)}, {Math.round(position.y)})</span>
          </div>
          <div className="flex items-center space-x-2">
            <span className="w-2 h-2 bg-green-500 rounded-full"></span>
            <span>CV cargado correctamente</span>
          </div>
        </div>
      </div>

      {/* Keyboard Shortcuts Overlay */}
      <div className="absolute top-4 left-4 bg-black/70 text-white p-4 rounded-lg text-sm max-w-xs hidden lg:block">
        <h4 className="font-semibold mb-2">Atajos de teclado:</h4>
        <div className="space-y-1 text-xs">
          <div><kbd className="bg-white/20 px-1 rounded">+</kbd> Acercar</div>
          <div><kbd className="bg-white/20 px-1 rounded">-</kbd> Alejar</div>
          <div><kbd className="bg-white/20 px-1 rounded">R</kbd> Rotar</div>
          <div><kbd className="bg-white/20 px-1 rounded">H</kbd> Inicio</div>
          <div><kbd className="bg-white/20 px-1 rounded">F</kbd> Pantalla completa</div>
          <div><kbd className="bg-white/20 px-1 rounded">Esc</kbd> Cerrar</div>
        </div>
      </div>
    </div>
  );
};

export default CVViewer;