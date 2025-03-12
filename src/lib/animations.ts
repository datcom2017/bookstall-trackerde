
export const fadeIn = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
  transition: { duration: 0.3 }
};

export const slideUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
  transition: { 
    duration: 0.5,
    ease: [0.22, 1, 0.36, 1]
  }
};

export const scaleIn = {
  initial: { opacity: 0, scale: 0.95 },
  animate: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 0.95 },
  transition: { 
    duration: 0.3,
    ease: [0.22, 1, 0.36, 1]
  }
};

export const staggerContainer = (delay = 0.1) => ({
  initial: {},
  animate: {
    transition: {
      staggerChildren: delay
    }
  }
});

export const staggerItem = {
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.4 }
};

export function getDelayedFade(index: number, baseDelay = 0.1) {
  return {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    transition: { delay: baseDelay * index, duration: 0.3 }
  };
}
