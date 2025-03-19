"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Undo, Redo, Sparkles } from "lucide-react";
import { Separator } from "@/components/ui/separator";

interface FormEditorNavbarProps {
  formTitle: string;
}

export function FormEditorNavbar({ formTitle }: FormEditorNavbarProps) {
  return (
    <header className="border-b border-border/30 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-30">
      <div className="container flex h-14 items-center justify-between">
        {/* Left Section: Back Button */}
        <div className="flex items-center gap-2">
          <Link href="/forms/create">
            <Button variant="ghost" size="sm" className="gap-1 text-muted-foreground hover:text-foreground">
              <ArrowLeft className="h-4 w-4" />
              Back
            </Button>
          </Link>
        </div>

        {/* Center Section: Form Name */}
        <div className="flex items-center">
          <h1 className="text-lg font-semibold text-foreground">{formTitle}</h1>
        </div>

        {/* Right Section: Action Buttons */}
        <div className="flex items-center gap-2">
          <div className="flex items-center mr-2">
            <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-foreground" disabled>
              <Undo className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-foreground" disabled>
              <Redo className="h-4 w-4" />
            </Button>
          </div>
          <Separator orientation="vertical" className="h-6" />
          <Button variant="default" size="sm" className="gap-1.5 bg-primary text-white border-none shadow-md hover:shadow-lg transition-all">
            <Sparkles className="h-3.5 w-3.5" />
            Publish Form
          </Button>
        </div>
      </div>
    </header>
  );
}