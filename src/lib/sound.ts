export function playTone(type: "catch" | "trash" | "miss" | "power") {
  try {
    const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
    const o = ctx.createOscillator();
    const g = ctx.createGain();
    o.type = type === "trash" ? "sawtooth" : "sine";
    if (type === "catch") o.frequency.value = 880;
    if (type === "trash") o.frequency.value = 200;
    if (type === "miss") o.frequency.value = 240;
    if (type === "power") o.frequency.value = 520;
    g.gain.value = 0.0001;
    o.connect(g);
    g.connect(ctx.destination);
    const now = ctx.currentTime;
    g.gain.linearRampToValueAtTime(0.12, now + 0.01);
    g.gain.exponentialRampToValueAtTime(0.0001, now + 0.4);
    o.start();
    o.stop(now + 0.45);
  } catch (e) {
    // AudioCtx can fail on some browsers; fail silently.
  }
}