window.TrelloPowerUp.initialize({
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
            color: tag.color
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
        { text: 'Bug', callback: handleTagSelection },
        { text: 'Task', callback: handleTagSelection },
        { text: 'Story', callback: handleTagSelection },
        { text: 'Epic', callback: handleTagSelection }
      ],
    });
  }

  function handleTagSelection(t, selection) {
    console.log(t, selection);
    if (!selection) {
      alert('no selection')
      return;
    }
    var tag = {
      text: selection.text,
      color: getTagColor(selection.value)
    };
    return t.set('card', 'shared', 'tag', tag)
      .then(function() {
        return t.closePopup();
      });
  }