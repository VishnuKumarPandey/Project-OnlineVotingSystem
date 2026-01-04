let votes = {};

function vote() {
    const name = document.getElementById('name').value.trim(); 
    const selectedCandidate = document.querySelector('input[name="Candidate"]:checked');
    const messageDiv = document.getElementById('message');

    
    if (!name || !selectedCandidate) {
        messageDiv.innerHTML = "<p style='color: yellow;'>Error: Enter your name and select the party!</p>";
        return;
    }

    
    if (votes[name]) {
        messageDiv.innerHTML = `<p style='color: #f48d64ff;'>Error: ${name}, you have already cast your vote!</p>`;
        document.getElementById('name').value = ""; 
        selectedCandidate.checked = false; 
        return; 
    }

   
    votes[name] = selectedCandidate.value;
    messageDiv.innerHTML = `<p style='color: #dfe4dfff;'>Thank You ${name}! Your Vote has been recorded.</p>`;

    document.getElementById('name').value = "";
    selectedCandidate.checked = false;
}



function calculateVotes() {
    const resultDiv = document.getElementById('result');
    let voteCounts = { "BJP": 0, "Congress": 0, "BSP": 0, "Samajwadi": 0, "CPI": 0, "AITC": 0, "AAP": 0, "JDU": 0 };
    
    
    for (let voter in votes) {
        let party = votes[voter];
        if (voteCounts.hasOwnProperty(party)) {
            voteCounts[party]++;
        }
    }

    
    let winner = "";
    let maxVotes = 0;
    let isTie = false;

    for (let party in voteCounts) {
        if (voteCounts[party] > maxVotes) {
            maxVotes = voteCounts[party];
            winner = party;
            isTie = false;
        } else if (voteCounts[party] === maxVotes && maxVotes > 0) {
            isTie = true;
        }
    }

    
    let resultHTML = "<h3>--- Result ---</h3>";
    for (let party in voteCounts) {
        resultHTML += `<p>${party}: ${voteCounts[party]} votes</p>`;
    }

    if (maxVotes === 0) {
        resultHTML += "<h3>No voting done yet!</h3>";
    } else if (isTie) {
        resultHTML += "<h2 style='color: orange;'>Result: Tie !</h2>";
    } else {
        resultHTML += `<h2 style='color: #313638ff; background: #333; padding: 10px; border-radius: 10px;'>Winner : ${winner} </h2>`;
    }

    resultDiv.innerHTML = resultHTML;
}