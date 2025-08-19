import React, { useState } from "react";

export default function WordCounter() {
  const [text, setText] = useState("");

  const countWords = (str) => {
    return str.trim() === "" ? 0 : str.trim().split(/\s+/).length;
  };

  const countSentences = (str) => {
    const sentences = str.split(/[.!?]+/).filter((s) => s.trim() !== "");
    return sentences.length;
  };

  const countParagraphs = (str) => {
    const paragraphs = str.split(/\n+/).filter((p) => p.trim() !== "");
    return paragraphs.length;
  };

  const characters = text.length;
  const charactersNoSpaces = text.replace(/\s/g, "").length;
  const words = countWords(text);
  const sentences = countSentences(text);
  const paragraphs = countParagraphs(text);
  const readingTime = Math.ceil(words / 200); // ~200 words per min
  const avgWordsPerSentence = sentences > 0 ? (words / sentences).toFixed(2) : 0;
  const avgCharsPerWord = words > 0 ? (charactersNoSpaces / words).toFixed(2) : 0;

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
      <div className="w-full max-w-4xl bg-white rounded-2xl shadow-lg p-6">
        <h1 className="text-2xl font-bold mb-4 text-center">Word Counter Tool</h1>

        {/* Text Area */}
        <textarea
          className="w-full border rounded-lg p-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
          rows="6"
          placeholder="Start typing or paste your text here..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />

        {/* Clear Button */}
        <div className="flex justify-end mt-3">
          <button
            className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
            onClick={() => setText("")}
          >
            Clear Text
          </button>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-6">
          <StatBox label="Characters" value={characters} />
          <StatBox label="Characters (no spaces)" value={charactersNoSpaces} />
          <StatBox label="Words" value={words} />
          <StatBox label="Sentences" value={sentences} />
          <StatBox label="Paragraphs" value={paragraphs} />
          <StatBox label="Reading Time (min)" value={readingTime} />
        </div>

        {/* Extra Stats */}
        <div className="flex justify-between items-center bg-gray-100 p-3 rounded-lg mt-6">
          <p className="font-medium">
            Average words per sentence: <span className="font-bold">{avgWordsPerSentence}</span>
          </p>
          <p className="font-medium">
            Average characters per word: <span className="font-bold">{avgCharsPerWord}</span>
          </p>
        </div>
      </div>
    </div>
  );
}

function StatBox({ label, value }) {
  return (
    <div className="border rounded-lg p-4 text-center shadow-sm">
      <p className="text-lg font-bold">{value}</p>
      <p className="text-sm text-gray-500">{label}</p>
    </div>
  );
}
