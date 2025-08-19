export function stripHtml(htmlString) {
  const doc = new DOMParser().parseFromString(htmlString, 'text/html');
  return doc.body.textContent || '';
}
