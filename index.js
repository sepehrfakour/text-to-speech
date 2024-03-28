import { promises as fs } from 'fs';
import path from 'path';
import OpenAI from 'openai';
import dotenv from 'dotenv';
dotenv.config();

// Config
const openai = new OpenAI({ apiKey: process.env.OPEN_AI_API_KEY });
const textFile = path.resolve('./text');
const speechFile = path.resolve('./output');

async function readFilesFromDirectory(dirPath) {
  try {
    // Read all file names in the directory
    const fileNames = await fs.readdir(dirPath);
    const fileContents = [];
    // Iterate through each file name, read its content, and add it to the array
    for (const fileName of fileNames) {
      const filePath = path.join(dirPath, fileName); // Create the full path to the file
      const content = await fs.readFile(filePath, 'utf-8'); // Read file content as a string
      fileContents.push(content); // Add content to the array
    }
    return fileContents; // Return the array containing all file contents
  } catch (error) {
    console.error('An error occurred:', error);
    throw error; // Rethrow the error for further handling if necessary
  }
}

function splitIntoChunks(str, maxLength) {
  let chunks = [];
  let currentChunkStart = 0; // Index where the current chunk starts
  while (currentChunkStart < str.length) {
    let end = Math.min(str.length, currentChunkStart + maxLength); // End index for substring
    if (end < str.length) { // If not the end of the string, try to avoid cutting in the middle of a word
      let lastSpace = end;
      while (lastSpace > currentChunkStart && str[lastSpace] !== ' ' && str[lastSpace - 1] !== ' ') {
        lastSpace--; // Move lastSpace back to avoid splitting a word
      }
      if (lastSpace === currentChunkStart) {
        // If we couldn't find a space, just use the max length (handle long words)
        // In this case, the word is longer than maxLength, so we split where we have to.
        end = currentChunkStart + maxLength;
      } else {
        // End this chunk at the last space found, if there was one.
        end = lastSpace;
      }
    }
    chunks.push(str.substring(currentChunkStart, end)); // Add the chunk
    currentChunkStart = end + (str[end] === ' ' ? 1 : 0); // Move to start of next chunk, skipping the space if there was one
  }
  return chunks;
}

async function textToSpeech() {
  const chapters = await readFilesFromDirectory(textFile);
  let chapterIndex = 0;
  for (const chapter of chapters) {
    const chapterFolder = path.join(speechFile, `Chapter_${chapterIndex + 1}`);
    await fs.mkdir(chapterFolder, { recursive: true }); // Create a sub-folder for the chapter
    const chunks = splitIntoChunks(chapter, 4096); // Split the chapter into 4096-character chunks

    let partIndex = 0; // To keep track of each part within a chapter
    for (const chunk of chunks) {
      const mp3 = await openai.audio.speech.create({
        model: 'tts-1',
        voice: 'alloy',
        input: chunk,
      });
      const buffer = Buffer.from(await mp3.arrayBuffer());
      const mp3FileName = `Part_${partIndex + 1}.mp3`;
      await fs.writeFile(path.join(chapterFolder, mp3FileName), buffer);
      partIndex++; // Move to the next part
    }
    chapterIndex++; // Move to the next chapter
  }
}

textToSpeech();
