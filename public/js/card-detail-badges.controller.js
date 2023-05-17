const cardDetailsBadgesController = (t, opts) => {
    return Promise.all([t.get('card', 'shared', 'tag'), t.get('card', 'shared', 'priority')])
        .then(([selectedTag, selectedPriority]) => {
            return [
                tag.Badge(selectedTag, badageTypes.detailsBadge),
                priority.Badge(selectedPriority, badageTypes.detailsBadge)
            ]
        })
}