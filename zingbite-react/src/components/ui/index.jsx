import { Search, Loader, X } from 'lucide-react';

export function cx(...classes) { return classes.filter(Boolean).join(' '); }

export function Button({ as: Tag = 'button', variant = 'primary', size = 'md', className, children, icon: Icon, iconRight: IconRight, loading, type = 'button', ...props }) {
  const base = 'inline-flex items-center justify-center gap-2 font-semibold rounded-lg transition-all focus:outline-none focus:ring-2 focus:ring-brand/50 disabled:opacity-50 disabled:cursor-not-allowed';
  const variants = { primary: 'bg-brand text-white hover:bg-brand-hover', secondary: 'border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800', ghost: 'text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800', danger: 'bg-red-600 text-white hover:bg-red-700' };
  const sizes = { sm: 'px-3 py-1.5 text-xs', md: 'px-4 py-2 text-sm', lg: 'px-6 py-3 text-base' };
  return (
    <Tag type={Tag === 'button' ? type : undefined} className={cx(base, variants[variant] || variants.primary, sizes[size] || sizes.md, className)} {...props}>
      {loading ? <Loader size={14} className="animate-spin" /> : Icon ? <Icon size={14} /> : null}{children}
      {IconRight && !loading ? <IconRight size={14} /> : null}
    </Tag>
  );
}

export function Card({ as: Tag = 'div', className, children, ...props }) {
  return <Tag className={cx('bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-6', className)} {...props}>{children}</Tag>;
}

export function Input({ label, icon: Icon, error, className, ...props }) {
  return (
    <div className={cx('flex flex-col gap-1.5', className)}>
      {label && <label className="text-sm font-medium text-gray-700 dark:text-gray-300">{label}</label>}
      <div className="relative">
        {Icon && <Icon size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />}
        <input className={cx('w-full border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 text-sm bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder-gray-400 focus:border-brand focus:ring-2 focus:ring-brand/20 outline-none transition-all', Icon && 'pl-10', error && 'border-red-500')} {...props} />
      </div>
      {error && <p className="text-xs text-red-500">{error}</p>}
    </div>
  );
}

export function Badge({ variant = 'default', children, className }) {
  const variants = { default: 'bg-brand-muted text-brand', success: 'bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-400', danger: 'bg-red-100 dark:bg-red-900/20 text-red-700 dark:text-red-400', warning: 'bg-yellow-100 dark:bg-yellow-900/20 text-yellow-700 dark:text-yellow-400', info: 'bg-blue-100 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400', neutral: 'bg-gray-100 dark:bg-gray-800 text-gray-500' };
  return <span className={cx('inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-semibold', variants[variant] || variants.default, className)}>{children}</span>;
}

export function LoadingSpinner({ text = 'Loading...' }) {
  return <div className="flex flex-col items-center justify-center py-12 gap-3"><Loader size={24} className="animate-spin text-brand" /><p className="text-sm text-gray-500">{text}</p></div>;
}

export function EmptyState({ icon: Icon, title, description, action }) {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      {Icon && <div className="mb-4 w-16 h-16 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-gray-400"><Icon size={28} /></div>}
      {title && <h3 className="text-lg font-semibold mb-1">{title}</h3>}
      {description && <p className="text-sm text-gray-500 max-w-sm mb-4">{description}</p>}
      {action}
    </div>
  );
}

export function SearchBar({ value, onChange, placeholder = 'Search...', className }) {
  return (
    <label className={cx('flex items-center gap-3 h-10 px-4 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 transition-all focus-within:border-brand focus-within:ring-2 focus-within:ring-brand/20', className)}>
      <Search size={16} className="text-gray-400 shrink-0" />
      <input value={value} onChange={onChange} placeholder={placeholder} className="w-full bg-transparent border-0 outline-none text-sm text-gray-900 dark:text-gray-100 placeholder-gray-400" />
    </label>
  );
}

export function Modal({ open, title, description, icon, children, actions, onClose, className }) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4" onClick={onClose}>
      <Card className={cx('w-full max-w-md p-8 text-center relative', className)} onClick={e => e.stopPropagation()}>
        {onClose && <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"><X size={18} /></button>}
        {icon && <div className="mx-auto mb-4 w-14 h-14 rounded-full bg-brand-muted flex items-center justify-center text-brand">{icon}</div>}
        {title && <h3 className="text-xl font-bold mb-2">{title}</h3>}
        {description && <p className="text-sm text-gray-500 mb-4">{description}</p>}
        {children}
        {actions && <div className="mt-6 flex gap-3 justify-center">{actions}</div>}
      </Card>
    </div>
  );
}

export function FilterPills({ options, value, onChange, className }) {
  return (
    <div className={cx('flex gap-1 p-1 rounded-lg bg-gray-100 dark:bg-gray-800', className)}>
      {options.map((opt) => {
        const val = typeof opt === 'string' ? opt : opt.value;
        const label = typeof opt === 'string' ? opt : opt.label;
        return (
          <button key={val} onClick={() => onChange(val)}
            className={cx('px-3 py-1.5 text-sm font-medium rounded-md transition-all whitespace-nowrap', value === val ? 'bg-white dark:bg-gray-700 text-brand shadow-sm' : 'text-gray-500 hover:text-gray-700 dark:hover:text-gray-300')}>
            {label}
          </button>
        );
      })}
    </div>
  );
}

export function StatTile({ icon, value, label }) {
  return (
    <div className="flex items-center gap-3 p-4 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl">
      <div className="w-10 h-10 rounded-lg bg-brand-muted flex items-center justify-center text-brand shrink-0">{icon}</div>
      <div>
        <div className="font-display text-lg font-bold">{value}</div>
        <div className="text-xs text-gray-500">{label}</div>
      </div>
    </div>
  );
}

export function DashboardPanel({ title, icon, action, children, className }) {
  return (
    <Card className={cx('p-5', className)}>
      <div className="flex items-center justify-between gap-3 pb-3 mb-4 border-b border-gray-200 dark:border-gray-800">
        <h3 className="flex items-center gap-2 font-display text-lg font-bold">{icon && <span className="text-brand">{icon}</span>}{title}</h3>
        {action}
      </div>
      {children}
    </Card>
  );
}

export function QuantityStepper({ value, onDecrease, onIncrease, disabled }) {
  return (
    <div className="inline-flex h-8 items-center rounded-lg border border-gray-300 dark:border-gray-600 overflow-hidden">
      <button onClick={onDecrease} disabled={disabled} className="w-8 h-full flex items-center justify-center text-sm font-bold text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800 disabled:opacity-50">-</button>
      <span className="w-10 h-full flex items-center justify-center text-sm font-semibold border-x border-gray-300 dark:border-gray-600">{value}</span>
      <button onClick={onIncrease} disabled={disabled} className="w-8 h-full flex items-center justify-center text-sm font-bold text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800 disabled:opacity-50">+</button>
    </div>
  );
}

export function Avatar({ src, name, size = 'md', className }) {
  const sizeMap = { sm: 'w-8 h-8 text-xs', md: 'w-10 h-10 text-sm', lg: 'w-14 h-14 text-lg' };
  const initials = name ? name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2) : '?';
  return (
    <div className={cx('rounded-full shrink-0 grid place-items-center font-bold overflow-hidden', sizeMap[size] || sizeMap.md, className)}>
      {src ? <img src={src} alt={name || 'Avatar'} className="w-full h-full object-cover" /> : <div className="w-full h-full bg-brand text-white">{initials}</div>}
    </div>
  );
}
