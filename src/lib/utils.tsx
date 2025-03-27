import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'
import {
  TextIcon,
  CalendarIcon,
  LinkIcon,
  MailIcon,
  PhoneIcon,
  CheckSquare,
  FileIcon,
  ListIcon,
  Hash,
} from 'lucide-react'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getFieldIcon(type: string) {
  switch (type) {
    case 'title':
    case 'rich_text':
      return <TextIcon className="h-4 w-4" />
    case 'date':
      return <CalendarIcon className="h-4 w-4" />
    case 'url':
      return <LinkIcon className="h-4 w-4" />
    case 'email':
      return <MailIcon className="h-4 w-4" />
    case 'phone_number':
      return <PhoneIcon className="h-4 w-4" />
    case 'checkbox':
      return <CheckSquare className="h-4 w-4" />
    case 'files':
      return <FileIcon className="h-4 w-4" />
    case 'select':
    case 'multi_select':
      return <ListIcon className="h-4 w-4" />
    case 'number':
      return <Hash className="h-4 w-4" />
    default:
      return <TextIcon className="h-4 w-4" />
  }
}
