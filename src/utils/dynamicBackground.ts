export const initializeDynamicBackground = () => {
  let animationId: number;
  
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d')!;
  
  // Insert canvas as background
  canvas.style.position = 'fixed';
  canvas.style.top = '0';
  canvas.style.left = '0';
  canvas.style.width = '100%';
  canvas.style.height = '100%';
  canvas.style.zIndex = '-1';
  canvas.style.pointerEvents = 'none';
  
  document.body.appendChild(canvas);
  
  // Particles array
  const particles: Array<{
    x: number;
    y: number;
    vx: number;
    vy: number;
    size: number;
    opacity: number;
    hue: number;
  }> = [];
  
  // Get theme colors
  const getThemeColors = () => {
    const isDark = document.documentElement.classList.contains('dark');
    return {
      primary: isDark ? 'hsl(217, 91%, 60%)' : 'hsl(221, 83%, 53%)',
      secondary: isDark ? 'hsl(217, 33%, 18%)' : 'hsl(210, 40%, 96%)',
      accent: isDark ? 'hsl(217, 91%, 60%)' : 'hsl(221, 83%, 53%)',
      background: isDark ? 'hsl(222, 84%, 5%)' : 'hsl(210, 40%, 98%)'
    };
  };
  
  // Resize canvas
  const resizeCanvas = () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  };
  
  // Create particles
  const createParticles = () => {
    const particleCount = Math.min(50, Math.floor((canvas.width * canvas.height) / 15000));
    particles.length = 0;
    
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        size: Math.random() * 2 + 1,
        opacity: Math.random() * 0.5 + 0.1,
        hue: Math.random() * 60 + 200 // Blue to purple range
      });
    }
  };
  
  // Draw gradient background
  const drawBackground = () => {
    const colors = getThemeColors();
    const isDark = document.documentElement.classList.contains('dark');
    
    // Create gradient
    const gradient = ctx.createRadialGradient(
      canvas.width / 2, canvas.height / 2, 0,
      canvas.width / 2, canvas.height / 2, Math.max(canvas.width, canvas.height) / 2
    );
    
    if (isDark) {
      gradient.addColorStop(0, 'hsl(222, 84%, 5%)');
      gradient.addColorStop(0.3, 'hsl(217, 33%, 8%)');
      gradient.addColorStop(1, 'hsl(222, 84%, 5%)');
    } else {
      gradient.addColorStop(0, 'hsl(210, 40%, 98%)');
      gradient.addColorStop(0.3, 'hsl(210, 40%, 95%)');
      gradient.addColorStop(1, 'hsl(210, 40%, 98%)');
    }
    
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  };
  
  // Draw particles
  const drawParticles = () => {
    particles.forEach(particle => {
      ctx.save();
      ctx.globalAlpha = particle.opacity;
      
      // Create particle gradient
      const particleGradient = ctx.createRadialGradient(
        particle.x, particle.y, 0,
        particle.x, particle.y, particle.size * 3
      );
      
      particleGradient.addColorStop(0, `hsla(${particle.hue}, 70%, 60%, 0.8)`);
      particleGradient.addColorStop(1, `hsla(${particle.hue}, 70%, 60%, 0)`);
      
      ctx.fillStyle = particleGradient;
      ctx.beginPath();
      ctx.arc(particle.x, particle.y, particle.size * 3, 0, Math.PI * 2);
      ctx.fill();
      
      ctx.restore();
    });
  };
  
  // Draw connections
  const drawConnections = () => {
    const maxDistance = 120;
    
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < maxDistance) {
          const opacity = (1 - distance / maxDistance) * 0.2;
          
          ctx.save();
          ctx.globalAlpha = opacity;
          ctx.strokeStyle = `hsl(217, 91%, 60%)`;
          ctx.lineWidth = 0.5;
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.stroke();
          ctx.restore();
        }
      }
    }
  };
  
  // Update particles
  const updateParticles = () => {
    particles.forEach(particle => {
      particle.x += particle.vx;
      particle.y += particle.vy;
      
      // Bounce off edges
      if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1;
      if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1;
      
      // Keep particles in bounds
      particle.x = Math.max(0, Math.min(canvas.width, particle.x));
      particle.y = Math.max(0, Math.min(canvas.height, particle.y));
    });
  };
  
  // Animation loop
  const animate = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    drawBackground();
    drawParticles();
    drawConnections();
    updateParticles();
    
    animationId = requestAnimationFrame(animate);
  };
  
  // Initialize
  resizeCanvas();
  createParticles();
  animate();
  
  // Handle resize
  const handleResize = () => {
    resizeCanvas();
    createParticles();
  };
  
  window.addEventListener('resize', handleResize);
  
  // Cleanup function
  return () => {
    if (animationId) {
      cancelAnimationFrame(animationId);
    }
    window.removeEventListener('resize', handleResize);
    if (canvas.parentNode) {
      canvas.parentNode.removeChild(canvas);
    }
  };
};