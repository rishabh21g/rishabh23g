import React from 'react';
import { ArrowUp } from 'lucide-react';
import { Clock } from './Clock';
import Battery from './Battery'
import Connection from './Connection';

const MenuBar = () => {
  return (
    <header
      className="
        fixed top-0 left-0 right-0 z-100 h-7
        bg-card backdrop-brightness-80 backdrop-blur-3xl
        border-b border-border/30
        flex items-center justify-between px-4
      "
    >
      <div className="flex items-center gap-2 text-sm text-foreground/80">
        <span className="font-semibold">RG</span>
        <span className="text-muted-foreground text-xs">|</span>
        <span>Desktop</span>
      </div>

      <div className="flex items-center gap-4 text-sm text-foreground/80">
  
        <Connection/>
        <Battery/>
        <Clock />
      </div>
    </header>
  );
};

export default MenuBar;