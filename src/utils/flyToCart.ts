export function flyToCart(imgEl: HTMLImageElement) {
  const cartBtn = document.getElementById('cart-icon');
  if (!cartBtn) return;

  const imgRect  = imgEl.getBoundingClientRect();
  const cartRect = cartBtn.getBoundingClientRect();

  // Clona la imagen
  const clone = imgEl.cloneNode(true) as HTMLImageElement;
  Object.assign(clone.style, {
    position:   'fixed',
    left:       `${imgRect.left}px`,
    top:        `${imgRect.top}px`,
    width:      `${imgRect.width}px`,
    height:     `${imgRect.height}px`,
    transition: 'all 0.8s ease-in-out',
    zIndex:     '1000',
    pointerEvents: 'none',
  });
  document.body.appendChild(clone);

  // Animación
  requestAnimationFrame(() => {
    clone.style.left      = `${cartRect.left + cartRect.width/2 - imgRect.width/2}px`;
    clone.style.top       = `${cartRect.top  + cartRect.height/2 - imgRect.height/2}px`;
    clone.style.opacity   = '0.5';
    clone.style.transform = 'scale(0.2)';
  });

  // Al terminar, lo eliminamos
  clone.addEventListener('transitionend', () => clone.remove());
}
