try {
  window.TrelloPowerUp.initialize({
    "board-buttons": boardButtonsController,
    "card-badges": cardBadagesController,
    'card-buttons': cardButtonsControllers,
    'card-detail-badges': cardDetailsBadgesController,
  }, {
    appKey: KEY,
    appName: POWERUP_NAME
  });
} catch (error) {
  console.log({ error })
}
