export async function search(query, config) {
  return {
    platform: config.displayName,
    query,
    maxResults: config.maxResults,
    results: [],
  }
}
