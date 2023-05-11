window.TrelloPowerUp.initialize({
  "card-badges": function (t, opts) {


    Promise
      .all([t.card('all'), t.get('card', 'shared'), t.get('card', 'private')])
      .then(([card, shared, private]) => console.log({ card, shared, private }))

    return Promise.all([t.get('card', 'shared', 'tag'), t.get('card', 'shared', 'priority')])
      .then(([selectedTag, selectedPriority]) => {
        return [
          tag.Badge(selectedTag, badageTypes.badge),
          priority.Badge(selectedPriority, badageTypes.badge)
        ]

      })
  },
  'card-buttons': function (t, options) {

    // return t.getRestApi()
    // 	// We now have an instance of the API client.
    //   .isAuthorized()
    //   .then(function(isAuthorized) {
    //     console.log(isAuthorized)
    //     if (isAuthorized) {
    //       return [{
    //         text: 'David\'s Power-Up',
    //         callback: showMenu
    //       }];
    //     } else {
    //       return [{
    //         text: 'David\'s Power-Up',
    //         callback: showIframe
    //       }];
    //     }
    //   });


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
  'attachment-sections': function (t, options) {
    return [{
      id: 'Yellowstone', // optional if you aren't using a function for the title
      title: 'Example Attachment Section: Yellowstone',
      content: 'test content'
    }];
  }
}, {
  appKey: 'f3066f5108e24c693700a5ac80e00dec',
  appName: 'Agile Utils'
});


function showIframe(t) {
  return t.popup({
    title: 'Authorize to continue',
    url: './public/html/authorize.html'
  });
}

function showMenu(t) {
  return t.popup({
    title: 'Do something cool',
    items: [
      {text: 'test'}
    ]
  });
}