export type WindowProps = {
  title: string;
  children: React.ReactNode;
  defaultPosition: { left: number; top: number };
  zIndex: number;
  isActive: boolean;
  onClose: () => void;
  onFocus?: () => void;
  className?: string;        // outer wrapper
  cardClassName?: string;    // width/height here
  contentClassName?: string
};