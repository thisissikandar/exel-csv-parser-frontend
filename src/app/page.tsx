import { FileUploader } from "@/components/file-uploader";

export default function Home() {
  return (
    <main className="container mx-auto ">
      <div className="flex flex-col items-center ">
        <h1 className="text-3xl font-bold">Company Data Importer</h1>
        <p className="text-muted-foreground text-center max-w-2xl">
          Upload a CSV or Excel file to import company data. Choose from five
          different import modes to control how your data is processed.
        </p>
        <div className="w-full max-w-md">
          <FileUploader />
        </div>
      </div>
    </main>
  );
}
