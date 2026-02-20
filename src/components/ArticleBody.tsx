'use client'

import ReactMarkdown from 'react-markdown'

interface ArticleBodyProps {
  body: string
}

export function ArticleBody({ body }: ArticleBodyProps) {
  return (
    <div className="article-body">
      <ReactMarkdown>{body}</ReactMarkdown>
    </div>
  )
}
