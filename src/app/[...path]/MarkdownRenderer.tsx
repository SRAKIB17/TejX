/* eslint-disable react-hooks/rules-of-hooks */
"use client";
import ClipboardJS from 'clipboard';
import hljs from "highlight.js";
// import "highlight.js/styles/night-owl.css"; // Syntax highlighting theme
import "highlight.js/styles/atom-one-light.css"; // Syntax highlighting theme

import { marked } from "marked";
import { useEffect, useMemo } from "react";
import toast from "react-hot-toast";

export default function MarkdownRenderer({ markdown }: { markdown: string }) {
    const htmlContent = useMemo(() => {
        const option = {
            highlight: (code: any, lang: any) => {
                try {
                    const language = hljs.getLanguage(lang) ? lang : 'bash';
                    // if (!language) {
                    //     return code;
                    // }
                    return hljs.highlight(code, { language }).value;
                }
                catch (error: any) {
                    console.error(`Error highlighting code: ${error.message}`);
                    return code; // Return unhighlighted code if an error occurs
                }
            },
            langPrefix: "hljs language-",
            gfm: true,
        }
        marked.setOptions((option as any));

        // marked.use({ extensions: [remarkGfm()] });

        return marked(markdown);
    }, [markdown]);

    // Add syntax highlighting effects
    useEffect(() => {
        hljs.highlightAll();
    }, [htmlContent]);



    useEffect(() => {
        const clipboard = new ClipboardJS('.copy-btn');
        clipboard.on('success', (e) => {
            toast.success('Code copied to clipboard!');
            // setTimeout(() => setCopySuccess(''), 2000);
        });
        clipboard.on('error', () => toast.error('Failed to copy'));
        return () => {
            clipboard.destroy();
        };
    }, []);

    const updatedHtmlContent = (htmlContent as any)?.replace(
        /<pre><code class="([^"]*)">([\s\S]*?)<\/code><\/pre>/g,
        (match: any, classNames: any, codeContent: any) => {
            return `
        <div class="relative group">
          <button 
            class="absolute right-2 rounded top-2 btn btn-xs btn-outline hidden group-hover:block copy-btn btn-accent"
            data-clipboard-text="${codeContent.trim()}"
          >
            Copy
          </button>
          <pre><code class="${classNames}">${codeContent}</code></pre>
        </div>
      `;
        }
    );

    return (
        <div
            className="prose xl:prose-lg w-full"
            dangerouslySetInnerHTML={{
                __html: updatedHtmlContent,
            }}
        />
    );

}
