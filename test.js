import { promises as fs } from 'fs';
import path from 'path';
import OpenAI from 'openai';
import dotenv from 'dotenv';

dotenv.config();

const openai = new OpenAI({ apiKey: process.env.OPEN_AI_API_KEY });

const textFile = path.resolve('./text/data.txt');
const speechFile = path.resolve('./speech.mp3');

async function main() {
  const text = await fs.readFile(textFile, 'utf8');
  const mp3 = await openai.audio.speech.create({
    model: 'tts-1',
    voice: 'alloy',
    input: text,
  });
  console.log(speechFile);
  const buffer = Buffer.from(await mp3.arrayBuffer());
  await fs.writeFile(speechFile, buffer);
}

main();
