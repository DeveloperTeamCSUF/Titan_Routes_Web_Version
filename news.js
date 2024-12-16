// News data from the provided JSON
const newsData = [
    {
        "id": 267,
        "date": "2024-12-02T21:37:19",
        "title": { "rendered": "Washington Internship Opens Doors for 2024 Panetta Scholar" },
        "content": { "rendered": "As Cal State Fullerton’s 2024 Panetta Congressional intern, Cindy Chavez gained hands-on professional experience in Washington, D.C." },
        "link": "https://titannavigators.com/wp/washington-internship-opens-doors-for-2024-panetta-scholar/"
    },
    {
        "id": 255,
        "date": "2024-11-30T04:32:19",
        "title": { "rendered": "Latest Updates from California State University of Fullerton" },
        "content": { "rendered": "California State University of Fullerton continues to make headlines with various advancements and initiatives." },
        "link": "https://titannavigators.com/wp/latest-updates-from-california-state-university-of-fullerton/"
    },
    {
        "id": 163,
        "date": "2024-11-22T17:12:08",
        "title": { "rendered": "Geologist Searches for Clues of Ancient Collision That Created the Himalayas" },
        "content": { "rendered": "Geologist Kathryn Metcalf is searching for clues into the collision of India and Asia over 60 million years ago that created the Himalayas, the world’s tallest mountain range." },
        "link": "https://titannavigators.com/wp/geologist-searches-for-clues-of-ancient-collision-that-created-the-himalayas/"
    },
    {
        "id": 165,
        "date": "2024-11-22T17:12:07",
        "title": { "rendered": "How the Pandemic Changed Nursing … and Me" },
        "content": { "rendered": "During the darkest days of the COVID-19 pandemic, Cal State Fullerton nursing faculty member Christine Kaford leaned into gratitude and hope. She teaches students to do the same." },
        "link": "https://titannavigators.com/wp/how-the-pandemic-changed-nursing-and-me/"
    },
    {
        "id": 161,
        "date": "2024-11-21T00:28:13",
        "title": { "rendered": "A Champion on the iRacing Circuit" },
        "content": { "rendered": "Logan Clampitt, a Cal State Fullerton computer science major and Titan Esports simulation racer, is known on virtual racing circuits across the globe." },
        "link": "https://titannavigators.com/wp/a-champion-on-the-iracing-circuit/"
    },
    {
        "id": 159,
        "date": "2024-11-19T20:16:04",
        "title": { "rendered": "Titan Builds on Northgate Market’s Success" },
        "content": { "rendered": "Cal State Fullerton business alum Joshua González is a leader in the Northgate Market family-owned Mexican supermarket chain." },
        "link": "https://titannavigators.com/wp/titan-builds-on-northgate-markets-success/"
    },
    {
        "id": 155,
        "date": "2024-11-19T04:29:09",
        "title": { "rendered": "Cracking the Code on ‘Criminal Minds’" },
        "content": { "rendered": "Cal State Fullerton theatre arts alum Kirsten Vangsness plays Penelope Garcia in the hit CBS show and Paramount+ spinoff, 'Criminal Minds'." },
        "link": "https://titannavigators.com/wp/cracking-the-code-on-criminal-minds/"
    },
    {
        "id": 157,
        "date": "2024-11-19T04:29:08",
        "title": { "rendered": "ASI Food Pantry Recognized With $75,000 Gift From Kaiser Permanente" },
        "content": { "rendered": "The Associated Students Inc. Food Pantry at Cal State Fullerton received a $75,000 gift from Kaiser Permanente to purchase refrigerated lockers." },
        "link": "https://titannavigators.com/wp/asi-food-pantry-recognized-with-75000-gift-from-kaiser-permanente/"
    },
    {
        "id": 151,
        "date": "2024-11-15T10:12:07",
        "title": { "rendered": "CSUF’s New Scholarships Office to Streamline, Increase Applications" },
        "content": { "rendered": "Cal State Fullerton opened its inaugural Scholarships Office this fall to streamline the scholarship process and maximize student awards." },
        "link": "https://titannavigators.com/wp/csufs-new-scholarships-office-to-streamline-increase-applications/"
    },
    {
        "id": 153,
        "date": "2024-11-15T10:12:06",
        "title": { "rendered": "Anthropology Scholars, Students Host Symposium to Honor Late Professor" },
        "content": { "rendered": "Anthropology scholars gathered at Cal State Fullerton for a symposium focused on 'Interdisciplinary Collaborations in the Evolutionary Social Sciences'." },
        "link": "https://titannavigators.com/wp/anthropology-scholars-students-host-symposium-to-honor-late-professor/"
    }
];

// Function to render news articles dynamically
function renderNews() {
    const newsContainer = document.getElementById('newsContainer');
    if (!newsContainer) {
        console.error('newsContainer element not found');
        return;
    }

    // Clear any existing content in the container
    newsContainer.innerHTML = '';

    // Loop through the newsData array and create article elements
    newsData.forEach((article) => {
        const articleDiv = document.createElement('div');
        articleDiv.classList.add('news-article');
        articleDiv.innerHTML = `
            <h3>${article.title.rendered}</h3>
            <p>${article.content.rendered}</p>
            <a href="${article.link}" target="_blank">Read more</a>
            <small>Published on: ${new Date(article.date).toLocaleDateString()}</small>
        `;
        newsContainer.appendChild(articleDiv);
    });
}
