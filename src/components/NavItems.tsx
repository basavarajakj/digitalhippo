'use client';

import { PRODUCT_CATEGORIES } from '@/config';
import { useState, useRef, useEffect } from 'react';
import NavItem from './NavItem';
import { useOnClickOutside } from '@/hooks/useOnClickOutside';


const NavItems = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const isAnyOpen = activeIndex !== null;

  const navRef = useRef<HTMLDivElement | null>(null);

  useOnClickOutside(navRef, () => setActiveIndex(null));

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if(e.key === 'Escape') {
        setActiveIndex(null);
      }
    }

    document.addEventListener('keydown', handler);
    
    return () => {
      document.removeEventListener('keydown', handler);  
    }
  }, [])
  
  return ( 
    <div ref={navRef} className="flex gap-4 h-full">
      {PRODUCT_CATEGORIES.map((category, index) => {

        const handleOpen = () => {
          if(activeIndex === index) {
            setActiveIndex(null);
          } else {
            setActiveIndex(index);
          }
        }

        const isOpen = index === activeIndex;
        return (
          <NavItem 
            key={category.value}
            category={category}
            handleOpen={handleOpen}
            isOpen={isOpen}
            isAnyOpen={isAnyOpen}
          />
        )
      })}
    </div>
   );
}
 
export default NavItems;
