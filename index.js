window.TrelloPowerUp.initialize({
  "card-badges": function (t, opts) {
    // return t.get('card', 'shared', 'tag')
    //   .then(selectedTag => [
    //     tag.Badge(selectedTag, badageTypes.badge),
    //     priority.Badge(null, badageTypes.badge)
    //   ]);

      return Promise.all([t.get('card', 'shared', 'tag'), t.get('card', 'shared', 'priority')])
      .then(([tag, priority]) => {
        return [
          tag.Badge(tag, badageTypes.badge),
          priority.Badge(priority, badageTypes.badge)
        ]

      })
  },
  'card-buttons': function (t, options) {
    return [tag.Btn(), priority.Btn()];
  },
  'card-detail-badges': function (t, options) {
    // return t.get('card', 'shared', 'tag')
    //   .then(selectedTag => );
    t.render(function(){
      return Promise.all([
        t.get('card', 'shared', 'tag'),
        t.get('card', 'shared', 'priority')
      ])
      .spread(function(tag, priority){
        return [
          tag.Badge(tag, badageTypes.detailsBadge),
          priority.Badge(priority, badageTypes.detailsBadge)
        ]
      })
      .then(function(){
        t.sizeTo('#content')
        .done();
      })
    });
    // return Promise.all([t.get('card', 'shared', 'tag'), t.get('card', 'shared', 'priority')])
    //   .then(([tag, priority]) => {
    //     return [
    //       tag.Badge(tag, badageTypes.detailsBadge),
    //       priority.Badge(priority, badageTypes.detailsBadge)
    //     ]

    //   })
  }
});

