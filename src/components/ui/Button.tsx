// src/components/ui/Button.tsx
import { cn } from '@/lib/utils';   //  crea una pequeñita o instala clsx

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary';
}
export default function Button({ variant = 'primary', className, ...rest }: Props) {
  const base = 'px-4 py-2 rounded-md font-medium transition-colors';
  const map = {
    primary:   'bg-primary-red text-white hover:bg-red-600',
    secondary: 'bg-primary-green text-white hover:bg-green-600',
  } as const;
  return <button {...rest} className={cn(base, map[variant], className)} />;
}
