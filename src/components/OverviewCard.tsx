import { ReactNode } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface OverviewCardProps {
  title: string;
  content: ReactNode;
  accentColor: string;
  icon?: ReactNode;
}

export default function OverviewCard({ title, content, accentColor, icon }: OverviewCardProps) {
  return (
    <Card className={`border-l-4 border-l-${accentColor} animate-fade-in`}>
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-lg">
          {icon}
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-0">
        {content}
      </CardContent>
    </Card>
  );
}