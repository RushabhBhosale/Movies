"use client";
import { useEffect, useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2 } from "lucide-react";
import { useUserStore } from "@/store/userStore";
import { cn } from "@/lib/utils";

export default function BulkUpload() {
  const { user } = useUserStore();
  const [input, setInput] = useState("");
  const [globalLoading, setGlobalLoading] = useState(false);
  const [log, setLog] = useState<string[]>([]);
  const logRef = useRef<HTMLDivElement>(null);

  const importTitles = async () => {
    const titles = input
      .split("\n")
      .map((t) => t.trim().replace(/^\d+\.\s*/, ""))
      .filter((t) => t.length > 0);

    if (!user?._id || titles.length === 0) return;

    setGlobalLoading(true);
    setLog([]);

    const res = await fetch("/api/bulk-upload", {
      method: "POST",
      body: JSON.stringify({ titles, userId: user._id }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const reader = res.body?.getReader();
    const decoder = new TextDecoder("utf-8");

    if (!reader) return;

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      const chunk = decoder.decode(value);
      setLog((prev) => [
        ...prev,
        ...chunk.split("\n").filter((line) => !!line),
      ]);
    }

    setGlobalLoading(false);
  };

  useEffect(() => {
    if (logRef.current) {
      logRef.current.scrollTop = logRef.current.scrollHeight;
    }
  }, [log]);

  return (
    <div className="flex items-center justify-center bg-background py-8">
      <Card className="w-full max-w-2xl min-h-[400px] mx-auto shadow-lg">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-primary flex items-center gap-2">
            <span>🎬</span> Bulk Import Movies/Shows
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6 h-full">
          <Textarea
            placeholder="Paste titles here (one per line)..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="border-input bg-card text-card-foreground focus:ring-ring h-64"
          />

          <Button
            onClick={importTitles}
            disabled={globalLoading}
            className={cn(
              "w-full bg-primary text-primary-foreground hover:bg-primary/90",
              globalLoading && "opacity-75 cursor-not-allowed"
            )}
          >
            {globalLoading && (
              <Loader2 className="animate-spin mr-2" size={16} />
            )}
            {globalLoading ? "Importing..." : "Start Import"}
          </Button>

          {log.length > 0 && (
            <Card
              className="bg-card border-border max-h-64 overflow-y-auto p-4"
              ref={logRef}
            >
              {log.map((line, i) => (
                <div key={i} className="text-sm text-muted-foreground">
                  {line}
                </div>
              ))}
            </Card>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
