{/*  app/components/layout/section-cards.tsx */}

import { TrendingDownIcon, TrendingUpIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card"; {/*  Correct import */}

export function SectionCards() {
  return (
    <div className="grid grid-cols-1 gap-4 px-4 lg:px-6 xl:grid-cols-2 5xl:grid-cols-4">
      {/* Total Revenue Card */}
      <Card className="shadow-md hover:shadow-lg p-4">
        <h2 className="text-lg font-bold mb-2">Total Revenue</h2>
        <div className="relative">
          <div className="absolute right-4 top-4">
            <Badge variant="outline" className="flex gap-1 rounded-lg text-xs">
              <TrendingUpIcon className="size-3" />
              +12.5%
            </Badge>
          </div>
          <p className="text-2xl font-semibold tabular-nums">$1,250.00</p>
        </div>
        <div className="pt-4 border-t mt-4">
          <div className="flex gap-2 font-medium">
            Trending up this month <TrendingUpIcon className="size-4" />
          </div>
          <p className="text-muted-foreground">
            Visitors for the last 6 months
          </p>
        </div>
      </Card>

      {/* New Customers Card */}
      <Card className="shadow-md hover:shadow-lg p-4">
        <h2 className="text-lg font-bold mb-2">New Customers</h2>
        <div className="relative">
          <div className="absolute right-4 top-4">
            <Badge variant="outline" className="flex gap-1 rounded-lg text-xs">
              <TrendingDownIcon className="size-3" />
              -20%
            </Badge>
          </div>
          <p className="text-2xl font-semibold tabular-nums">1,234</p>
        </div>
        <div className="pt-4 border-t mt-4">
          <div className="flex gap-2 font-medium">
            Down 20% this period <TrendingDownIcon className="size-4" />
          </div>
          <p className="text-muted-foreground">Acquisition needs attention</p>
        </div>
      </Card>

      {/* Active Accounts Card */}
      <Card className="shadow-md hover:shadow-lg p-4">
        <h2 className="text-lg font-bold mb-2">Active Accounts</h2>
        <div className="relative">
          <div className="absolute right-4 top-4">
            <Badge variant="outline" className="flex gap-1 rounded-lg text-xs">
              <TrendingUpIcon className="size-3" />
              +12.5%
            </Badge>
          </div>
          <p className="text-2xl font-semibold tabular-nums">45,678</p>
        </div>
        <div className="pt-4 border-t mt-4">
          <div className="flex gap-2 font-medium">
            Strong user retention <TrendingUpIcon className="size-4" />
          </div>
          <p className="text-muted-foreground">Engagement exceeded targets</p>
        </div>
      </Card>

      {/* Growth Rate Card */}
      <Card className="shadow-md hover:shadow-lg p-4">
        <h2 className="text-lg font-bold mb-2">Growth Rate</h2>
        <div className="relative">
          <div className="absolute right-4 top-4">
            <Badge variant="outline" className="flex gap-1 rounded-lg text-xs">
              <TrendingUpIcon className="size-3" />
              +4.5%
            </Badge>
          </div>
          <p className="text-2xl font-semibold tabular-nums">4.5%</p>
        </div>
        <div className="pt-4 border-t mt-4">
          <div className="flex gap-2 font-medium">
            Steady performance <TrendingUpIcon className="size-4" />
          </div>
          <p className="text-muted-foreground">Meets growth projections</p>
        </div>
      </Card>
    </div>
  );
}
