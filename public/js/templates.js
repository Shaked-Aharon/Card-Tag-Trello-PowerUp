const templates = {
    [tagType.bug]: `####**Step to Reproduce:**####

    ####**Actual Result:**####
    
    ####**Expected Result:**####
    
    
    ####**Relevant Assets:**#### (like id or barcode or product or client)`,
    
    [tagType.story]: `"As a [persona]": Who are we building this for? We’re not just after a job title, we’re after the persona of the person. Max. Our team should have a shared understanding of who Max is. We’ve hopefully interviewed plenty of Max’s. We understand how that person works, how they think and what they feel. We have empathy for Max.
    “Wants to”: Here we’re describing their intent — not the features they use. What is it they’re actually trying to achieve? This statement should be implementation free — if you’re describing any part of the UI and not what the user goal is you're missing the point.
    “So that”: how does their immediate desire to do something this fit into their bigger picture? What’s the overall benefit they’re trying to achieve? What is the big problem that needs solving?`,
    [tagType.task]: `
    ### :green book: Summary
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
     
    ### :paintbrush: Design
    
    #### Link to Screendesign
    [Links to your design system like InVision, Sketch,etc.](http://linkhere.com)
    
    #### Wireframes
    Place Wireframes, Sketches, Scribbles, etc. here
     
    ### :floppy_disk: Technical Information
    #### Link to technical information
    Any link to technical documents, e.g. Swagger Documentation, Architectural diagram can be added here
    
    ### :notebook: Additional Notes / Information
    Any notes you took during refinement sessions or talks with other people about the story
     
    ### :flag on: ToDo
    (-) @ clarify`

}

const StoryTemplate = 

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