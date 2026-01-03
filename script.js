let votes = {};
function vote() {
    const name = document.getElementById('name').value;
    const selectedcandidate = document.querySelector('input[name="candidate"]:checked');
    const messageDiv = document.getElementById('message');
    if(!name){
        messageDiv.innerHTML = "Please select a candidate.";
    }
       else{
        const candidateName =selectedCandidate.value;
        vote[name] = candidateName;
    messageDiv.innerHTML = `Thank you, ${name}, for voting!`;
        

        document.getElementById('name').value = "";
        selectedCandidate.checked = false;
    }
}

function calculateVotes() {
    const resultDiv = document.getElementById('result');
    let voteCounts = { "BJP": 0, "Congress": 0, "Other": 0 };
    let resultHTML = "<h4>Voting Result:</h4>";


    for (let voter in votes) {
        let party = votes[voter];
        voteCounts[party]++;
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

    
    if (maxVotes === 0) {
        resultHTML += "<h3>No votes cast yet.</h3>";
    } else if (tie) {
        resultHTML += "<h3>Result: It's a Tie!</h3>";
    } else {
        resultHTML += `<h2 style="color: #00ff00;">Winner: ${winner}!</h2>`;
    }
    
    resultDiv.innerHTML = resultHTML;
}