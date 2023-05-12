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
    color: tagTypeToColor[this.value]
  };
  return t.set('card', 'shared', 'tag', tag)
    .then(() => {
      return setTemplate(t, tag)
    });
}