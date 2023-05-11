const BugTemplate = `####**Step to Reproduce:**####

####**Actual Result:**####

####**Expected Result:**####


####**Relevant Assets:**#### (like id or barcode or product or client)`;

function setBugTemplate(t) {
    Promise.all([t.getRestApi().getToken(), t.card('id')])
        .then(([token, card]) => {
            if (!token) { console.log('Not Authoraized, Cant Set Template'); return; }
            console.log({ token, id: card.id, BugTemplate });
            let url = new URL(`https://api.trello.com/1/cards/${card.id}`);
            url.searchParams.append('key', 'f3066f5108e24c693700a5ac80e00dec');
            url.searchParams.append('token', token);
            url.searchParams.append('desc', BugTemplate);
            // const url = `https://api.trello.com/1/cards/${card.id}?key=f3066f5108e24c693700a5ac80e00dec&token=${token}&desc=${BugTemplate}`;
            fetch(url, { method: 'PUT' })
                .then(res => {
                    console.log(res);
                    return res.json();
                })
                .then(res => console.log(res))
                .catch(err => console.log(err))
        })
}