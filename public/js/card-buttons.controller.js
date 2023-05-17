const cardButtonsControllers = (t, opts) => {
    return Promise.all([t.getRestApi().isAuthorized(), template.Btn(t)])
        .then(([isAuthorized, templateBtn]) => {
            console.log({ templateBtn })
            const defaultBtns = [tag.Btn(),templateBtn, priority.Btn()];
            return defaultBtns;
            // if (isAuthorized) {
            //     return [...defaultBtns, {
            //         text: 'Authorized Btn',
            //         callback: showMenu
            //     }];
            // }
            // return [...defaultBtns, {
            //     text: 'Not Authorized Btn',
            //     callback: showIframe
            // }];

        })
        .catch(err => console.log({ err }))
}


function showIframe(t) {
    return t.popup({
        title: 'Authorize to continue',
        url: './public/html/authorize.html'
    });
}

function showMenu(t) {
    return t.popup({
        title: 'Do something cool',
        items: [
            { text: 'test' }
        ]
    });
}