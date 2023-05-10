window.TrelloPowerUp.initialize({
  "card-badges": function (t, opts) {
    let cardAttachments = opts.attachments; // Trello passes you the attachments on the card
    return t
      .card("name")
      .get("name")
      .then(function (cardName) {
        return [
          {
            // Dynamic badges can have their function rerun
            // after a set number of seconds defined by refresh.
            // Minimum of 10 seconds.
            dynamic: function () {
              // we could also return a Promise that resolves to
              // this as well if we needed to do something async first
              return {
                text: "Dynamic " + (Math.random() * 100).toFixed(0).toString(),
                icon: "./images/icon.svg",
                color: "green",
                refresh: 10, // in seconds
              };
            },
          },
          {
            // It's best to use static badges unless you need your
            // badges to refresh.
            // You can mix and match between static and dynamic
            text: "Static",
            icon: HYPERDEV_ICON, // for card front badges only
            color: null,
          },
        ];
      });
  },
    'card-buttons': function(t, options) {
      return [{
        icon: {
          dark: 'https://example.com/icon.svg',
          light: 'https://example.com/icon.svg'
        },
        text: 'Set Tag',
        callback: tagSelectionPopup
      }];
    },
    'card-detail-badges': function(t, options) {
      return t.get('card', 'shared', 'tag')
        .then(function(tag) {
          if (!tag) {
            return [];
          }
          return [{
            text: tag.text,
            color: tag.color,
            showOnClose: true
          }];
        });
    }
  });
  
  function getTagColor(value) {
    switch (value) {
      case 'bug':
        return 'red';
      case 'task':
        return 'yellow';
      case 'story':
        return 'blue';
      case 'epic': 
        return 'green';
      default:
        return 'gray';
    }
  }
  

  function tagSelectionPopup(t) {
    return t.popup({
      title: 'Set Tag',
      items: [
        { text: 'Bug', callback: handleTagSelection.bind({text: 'Bug', value: 'bug'}) },
        { text: 'Task', callback: handleTagSelection.bind({text: 'Task', value: 'task'}) },
        { text: 'Story', callback: handleTagSelection.bind({text: 'Story', value: 'story'}) },
        { text: 'Epic', callback: handleTagSelection.bind({text: 'Epic', value: 'epic'}) }
      ],
    });
  }

  function handleTagSelection(t, selection) {
    if (!selection) {
      alert('no selection')
      return;
    }
    var tag = {
      text: this.text,
      color: getTagColor(this.value)
    };
    return t.set('card', 'shared', 'tag', tag)
      .then(function() {
        return t.closePopup();
      });
  }