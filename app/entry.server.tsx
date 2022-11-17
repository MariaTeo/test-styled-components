import type { EntryContext } from '@remix-run/node'
import { RemixServer } from '@remix-run/react'
import { renderToString } from 'react-dom/server'

import { ServerStyleSheet } from 'styled-components'

export default function handleRequest(
  request: Request,
  responseStatusCode: number,
  responseHeaders: Headers,
  remixContext: EntryContext
) {
  const myNewSheet = new ServerStyleSheet()

  let markup = renderToString(
    myNewSheet.collectStyles(
      <RemixServer context={remixContext} url={request.url} />
    )
  )

  const styleList = myNewSheet.getStyleTags()

  markup = markup.replace("__MY_STYLE__", styleList)

  responseHeaders.set('Content-Type', 'text/html')

  return new Response('<!DOCTYPE html>' + markup, {
    headers: responseHeaders,
    status: responseStatusCode,
  })
}
