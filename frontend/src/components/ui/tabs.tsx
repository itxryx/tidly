import * as React from "react"
import { cn } from "@/lib/utils"

interface TabsProps extends React.HTMLAttributes<HTMLDivElement> {
  defaultValue?: string
  children: React.ReactNode
}

type TabListProps = React.HTMLAttributes<HTMLDivElement>

interface TabTriggerProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  value: string
}

interface TabContentProps extends React.HTMLAttributes<HTMLDivElement> {
  value: string
}

const TabsContext = React.createContext<{
  value: string
  setValue: (value: string) => void
} | null>(null)

function Tabs({
  defaultValue,
  className,
  children,
  ...props
}: TabsProps) {
  const [value, setValue] = React.useState(defaultValue || "")

  return (
    <TabsContext.Provider value={{ value, setValue }}>
      <div className={cn("", className)} {...props}>
        {children}
      </div>
    </TabsContext.Provider>
  )
}

function TabList({ className, ...props }: TabListProps) {
  return (
    <div
      className={cn(
        "flex space-x-1 rounded-lg bg-card p-1 border border-border relative",
        className
      )}
      {...props}
    />
  )
}

function TabTrigger({ value, className, children, ...props }: TabTriggerProps) {
  const context = React.useContext(TabsContext)

  if (!context) {
    throw new Error("TabTrigger must be used within a Tabs component")
  }

  const { value: selectedValue, setValue } = context
  const isSelected = selectedValue === value

  return (
    <button
      type="button"
      role="tab"
      aria-selected={isSelected}
      data-state={isSelected ? "active" : "inactive"}
      className={cn(
        "inline-flex flex-1 items-center justify-center whitespace-nowrap px-3 py-2 text-sm font-medium ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
        "transition-all duration-200 relative z-10",
        isSelected
          ? "bg-background text-foreground shadow scale-105 font-semibold"
          : "text-muted-foreground hover:bg-muted/20 hover:scale-105",
        "rounded-md",
        className
      )}
      onClick={() => setValue(value)}
      {...props}
    >
      {children}
    </button>
  )
}

function TabContent({ value, className, children, ...props }: TabContentProps) {
  const context = React.useContext(TabsContext)

  if (!context) {
    throw new Error("TabContent must be used within a Tabs component")
  }

  const { value: selectedValue } = context
  const isSelected = selectedValue === value

  if (!isSelected) return null

  return (
    <div
      role="tabpanel"
      data-state={isSelected ? "active" : "inactive"}
      className={cn(
        "mt-2",
        isSelected ? "animate-in fade-in-50 duration-300" : "hidden",
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}

export { Tabs, TabList, TabTrigger, TabContent }