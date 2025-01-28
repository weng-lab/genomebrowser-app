'use client'

export async function fetchFile(url: string): Promise<string> {
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error(`Failed to fetch file: ${response.statusText}`);
    }
    return await response.text();
}

export interface Stanza {
    [key: string]: string;
}

/**
 * Parses a string containing record-attributes format into stanzas of key-value pairs.
 * Handles multi-line values denoted by '\' characters.
 * 
 * @param {string} text - The input text to parse
 * @returns {Stanza[]} Array of parsed stanzas, each containing key-value pairs
 */
export function parseRecordAttributes(text: string): Stanza[] {
    const stanzas = text.trim().split(/\n\n+/);

    return stanzas.map(stanza => {
        const stanzaData: Stanza = {};
        let currentKey: string | null = null;
        let currentValue: string[] = [];
        let previousLineHadSlash = false;

        stanza.split('\n').forEach(line => {
            const trimmedLine = line.trim();

            // Skip empty lines
            if (!trimmedLine) return;

            // If previous line had a slash, this line is part of that value
            if (previousLineHadSlash) {
                currentValue.push(trimmedLine.replace('\\', '').trim());
                previousLineHadSlash = trimmedLine.endsWith('\\');
                return;
            }

            // Save any previous key-value pair
            if (currentKey) {
                stanzaData[currentKey] = currentValue.map(v => v.replace('\\', '').trim()).join(' ');
            }

            // Parse new key-value pair
            const firstSpaceIndex = trimmedLine.indexOf(' ');
            if (firstSpaceIndex === -1) {
                currentKey = trimmedLine;
                currentValue = [''];
            } else {
                currentKey = trimmedLine.slice(0, firstSpaceIndex);
                currentValue = [trimmedLine.slice(firstSpaceIndex + 1).trim()];
            }

            previousLineHadSlash = trimmedLine.endsWith('\\');
        });

        // Save the last key-value pair if exists
        if (currentKey) {
            stanzaData[currentKey] = currentValue.map(v => v.replace('\\', '').trim()).join(' ');
        }
        return stanzaData;
    });
}