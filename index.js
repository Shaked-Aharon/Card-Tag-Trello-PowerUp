var Promise = TrelloPowerUp.Promise;

var GRAY_ICON = 'https://cdn.hyperdev.com/us-east-1%3A3d31b21c-01a0-4da2-8827-4bc6e88b7618%2Ficon-gray.svg';

var onBtnClick = function (t, opts) {
  console.log('Someone clicked the button');
};

TrelloPowerUp.initialize({
  'card-buttons': function (t, opts) {
    return [
      {
      // usually you will provide a callback function to be run on button click
      // we recommend that you use a popup on click generally
      icon: GRAY_ICON, // don't use a colored icon here
      text: 'Open Popup',
      callback: onBtnClick,
      condition: 'edit'
    },
    {
      // but of course, you could also just kick off to a url if that's your thing
      icon: GRAY_ICON,
      text: 'Just a URL',
      condition: 'always',
      url: 'https://developer.atlassian.com/cloud/trello',
      target: 'Trello Developer Site' // optional target for above url
    },
    {
      icon: './icon.svg',
      text: 'Custom Field',
      callback: function (t) {
        return t.popup({
          title: 'My Custom Field',
          url: './custom-field.html',
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
    }
  ];
  }
});

TrelloPowerUp.initialize({
  'card-buttons': function (t, options) {
    return [
      {
        icon: './icon.svg',
        text: 'Custom Field',
        callback: function (t) {
          return t.popup({
            title: 'My Custom Field',
            url: './custom-field.html',
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
      }
    ];
  }
});
