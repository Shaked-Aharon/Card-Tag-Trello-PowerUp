window.TrelloPowerUp.initialize({
  "card-badges": function (t, opts) {
    return t.get('card', 'shared', 'tag')
      .then(selectedTag => [
        tag.Badge(selectedTag, badageTypes.badge),
        priority.Badge(null, badageTypes.badge)
      ]);
  },
  'card-buttons': function (t, options) {
    return [tag.Btn(), priority.Btn()];
  },
  'card-detail-badges': function (t, options) {
    return t.get('card', 'shared', 'tag')
      .then(selectedTag => [
        tag.Badge(selectedTag, badageTypes.detailsBadge)
      ]);
  }
});

