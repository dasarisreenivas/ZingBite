import re

def clean_text(text: str) -> str:
    if not text:
        return ""
    # Lowercase, clean punctuation except basic operators like <, >, = or currency symbols if needed
    text = text.lower().strip()
    text = re.sub(r'[^a-z0-9\s₹\<\>\=]', ' ', text)
    text = re.sub(r'\s+', ' ', text).strip()
    return text

def tokenize(text: str) -> list[str]:
    cleaned = clean_text(text)
    return cleaned.split()
