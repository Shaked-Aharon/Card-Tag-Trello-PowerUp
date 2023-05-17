const defaultTemplates = {
    [tagType.bug]: `
### Environment

- Device model:
- OS version:
- Software version:
- Browser version
- Stage:
- Account:

### Precondition

\*

### Steps to reproduce

#

### Current behavior

\*

### Expected behavior

\*
    `,

    [tagType.task]: `
### What needs to be done

### Why it needs to be done

### Acceptance Criteria

### Additional Information
    `,
    [tagType.story]: `
### :green_book: Summary

**As a**
**I want to**
**So that**

### :clipboard: Acceptance Criteria

#### Acceptance Criteria 1

> **Given** precondition
> **When** action
> **Then** result


#### Acceptance Criteria 2

> **Given** precondition
> **When** action
> **Then** result

### :art: Design

#### Link to Screendesign

[Links to your design system like InVision, Sketch,etc.](http://linkhere.com "‌")

#### Wireframes

Place Wireframes, Sketches, Scribbles, etc. here

### :floppy_disk: Technical Information

#### Link to technical information

Any link to technical documents, e.g. Swagger Documentation, Architectural diagram can be added here

### :notebook: Additional Notes / Information

Any notes you took during refinement sessions or talks with other people about the story

### :triangular_flag_on_post: ToDo

(-) \@ clarify
`,
    [tagType.epic]: `
* User role or persona — Create a unique story for each user persona. “Quicker login for new visitors,” “quicker login for return customers,” etc.
* Ordered steps — Break down the process and create a story for each step.
* Culture — Let team norms dictate if a story is a quick task or a week-long project.
* Time — Barring another agreed-upon convention, design stories that can be completed in one sprint or less.`

}

const template = {
    Btn(t) {
        return Promise.all([t.getRestApi().getToken(), t.get('board', 'shared', 'templates')])
            .then(([token, templates]) => {
                console.log({token, templates})
                // if (!token) { return t.popup({ title: 'You must authorized to use templates' }) }
                if (!token) { return {} }
                if (templates === undefined) { templates = defaultTemplates; t.set('board', 'shared', 'templates', defaultTemplates) }
                return {
                    icon: icons.template,
                    text: 'Set Template',
                    callback: function (t) {
                        return t.popup({
                            title: 'Set Template',
                            items: Object
                                .entries(templates)
                                .map(([key, value]) => ({ text: key, callback: handleTemplateSelection.bind({ template: value, token: token, name: key }) }))
                        });
                    }
                }
            });
    }
}

function handleTemplateSelection(t, options) {
    return Promise.all([t.card('id', 'desc')])
        .then(([card]) => {
            console.log({ token: this.token, id: card.id, selectedTemplate: this.template, defaultTemplates });
            return t.popup({
                type: 'confirm',
                title: `Set Template`,
                message: `Should i overright description with ${this.name} template?`,
                confirmText: 'Yes',
                onConfirm: (t, opts) => updateTemplate(t, card, this.token, this.template),
                confirmStyle: 'danger',
                cancelText: 'No',
                onCancel: (t, opts) => t.closePopup(),
            })
        })
}

function updateTemplate(t, card, token, template) {
    console.log({ card, token, template })
    t.closePopup();
    let url = new URL(`https://api.trello.com/1/cards/${card.id}`);
    url.searchParams.append('key', 'f3066f5108e24c693700a5ac80e00dec');
    url.searchParams.append('token', token);
    url.searchParams.append('desc', template);
    fetch(url, { method: 'PUT' })
        .then(res => {
            if (res.status !== 200) { /*do something*/ }
            return res.json();
        })
        .then(res => console.log(res))
        .catch(err => console.log(err))
}

function setTemplate(t, selectedTag) {
    return Promise.all([t.getRestApi().getToken(), t.card('id', 'desc'), t.get('board', 'shared', 'templates')])
        .then(([token, card, templates]) => {
            if (!['bug', 'story', 'task'].includes(selectedTag)) { return t.closePopup(); }
            if (templates === undefined) { templates = defaultTemplates; t.set('board', 'shared', 'templates', defaultTemplates) }
            console.log({ token, id: card.id, selectedTag, defaultTemplates });
            if (!token) { console.log('Not Authoraized, Cant Set Template'); return; }
            // if (card.desc.trim().length > 0) {
            return t.popup({
                type: 'confirm',
                title: `Set Template`,
                message: `Should i overright description with ${selectedTag} template?`,
                confirmText: 'Yes',
                onConfirm: function (t, opts) {
                    t.closePopup();
                    let url = new URL(`https://api.trello.com/1/cards/${card.id}`);
                    url.searchParams.append('key', 'f3066f5108e24c693700a5ac80e00dec');
                    url.searchParams.append('token', token);
                    url.searchParams.append('desc', defaultTemplates[selectedTag]);
                    fetch(url, { method: 'PUT' })
                        .then(res => {
                            if (res.status !== 200) { /*do something*/ }
                            return res.json();
                        })
                        .then(res => console.log(res))
                        .catch(err => console.log(err))
                },
                confirmStyle: 'danger',
                cancelText: 'No',
                onCancel: function (t, opts) { t.closePopup(); },
            })
            // }
        })
}