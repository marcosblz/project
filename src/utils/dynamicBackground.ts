export const initializeDynamicBackground = () => {
  let animationId: number;
  let time = 0;

  const updateBackground = () => {
    time += 0.005;
    
    // Create floating particles effect
    const x1 = 50 + Math.sin(time) * 20;
    const y1 = 50 + Math.cos(time * 0.8) * 15;
    const x2 = 30 + Math.cos(time * 1.2) * 25;
    const y2 = 70 + Math.sin(time * 0.6) * 20;
    const x3 = 70 + Math.sin(time * 0.9) * 15;
    const y3 = 30 + Math.cos(time * 1.1) * 18;
    
    document.documentElement.style.setProperty('--particle1-x', `${x1}%`);
    document.documentElement.style.setProperty('--particle1-y', `${y1}%`);
    document.documentElement.style.setProperty('--particle2-x', `${x2}%`);
    document.documentElement.style.setProperty('--particle2-y', `${y2}%`);
    document.documentElement.style.setProperty('--particle3-x', `${x3}%`);
    document.documentElement.style.setProperty('--particle3-y', `${y3}%`);
    
    animationId = requestAnimationFrame(updateBackground);
  };

  const updateMousePosition = (e: MouseEvent) => {
    const x = (e.clientX / window.innerWidth) * 100;
    const y = (e.clientY / window.innerHeight) * 100;
    
    document.documentElement.style.setProperty('--mouse-x', `${x}%`);
    document.documentElement.style.setProperty('--mouse-y', `${y}%`);
  };

  // Initialize
  document.documentElement.style.setProperty('--mouse-x', '50%');
  document.documentElement.style.setProperty('--mouse-y', '50%');
  document.documentElement.style.setProperty('--particle1-x', '50%');
  document.documentElement.style.setProperty('--particle1-y', '50%');
  document.documentElement.style.setProperty('--particle2-x', '30%');
  document.documentElement.style.setProperty('--particle2-y', '70%');
  document.documentElement.style.setProperty('--particle3-x', '70%');
  document.documentElement.style.setProperty('--particle3-y', '30%');

  document.addEventListener('mousemove', updateMousePosition);
  updateBackground();

  // Cleanup function
  return () => {
    document.removeEventListener('mousemove', updateMousePosition);
    if (animationId) {
      cancelAnimationFrame(animationId);
    }
  };
};