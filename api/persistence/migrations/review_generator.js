

const get_text = function() {
    let start = [
        "I loved it!",
        "Great experience.",
        "Could be better.",
        "Went there last night.",
        "It was terrible.",
    ]

    let middle = [
        "The staff was very friendly",
        "The food was plentiful",
        "The quality was great",
        "It was way too expensive",
        "The kitchen was filthy!",
        "The staff was very rude",
        "The whole place looked beatiful",
        "The whole place looked awful",
        "It is really good on a budget",
    ]

    let end = [
        "I''d definitely go again",
        "I don''t think I''m coming back",
        "This was a waste of a night",
        "I had a lovely time",
        "This is definitely a keeper",
    ]

    var s = start[Math.floor(Math.random()*start.length)];
    var m1 = middle[Math.floor(Math.random()*middle.length)];
    var m2 = middle[Math.floor(Math.random()*middle.length)];
    var e = end[Math.floor(Math.random()*end.length)];
    return `${s} ${m1} ${m2} ${e}`
}

const get_uid = function() {
    let n_users = 8
    return Math.floor(Math.random() * n_users) + 3;
}
const get_rid = function() {
    let n_restaurants = 14
    return Math.floor(Math.random() * n_restaurants) + 1;
}

const get_rating = function() {
    return Math.floor(Math.random() * 5) + 1
}


const generate = function(n) {
    for (let i = 0; i < n; i++) {
        let rid = get_rid();
        let uid = get_uid()
        let text = get_text();
        let rating = get_rating();
        console.log(`INSERT INTO reviews(rating, restaurant_id, user_id, comment) VALUES (${rating},${rid}, ${uid}, '${text}');`)
    }
}

generate(300);   