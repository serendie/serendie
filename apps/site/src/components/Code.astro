import { useState, useEffect } from "react";
import { codeToHtml } from "shiki";

interface CodeProps {
  code: string;
  lang?: string;
}

export function Code({ code, lang = "jsx" }: CodeProps) {
  const [html, setHtml] = useState("");

  useEffect(() => {
    (async () => {
      const html = await codeToHtml(code, {
        lang: lang,
        theme: "one-light",
      });
      setHtml(html);
    })();
  }, [code, lang]);

  return <div dangerouslySetInnerHTML={{ __html: html }} />;
}
