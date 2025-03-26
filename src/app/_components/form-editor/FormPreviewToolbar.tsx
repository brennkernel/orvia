'use client'

import { Button } from '@/components/ui/button'
import { Maximize, Minimize, PanelRight, PanelLeft } from 'lucide-react'
import type { FormPreviewToolbarProps } from '@/app/_components/form-editor/types'

export function FormPreviewToolbar({
  isFullscreen,
  onToggleFullscreen,
  onTogglePropertiesPanel,
  isPropertiesPanelVisible,
  showPropertiesPanelToggle = false,
}: FormPreviewToolbarProps) {
  return (
    <div className="flex flex-col">
      {/* Toolbar header */}
      <div className="flex items-center justify-between px-3 pb-3 pt-4">
        <span className="text-sm font-semibold text-muted-foreground">
          Form Preview
        </span>
        <div className="flex items-center gap-2">
          {/* Fullscreen toggle */}
          <Button
            variant="ghost"
            size="icon"
            onClick={onToggleFullscreen}
            title={isFullscreen ? 'Exit Fullscreen' : 'Enter Fullscreen'}
            className="h-7 w-7 text-muted-foreground hover:text-foreground"
          >
            {isFullscreen ? (
              <Minimize className="h-4 w-4" />
            ) : (
              <Maximize className="h-4 w-4" />
            )}
          </Button>

          {/* Properties panel toggle */}
          {showPropertiesPanelToggle && onTogglePropertiesPanel && (
            <Button
              variant="ghost"
              size="icon"
              onClick={onTogglePropertiesPanel}
              title={
                isPropertiesPanelVisible ? 'Hide Properties' : 'Show Properties'
              }
              className="h-7 w-7 text-muted-foreground hover:text-foreground"
            >
              {isPropertiesPanelVisible ? (
                <PanelRight className="h-4 w-4" />
              ) : (
                <PanelLeft className="h-4 w-4" />
              )}
            </Button>
          )}
        </div>
      </div>
      {/* Divider */}
      <div className="ml-3 h-[1px] w-3/4 bg-gradient-to-r from-border to-transparent"></div>
    </div>
  )
}
