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

/info panel

#### Acceptance Criteria 1

**Given** precondition
**When** action
**Then** result

/info panel

#### Acceptance Criteria 2

**Given** precondition
**When** action
**Then** result

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
    Promise.all([t.getRestApi().getToken(), t.card('id')])
        .then(([token, card]) => {
            if (!token) { console.log('Not Authoraized, Cant Set Template'); return; }
            console.log({ token, id: card.id, selectedTag, templates });
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
        })
}