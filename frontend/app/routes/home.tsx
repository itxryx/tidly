import type { Route } from "./+types/home";
import { useState, useMemo } from "react";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "tidly" },
    { name: "description", content: "Simple Life Logging Application" },
  ];
}

export default function Home() {
  const [logs, setLogs] = useState<{text: string, time: string, location: {lat: number, lng: number} | null}[]>([]);
  const [newLog, setNewLog] = useState("");
  const [activeTag, setActiveTag] = useState<string | null>(null);
  const [includeLocation, setIncludeLocation] = useState(false);

  const calculateBytes = (str: string) => {
    return new TextEncoder().encode(str).length;
  };

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

  const getMockLocationName = () => {
    return "東京都千代田区1-1";
  };

  const getRandomLocation = () => {
    // モックとして固定の位置情報を返す
    return { lat: 35.684, lng: 139.753 };
  };

  const addLog = (withLocation = includeLocation) => {
    const trimmedLog = newLog.trim();
    if (trimmedLog && calculateBytes(trimmedLog) > 0 && calculateBytes(trimmedLog) <= 800) {
      const now = new Date();
      const timeString = `
        ${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')} 
        ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}:${String(now.getSeconds()).padStart(2, '0')}
      `.replace(/\s+/g, ' ').trim();
      
      const location = withLocation ? getRandomLocation() : null;
      setLogs([{text: trimmedLog, time: timeString, location}, ...logs]);
      setNewLog("");
      setIncludeLocation(false);
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
      
      {allTags.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-4">
          {allTags.map(tag => (
            <button
              key={tag}
              onClick={() => setActiveTag(activeTag === tag ? null : tag)}
              className={`px-3 py-1.5 rounded text-sm ${
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
      <div className="flex flex-col mb-4">
        <textarea
          value={newLog}
          onChange={(e) => setNewLog(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              if (e.metaKey || e.ctrlKey) {
                e.preventDefault();
                if (addLog(e.shiftKey)) {
                  setNewLog("");
                }
              }
            }
          }}
          placeholder="log it (Cmd+Enter or Cmd+Shift+Enter to submit)"
          className="flex-1 border border-gray-300 dark:border-gray-600 rounded-md px-2 py-1 min-h-[80px] mb-1 resize-none"
          maxLength={800}
        />
        <div className={`text-xs mb-2 ${
          calculateBytes(newLog) > 800 
            ? 'text-red-500' 
            : 'text-gray-500'
        }`}>
          {calculateBytes(newLog)}/800 bytes{calculateBytes(newLog) > 800 && ' (over!)'}
        </div>
        <div className="flex items-center gap-2 self-end">
          <label className="flex items-center gap-2 cursor-pointer text-sm">
            <span>with location</span>
            <input
              type="checkbox"
              checked={includeLocation}
              onChange={(e) => setIncludeLocation(e.target.checked)}
              className="w-7 h-7 rounded border-gray-300 dark:border-gray-600 text-green-600 focus:ring-green-500 dark:focus:ring-green-600 bg-white dark:bg-gray-700 checked:bg-green-600 dark:checked:bg-green-600 checked:hover:bg-green-700 dark:checked:hover:bg-green-700"
            />
          </label>
          <button
            onClick={() => addLog(includeLocation)}
            disabled={!newLog.trim() || calculateBytes(newLog.trim()) > 800}
            className={`px-4 rounded-md h-[38px] w-[80px] flex items-center justify-center transition-colors ${
              !newLog.trim() || calculateBytes(newLog.trim()) > 800
                ? 'bg-gray-400 dark:bg-gray-600 cursor-not-allowed'
                : 'bg-green-600 hover:bg-green-700 text-white'
            }`}
          >
          Add
          </button>
        </div>
      </div>
      <ul className="w-full max-w-full">
        {filteredLogs.map((log, index) => (
          <li key={index} className="flex py-4 border-b border-gray-300 dark:border-gray-600 w-full hover:bg-[#010a01]/70 transition-colors relative min-h-[4rem]">
            <div className="flex-1 min-w-0 flex items-center overflow-hidden group">
              <span className="text-gray-500 mr-4 shrink-0 self-center flex flex-col items-center">
                <span className="opacity-70 text-xs">{log.time.split(' ')[0]}</span>
                <span className="text-sm"> {log.time.split(' ')[1]}</span>
                {log.location && <span className="text-xs mt-1">🌏</span>}
              </span>
              <span className="text-left break-words min-w-0 overflow-hidden whitespace-pre-wrap self-center">
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
            <div className="flex items-center h-full self-center">
              <button
                onClick={() => removeLog(index)}
                className="text-gray-400 hover:text-red-600 ml-2 shrink-0 transition-all duration-300 ease-in-out group relative w-4 flex items-center justify-center"
                title="Remove log"
              >
              <span className="group-hover:opacity-0 group-hover:scale-90 transition-all duration-300">－</span>
              <span className="absolute opacity-0 group-hover:opacity-100 group-hover:scale-110 transition-all duration-300">×</span>
            </button>
            </div>
          </li>
        ))}
      </ul>
      </div>
    </div>
  );
}
