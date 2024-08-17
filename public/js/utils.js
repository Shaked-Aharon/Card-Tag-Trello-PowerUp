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
    var cardElement = document.querySelector(`.list-card[data-card-id="${cardId}"]`);
    if (cardElement) {
      cardElement.style.backgroundColor = color;
    }
  }