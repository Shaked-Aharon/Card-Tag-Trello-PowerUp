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

          var coverColor;
          if (daysDifference <= 1) {
            coverColor = 'green'; // Green for recently updated (within 1 day)
          } else if (daysDifference <= 7) {
            coverColor = 'yellow'; // Yellow for updates within the last week
          } else {
            coverColor = 'red'; // Red for older updates
          }

          // Use set to change the cover
          t.set('card', 'shared', 'cover', {
            color: coverColor,
            brightness: 'light'
          });
          badges.push({
            text: 'Last Updated: ' + daysDifference.toFixed(0) + ' days ago',
            color: coverColor
          });
        }
        // if (card.due) {
        //   var dueDate = new Date(card.due);
        //   var now = new Date();
        //   if (dueDate < now) {
        //     badges.push({
        //       text: 'Overdue!',
        //       color: 'red'
        //     });
        //   }
        // }
        return badges
      })
    })

}