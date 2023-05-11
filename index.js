window.TrelloPowerUp.initialize({
  "card-badges": function (t, opts) {
    t.card('all').then(({ card }) => {
      console.log({ card })

      t.set('card', 'desc', 'lorespm epsum lorespm epsumlorespm epsumlorespm epsumlorespm epsumlorespm epsumlorespm epsumlorespm epsumlorespm epsumlorespm', { id: card.id })
        .then(() => {
          console.log('changed!');
        })
    })

    t.get('card', 'shared').then(shared => console.log({ shared }))
    t.get('card', 'private').then(private => console.log({ private }))
    return Promise.all([t.get('card', 'shared', 'tag'), t.get('card', 'shared', 'priority')])
      .then(([selectedTag, selectedPriority]) => {
        return [
          tag.Badge(selectedTag, badageTypes.badge),
          priority.Badge(selectedPriority, badageTypes.badge)
        ]

      })
  },
  'card-buttons': function (t, options) {
    return [tag.Btn(), priority.Btn()];
  },
  'card-detail-badges': function (t, options) {
    return Promise.all([t.get('card', 'shared', 'tag'), t.get('card', 'shared', 'priority')])
      .then(([selectedTag, selectedPriority]) => {
        return [
          tag.Badge(selectedTag, badageTypes.detailsBadge),
          priority.Badge(selectedPriority, badageTypes.detailsBadge)
        ]
      })
  }
});

