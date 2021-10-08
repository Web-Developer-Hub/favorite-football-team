//this is main funtion of my application...
const myFunc = () => {
    document.getElementById('my-button').addEventListener('click', () => {
        const inputText = document.getElementById('input-text');
        const inputValue = inputText.value;
        if (inputValue == '') {
            const div = document.getElementById('errors')
            div.innerHTML = `
            <svg xmlns="http://www.w3.org/2000/svg" style="display: none;">
                <symbol id="exclamation-triangle-fill" fill="currentColor" viewBox="0 0 16 16">
                    <path d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"/>
                </symbol>
            </svg>
        
            <div class="alert alert-danger d-flex align-items-center" role="alert">
                <svg class="bi flex-shrink-0 me-2" width="24" height="24" role="img" aria-label="Warning:"><use xlink:href="#exclamation-triangle-fill"/></svg>
                <div>Please type somthing here...</div>
            </div>
            `
        }
        else {
            inputText.value = null;
            fetchAPI(inputValue);
        }
    })
}
myFunc();
//api fetch funtionality here...
const fetchAPI = async (inputValue) => {
    try {
        const url = `https://www.thesportsdb.com/api/v1/json/1/searchteams.php?t=${inputValue}`
        const res = await fetch(url);
        const data = await res.json();
        showData(data);
    }
    catch (error) {
        showError(error);
    }
}


//error show funtionality here..
const showError = (error) => {
    const div = document.getElementById('errors')
    div.innerHTML = `
    <svg xmlns="http://www.w3.org/2000/svg" style="display: none;">
        <symbol id="exclamation-triangle-fill" fill="currentColor" viewBox="0 0 16 16">
            <path d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"/>
        </symbol>
    </svg>

     <div class="alert alert-danger d-flex align-items-center" role="alert">
        <svg class="bi flex-shrink-0 me-2" width="24" height="24" role="img" aria-label="Warning:"><use xlink:href="#exclamation-triangle-fill"/></svg>
        <div>Your inpute name is invalided, please correct name type here. Like : Arsenal, Barcelona</div>
     </div>
    `
}

//show data funtionality here...
const showData = (data) => {
    const { teams } = data;
    const mainDiv = document.getElementById('main-div');
    mainDiv.textContent = null;
    for (let i = 0; i < teams.length; i++) {
        const element = teams[i];
        const { strLeague, strDescriptionEN, strTeamBadge, strTeam, idTeam } = element;
        const div = document.createElement('div');
        div.classList.add('col')
        div.innerHTML = `
        <div class="card h-100">
            <img src="${strTeamBadge}" class="card-img-top" alt="...">
            <div class="card-body">
              <h5 class="card-title">${strTeam}</h5>
              <h5 class="card-title">${strLeague}</h5>
              <p> ${strDescriptionEN.slice(0, 200)}....</p>
              <button id="details" class=" btn btn-success" onclick="clubDetails(${idTeam})">More Details</button>
            </div>
          </div>
        `
        mainDiv.appendChild(div)
    }
}

// clubs details funtionality here....
const clubDetails = async (idTeam) => {
    const head = document.getElementById('head').innerText = 'Team Details Here!'
    url = `https://www.thesportsdb.com/api/v1/json/1/lookupteam.php?id=${idTeam}`
    const res = await fetch(url);
    const data = await res.json();
    postDetails(data);
}
const postDetails = (data) => {
    const { teams } = data;

    let i = 0;
    while (i < teams.length) {
        const element = teams[i];
        i++;
        const {
            strTeam,
            strStadium,
            strAlternate,
            strLeague,
            strDescriptionEN,
            strTeamBadge,
            strCountry,
            strFacebook,
            strInstagram,
            strKeywords,
            strSport,
            strTwitter,
            strYoutube,
            strWebsite,
        } = element;

        const myPostDetails = document.getElementById('post-details');
        myPostDetails.textContent = '';
        const div = document.createElement('div');
        div.innerHTML = `
        <div class="card">
            <img src="${strTeamBadge}" class="card-img-top" alt="...">
            <div class="card-body">
            <p class="card-title"><span class=" fw-bold">Team Name :</span> ${strTeam}</p>
            <p class="card-title"><span class=" fw-bold">Team League :</span> ${strLeague}</p>
            <p class="card-title"><span class=" fw-bold">Stadium :</span> ${strStadium}</p>
            <p class="card-title"><span class=" fw-bold">Country :</span> ${strCountry}</p>
            <p class="card-title"><span class=" fw-bold">Sports :</span> ${strSport}</p>
            <p class="card-title"><span class=" fw-bold">Team Name :</span> ${strAlternate}</p>
            <p class="card-title"><span class=" fw-bold">Team Name :</span> ${strKeywords}</p>
            <p class="card-title"><span class=" fw-bold">Discription :</span> ${strDescriptionEN}</p>
        
            <a href="${strFacebook}" class="card-link">Facebook</a>
            <a href="${strInstagram}" class="card-link">Instagram</a>
            <a href="${strTwitter}" class="card-link">Twitter</a>
            <a href="${strYoutube}" class="card-link">YouTube</a>
            <a href="${strWebsite}" class="card-link">Our Website</a>
        </div>
        `
        myPostDetails.appendChild(div);
    }
}

