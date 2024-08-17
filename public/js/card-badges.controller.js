const cardBadagesController = (t, opts) => {
  return Promise.all([t.card('all'), t.get('card', 'shared', 'tag'), t.get('card', 'shared', 'priority'), t.get('board', 'shared', 'card-number-prefix')])
    .then(([card, selectedTag, selectedPriority, cardNumberPrefix]) => {
      return fetchCardLastActivity(t, card.id).then(lastActivity => {

        const badges = [
          { text: `${cardNumberPrefix}-${card.idShort}`, showOnClose: true },
          tag.Badge(selectedTag, badageTypes.badge),
          priority.Badge(selectedPriority, badageTypes.badge)
        ]
        if (lastActivity) {
          var activityDate = new Date(lastActivity);
          var now = new Date();
          var timeDifference = now - activityDate; // Time difference in milliseconds
          var daysDifference = timeDifference / (1000 * 3600 * 24); // Convert to days
          console.log(`Difference in days: ${daysDifference}`);
          if (daysDifference <= 1) {
            applyBackgroundColor(card.id, '#D4EDDA'); // Green for recently updated (within 1 day)
          } else if (daysDifference <= 7) {
            applyBackgroundColor(card.id, '#FFF3CD'); // Yellow for updates within the last week
          } else {
            applyBackgroundColor(card.id, '#F8D7DA'); // Red for older updates
          }
        }
        if (card.due) {
          var dueDate = new Date(card.due);
          var now = new Date();
          if (dueDate < now) {
            badges.push({
              text: 'Overdue!',
              color: 'red'
            });
          }
        }
        return badges
      })
    })

}