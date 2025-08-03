"use client";

import { TFormData } from "@/app/types";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useEffect, useState } from "react";
import { createHighlighter } from "shiki";
import Codeblock from "./Codeblock";

type TJsonPreview = {
  formData: TFormData;
};

const JSONPreview = ({ formData }: TJsonPreview) => {
  const prettyJson = JSON.stringify(formData, null, 2);

  return <Codeblock lang="typescript" formCode={prettyJson} />;
};

export default JSONPreview;
