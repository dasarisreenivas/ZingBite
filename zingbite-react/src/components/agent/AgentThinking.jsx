export default function AgentThinking({ thinkingState }) {
  return (
    <div className="flex items-center gap-2.5 max-w-[85%] mr-auto">
      <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-red-500 text-white animate-pulse">
        AI
      </div>
      <div className="bg-white border border-gray-100 rounded-2xl rounded-tl-none px-3.5 py-2.5 text-xs text-gray-500 font-semibold shadow-sm flex items-center gap-2">
        <div className="flex space-x-1">
          <div className="w-1.5 h-1.5 bg-red-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
          <div className="w-1.5 h-1.5 bg-red-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
          <div className="w-1.5 h-1.5 bg-red-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
        </div>
        <span>{thinkingState || "Analyzing request..."}</span>
      </div>
    </div>
  );
}
