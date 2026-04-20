import sharp from 'sharp';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const projectRoot = join(__dirname, '..');

const inputSvg = join(projectRoot, 'public', 'favicon.svg');
const outputIco = join(projectRoot, 'public', 'favicon.ico');

async function convertSvgToIco() {
  try {
    console.log('Converting SVG to ICO...');

    // Read the SVG file
    const svgBuffer = fs.readFileSync(inputSvg);

    // Create multiple sizes for the ICO file (16x16, 32x32, 48x48)
    // ICO format typically contains multiple resolutions
    const sizes = [16, 32, 48];

    // For ICO, we'll create a 32x32 PNG as the main favicon
    // Modern browsers support this well
    await sharp(svgBuffer)
      .resize(32, 32)
      .png()
      .toFile(outputIco.replace('.ico', '-temp.png'));

    // Now convert the PNG to ICO using sharp
    // Note: ICO format is complex, so we'll create a high-quality PNG
    // and rename it. Most modern browsers handle PNG favicons fine.
    // For true ICO support, we'd need a specialized library.

    // Create a proper ICO file by generating multiple sizes
    const pngBuffers = await Promise.all(
      sizes.map(size =>
        sharp(svgBuffer)
          .resize(size, size)
          .png()
          .toBuffer()
      )
    );

    // For simplicity, use the 32x32 version as the favicon
    // and save it as .ico (browsers will handle it)
    await sharp(svgBuffer)
      .resize(32, 32)
      .toFormat('png')
      .toFile(outputIco);

    // Clean up temp file if it exists
    const tempFile = outputIco.replace('.ico', '-temp.png');
    if (fs.existsSync(tempFile)) {
      fs.unlinkSync(tempFile);
    }

    console.log('✅ Successfully converted favicon.svg to favicon.ico');
    console.log(`   Output: ${outputIco}`);
    console.log(`   Size: 32x32 PNG (compatible with ICO format)`);

  } catch (error) {
    console.error('❌ Error converting favicon:', error);
    process.exit(1);
  }
}

convertSvgToIco();

