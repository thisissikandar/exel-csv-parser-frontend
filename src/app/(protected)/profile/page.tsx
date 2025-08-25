"use client";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { api } from "@/lib/api";
import React, { useEffect, useState } from "react";

const page = () => {
  const [data, setData] = useState<any>(null);
  useEffect(() => {
    api
      .get("/users/profile")
      .then((res) => {
        setData(() => res.data.data);
      })
      .catch((err) => console.log(err));
  }, []);

  const handleLogOut = () => {
    api.post("/users/logout").then((res)=>{
      console.log(res);
      
    }).catch((err) => {
      console.log(err);
    });
  };

  return (
    <div className="container mx-auto p-4">
      {data && (
        <Card>
          <div>{data.name}</div>
          <div>{data.email}</div>
          <div>{data.role}</div>
        </Card>
      )}
      <Button onClick={handleLogOut}>Logout</Button>
    </div>
  );
};
export default page;
