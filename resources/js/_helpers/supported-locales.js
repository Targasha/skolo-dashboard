const supportedLocales = {
    bg: "Български",
    en: "English"
}

export default function getSupportedLocales() {
    let annotatedLocales = []
    for (const code of Object.keys(supportedLocales)) {
        annotatedLocales.push({
            code,
            name: supportedLocales[code]
        })
    }
    return annotatedLocales
}
