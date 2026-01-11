
let votes = {};


let loggedInVoter = {};


function login() {
    const voterId = document.getElementById('voterId').value.trim();
    const voterName = document.getElementById('voterName').value.trim();
    const voterEmail = document.getElementById('voterEmail').value.trim();
    const loginMessage = document.getElementById('login-message');


    if (!voterId || !voterName || !voterEmail) {
        loginMessage.innerHTML = "<p style='color: yellow;'>Error: Please fill all fields!</p>";
        return;
    }


    if (!voterEmail.includes('@') || !voterEmail.includes('.')) {
        loginMessage.innerHTML = "<p style='color: yellow;'>Error: Enter a valid email!</p>";
        return;
    }


    loggedInVoter = {
        id: voterId,
        name: voterName,
        email: voterEmail
    };

    /
    document.getElementById('login-container').style.display = 'none';
    document.getElementById('voting-container').style.display = 'block';


    document.getElementById('name').value = voterName;

    loginMessage.innerHTML = "";
}


function vote() {
    const name = document.getElementById('name').value.trim();
    const selectedCandidate = document.querySelector('input[name="Candidate"]:checked');
    const messageDiv = document.getElementById('message');

    if (!name || !selectedCandidate) {
        messageDiv.innerHTML = "<p style='color: yellow;'>Error: Enter your name and select the party!</p>";
        return;
    }

    if (votes[loggedInVoter.id]) {
        messageDiv.innerHTML = `<p style='color: #f48d64ff;'>Error: ${name}, you have already cast your vote!</p>`;
        selectedCandidate.checked = false;
        return;
    }


    votes[loggedInVoter.id] = selectedCandidate.value;
    messageDiv.innerHTML = `<p style='color: #dfe4dfff;'>Thank You ${name}! Your Vote has been recorded.</p>`;


    selectedCandidate.checked = false;


    sendEmailConfirmation(loggedInVoter.email, selectedCandidate.value, name);
}

function calculateVotes() {
    const resultDiv = document.getElementById('result');
    let voteCounts = { "BJP": 0, "Congress": 0, "BSP": 0, "Samajwadi": 0, "CPI": 0, "AITC": 0, "AAP": 0, "JDU": 0 };


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
        resultHTML += `<p>${party}: ${voteCounts[party]} votes</p>`;
    }

    resultHTML += "<hr style='border: 1px solid #fff;'>";

    if (maxVotes === 0) {
        resultHTML += "<h2 style='color: yellow;'>No votes have been cast yet!</h2>";
    } else if (isTie) {
        resultHTML += `<h2 style='color: orange; background: #333; padding: 15px; border-radius: 10px;'>Result: It's a Tie!</h2>`;
    } else {
        resultHTML += `<h2 style='color: #fff; background: #28a745; padding: 20px; border-radius: 15px; font-size: 1.8rem; text-align: center;'>Winner: ${winner} 🏆</h2>`;
    }

    resultDiv.innerHTML = resultHTML;
}



function sendEmailConfirmation(email, candidate, name) {
    const templateParams = {
        voter_name: name,
        party_name: candidate,
        to_email: email
    };


    emailjs.send('service_4e7dc5y', 'template_33o9eba', templateParams, 'rA12O9Em2Oo3Yz4tP')
        .then(function (response) {
            console.log('SUCCESS!', response.status, response.text);
            const messageDiv = document.getElementById('message');
            messageDiv.innerHTML += `<p style="color: #a1ffb0;">Official confirmation sent to ${email} </p>`;
        }, function (error) {
            console.log('FAILED...', error);
            alert("Email send nahi hua. Browser console check karein.");
        });
}