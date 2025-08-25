import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <div className=" flex justify-center items-center w-screen h-screen gap-3">
      <Link href={"/file-data-exporter"}>
        <Button className="cursor-pointer">File exel csv importer</Button>
      </Link> 
      <Link href={"/crousel"}>
        <Button className="cursor-pointer">Crousel</Button>
      </Link>
      <Link href={"/dashboard"}>
        <Button className="cursor-pointer">Dashboard</Button>
      </Link>
    </div>
  );
}
