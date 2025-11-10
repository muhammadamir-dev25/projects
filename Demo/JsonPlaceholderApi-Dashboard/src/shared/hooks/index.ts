export function replaceSimbols(text: string) {
    return text.replace(/[^a-zA-Z0-9а]/g, "-");
}