import { createTRPCRouter, protectedProcedure } from '@/server/api/trpc'
import { TRPCError } from '@trpc/server'
import { getNotionClient } from '@/server/notion/client'
import { z } from 'zod'

// Supported Notion property types for forms
const SUPPORTED_PROPERTY_TYPES = [
  'title',
  'rich_text',
  'select',
  'multi_select',
  'date',
  'number',
  'checkbox',
  'email',
  'url',
  'phone_number',
  'files',
]

export const notionRouter = createTRPCRouter({
  /**
   * Retrieves a list of Notion databases linked to the user's account.
   */
  listDatabases: protectedProcedure.query(async ({ ctx }) => {
    try {
      const userId = ctx.session.user.id
      if (!userId) {
        throw new TRPCError({
          code: 'UNAUTHORIZED',
          message: 'User ID is missing from session',
        })
      }

      const client = await getNotionClient(userId)

      // Fetch databases from Notion
      const response = await client.search({
        filter: { property: 'object', value: 'database' },
      })

      // Format response
      const databases = response.results.map((db: any) => ({
        id: db.id,
        name: db.title?.[0]?.plain_text || 'Untitled Database',
        icon: db.icon?.emoji || db.icon?.external?.url || null,
        lastEdited: db.last_edited_time,
        url: db.url,
      }))

      return { databases }
    } catch (error: any) {
      if (error instanceof TRPCError) {
        throw error
      }
      throw new TRPCError({
        code: 'INTERNAL_SERVER_ERROR',
        message: 'Failed to fetch databases from Notion',
      })
    }
  }),

  /**
   * Retrieves the schema (structure) of a specific Notion database.
   */
  getDatabaseSchema: protectedProcedure
    .input(
      z.object({
        databaseId: z.string().min(1, 'Database ID cannot be empty'),
      })
    )
    .query(async ({ ctx, input }) => {
      try {
        const userId = ctx.session.user.id
        if (!userId) {
          throw new TRPCError({
            code: 'UNAUTHORIZED',
            message: 'User ID is missing from session',
          })
        }

        const client = await getNotionClient(userId)
        const response = await client.databases.retrieve({
          database_id: input.databaseId,
        })

        return {
          id: response.id,
          title: extractTitle(response),
          properties: formatProperties(response.properties),
        }
      } catch (error: any) {
        if (error instanceof TRPCError) {
          throw error
        }
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: 'Failed to fetch database schema from Notion',
        })
      }
    }),
})

/**
 * Extracts the title of a Notion database.
 */
function extractTitle(response: any): string {
  return Array.isArray(response.title) && response.title.length > 0
    ? response.title[0]?.plain_text || 'Untitled Database'
    : 'Untitled Database'
}

/**
 * Normalizes an ID by removing special characters and spaces.
 */
function normalizeId(id: string): string {
  return id
    .replace(/%[0-9A-F]{2}/gi, '') // Removes URL escape sequences
    .replace(/[^a-zA-Z0-9-_]/g, '_') // Replaces special characters with underscores
    .toLowerCase()
}
/**
 * Formats Notion database properties to match supported types.
 */
function formatProperties(properties: Record<string, any>) {
  return Object.entries(properties)
    .map(([key, prop]) => ({
      id: normalizeId(prop.id),
      name: key,
      type: prop.type,
      options: getPropertyOptions(prop),
    }))
    .filter(prop => SUPPORTED_PROPERTY_TYPES.includes(prop.type))
}

/**
 * Extracts selectable options for supported Notion properties.
 */
function getPropertyOptions(property: any) {
  if (!property?.type) return null
  const optionsField = property[property.type]?.options
  return Array.isArray(optionsField) ? optionsField : null
}
