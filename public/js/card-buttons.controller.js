const cardButtonsControllers = (t, opts) => {
    return Promise.all([t.getRestApi().isAuthorized(), template.Btn(t), t.get('board', 'shared', 'templates')])
        .then(([isAuthorized, templateBtn, templates]) => {
            if (templates === undefined) { templates = defaultTemplates; t.set('board', 'shared', 'templates', defaultTemplates) }
            const defaultBtns = [tag.Btn(),templateBtn, priority.Btn(), {
                icon: icons.changeColor,
                text: 'Change Color',
                callback: function(t) {
                  return t.popup({
                    title: 'Change Card Background',
                    url: './public/html/change-color.html',
                    height: 184
                  });
                }
              }];
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