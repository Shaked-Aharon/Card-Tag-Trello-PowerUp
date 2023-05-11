window.TrelloPowerUp.initialize({
  "card-badges": function (t, opts) {
    // return t.get('card', 'shared', 'tag')
    //   .then(selectedTag => [
    //     tag.Badge(selectedTag, badageTypes.badge),
    //     priority.Badge(null, badageTypes.badge)
    //   ]);

      return Promise.all([t.get('card', 'shared', 'tag'), t.get('card', 'shared', 'priority')])
      .then(([selectedTag, selectedPriority]) => {
        console.log({selectedTag, selectedPriority});
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
        console.log({selectedTag, selectedPriority});
        return [
          tag.Badge(selectedTag, badageTypes.detailsBadge),
          priority.Badge(selectedPriority, badageTypes.detailsBadge)
        ]
      })
  }
});

