/**
 * Named AI crawlers for robots.txt Allow groups (GEO).
 * Explicit User-agent blocks — `User-agent: *` is not a substitute for named bots.
 * @see https://developers.google.com/search/docs/crawling-indexing/robots/robots_txt
 */
export const AI_ANSWER_CRAWLERS = [
  "GPTBot",
  "ChatGPT-User",
  "OAI-SearchBot",
  "ClaudeBot",
  "Claude-User",
  "Claude-SearchBot",
  "anthropic-ai",
  "PerplexityBot",
  "Google-Extended",
  "cohere-ai",
  "Applebot-Extended",
  "Amazonbot",
  "meta-externalagent",
  "meta-externalfetcher",
  "YouBot",
  "Diffbot",
  "CCBot",
  "Bytespider",
] as const;
