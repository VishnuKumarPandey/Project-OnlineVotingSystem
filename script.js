let votes = {}; 

function vote() {
    const name = document.getElementById('name').value;
    
    const selectedCandidate = document.querySelector('input[name="Candidate"]:checked');
    const messageDiv = document.getElementById('message');

    
    if (!name || !selectedCandidate) {
        messageDiv.innerHTML = "<span style='color: red;'>Please enter your name and select a candidate.</span>";
        return;
    }

    
    const candidateName = selectedCandidate.value;
    votes[name] = candidateName;
    
    messageDiv.innerHTML = `Thank you, <strong>${name}</strong>, for voting for ${candidateName}!`;

    document.getElementById('name').value = "";
    selectedCandidate.checked = false;
}

function calculateVotes() {
    const resultDiv = document.getElementById('result');
    let voteCounts = { "BJP": 0, "Congress": 0, "Other": 0 };
    let resultHTML = "<h4>Voting Result:</h4>";

    
    for (let voter in votes) {
        let party = votes[voter];
        if (voteCounts.hasOwnProperty(party)) {
            voteCounts[party]++;
        }
    }

    let winner = "";
    let maxVotes = -1;
    let tie = false;

    for (let party in voteCounts) {
        resultHTML += `<p>${party}: ${voteCounts[party]} votes</p>`;
        
        if (voteCounts[party] > maxVotes) {
            maxVotes = voteCounts[party];
            winner = party;
            tie = false;
        } else if (voteCounts[party] === maxVotes && maxVotes > 0) {
            tie = true;
        }
    }

    if (maxVotes <= 0) {
        resultHTML += "<h3>No votes cast yet.</h3>";
    } else if (tie) {
        resultHTML += "<h3>Result: It's a Tie!</h3>";
    } else {
        resultHTML += `<h2 style="color: #4c4c4fff;">Winner: ${winner}!</h2>`;
    }
    
    resultDiv.innerHTML = resultHTML;
}