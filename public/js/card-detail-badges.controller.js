const cardDetailsBadgesController = (t, opts) => {
    return Promise.all([t.card('id', 'labels'), t.get('card', 'shared', 'tag'), t.get('card', 'shared', 'priority')])
        .then(([card, selectedTag, selectedPriority]) => {
            var color = getColorBasedOnLabels(card.labels);
            // applyBackgroundColor(card.id, color);
            return [
                tag.Badge(selectedTag, badageTypes.detailsBadge),
                priority.Badge(selectedPriority, badageTypes.detailsBadge)
            ]
        })
}