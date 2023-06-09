const priority = {
    Btn() {
        return {
            icon: icons.priority,
            text: 'Set Priority',
            callback: function (t) {
                return t.popup({
                    title: 'Set Priority',
                    items: [
                        { text: 'Select', callback: handleprioritySelection.bind({ type: RESET }) },
                        { text: 'Highest', callback: handleprioritySelection.bind({ text: 'Highest', icon: icons.priority_highest }) },
                        { text: 'High', callback: handleprioritySelection.bind({ text: 'High', icon: icons.priority_high }) },
                        { text: 'Medium', callback: handleprioritySelection.bind({ text: 'Medium', icon: icons.priority_medium }) },
                        { text: 'Low', callback: handleprioritySelection.bind({ text: 'Low', icon: icons.priority_low }) },
                        { text: 'Lowest', callback: handleprioritySelection.bind({ text: 'Lowest', icon: icons.priority_lowest }) },
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
            showOnClose: true,
            title: 'Priority'
        }
        if (this.type === badageTypes.badge) {
            badge.showOnClose = undefined;
            badge.text = undefined;
            badge.title = undefined;
        }
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
        icon: this.icon
    };
    return t.set('card', 'shared', 'priority', priority)
        .then(function () {
            return t.closePopup();
        });
}