const listSortersController = (t, opts) => {
    return t.list('id', 'name')
        .then(function (list) {
            var cards = list.cards.map(card => {
                var color = getColorBasedOnLabels(card.labels);
                // applyBackgroundColor(card.id, color);
            });
            return cards;
        });
}