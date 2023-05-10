const priority = {
    Btn() {
        return {
            icon: {
                dark: 'https://icons8.com/icon/22013/tag-window',
                light: 'https://icons8.com/icon/22013/tag-window'
            },
            text: 'Set Priority',
            callback: function (t) {
                return t.popup({
                    title: 'Set Priority',
                    items: [
                        { text: 'Select', callback: handleprioritySelection.bind({ text: 'Epic', value: 'epic' }) },
                        {
                            text: 'Highest',
                            icon: 'https://shaked-aharon.github.io/Card-Tag-Trello-PowerUp/Highest-priority.svg',
                            callback: handleprioritySelection.bind({ type: RESET })
                        },
                        { text: 'High', callback: handleprioritySelection.bind({ text: 'Bug', value: 'bug' }) },
                        { text: 'Medium', callback: handleprioritySelection.bind({ text: 'Task', value: 'task' }) },
                        { text: 'Low', callback: handleprioritySelection.bind({ text: 'Story', value: 'story' }) },
                    ],
                });
            }
        }
    },
    Badge(priority, badageType = badageTypes.badge) {
        if (!priority) return;
        const badge = {
            text: priority.text,
            icon: priority.icon,
            showOnClose: true
        }
        if (this.type === badageTypes.badge) { badge.showOnClose = undefined; }
        return badge;
    }
}

function handleprioritySelection(t, options) {
    if (this.type === RESET) {
        return t.set('card', 'shared', 'priority', null)
            .then(function () {
                return t.closePopup();
            });;
    }
    var priority = {
        text: this.text,
        icon: tagType[this.value]
    };
    return t.set('card', 'shared', 'priority', priority)
        .then(function () {
            return t.closePopup();
        });
}