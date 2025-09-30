import { FamilyCalendar } from "@/components/family-calendar"
import { MainNavigation } from "@/components/main-navigation"

export default function FamilyCalendarPage() {
  return (
    <div className="min-h-screen bg-background">
      <MainNavigation showFamilyNav />

      <main className="container mx-auto py-8 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="space-y-6">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold text-balance">Subscribers Calendar</h1>
              <p className="text-muted-foreground text-pretty">
                Manage subscriber events and personal schedules in one place
              </p>
            </div>

            <FamilyCalendar />
          </div>
        </div>
      </main>
    </div>
  )
}
