"use client";

import { Button } from "@/components/ui/button";
import { Check, Copy } from "lucide-react";
import { useEffect, useState } from "react";
import { createHighlighter } from "shiki";
import TooltipWrapper from "../tooltip-wrapper";

const Codeblock = ({ formCode, lang }: { formCode: string; lang: string }) => {
  const [highlightedCode, setHighlightedCode] = useState<string | null>(null);
  const [isCopied, setIsCopied] = useState(false);

  useEffect(() => {
    const loadHighlighter = async () => {
      const highlighter = await createHighlighter({
        themes: ["vitesse-dark"],
        langs: [lang],
      });

      const code = highlighter.codeToHtml(formCode, {
        theme: "vitesse-dark",
        lang: lang,
      });

      setHighlightedCode(code);
    };

    loadHighlighter();
  }, [formCode]);

  if (!highlightedCode) {
    return (
      <div className="border p-4 rounded-md">
        <div className="text-sm bg-[#171717] rounded-md text-white p-4 h-full max-h-[90vh]">
          Loading...
        </div>
      </div>
    );
  }

  const copyCode = () => {
    navigator.clipboard.writeText(formCode);
    setIsCopied(true);
    setTimeout(() => {
      setIsCopied(false);
    }, 1000);
  };

  return (
    <div className="relative">
      <TooltipWrapper
        label={!isCopied ? "copy" : "copied!"}
        side="top"
        sideOffset={10}
      >
        <Button
          onClick={copyCode}
          className="absolute top-6 right-8 size-7 rounded bg-[#262626] text-neutral-400 border border-neutral-700 hover:text-white"
          size={"icon"}
        >
          {!isCopied ? (
            <Copy size={14} strokeWidth={3} />
          ) : (
            <Check size={14} strokeWidth={4} stroke="green" />
          )}
        </Button>
      </TooltipWrapper>
      <div
        className="w-full h-full overflow-auto p-4 border rounded-md"
        dangerouslySetInnerHTML={{ __html: highlightedCode }}
      />
    </div>
  );
};

export default Codeblock;


