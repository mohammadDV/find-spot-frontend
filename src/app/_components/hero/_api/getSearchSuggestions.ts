import { getFetch } from "@/core/publicService";
import { SearchSuggestionsResponse } from "@/types/business.type";

interface SearchSuggestionsParams {
    query: string;
}

export async function getSearchSuggestions({
    query
}: SearchSuggestionsParams): Promise<SearchSuggestionsResponse> {
    return getFetch<SearchSuggestionsResponse>(
        `/businesses/search-suggestions?query=${query}`,
    );
}