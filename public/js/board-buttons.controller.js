const boardButtonsController = (t, opts) => {
    return [
        {
            text: POWERUP_NAME,
            callback: (t, opts) => {
                t.popup({
                    title: 'Settings',
                    url: './public/html/settings.html',
                    height: 160
                });
            }
        }
    ]
}