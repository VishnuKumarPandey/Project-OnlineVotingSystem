let votes = {};
let loggedInVoter = {};

function login() {
    const voterId = document.getElementById('voterId').value.trim();
    const voterName = document.getElementById('voterName').value.trim();
    const voterEmail = document.getElementById('voterEmail').value.trim();
    const loginMessage = document.getElementById('login-message');

    if (!voterId || !voterName || !voterEmail) {
        loginMessage.innerHTML = "<p style='color: #ff4d4d;'>Error: Please fill all fields!</p>";
        return;
    }
    
    if (!voterEmail.includes('@') || !voterEmail.includes('.')) {
        loginMessage.innerHTML = "<p style='color: #ff4d4d;'>Error: Enter a valid email!</p>";
        return;
    }

    loggedInVoter = {
        id: voterId,
        name: voterName,
        email: voterEmail
    };

    
    document.getElementById('login-container').style.display = 'none';
    document.getElementById('voting-container').style.display = 'block';

    
    const nameInput = document.getElementById('name');
    nameInput.value = voterName;
    nameInput.readOnly = true; 

    loginMessage.innerHTML = "";
}

function vote() {
    const selectedCandidate = document.querySelector('input[name="Candidate"]:checked');
    const messageDiv = document.getElementById('message');
    const voteBtn = document.querySelector('.vote-btn');

    if (!selectedCandidate) {
        messageDiv.innerHTML = "<p style='color: yellow;'>Error: Please select a party!</p>";
        return;
    }

    
    if (votes[loggedInVoter.id]) {
        messageDiv.innerHTML = `<p style='color: #f48d64;'>Error: ${loggedInVoter.name}, you have already cast your vote!</p>`;
        return;
    }

    
    votes[loggedInVoter.id] = selectedCandidate.value;
    messageDiv.innerHTML = `<p style='color: #dfe4df;'>Processing your vote...</p>`;
    
    
    voteBtn.disabled = true;

    sendEmailConfirmation(loggedInVoter.email, selectedCandidate.value, loggedInVoter.name);
}

function calculateVotes() {
    const resultDiv = document.getElementById('result');
    let voteCounts = { "BJP": 0, "Congress": 0, "BSP": 0, "Samajwadi": 0, "CPI": 0, "AITC": 0, "AAP": 0, "JDU": 0, "NOTA": 0};

    for (let voterId in votes) {
        let party = votes[voterId];
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

    let resultHTML = "<h3>--- Voting Results ---</h3>";
    for (let party in voteCounts) {
        resultHTML += `<p>${party}: <strong>${voteCounts[party]}</strong> votes</p>`;
    }

    resultHTML += "<hr style='border: 1px solid #fff;'>";

    if (maxVotes === 0) {
        resultHTML += "<h2 style='color: yellow;'>No votes have been cast yet!</h2>";
    } else if (isTie) {
        resultHTML += `<h2 style='color: orange;'>Result: It's a Tie!</h2>`;
    } else {
        resultHTML += `<div style='background: #28a745; padding: 15px; border-radius: 10px;'>Winner: ${winner} 🏆</div>`;
    }

    resultDiv.innerHTML = resultHTML;
}

function sendEmailConfirmation(email, candidate, name) {
    const templateParams = {
        voter_name: name,
        party_name: candidate,
        to_email: email
    };

    emailjs.send('service_4e7dc5y', 'template_33o9eba', templateParams)
        .then(function (response) {
            document.getElementById('message').innerHTML = `<p style="color: #a1ffb0;">Success! Confirmation sent to ${email}</p>`;
            document.querySelector('.vote-btn').disabled = false;
        }, function (error) {
            console.error('FAILED...', error);
            alert("Email send nahi hua. Service ID ya Template ID check karein.");
            document.querySelector('.vote-btn').disabled = false;
        });
}