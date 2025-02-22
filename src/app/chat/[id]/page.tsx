"use client";
import React, { useEffect, useState } from "react";

const ChatDetails = ({ params }: { params: Promise<{ id: string }> }) => {
  const [id, setId] = useState<string | null>(null);
  useEffect(() => {
    params.then((res) => {
      setId(res.id);
    });
  }, [params]);
  return <div>{id}</div>;
};

export default ChatDetails;
