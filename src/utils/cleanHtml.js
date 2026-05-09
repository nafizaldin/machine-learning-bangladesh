export function stripBaseUrl(html) {
  if (!html) return html;


  return html.replace(
    /src="https?:\/\/[^/]+(\/[^"]+)"/g,
    `src="$1"`
  );
}


export function addBaseUrl(html, baseUrl) {
  if (!html) return html;

  return html.replace(
    /<img\s+([^>]*?)src="(?!https?:\/\/)(\/[^"]+)"([^>]*)>/g,
    `<img $1 src="${baseUrl}$2" $3>`
  );
}
