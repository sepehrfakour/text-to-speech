# Text-To-Speech

Converts text files into audio files using AI.

Powered by Open AI's [Audio API](https://platform.openai.com/docs/guides/speech-to-text).

## How It Works

`.txt` → [Open AI](https://openai.com/) → `.mp3`

## Requirements

- Node.js
- Open AI account

## Usage

1. Clone repo
2. Install:
```console
$ npm install
```
3. Rename `.env.example` to `.env`
4. Create an [Open AI API key](https://platform.openai.com/api-keys) with Audio API permissions
5. Add the API key to `.env`:
```env
OPEN_AI_API_KEY='<EXAMPLE_OPEN_AI_API_KEY>'
```
6. Delete the example `./text/data.txt` text file. Place one or more text files you'd like to convert to speech in the `./text` folder.
7. Run with:
```console
$ node index.js
```
8. Output `.mp3` files will be saved in the `./output` directory.

## Notes

✅ You can place multiple text files directly in `./text`

❌ Don't place folders in `./text`

❌ Be sure there are no invisble files in `./text` (eg. like `.DS_Store`)

🧩 Each text file in `./text` will be split into 4096 character chunks before sending to the Open AI Audio API. The resulting `.mp3` files will therefore be segments of the source text file. The segments from a given text file will be organized into folders prefixed with `Chapter-`. Beware, the numbering of the output `Chapter-` folders will correspond to how your filesystem sorts the input text files. You can merge these segments together with an free `.mp3` editing app like [Audacity](https://www.audacityteam.org/) or an open-source library like [ffmpeg](https://ffmpeg.org/).
