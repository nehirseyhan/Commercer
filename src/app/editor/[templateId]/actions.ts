"use server";

import { suggestColorScheme, type SuggestColorSchemeInput, type SuggestColorSchemeOutput } from "@/ai/flows/suggest-color-scheme-from-logo";

export async function getAiColorScheme(input: SuggestColorSchemeInput): Promise<SuggestColorSchemeOutput> {
    try {
        const result = await suggestColorScheme(input);
        return result;
    } catch (error) {
        console.error("Error getting AI color scheme:", error);
        throw new Error("Failed to generate color scheme. Please try again.");
    }
}
