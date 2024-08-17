function getColorBasedOnLabels(labels) {
    if (labels.some(label => label.color === 'green')) {
        return '#D4EDDA'; // Light green for "Done"
    } else if (labels.some(label => label.color === 'yellow')) {
        return '#FFF3CD'; // Light yellow for "In Progress"
    } else if (labels.some(label => label.color === 'red')) {
        return '#F8D7DA'; // Light red for "Urgent"
    }
    return '#FFFFFF'; // Default white
}

function applyBackgroundColor(cardId, color) {
    // var cardElement = document.querySelector(`div[data-testid="trello-card"][data-card-id="${cardId}"]`);
    // console.log(`Try finding element to paint: 'div[data-testid="trello-card"][data-card-id="${cardId}"]'`, cardElement)
    // if (cardElement) {
    //     console.log(`Try painting card element usig this color: ${color}`);
    //     cardElement.style.backgroundColor = color;
    // }
    var targetNode = document.querySelector(`div[data-testid="trello-card"][data-card-id="${cardId}"]`);
    console.log(`Try finding element to paint: 'div[data-testid="trello-card"][data-card-id="${cardId}"]'`, cardElement)

    if (targetNode) {
        console.log(`Try painting card element usig this color: ${color}`);
        targetNode.style.backgroundColor = color;
    } else {
        // Use MutationObserver to detect when the card is added to the DOM
        var observer = new MutationObserver(function (mutationsList, observer) {
            for (var mutation of mutationsList) {
                if (mutation.type === 'childList') {
                    var cardElement = document.querySelector(`div[data-testid="trello-card"][data-card-id="${cardId}"]`);
                    console.log(`Try Again finding element to paint: 'div[data-testid="trello-card"][data-card-id="${cardId}"]'`, cardElement)
                    if (cardElement) {
                        console.log(`Try Again painting card element usig this color: ${color}`);
                        cardElement.style.backgroundColor = color;
                        observer.disconnect(); // Stop observing once the element is found and updated
                        break;
                    }
                }
            }
        });

        observer.observe(document.body, { childList: true, subtree: true });
    }
}

function fetchCardLastActivity(t, cardId) {
    return t.getRestApi()
        .getToken()
        .then(token => {
            if (!token) throw 'Invalid or missing token.'
            var url = `https://api.trello.com/1/cards/${cardId}/actions?key=${KEY}&token=${token}&filter=all&limit=1&sort=-date`;
            return fetch(url)
                .then(function (response) {
                    if (!response.ok) {
                        throw new Error('Network response was not ok ' + response.statusText);
                    }
                    return response.json();
                })
                .then(function (actions) {
                    if (actions && actions.length > 0) {
                        return actions[0].date; // Return the date of the most recent action
                    }
                    return null;
                });
        })
}