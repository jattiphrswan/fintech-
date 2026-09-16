import { useEffect, useRef } from 'react';

export default function CustomCursor() {
  const dot = useRef(null);
  const circle = useRef(null);

  useEffect(() => {
    const pointer = window.matchMedia('(hover: hover) and (pointer: fine)');
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    let stop = () => {};

    function setup() {
      stop();
      if (!pointer.matches || reducedMotion.matches) return;
      let mouseX = 0, mouseY = 0, circleX = 0, circleY = 0, frame;

      function move(event) {
        mouseX = event.clientX;
        mouseY = event.clientY;
        dot.current.style.left = `${mouseX}px`;
        dot.current.style.top = `${mouseY}px`;
        document.body.classList.toggle('cursor-hover', Boolean(event.target.closest('button, a, .action-btn, .ui-card, .feature-card')));
      }

      function animate() {
        circleX += (mouseX - circleX) * 0.15;
        circleY += (mouseY - circleY) * 0.15;
        circle.current.style.left = `${circleX}px`;
        circle.current.style.top = `${circleY}px`;
        frame = requestAnimationFrame(animate);
      }

      window.addEventListener('mousemove', move);
      frame = requestAnimationFrame(animate);
      stop = () => {
        window.removeEventListener('mousemove', move);
        cancelAnimationFrame(frame);
        document.body.classList.remove('cursor-hover');
      };
    }

    setup();
    pointer.addEventListener('change', setup);
    reducedMotion.addEventListener('change', setup);
    return () => {
      stop();
      pointer.removeEventListener('change', setup);
      reducedMotion.removeEventListener('change', setup);
    };
  }, []);

  return <><div className="cursor-dot" id="cursorDot" ref={dot} aria-hidden="true" /><div className="cursor-circle" id="cursorCircle" ref={circle} aria-hidden="true" /></>;
}
