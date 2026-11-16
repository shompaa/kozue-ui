"use client"

import * as React from "react"
import { useMessages } from "../i18n"
import { Button } from "./ui/button"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "./ui/dialog"
import { Input } from "./ui/input"
import { Label } from "./ui/label"

export interface ConfirmDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onConfirm: () => void
  title: string
  description: string
  /** Si se define, el usuario debe escribir este texto para habilitar el botón. */
  requireText?: string
  confirmLabel?: string
  cancelLabel?: string
}

export function ConfirmDialog({
  open,
  onOpenChange,
  onConfirm,
  title,
  description,
  requireText,
  confirmLabel,
  cancelLabel,
}: ConfirmDialogProps) {
  const m = useMessages()
  const [typed, setTyped] = React.useState("")
  const id = React.useId()
  const ok = !requireText || typed.trim().toLowerCase() === requireText.trim().toLowerCase()

  return (
    <Dialog
      open={open}
      onOpenChange={(next) => {
        if (!next) setTyped("")
        onOpenChange(next)
      }}
    >
      <DialogContent showCloseButton={false}>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        {requireText ? (
          <div className="grid gap-2">
            <Label htmlFor={id}>{m.confirmDialog.typeToConfirm(requireText)}</Label>
            <Input id={id} autoComplete="off" value={typed} onChange={(e) => setTyped(e.target.value)} />
          </div>
        ) : null}
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>{cancelLabel ?? m.common.cancel}</Button>
          <Button variant="destructive" disabled={!ok} onClick={onConfirm}>{confirmLabel ?? m.common.confirm}</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
