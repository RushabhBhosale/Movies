"use client";
import { useEffect, useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Loader2, CheckCircle, XCircle, Upload, Film } from "lucide-react";
import { useUserStore } from "@/store/userStore";
import { cn } from "@/lib/utils";

export default function BulkUpload() {
  const { user } = useUserStore();
  const [input, setInput] = useState("");
  const [globalLoading, setGlobalLoading] = useState(false);
  const [log, setLog] = useState<string[]>([]);
  const [progress, setProgress] = useState(0);
  const [totalTitles, setTotalTitles] = useState(0);
  const [processedTitles, setProcessedTitles] = useState(0);
  const [successCount, setSuccessCount] = useState(0);
  const [errorCount, setErrorCount] = useState(0);
  const [alreadyExistsCount, setAlreadyExistsCount] = useState(0);
  const logRef = useRef<HTMLDivElement>(null);

  const getTitlesFromInput = () => {
    return input
      .split("\n")
      .map((t) => t.trim().replace(/^\d+\.\s*/, ""))
      .filter((t) => t.length > 0);
  };

  const importTitles = async () => {
    const titles = getTitlesFromInput();

    if (!user?._id || titles.length === 0) return;

    setGlobalLoading(true);
    setLog([]);
    setProgress(0);
    setTotalTitles(titles.length);
    setProcessedTitles(0);
    setSuccessCount(0);
    setErrorCount(0);
    setAlreadyExistsCount(0);

    try {
      const res = await fetch("/api/bulk-upload", {
        method: "POST",
        body: JSON.stringify({ titles, userId: user._id }),
        headers: { "Content-Type": "application/json" },
      });

      const reader = res.body?.getReader();
      const decoder = new TextDecoder("utf-8");
      if (!reader) return;

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        const chunk = decoder.decode(value);
        const lines = chunk.split("\n").filter(Boolean);

        lines.forEach((line) => {
          if (line.includes("✅") || line.includes("success")) {
            setSuccessCount((p) => p + 1);
            setProcessedTitles((p) => p + 1);
          } else if (
            line.includes("❌") ||
            line.includes("error") ||
            line.includes("failed")
          ) {
            setErrorCount((p) => p + 1);
            setProcessedTitles((p) => p + 1);
          } else if (
            line.includes("already exists") ||
            line.includes("⚠️") ||
            line.includes("duplicate")
          ) {
            setAlreadyExistsCount((p) => p + 1);
            setProcessedTitles((p) => p + 1);
          }
        });

        setLog((prev) => [...prev, ...lines]);
      }
    } catch (error: any) {
      setLog((prev) => [...prev, `Error: ${error.message}`]);
    } finally {
      setGlobalLoading(false);
    }
  };

  useEffect(() => {
    if (totalTitles > 0) {
      setProgress((processedTitles / totalTitles) * 100);
    }
  }, [processedTitles, totalTitles]);

  useEffect(() => {
    if (logRef.current) {
      logRef.current.scrollTop = logRef.current.scrollHeight;
    }
  }, [log]);

  const titles = getTitlesFromInput();
  const isComplete =
    processedTitles === totalTitles && totalTitles > 0 && !globalLoading;

  return (
    <div className="min-h-full bg-gradient-to-br from-background via-background to-muted/20 px-3 py-4 sm:px-4 sm:py-6">
      <div className="max-w-6xl mx-auto space-y-6">
        <div className="text-center space-y-1 sm:space-y-2">
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
            Bulk Import Movies & Shows
          </h1>
          <p className="text-muted-foreground text-sm sm:text-base">
            Import multiple titles at once with real-time progress tracking
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
          <Card className="shadow-md border-border/50">
            <CardHeader className="pb-2 sm:pb-4">
              <CardTitle className="text-lg sm:text-xl flex items-center gap-2">
                <Upload className="h-5 w-5 text-primary" />
                Input Titles
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Textarea
                placeholder={`Paste your titles (one per line)\n\nExample:\nThe Matrix\nInception`}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="min-h-[250px] sm:min-h-[300px] resize-none border-input bg-card text-card-foreground focus:ring-ring font-mono text-sm sm:text-base"
              />
              <div className="text-xs sm:text-sm text-muted-foreground">
                {titles.length} {titles.length === 1 ? "title" : "titles"}{" "}
                detected
              </div>

              <Button
                onClick={importTitles}
                disabled={globalLoading || titles.length === 0}
                className={cn(
                  "w-full bg-primary text-primary-foreground hover:bg-primary/90 transition-all",
                  globalLoading && "opacity-75 cursor-not-allowed"
                )}
                size="lg"
              >
                {globalLoading ? (
                  <>
                    <Loader2 className="animate-spin mr-2" size={18} />
                    Processing...
                  </>
                ) : (
                  <>
                    <Film className="mr-2" size={18} />
                    Start Import ({titles.length})
                  </>
                )}
              </Button>
            </CardContent>
          </Card>

          <Card className="shadow-md border-border/50">
            <CardHeader className="pb-2 sm:pb-4">
              <CardTitle className="text-lg sm:text-xl flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-green-500" />
                Progress & Status
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-5">
              {totalTitles > 0 && (
                <>
                  <div className="space-y-2">
                    <div className="flex justify-between text-xs sm:text-sm">
                      <span className="text-muted-foreground">
                        {processedTitles} of {totalTitles} processed
                      </span>
                      <span className="font-medium">
                        {Math.round(progress)}%
                      </span>
                    </div>
                    <Progress value={progress} className="h-2.5 bg-muted" />
                  </div>

                  <div className="grid grid-cols-3 gap-2 sm:gap-3 text-sm">
                    <div className="bg-green-50 dark:bg-green-900/20 p-2 rounded-md border border-green-200 dark:border-green-800">
                      <div className="flex items-center gap-1">
                        <CheckCircle className="h-4 w-4 text-green-600 dark:text-green-400" />
                        <span className="text-green-800 dark:text-green-200">
                          Success
                        </span>
                      </div>
                      <div className="text-lg font-bold text-green-600 dark:text-green-400">
                        {successCount}
                      </div>
                    </div>

                    <div className="bg-amber-50 dark:bg-amber-900/20 p-2 rounded-md border border-amber-200 dark:border-amber-800">
                      <div className="flex items-center gap-1">
                        <XCircle className="h-4 w-4 text-amber-600 dark:text-amber-400" />
                        <span className="text-amber-800 dark:text-amber-200">
                          Exists
                        </span>
                      </div>
                      <div className="text-lg font-bold text-amber-600 dark:text-amber-400">
                        {alreadyExistsCount}
                      </div>
                    </div>

                    <div className="bg-red-50 dark:bg-red-900/20 p-2 rounded-md border border-red-200 dark:border-red-800">
                      <div className="flex items-center gap-1">
                        <XCircle className="h-4 w-4 text-red-600 dark:text-red-400" />
                        <span className="text-red-800 dark:text-red-200">
                          Failed
                        </span>
                      </div>
                      <div className="text-lg font-bold text-red-600 dark:text-red-400">
                        {errorCount}
                      </div>
                    </div>
                  </div>
                </>
              )}

              <div className="text-center text-sm">
                {globalLoading && (
                  <div className="flex items-center justify-center gap-1 text-primary">
                    <Loader2 className="animate-spin h-4 w-4" />
                    Processing titles...
                  </div>
                )}
                {isComplete && (
                  <div className="flex items-center justify-center gap-1 text-green-600 dark:text-green-400">
                    <CheckCircle className="h-4 w-4" />
                    Import completed!
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {log.length > 0 && (
          <Card className="shadow-md border-border/50">
            <CardHeader className="pb-2 sm:pb-4">
              <CardTitle className="text-lg sm:text-xl flex items-center gap-2">
                <Film className="h-5 w-5 text-primary" />
                Import Log
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div
                ref={logRef}
                className="bg-muted/50 border border-border rounded-md p-3 max-h-[300px] overflow-y-auto overflow-x-auto space-y-1 text-sm"
              >
                {log.map((line, i) => (
                  <div
                    key={i}
                    className={cn(
                      "font-mono leading-relaxed",
                      line.includes("✅") || line.includes("success")
                        ? "text-green-600 dark:text-green-400"
                        : "",
                      line.includes("❌") ||
                        line.includes("error") ||
                        line.includes("failed")
                        ? "text-red-600 dark:text-red-400"
                        : "",
                      line.includes("already exists") ||
                        line.includes("duplicate") ||
                        line.includes("⚠️")
                        ? "text-amber-600 dark:text-amber-400"
                        : "",
                      !line.includes("✅") &&
                        !line.includes("❌") &&
                        !line.includes("success") &&
                        !line.includes("error") &&
                        !line.includes("failed") &&
                        !line.includes("already exists") &&
                        !line.includes("duplicate") &&
                        !line.includes("⚠️")
                        ? "text-muted-foreground"
                        : ""
                    )}
                  >
                    {line}
                  </div>
                ))}
                {globalLoading && (
                  <div className="text-sm text-muted-foreground font-mono flex items-center gap-2">
                    <Loader2 className="animate-spin h-3 w-3" />
                    Processing...
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
