import ZAI from 'z-ai-web-dev-sdk';

async function generatePWAIcons() {
  try {
    const zai = await ZAI.create();

    // Generate 192x192 icon
    const response192 = await zai.images.generations.create({
      prompt: 'A modern taxi app icon with a tribal pattern, dark background with white "TT" logo, minimal design, perfect for mobile app',
      size: '512x512'
    });

    // Generate 512x512 icon
    const response512 = await zai.images.generations.create({
      prompt: 'A modern taxi app icon with a tribal pattern, dark background with white "TT" logo, minimal design, perfect for mobile app, high resolution',
      size: '1024x1024'
    });

    console.log('192x192 icon generated:', response192.data[0].base64);
    console.log('512x512 icon generated:', response512.data[0].base64);

  } catch (error) {
    console.error('Icon generation failed:', error.message);
  }
}

// For now, let's create a simple SVG icon that can be used as a fallback
const simpleIcon = `
<svg width="192" height="192" viewBox="0 0 192 192" xmlns="http://www.w3.org/2000/svg">
  <rect width="192" height="192" fill="#2D2D2D"/>
  <text x="96" y="120" font-family="Arial, sans-serif" font-size="80" font-weight="bold" text-anchor="middle" fill="white">TT</text>
  <circle cx="96" cy="60" r="15" fill="white"/>
  <path d="M96 75 L96 85 M86 85 L106 85" stroke="white" stroke-width="3" fill="none"/>
</svg>
`;

console.log('Simple icon SVG created');
console.log('To generate actual PNG icons, run the icon generation function');