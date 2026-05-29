'use client'

import { useRouter } from 'next/navigation'
import { useState, useCallback, useMemo } from 'react'
import Image from 'next/image'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Search, Check } from 'lucide-react'
import { LoadingButton } from '@/components/ui/loading-button'
import { NotionIcon } from '@/app/_components/notion/NotionIcon'

// Define the structure of a Notion database
interface Database {
  id: string
  name: string
  icon: string | null
}

interface NotionDatabaseSelectorProps {
  databases: Database[]
}

export function NotionDatabaseSelector({
  databases,
}: NotionDatabaseSelectorProps) {
  const router = useRouter()
  const [selectedDatabaseId, setSelectedDatabaseId] = useState<string | null>(
    null
  )
  const [searchTerm, setSearchTerm] = useState('')
  const [isNavigating, setIsNavigating] = useState(false)

  // Filters databases based on user input
  const filteredDatabases = useMemo(() => {
    return databases.filter(db =>
      db.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
  }, [databases, searchTerm])

  // Handle navigation after selecting a database
  const handleContinue = useCallback(() => {
    if (selectedDatabaseId) {
      setIsNavigating(true)
      router.push(`/forms/create/${selectedDatabaseId}`)
    }
  }, [router, selectedDatabaseId])

  return (
    <div className="mx-auto max-w-md">
      {/* Card container for database selection */}
      <Card className="overflow-hidden border-border/30 bg-card/90 shadow-md backdrop-blur-sm">
        <CardHeader className="border-b border-border/20 bg-card/80 pb-4 text-center">
          <CardTitle className="mb-1 flex items-center justify-center gap-2 text-xl">
            Select a
            <Image
              width={24}
              height={24}
              src="/notion-logo.svg"
              alt="Notion"
              className="inline-block invert"
              priority
            />
            Notion Database
          </CardTitle>
          <CardDescription>
            Choose an authorized database to generate a dynamic editor and
            preview interface.
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-4 p-4">
          {/* Search bar */}
          <div className="relative">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search databases..."
              className="border-border/30 bg-muted/30 pl-9 transition-colors focus:border-primary/50"
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
            />
          </div>

          {/* Database selection list */}
          <div className="h-60 overflow-hidden">
            <DatabaseList
              databases={filteredDatabases}
              selectedDatabaseId={selectedDatabaseId}
              setSelectedDatabaseId={setSelectedDatabaseId}
              searchTerm={searchTerm}
            />
          </div>
        </CardContent>

        <CardFooter className="border-t border-border/20 bg-card/80 p-4">
          {/* Continue button, disabled until a database is selected */}
          <LoadingButton
            className="w-full"
            disabled={!selectedDatabaseId}
            isLoading={isNavigating}
            onClick={handleContinue}
          >
            Continue
          </LoadingButton>
        </CardFooter>
      </Card>
    </div>
  )
}

// Displays the list of available databases
function DatabaseList({
  databases,
  selectedDatabaseId,
  setSelectedDatabaseId,
  searchTerm,
}: {
  databases: Database[]
  selectedDatabaseId: string | null
  setSelectedDatabaseId: (id: string) => void
  searchTerm: string
}) {
  // Handles database selection
  const handleSelectDatabase = useCallback((id: string) => {
    setSelectedDatabaseId(id)
  }, [])

  return (
    <div className="h-full space-y-2 overflow-y-auto pr-1">
      {databases.length > 0 ? (
        databases.map(database => (
          <div
            key={database.id}
            role="button"
            tabIndex={0}
            className={`flex cursor-pointer items-center rounded-lg border p-3 transition-all ${
              selectedDatabaseId === database.id
                ? 'border-primary/30 bg-primary/10'
                : 'border-transparent hover:bg-muted/30'
            }`}
            onClick={() => handleSelectDatabase(database.id)}
            onKeyDown={e =>
              e.key === 'Enter' && handleSelectDatabase(database.id)
            }
          >
            {/* Database Icon */}
            <div className="mr-3 text-muted-foreground">
              <NotionIcon icon={database.icon} />
            </div>
            {/* Database Icon */}
            <div className="flex-1">
              <p className="font-medium">{database.name}</p>
            </div>
            {/* Checkmark for selected database */}
            {selectedDatabaseId === database.id && (
              <Check className="h-4 w-4 text-primary" />
            )}
          </div>
        ))
      ) : (
        <div className="flex h-full items-center justify-center text-center text-muted-foreground">
          <div>
            <p className="mb-2">No databases found matching "{searchTerm}"</p>
            <p className="text-sm">Try a different search term</p>
          </div>
        </div>
      )}
    </div>
  )
}
