import { Icon } from '@iconify/react';

export default function MenuToggle({ isOpen, onToggle }: { isOpen: boolean; onToggle: () => void }) {
  return (
    <button
      className="md:hidden text-slate-500 hover:text-slate-900 transition-colors"
      onClick={onToggle}
      aria-label="Toggle menu"
    >
      {isOpen ? <Icon icon="lucide:x" width={20} height={20} /> : <Icon icon="lucide:menu" width={20} height={20} />}
    </button>
  );
}
