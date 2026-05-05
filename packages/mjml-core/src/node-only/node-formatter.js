const { html: beautify } = require('js-beautify')

/**
 * Format HTML using js-beautify (Node.js only).
 * Content before <!doctype html> (from mj-raw position="file-start") is split
 * off before passing to the formatter to handle arbitrary content prepended by
 * mj-raw position="file-start".
 * @param {string} html - HTML content to format (in-memory)
 * @returns {string} formatted HTML
 */
function formatHtml(html) {
  // Strip any content before <!doctype html> to avoid formatting issues.
  // mj-raw position="file-start" can inject template tags here.
  const doctypeIndex = html.search(/<!doctype\s/i)
  const prefix = doctypeIndex > 0 ? html.slice(0, doctypeIndex) : ''
  const body = doctypeIndex > 0 ? html.slice(doctypeIndex) : html

  const formatted = beautify(body, {
    indent_size: 2,
    indent_char: ' ',
    max_preserve_newlines: 0,
    preserve_newlines: false,
    unformatted: [],
    wrap_line_length: 0,
    wrap_attributes: 'auto',
  })

  return prefix + formatted
}

export default {
  formatHtml,
}