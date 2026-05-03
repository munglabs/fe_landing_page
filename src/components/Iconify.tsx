import { Icon } from '@iconify/react';

export default function Iconify({ icon, size = 20, className = '' }: { icon: string; size?: number; className?: string }) {
  return <Icon icon={icon} width={size} height={size} className={className} />;
}
