/**
 * Converts a string to a URL-friendly slug
 * @param text - The text to convert to slug
 * @returns A URL-friendly slug string
 */
export function slugify(text: string): string {
    return text
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9\s-]/g, '') // Remove special characters except spaces and hyphens
        .replace(/\s+/g, '-') // Replace spaces with hyphens
        .replace(/-+/g, '-') // Replace multiple hyphens with single hyphen
        .replace(/^-+|-+$/g, ''); // Remove leading and trailing hyphens
}

/**
 * Generates a unique slug by appending a number if the slug already exists
 * @param text - The text to convert to slug
 * @param existingSlugs - Array of existing slugs to check against
 * @returns A unique URL-friendly slug string
 */
export function generateUniqueSlug(text: string, existingSlugs: string[] = []): string {
    let slug = slugify(text);
    let counter = 1;
    let uniqueSlug = slug;

    while (existingSlugs.includes(uniqueSlug)) {
        uniqueSlug = `${slug}-${counter}`;
        counter++;
    }

    return uniqueSlug;
} 