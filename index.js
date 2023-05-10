var Promise = TrelloPowerUp.Promise;

TrelloPowerUp.initialize({
  'card-buttons': function (t, options) {
    return [{
      icon: './icon.svg',
      text: 'Custom Field',
      callback: function (t) {
        return t.popup({
          title: 'My Custom Field',
          url: 'https://shaked-aharon.github.io/Card-Tag-Trello-PowerUp/custom-field.html',
          height: 184,
          callback: function () {
            return {
              customField: {
                title: 'My Custom Field',
                value: t.card('custom', 'customField')
              }
            };
          }
        });
      }
    }];
  }
});
