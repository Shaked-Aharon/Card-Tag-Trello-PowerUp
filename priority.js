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
        if (this.type === badageTypes.badge) {
            return {
                icon: priority.icon,
            };
        }
        if (this.type === badageTypes.detailsBadge) {
            return {
                text: priority.text,
                showOnClose: true,
                title: 'Priority'
            };
        }
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