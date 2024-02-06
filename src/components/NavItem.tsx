"use client";

import { cn } from "@/lib/utils";
import { ChevronDown } from "lucide-react";

import { PRODUCT_CATEGORIES } from "@/config";
import { Button } from "./ui/button";
import Image from "next/image";
import Link from "next/link";

type Category = typeof PRODUCT_CATEGORIES[number];

interface NavItemProps {
  category: Category;
  handleOpen: () => void;
  isOpen: boolean;
  isAnyOpen: boolean;
}

const NavItem = ({
  category,
  handleOpen,
  isOpen,
  isAnyOpen,
}: NavItemProps) => {
  return (
    <div className="flex">
      <div className="relative flex items-center">
        <Button
          className="gap-1.5"
          onClick={handleOpen}
          variant={isOpen ? 'secondary' : 'ghost'}>
          {category.label}
          <ChevronDown className={cn("h-4 w-4 transition-all text-muted-foreground", { '-rotate-180': isOpen })} />
        </Button>
      </div>

      {isOpen ? (
        <div className={cn(
          "absolute inset-x-0 top-full text-sm text-muted-foreground",
          {
            "animate-in fade-in-10 slide-in-from-top-5": !isAnyOpen
          }
        )}>
          <div className="absolute inset-0 top-1/2 bg-white shadow" aria-hidden="true">
            <div className="mx-auto max-w-7xl px-8 bg-gray-50 rounded-b-xl">
              <div className="grid grid-cols-4 gap-y-10 py-8">
                <div className="col-span-4 col-start-1 grid grid-cols-3 gap-x-8">
                  {category.featured.map((product) => (
                    <div key={product.name} className="group relative text-base sm:text-sm">
                      <div className="relative aspect-video overflow-hidden rounded-lg bg-gray-100 group-hover:shadow-md">
                        <Link href={product.href}>
                          <Image
                            src={product.imageSrc}
                            alt={product.name}
                            fill
                            className="object-cover object-center"
                          />
                        </Link>
                      </div>

                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}

export default NavItem;
