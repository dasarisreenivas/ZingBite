GENERIC_MENU_NAMES = {
    "main course",
    "starter",
    "starters",
    "bread",
    "breads",
    "beverage",
    "beverages",
    "drink",
    "drinks",
    "dessert",
    "desserts",
    "snack",
    "snacks",
    "side",
    "sides",
    "combo",
    "combos"
}


def clean_text_value(value) -> str:
    if value is None:
        return ""
    if isinstance(value, (bytes, bytearray, memoryview)):
        return bytes(value).decode("utf-8", errors="replace").strip()
    return str(value).strip()


def display_menu_name(raw_name, description) -> str:
    name = clean_text_value(raw_name)
    desc = clean_text_value(description)
    if name and name.lower() not in GENERIC_MENU_NAMES:
        return name
    return desc or name or "Menu item"


def display_menu_description(raw_name, description) -> str:
    name = clean_text_value(raw_name)
    desc = clean_text_value(description)
    if name and name.lower() in GENERIC_MENU_NAMES and desc:
        return name
    return desc
