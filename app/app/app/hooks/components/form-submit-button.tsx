"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { Loader2 } from "lucide-react"
import { useState } from "react"

interface FormSubmitButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode
}

export function FormSubmitButton({ children, ...props }: FormSubmitButtonProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (props.type === "submit") {
      setIsSubmitting(true)
      // Reset after 2 seconds if the form doesn't actually submit
      // This is just for demo purposes
      setTimeout(() => {
        setIsSubmitting(false)
      }, 2000)
    }

    if (props.onClick) {
      props.onClick(e)
    }
  }

  return (
    <Button {...props} onClick={handleClick} disabled={isSubmitting || props.disabled}>
      {isSubmitting ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          送信中...
        </>
      ) : (
        children
      )}
    </Button>
  )
}
