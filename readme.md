# Speech-To-Text

Reads text from a `.txt` file then outputs an audio `.mp3` file.

Powered by [Open AI Audio API](https://platform.openai.com/docs/guides/speech-to-text)

Note: 4096 character limit per API call. To upload longer text, modify script to send in chunks.

# Requirements

- Node.js
- Open AI account

# Usage

1. Clone repo
2. Install:
```console
$ npm install
```
3. Rename `.env.example` to `.env`
4. Create an Open AI API key with Audio API permissions
5. Add the API key to `.env`:
```env
OPEN_AI_API_KEY='<EXAMPLE_OPEN_AI_API_KEY>'
```
6. Replace the contents of the `./text/data.txt` file with the text you'd like to convert to speech
7. Run with:
```console
$ node index.js
```
8. Output audio file will be saved in the project root with the name `speech.mp3`
