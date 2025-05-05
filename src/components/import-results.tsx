"use client";

import { CheckCircle, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface ImportResultsProps {
  results: {
    status: string;
    inserted: number;
    updated: number;
    skipped: number;
  };
  onReset: () => void;
}

export function ImportResults({ results, onReset }: ImportResultsProps) {
  const isSuccess = results.status === "success";

  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex items-center space-x-2">
          {isSuccess ? (
            <CheckCircle className="h-6 w-6 text-green-500" />
          ) : (
            <AlertCircle className="h-6 w-6 text-red-500" />
          )}
          <CardTitle>
            {isSuccess ? "Import Successful" : "Import Failed"}
          </CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-3 gap-4 text-center">
          <div className="space-y-1">
            <p className="text-3xl font-bold">{results.inserted}</p>
            <p className="text-sm text-muted-foreground">Companies Inserted</p>
          </div>
          <div className="space-y-1">
            <p className="text-3xl font-bold">{results.updated}</p>
            <p className="text-sm text-muted-foreground">Companies Updated</p>
          </div>
          <div className="space-y-1">
            <p className="text-3xl font-bold">{results.skipped}</p>
            <p className="text-sm text-muted-foreground">Companies Skipped</p>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button onClick={onReset} className="w-full">
          Import Another File
        </Button>
      </CardFooter>
    </Card>
  );
}
