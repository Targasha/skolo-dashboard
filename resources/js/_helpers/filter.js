export default function filterItems(items, search) {
    if (search) {
        items = items.filter(item => {
            return Object.values(item)
                .join(",")
                .toLowerCase()
                .includes(search);
        });
    }

    return items;
}
