import type { Route } from "./+types/home";
import { useState, useMemo } from "react";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "tidly" },
    { name: "description", content: "Simple Life Logging Application" },
  ];
}

export default function Home() {
  const [logs, setLogs] = useState<{text: string, time: string}[]>([]);
  const [newLog, setNewLog] = useState("");
  const [activeTag, setActiveTag] = useState<string | null>(null);

  const extractTags = (text: string) => {
    return text.match(/#\w+/g) || [];
  };

  const allTags = useMemo(() => {
    return Array.from(
      new Set(logs.flatMap(log => extractTags(log.text)))
    );
  }, [logs]);

  const filteredLogs = useMemo(() => {
    return activeTag 
      ? logs.filter(log => log.text.includes(activeTag))
      : logs;
  }, [logs, activeTag]);

  const addLog = () => {
    const trimmedLog = newLog.trim();
    if (trimmedLog) {
      const now = new Date();
      const timeString = `
        ${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')} 
        ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}:${String(now.getSeconds()).padStart(2, '0')}
      `.replace(/\s+/g, ' ').trim();
      setLogs([{text: trimmedLog, time: timeString}, ...logs]);
      setNewLog("");
      return true;
    }
    return false;
  };

  const removeLog = (index: number) => {
    if (window.confirm('このログを削除してもよろしいですか？')) {
      setLogs(logs.filter((_, i) => i !== index));
    }
  };

  return (
    <div className="flex w-full max-w-5xl mx-auto mt-8 p-4 dark:text-green-300 gap-6">
      {/* メインコンテンツ */}
      <div className="flex-1">
      <h1 className="text-2xl font-bold mb-2">tidly</h1>
      {activeTag && (
        <div className="mb-3 flex items-center">
          <span className="mr-2">Filtering by: {activeTag}</span>
          <button 
            onClick={() => setActiveTag(null)}
            className="text-sm text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
          >
            (Clear filter)
          </button>
        </div>
      )}
      <div className="flex mb-4">
        <input
          type="text"
          value={newLog}
          onChange={(e) => setNewLog(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) {
              e.preventDefault();
              if (addLog()) {
                setNewLog("");
              }
            }
          }}
          placeholder="Add new log (Cmd+Enter to submit)"
          className="flex-1 border border-gray-300 dark:border-gray-600 rounded-l-md px-2 py-1 h-[38px] mr-0"
        />
        <button
          onClick={addLog}
          className="bg-green-600 hover:bg-green-700 text-white px-4 rounded-r-md transition-colors h-[38px] w-[80px] flex items-center justify-center"
        >
          Add
        </button>
      </div>
      <ul className="w-full max-w-full">
        {filteredLogs.map((log, index) => (
          <li key={index} className="flex py-2 border-b border-gray-300 dark:border-gray-600 w-full hover:bg-[#010a01]/70 transition-colors relative">
            <div className="flex-1 min-w-0 flex items-center overflow-hidden">
              <span className="text-gray-500 mr-4 shrink-0">
                <span className="opacity-70 text-xs">{log.time.split(' ')[0]}</span>
                <span className="text-sm"> {log.time.split(' ')[1]}</span>
              </span>
              <span className="text-left break-words min-w-0 overflow-hidden">
                {log.text.split(/(#\w+)/g).map((part, i) => {
                  if (part.startsWith('#')) {
                    return (
                      <button
                        key={i}
                        onClick={(e) => {
                          e.preventDefault();
                          setActiveTag(part);
                        }}
                        className="text-green-400 hover:underline"
                      >
                        {part}
                      </button>
                    );
                  }
                  return part;
                })}
              </span>
            </div>
            <button
              onClick={() => removeLog(index)}
              className="text-gray-400 hover:text-red-600 ml-2 shrink-0 transition-all duration-300 ease-in-out group relative w-4 flex items-center justify-center"
              title="Remove log"
            >
              <span className="group-hover:opacity-0 group-hover:scale-90 transition-all duration-300">－</span>
              <span className="absolute opacity-0 group-hover:opacity-100 group-hover:scale-110 transition-all duration-300">×</span>
            </button>
          </li>
        ))}
      </ul>
      </div>

      {/* 右サイドバー */}
      <div className="w-48 shrink-0 mt-[52px]">
        <h2 className="text-lg font-semibold mb-3">Tags</h2>
        {allTags.length > 0 && (
          <div className="flex flex-col gap-2">
            {allTags.map(tag => (
              <button
                key={tag}
                onClick={() => setActiveTag(activeTag === tag ? null : tag)}
                className={`px-3 py-1.5 rounded text-sm text-left ${
                  activeTag === tag 
                    ? 'bg-green-600 text-white' 
                    : 'bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600'
                }`}
              >
                {tag}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
