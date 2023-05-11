const tag = {
  Btn() {
    return {
      icon: icons.tag,
      text: 'Set Tag',
      callback: function (t) {
        return t.popup({
          title: 'Set Tag',
          items: [
            { text: 'Select', callback: handleTagSelection.bind({ type: RESET }) },
            { text: 'Bug', callback: handleTagSelection.bind({ text: 'Bug', value: 'bug' }) },
            { text: 'Task', callback: handleTagSelection.bind({ text: 'Task', value: 'task' }) },
            { text: 'Story', callback: handleTagSelection.bind({ text: 'Story', value: 'story' }) },
            { text: 'Epic', callback: handleTagSelection.bind({ text: 'Epic', value: 'epic' }) }
          ],
        });
      }
    }
  },
  Badge(tag, badageType = badageTypes.badge) {
    if (!tag) return;
    const badge = {
      text: tag.text,
      color: tag.color,
      showOnClose: true
    }
    if (this.type === badageTypes.badge) { badge.showOnClose = undefined; }
    return badge;
  }
}

function handleTagSelection(t, options) {
  if (this.type === RESET) {
    return t.set('card', 'shared', 'tag', null)
      .then(function () {
        return t.closePopup();
      });;
  }
  var tag = {
    text: this.text,
    color: tagType[this.value]
  };
  if (this.value === 'bug') {
    t.getRestApi()
      .getToken()
      .then(function (token) {

        t.card('id')
        .then(id => {
          console.log({token, id});
          // fetch(`https://api.trello.com/1/cards/[existing card id]?key=f3066f5108e24c693700a5ac80e00dec&token=${token}`, {method: 'PUT'})
        })
        if (!token) {
          // do auth instead
        }

        // make a request with token
      });
  }
  return t.set('card', 'shared', 'tag', tag)
    .then(function () {
      return t.closePopup();
    });
}