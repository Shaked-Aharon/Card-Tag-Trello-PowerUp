const templates = {
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
`

}

function setTemplate(t, selectedTag) {
    return Promise.all([t.getRestApi().getToken(), t.card('id', 'desc')])
        .then(([token, card]) => {
            if (!['bug', 'story', 'task'].includes(selectedTag)) {return t.closePopup();}
            console.log({ token, id: card.id, selectedTag, templates });
            if (!token) { console.log('Not Authoraized, Cant Set Template'); return; }
            if (card.desc.trim().length > 0) {
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
                        url.searchParams.append('desc', templates[selectedTag]);
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
            }
        })
}