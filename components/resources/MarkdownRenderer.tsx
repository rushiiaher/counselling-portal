import React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

interface MarkdownRendererProps {
  content: string;
}

export default function MarkdownRenderer({ content }: MarkdownRendererProps) {
  return (
    <div className="prose prose-slate prose-a:text-blue-600 max-w-none">
      <ReactMarkdown 
        remarkPlugins={[remarkGfm]}
        components={{
          h1: ({node, ...props}) => <h1 className="text-3xl font-bold mt-8 mb-4 text-slate-900" {...props} />,
          h2: ({node, ...props}) => <h2 className="text-2xl font-bold mt-8 mb-4 text-slate-800" {...props} />,
          h3: ({node, ...props}) => <h3 className="text-xl font-semibold mt-6 mb-3 text-slate-800" {...props} />,
          p: ({node, ...props}) => <p className="mb-4 text-slate-700 leading-relaxed" {...props} />,
          ul: ({node, ...props}) => <ul className="list-disc pl-6 mb-4 text-slate-700 space-y-2" {...props} />,
          ol: ({node, ...props}) => <ol className="list-decimal pl-6 mb-4 text-slate-700 space-y-2" {...props} />,
          li: ({node, ...props}) => <li {...props} />,
          blockquote: ({node, ...props}) => (
            <blockquote className="border-l-4 border-slate-300 pl-4 italic text-slate-600 my-6 bg-slate-50 py-2 pr-4 rounded-r" {...props} />
          ),
          a: ({node, ...props}) => <a className="underline hover:no-underline font-medium" target="_blank" rel="noopener noreferrer" {...props} />,
        }}
      >
        {content}
      </ReactMarkdown>
      
      <div className="mt-8 p-4 bg-slate-50 border border-slate-100 rounded-lg text-sm text-slate-500 italic text-center">
        Disclaimer: This content is educational and not a medical diagnosis. If you are experiencing a crisis, please seek immediate professional help.
      </div>
    </div>
  );
}
