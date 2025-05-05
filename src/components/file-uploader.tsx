"use client";

import type React from "react";

import { useState } from "react";
import { Loader2, Upload, XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ImportModeDialog } from "@/components/import-mode-dialog";
import { ImportResults } from "@/components/import-results";
import toast from "react-hot-toast";
import { api } from "@/lib/api";

export function FileUploader() {
  const [file, setFile] = useState<File | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [results, setResults] = useState<{
    status: string;
    inserted: number;
    updated: number;
    skipped: number;
  } | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      // Check if file is CSV or Excel
      const fileType = selectedFile.type;
      const validTypes = [
        "text/csv",
        "application/vnd.ms-excel",
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      ];

      if (
        validTypes.includes(fileType) ||
        selectedFile.name.endsWith(".csv") ||
        selectedFile.name.endsWith(".xlsx")
      ) {
        setFile(selectedFile);
      } else {
        toast.error("Please Upload a CSV or Excel file");
        e.target.value = "";
      }
    }
  };

  const handleUpload = () => {
    setErrorMsg(null);
    if (!file) {
      setErrorMsg("No file selected.");
      toast.error("No file selected.");
      return;
    }
      setIsDialogOpen(true);
    
  };

  const handleImport = async (mode: number) => {
    setIsDialogOpen(false);
    setIsUploading(true);
    setErrorMsg(null);
    try {
      const formData = new FormData();
      formData.append("file", file!);
      formData.append("mode", mode.toString());
      const response = await api.post(`/api/v1/import-xl-csv`, formData);

      const data = response.data;
      console.log("Import Results:", data);
      setResults(data);
      if (data.status !== "success") {
        setErrorMsg("Import failed. Please check your file and try again.");
        toast.error("Import failed.");
      }
      // @typescript-eslint/no-explicit-any
    } catch (error:any) {
      let msg = "Error importing data.";
      if (error?.response?.data?.error) {
        msg = error.response.data.error;
      }
      setErrorMsg(msg);
      toast.error(msg);
      console.error("Error importing data:", error);
      setResults({
        status: "error",
        inserted: 0,
        updated: 0,
        skipped: 0,
      });
    } finally {
      setIsUploading(false);
    }
  };

  const resetForm = () => {
    setFile(null);
    setResults(null);
    const fileInput = document.getElementById(
      "file-upload"
    ) as HTMLInputElement;
    if (fileInput) fileInput.value = "";
  };

  return (
    <div className="space-y-6">
      {!results ? (
        <Card>
          <CardContent className="pt-6">
            <div className="flex flex-col items-center space-y-4">
              <div className="flex items-center justify-center w-full">
                <label
                  htmlFor="file-upload"
                  className="flex flex-col items-center justify-center w-full h-64 border-2 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-gray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500"
                >
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <Upload className="w-10 h-10 mb-3 text-gray-400" />
                    <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                      <span className="font-semibold">Click to upload</span> or
                      drag and drop
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      CSV or Excel files only
                    </p>
                    {file && (
                      <p className="mt-2 text-sm font-medium text-gray-900 dark:text-white">
                        {file.name}
                      </p>
                    )}
                  </div>
                  <input
                    id="file-upload"
                    type="file"
                    className="hidden"
                    accept=".csv,.xlsx,.xls"
                    onChange={handleFileChange}
                  />
                </label>
              </div>
              {errorMsg && (
                <div className="flex items-center text-red-600 bg-red-50 rounded px-3 py-2 w-full">
                  <XCircle className="w-4 h-4 mr-2" />
                  <span className="text-sm">{errorMsg}</span>
                </div>
              )}
              <Button
                onClick={handleUpload}
                disabled={!file || isUploading}
                className="w-full flex items-center justify-center"
              >
                 {isUploading && (
                  <Loader2 className="animate-spin w-4 h-4 mr-2" />
                )}
                {isUploading ? "Uploading..." : "Upload and Continue"}
              </Button>
            </div>
          </CardContent>
        </Card>
      ) : (
        <ImportResults results={results} onReset={resetForm} />
      )}

      <ImportModeDialog
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        onImport={handleImport}
      />
    </div>
  );
}
