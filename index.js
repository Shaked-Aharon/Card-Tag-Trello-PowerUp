window.TrelloPowerUp.initialize({
  "card-badges": function (t, opts) {
    return t.get('card', 'shared', 'tag')
      .then(showBadge.bind({type: badageTypes.badge}));
  },
  'card-buttons': function (t, options) {
    return [{
      icon: {
        dark: 'https://shaked-aharon.github.io/Card-Tag-Trello-PowerUp/tag.png',
        light: 'https://shaked-aharon.github.io/Card-Tag-Trello-PowerUp/tag.png'
      },
      text: 'Set Tag',
      callback: tagSelectionPopup
    }];
  },
  'card-detail-badges': function (t, options) {
    return t.get('card', 'shared', 'tag')
      .then(showBadge.bind({type: badageTypes.detailsBadge}));
  }
});

function tagSelectionPopup(t) {
  return t.popup({
    title: 'Set Tag',
    items: [
      { text: 'Select', callback: handleResetSelection },
      { text: 'Bug', callback: handleTagSelection.bind({ text: 'Bug', value: 'bug' }) },
      { text: 'Task', callback: handleTagSelection.bind({ text: 'Task', value: 'task' }) },
      { text: 'Story', callback: handleTagSelection.bind({ text: 'Story', value: 'story' }) },
      { text: 'Epic', callback: handleTagSelection.bind({ text: 'Epic', value: 'epic' }) }
    ],
  });
}

function handleResetSelection(t, options) {
  return t.set('card', 'shared', 'tag', null)
    .then(function () {
      return t.closePopup();
    });;
}

function handleTagSelection(t, options) {
  var tag = {
    text: this.text,
    color: tagType[this.value]
  };
  return t.set('card', 'shared', 'tag', tag)
    .then(function () {
      return t.closePopup();
    });
}

function showBadge(tag) {
  if (!tag) return [];
  const badge = {
    text: tag.text,
    color: tag.color,
    showOnClose: true
  }
  if(this.type === badageTypes.badge) {badge.showOnClose = undefined;}
  return [badge];
}


