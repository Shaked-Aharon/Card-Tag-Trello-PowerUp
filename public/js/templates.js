const BugTemplate = `####**Step to Reproduce:**####

####**Actual Result:**####

####**Expected Result:**####


####**Relevant Assets:**#### (like id or barcode or product or client)`;

function setBugTemplate(t) {
    Promise.all([t.getRestApi().getToken(), t.card('id')])
        .then(([token, id]) => {
            if (!token) {console.log('Not Authoraized, Cant Set Template'); return;}
            console.log({ token, id, BugTemplate });
            return;
            const url = `https://api.trello.com/1/cards/${id}?key=f3066f5108e24c693700a5ac80e00dec&token=${token}&desc=${BugTemplate}`;
            fetch(encodeURI(url), { method: 'PUT' })
                .then(res => {
                    console.log(res);
                    return res.json();
                })
                .then(res => console.log(res))
                .catch(err => console.log(err))
        })
}