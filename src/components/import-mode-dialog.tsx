"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

interface ImportModeDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onImport: (mode: number) => void;
}

export function ImportModeDialog({
  isOpen,
  onClose,
  onImport,
}: ImportModeDialogProps) {
  const [selectedMode, setSelectedMode] = useState<string>("1");

  const handleImport = () => {
    onImport(Number.parseInt(selectedMode));
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Select Import Mode</DialogTitle>
          <DialogDescription>
            Choose how you want to process the data in your file.
          </DialogDescription>
        </DialogHeader>
        <div className="py-4">
          <RadioGroup
            value={selectedMode}
            onValueChange={setSelectedMode}
            className="space-y-4"
          >
            <div className="flex items-start space-x-3 space-y-0">
              <RadioGroupItem value="1" id="mode-1" />
              <div className="space-y-1">
                <Label htmlFor="mode-1" className="font-medium">
                  Create New Companies Only
                </Label>
                <p className="text-sm text-muted-foreground">
                  Insert only new companies. Skip rows with emails that already
                  exist in the database.
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-3 space-y-0">
              <RadioGroupItem value="2" id="mode-2" />
              <div className="space-y-1">
                <Label htmlFor="mode-2" className="font-medium">
                  Create New and Update Existing (Without Overwrite)
                </Label>
                <p className="text-sm text-muted-foreground">
                  Insert new companies and update only empty fields for existing
                  companies.
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-3 space-y-0">
              <RadioGroupItem value="3" id="mode-3" />
              <div className="space-y-1">
                <Label htmlFor="mode-3" className="font-medium">
                  Create New and Update Existing (With Overwrite)
                </Label>
                <p className="text-sm text-muted-foreground">
                  Insert new companies and completely overwrite existing
                  companies with new data.
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-3 space-y-0">
              <RadioGroupItem value="4" id="mode-4" />
              <div className="space-y-1">
                <Label htmlFor="mode-4" className="font-medium">
                  Update Existing Companies Only (Without Overwrite)
                </Label>
                <p className="text-sm text-muted-foreground">
                  Only update empty fields of existing companies. Don&apos;t insert
                  new companies.
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-3 space-y-0">
              <RadioGroupItem value="5" id="mode-5" />
              <div className="space-y-1">
                <Label htmlFor="mode-5" className="font-medium">
                  Update Existing Companies Only (With Overwrite)
                </Label>
                <p className="text-sm text-muted-foreground">
                  Only update existing companies, overwriting all fields. Don&apos;t 
                  insert new companies.
                </p>
              </div>
            </div>
          </RadioGroup>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleImport}>Import Data</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
