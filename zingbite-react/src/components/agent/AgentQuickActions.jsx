export default function AgentQuickActions({ quickActions, onActionClick }) {
  if (!quickActions || quickActions.length === 0) return null;

  return (
    <div className="ml-9 mt-2 flex max-w-[calc(100%-2.25rem)] flex-wrap gap-1.5">
      {quickActions.map((action, idx) => (
        <button
          key={idx}
          onClick={() => onActionClick(action)}
          className="max-w-full rounded-full border border-red-100 bg-red-50 px-3 py-1 text-left text-[10px] font-semibold leading-snug text-red-600 shadow-sm transition-all duration-200 hover:scale-105 hover:bg-red-100 active:scale-95 sm:text-xs"
        >
          {action}
        </button>
      ))}
    </div>
  );
}
