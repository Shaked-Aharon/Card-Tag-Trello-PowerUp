const cardBadagesController = (t, opts) => {
    return Promise.all([t.card('all'), t.get('card', 'shared', 'tag'), t.get('card', 'shared', 'priority'), t.get('board', 'shared', 'card-number-prefix')])
      .then(([card, selectedTag, selectedPriority, cardNumberPrefix]) => {
        return [
          { text: `${cardNumberPrefix}-${card.idShort}`, showOnClose: true },
          tag.Badge(selectedTag, badageTypes.badge),
          priority.Badge(selectedPriority, badageTypes.badge)
        ]
      })
}