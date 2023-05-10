window.TrelloPowerUp.initialize({
  "card-badges": function (t, opts) {
    return t
      .card("name")
      .get("name")
      .then(showBadge.bind({notInDetails: true}));
  },
  'card-buttons': function (t, options) {
    return [{
      icon: {
        dark: './tag.png',
        light: './tag.png'
      },
      text: 'Set Tag',
      callback: tagSelectionPopup
    }];
  },
  'card-detail-badges': function (t, options) {
    return t.get('card', 'shared', 'tag')
      .then(showBadge.bind({notInDetails: false}));
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
      { text: 'Select', callback: handleResetSelection },
      { text: 'Bug', callback: handleTagSelection.bind({ text: 'Bug', value: 'bug' }) },
      { text: 'Task', callback: handleTagSelection.bind({ text: 'Task', value: 'task' }) },
      { text: 'Story', callback: handleTagSelection.bind({ text: 'Story', value: 'story' }) },
      { text: 'Epic', callback: handleTagSelection.bind({ text: 'Epic', value: 'epic' }) }
    ],
  });
}

function handleResetSelection(t, options){
  return t.remove('card', 'shared', 'tag');
}

function handleTagSelection(t, options) {
  var tag = {
    text: this.text,
    color: getTagColor(this.value)
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
  if(this.notInDetails){delete badge.showOnClose;}
  return [badge];
}
