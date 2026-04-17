#!/usr/bin/env node

/**
 * Optimize Hero Image
 *
 * This script optimizes the hero image to meet project requirements:
 * - Resize to 1920x1280px (3:2 aspect ratio)
 * - Convert to WebP format
 * - Target quality: 80%
 * - Target size: <500KB
 */

import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const INPUT_PATH = 'public/assets/images/dj/hero_image.jpg';
const OUTPUT_WEBP = 'public/assets/images/dj/hero_image.webp';
const OUTPUT_JPG = 'public/assets/images/dj/hero_image_optimized.jpg';

async function optimizeImage() {
  console.log('🖼️  Starting image optimization...\n');

  try {
    // Check if input file exists
    if (!fs.existsSync(INPUT_PATH)) {
      throw new Error(`Input file not found: ${INPUT_PATH}`);
    }

    // Get original file size
    const originalStats = fs.statSync(INPUT_PATH);
    const originalSizeMB = (originalStats.size / (1024 * 1024)).toFixed(2);
    console.log(`📊 Original file: ${originalSizeMB} MB`);

    // Optimize to WebP
    console.log('🔄 Converting to WebP...');
    await sharp(INPUT_PATH)
      .resize(1920, 1280, {
        fit: 'cover',
        position: 'center'
      })
      .webp({
        quality: 80,
        effort: 6 // Higher effort = better compression (0-6)
      })
      .toFile(OUTPUT_WEBP);

    const webpStats = fs.statSync(OUTPUT_WEBP);
    const webpSizeKB = (webpStats.size / 1024).toFixed(2);
    console.log(`✅ WebP created: ${webpSizeKB} KB`);

    // Also create optimized JPG fallback
    console.log('🔄 Creating optimized JPG fallback...');
    await sharp(INPUT_PATH)
      .resize(1920, 1280, {
        fit: 'cover',
        position: 'center'
      })
      .jpeg({
        quality: 85,
        progressive: true
      })
      .toFile(OUTPUT_JPG);

    const jpgStats = fs.statSync(OUTPUT_JPG);
    const jpgSizeKB = (jpgStats.size / 1024).toFixed(2);
    console.log(`✅ Optimized JPG created: ${jpgSizeKB} KB`);

    // Summary
    console.log('\n📈 Optimization Summary:');
    console.log(`  Original:      ${originalSizeMB} MB`);
    console.log(`  WebP:          ${webpSizeKB} KB (${((webpStats.size / originalStats.size) * 100).toFixed(1)}% of original)`);
    console.log(`  Optimized JPG: ${jpgSizeKB} KB (${((jpgStats.size / originalStats.size) * 100).toFixed(1)}% of original)`);

    // Check if WebP meets target
    if (webpStats.size / 1024 < 500) {
      console.log('\n✅ WebP file meets <500KB target!');
    } else {
      console.log('\n⚠️  WebP file exceeds 500KB target. Consider reducing quality further.');
    }

    console.log('\n📝 Next steps:');
    console.log('  1. Update src/pages/index.astro to use the WebP version');
    console.log('  2. Add JPG as fallback for older browsers');
    console.log('  3. Test on mobile devices');
    console.log('\n  Example usage in CSS:');
    console.log('  background: url("/assets/images/dj/hero_image.webp")');
    console.log('  (with JPG fallback for older browsers)');

  } catch (error) {
    console.error('❌ Error optimizing image:', error.message);
    process.exit(1);
  }
}

// Run the optimization
optimizeImage();


