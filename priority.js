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
                        { text: 'Highest', callback: handleprioritySelection.bind({ text: '&#xf102; Highest', icon: icons.priority_highest }) },
                        { text: 'High', callback: handleprioritySelection.bind({ text: '&#xf077; High', icon: icons.priority_highest }) },
                        { text: 'Medium', callback: handleprioritySelection.bind({ text: '&#xf0dc; Medium', icon: icons.priority_highest }) },
                        { text: 'Low', callback: handleprioritySelection.bind({ text: '	&#xf078; Low', icon: icons.priority_highest }) },
                        { text: 'Lowest', callback: handleprioritySelection.bind({ text: '&#xf103; Lowest', icon: icons.priority_highest }) },
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
        icon: this.icon
    };
    return t.set('card', 'shared', 'priority', priority)
        .then(function () {
            return t.closePopup();
        });
}