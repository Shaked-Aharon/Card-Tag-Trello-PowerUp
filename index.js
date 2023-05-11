window.TrelloPowerUp.initialize({
  "card-badges": function (t, opts) {


    Promise
    .all(t.card('all'), t.get('card', 'shared'), t.get('card', 'private'))
    .then((res) => console.log(res))
    
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
  },
  'attachment-sections': function (t, options){
    return [{
      id: 'Yellowstone', // optional if you aren't using a function for the title
      title: 'Example Attachment Section: Yellowstone',
      content: 'test content'
    }];
  }
});

