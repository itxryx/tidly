import { Link } from 'react-router-dom'
import { Button } from "@/components/ui/button"

export default function NotFoundPage() {
  return (
    <div className="flex flex-col items-center justify-center py-16">
      <div className="text-center space-y-6">
        <h1 className="text-6xl font-bold text-primary mb-2">404</h1>
        <div className="h-1 w-16 mx-auto bg-accent/50 rounded-full mb-4"></div>
        <p className="text-xl text-muted-foreground mb-8">Not Found</p>
        <Button 
          asChild
          className="bg-primary hover:bg-primary/80 text-primary-foreground px-6 py-2.5"
        >
          <Link to="/">Back /top</Link>
        </Button>
      </div>
    </div>
  )
}