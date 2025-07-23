import { ReactNode } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface Section {
  title: string;
  content: ReactNode;
  collapsible?: boolean;
}

interface ScrollableSectionsProps {
  sections: Section[];
  accentColor: string;
}

export default function ScrollableSections({ sections, accentColor }: ScrollableSectionsProps) {
  return (
    <div className="space-y-4">
      {sections.map((section, index) => (
        <Card key={index} className="animate-scale-in" style={{ animationDelay: `${index * 100}ms` }}>
          <CardHeader className="pb-3">
            <CardTitle className={`text-base text-${accentColor}-foreground`}>
              {section.title}
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            {section.content}
          </CardContent>
        </Card>
      ))}
    </div>
  );
}