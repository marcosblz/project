export const initializeDynamicBackground = () => {
  const updateMousePosition = (e: MouseEvent) => {
    const x = (e.clientX / window.innerWidth) * 100;
    const y = (e.clientY / window.innerHeight) * 100;
    
    document.documentElement.style.setProperty('--x', `${x}%`);
    document.documentElement.style.setProperty('--y', `${y}%`);
  };

  document.addEventListener('mousemove', updateMousePosition);

  // Initialize with center position
  document.documentElement.style.setProperty('--x', '50%');
  document.documentElement.style.setProperty('--y', '50%');

  // Cleanup function
  return () => {
    document.removeEventListener('mousemove', updateMousePosition);
  };
};