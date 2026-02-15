
import { execSync } from 'child_process';
import path from 'path';
import fs from 'fs';

/**
 * Clips a YouTube video using yt-dlp and ffmpeg.
 * Usage: node src/scripts/clip_youtube.js <url> <start> <end> <name>
 */

async function clipVideo(url: string, start: string, end: string, outputName: string) {
    const outputDir = path.resolve('public/assets/videos');
    if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir, { recursive: true });
    }

    const outputPath = path.join(outputDir, `${outputName}.mp4`);

    console.log(`🎬 Clipping: ${url}`);
    console.log(`🕒 Range: ${start} - ${end}`);
    console.log(`📁 Saving to: ${outputPath}`);

    const YT_DLP = `C:\\Users\\Ralph-Worker\\AppData\\Local\\Microsoft\\WinGet\\Packages\\yt-dlp.yt-dlp_Microsoft.WinGet.Source_8wekyb3d8bbwe\\yt-dlp.exe`;
    const FFMPEG = `C:\\Users\\Ralph-Worker\\AppData\\Local\\Microsoft\\WinGet\\Packages\\Gyan.FFmpeg_Microsoft.WinGet.Source_8wekyb3d8bbwe\\ffmpeg-8.0.1-full_build\\bin\\ffmpeg.exe`;

    try {
        // Efficiency hack: "--download-sections" tells yt-dlp to request only those byte ranges from YT servers.
        // Format: "*[start]-[end]"
        const section = `*${start}-${end}`;

        // We use -f "bestvideo[ext=mp4]+bestaudio[ext=m4a]/best[ext=mp4]/best" to ensure mp4 compatibility for Remotion
        const command = `"${YT_DLP}" -f "bestvideo[ext=mp4]+bestaudio[ext=m4a]/best[ext=mp4]/best" --ffmpeg-location "${FFMPEG}" --download-sections "${section}" --force-keyframes-at-cuts "${url}" -o "${outputPath}"`;

        console.log(`🚀 Executing: ${command}`);
        execSync(command, { stdio: 'inherit' });

        console.log(`✅ Success! Video saved to ${outputPath}`);
    } catch (error) {
        console.error('❌ Error clipping video:', error);
        process.exit(1);
    }
}

const [, , url, start, end, name] = process.argv;

if (!url || !start || !end || !name) {
    console.log('Usage: npx tsx src/scripts/clip_youtube.ts <url> <start_timestamp> <end_timestamp> <output_name>');
    console.log('Example: npx tsx src/scripts/clip_youtube.ts "https://www.youtube.com/watch?v=XCXo2nW116I" "00:00:10" "00:00:20" travel_hook');
    process.exit(1);
}

clipVideo(url, start, end, name);
