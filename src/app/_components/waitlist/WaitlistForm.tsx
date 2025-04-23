'use client'

import { useState } from 'react'
import type React from 'react'
import { z } from 'zod'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { CheckCircle, AlertCircle, Lock } from 'lucide-react'

// Zod email schema
const EmailSchema = z.object({
  email: z.string().email({ message: 'Please enter a valid email address' }),
})

export default function WaitlistForm() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<
    'idle' | 'loading' | 'success' | 'error'
  >('idle')
  const [message, setMessage] = useState('')
  const [isValidEmail, setIsValidEmail] = useState(true)
  const [isTouched, setIsTouched] = useState(false)

  // Submit handler
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsTouched(true)

    const result = EmailSchema.safeParse({ email })
    if (!result.success) {
      setIsValidEmail(false)
      setStatus('error')
      const errorMessage =
        result.error.issues[0]?.message || 'Please enter a valid email address'
      setMessage(errorMessage)
      return
    }

    setStatus('loading')
    try {
      const response = await fetch('https://formcarry.com/s/Tbw4H5oMhW4', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({ email }),
      })

      const data = await response.json()

      if (response.ok) {
        setStatus('success')
        setMessage("Thanks for joining our waitlist! We'll be in touch soon.")
        setEmail('')
        setIsTouched(false)
      } else {
        setStatus('error')
        setMessage(data.message || 'Something went wrong. Please try again.')
      }
    } catch (error) {
      setStatus('error')
      setMessage('Connection error. Please try again later.')
      console.error('Formcarry submission error:', error)
    }
  }

  const handleBlur = () => {
    setIsTouched(true)
    const result = EmailSchema.safeParse({ email })
    setIsValidEmail(result.success)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value)
    if (!isTouched) {
      setIsTouched(true)
    }
  }

  return (
    <div className="w-full">
      <form onSubmit={handleSubmit} className="relative">
        {/* Input wrapper with dynamic validation border */}
        <div
          className={`flex items-center overflow-hidden rounded-sm border p-1.5 transition-all duration-300 focus-within:ring-1 ${
            !isValidEmail && isTouched
              ? 'border-destructive/50 focus-within:border-destructive/70 focus-within:ring-destructive/20'
              : 'border-border focus-within:border-primary/50 focus-within:ring-primary/20'
          }`}
        >
          <Input
            type="text"
            placeholder="Email"
            name="email"
            value={email}
            onChange={handleInputChange}
            onBlur={handleBlur}
            className="flex-1 border-0 bg-transparent px-4 py-2 focus-visible:ring-0 focus-visible:ring-offset-0"
            disabled={status === 'loading' || status === 'success'}
            aria-invalid={!isValidEmail}
            aria-describedby={!isValidEmail ? 'email-error' : undefined}
          />
          <Button
            type="submit"
            className="relative overflow-hidden rounded-sm px-6 font-medium transition-all duration-300 hover:scale-[1.02] hover:bg-primary/90 hover:shadow-[0_0_15px_rgba(167,139,250,0.5)] focus:scale-[1.02] focus:shadow-[0_0_20px_rgba(167,139,250,0.6)]"
            disabled={status === 'loading' || status === 'success'}
          >
            <span className="relative z-10">
              {status === 'loading' ? 'Sending...' : 'Join waitlist'}
            </span>
          </Button>
        </div>

        {/* Email validation error (Zod) */}
        {!isValidEmail &&
          isTouched &&
          status !== 'success' &&
          status !== 'loading' && (
            <div
              id="email-error"
              className="mt-2 flex items-center gap-1.5 text-destructive"
            >
              <AlertCircle className="h-3 w-3" />
              <span className="text-xs">
                Please enter a valid email address
              </span>
            </div>
          )}

        {/* Microcopy - trust signal */}
        {status === 'idle' && isValidEmail && (
          <div className="mt-2 flex items-center justify-center gap-1.5 text-muted-foreground">
            <Lock className="h-3 w-3" />
            <span className="text-xs">
              You'll get early access once we launch. No spam.
            </span>
          </div>
        )}

        {/* Success feedback */}
        {status === 'success' && (
          <div className="mt-3 flex items-center justify-center gap-2">
            <CheckCircle className="text-success h-4 w-4" />
            <span className="text-sm text-foreground">{message}</span>
          </div>
        )}
      </form>
    </div>
  )
}
