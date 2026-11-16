import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "cn"

const headingVariants = cva("font-display font-bold tracking-tight text-balance text-foreground", {
  variants: {
    size: { xl: "text-4xl", lg: "text-2xl", md: "text-xl", sm: "text-base" },
  },
  defaultVariants: { size: "lg" },
})

export interface HeadingProps extends React.HTMLAttributes<HTMLHeadingElement>, VariantProps<typeof headingVariants> {
  as?: "h1" | "h2" | "h3" | "h4"
}

export function Heading({ as: Tag = "h2", size, className, ...props }: HeadingProps) {
  return <Tag className={cn(headingVariants({ size }), className)} {...props} />
}

const textVariants = cva("text-pretty", {
  variants: {
    tone: { default: "text-foreground", muted: "text-muted-foreground", primary: "text-primary-text", danger: "text-destructive" },
    size: { md: "text-sm", sm: "text-xs", lg: "text-base" },
    weight: { normal: "font-normal", medium: "font-medium", bold: "font-bold" },
  },
  defaultVariants: { tone: "default", size: "md", weight: "normal" },
})

export interface TextProps extends React.HTMLAttributes<HTMLElement>, VariantProps<typeof textVariants> {
  as?: "p" | "span" | "div"
}

export function Text({ as: Tag = "p", tone, size, weight, className, ...props }: TextProps) {
  return <Tag className={cn(textVariants({ tone, size, weight }), className)} {...props} />
}
