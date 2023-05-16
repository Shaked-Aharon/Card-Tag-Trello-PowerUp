const cardNumber = {
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