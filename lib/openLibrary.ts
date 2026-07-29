export type OpenLibraryDoc = {
  title?: string;
  author_name?: string[];
  cover_i?: number;
  subject?: string[];
  first_publish_year?: number;
  key?: string;
};

export type BookResult = {
  title: string;
  authors: string[];
  coverId?: number;
  subjects: string[];
  year?: number;
  openLibraryKey?: string;
};

export type OpenLibraryProxyResponse = {
  query: string;
  type: "books" | "comics" | "manga";
  limit: number;
  count: number;
  results: BookResult[];
};

const OPEN_LIBRARY_SEARCH_URL = "https://openlibrary.org/search.json";
const DEFAULT_QUERY = "graphic novel";
const MAX_LIMIT = 20;
const DEFAULT_LIMIT = 10;

export async function fetchOpenLibraryResults(options: {
  query?: string;
  limit?: number;
  type?: "books" | "comics" | "manga";
}): Promise<OpenLibraryProxyResponse> {
  const query = options.query?.trim() || DEFAULT_QUERY;
  const type = options.type ?? "books";
  const limit = Math.min(Math.max(options.limit ?? DEFAULT_LIMIT, 1), MAX_LIMIT);

  const searchUrl = new URL(OPEN_LIBRARY_SEARCH_URL);

  if (type === "comics") {
    searchUrl.searchParams.set("subject", "comics");
    searchUrl.searchParams.set("q", query || "comics");
  } else if (type === "manga") {
    searchUrl.searchParams.set("subject", "manga");
    searchUrl.searchParams.set("q", query || "manga");
  } else {
    searchUrl.searchParams.set("q", query);
  }

  searchUrl.searchParams.set("limit", String(limit));
  searchUrl.searchParams.set("fields", "title,author_name,cover_i,subject,first_publish_year,key");

  const response = await fetch(searchUrl.toString(), {
    headers: {
      "User-Agent": "KyronixStore/1.0 (+https://kyronix.store)",
      Accept: "application/json",
    },
    next: {
      revalidate: 60,
    },
  });

  if (!response.ok) {
    throw new Error(`Open Library fetch failed with status ${response.status}`);
  }

  const data = await response.json();
  const docs: OpenLibraryDoc[] = Array.isArray(data.docs) ? data.docs : [];

  const results: BookResult[] = docs.map((doc) => ({
    title: doc.title ?? "Untitled",
    authors: doc.author_name ?? [],
    coverId: doc.cover_i,
    subjects: doc.subject?.slice(0, 6) ?? [],
    year: doc.first_publish_year,
    openLibraryKey: doc.key,
  }));

  return {
    query,
    type,
    limit,
    count: results.length,
    results,
  };
}
