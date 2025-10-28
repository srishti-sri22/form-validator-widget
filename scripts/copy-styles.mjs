import { cp, mkdir } from 'fs/promises';
import { resolve } from 'path';

async function copyStyles() {
  const src = resolve(process.cwd(), 'src', 'styles');
  const dest = resolve(process.cwd(), 'dist', 'styles');
  try {
    // Ensure destination exists
    await mkdir(dest, { recursive: true });
    // Copy styles recursively
    await cp(src, dest, { recursive: true });
    console.log(`Copied styles from ${src} -> ${dest}`);
  } catch (err) {
    console.error('Failed to copy styles:', err);
    process.exit(1);
  }
}

copyStyles();