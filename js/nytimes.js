
// STEP 1: Get your own API key and paste it below…
const key = 'A60tBZZNXL5eq6oL4Byl7gDiApK9LXu8';

// Grab references to all the DOM elements you'll need to manipulate
const searchTerm = document.querySelector('.search');
const searchForm = document.querySelector('form');
const submitBtn = document.querySelector('.submit');
const section = document.querySelector('section');

// STEP 2: Add a submit event listener for the search form, referencing the fetchResults function as the callback
searchForm.addEventListener('submit',fetchResults);

// The URL for the Article Search API at nytimes.com
const baseURL = `https://api.nytimes.com/svc/movies/v2/reviews/${searchTerm.value}.json`;

// Functions
function fetchResults(event) 
{
    // Use preventDefault() to stop the form submitting
    event.preventDefault();

    // STEP 3: Assemble the full URL, according to the API documentation at the New York Times

   url = "https://api.nytimes.com/svc/movies/v2/reviews/all.json?api-key=A60tBZZNXL5eq6oL4Byl7gDiApK9LXu8";

    // let url = `${baseURL}?api-key=${key}`;  

    // STEP 4: Use fetch() to pass the URL that we built as a request to the API service, then pass the JSON to the displayResults() function
    fetch(url).then(function (results) {
        return results.json();
    }).then(function (json) {
            displayResults(json);
        });
    // console.log(displayResults(json));
};

function displayResults(json)
 {
    // STEP 5: Log to the console the results from the API
    console.log(json);

    // Clear out the old results…
    while (section.firstChild)
    {
            section.removeChild(section.firstChild);
    };

    // STEP 6: Create the variable articles to capture the movies from the JSON object
    let movies = json.results;	

    if(movies.length === 0) 
    {
        const para = document.createElement('p');
        para.textContent = 'No results returned.'
        section.appendChild(para);
    }
     else 
    {
        for(let i = 0; i < movies.length; i++) 
        {
            const movie = document.createElement('movie');
            const heading = document.createElement('h2');
            const link = document.createElement('a');
            const img = document.createElement('img');
            const para1 = document.createElement('p');

            const current = movies[i];
            console.log(current);

            // STEP 7: Look at the console output from the API…
            link.href = current.link.url;
            link.textContent = "Click here to read a review of movie";
            link.textContent = current.link.suggested_link_text;
            para1.textContent = current.summary_short;

                img.src = current.multimedia.src;
                img.alt = current.multimedia.type;

            // STEP 8: Put each article together as an ARTICLE element and append it as a child of the SECTION element in the HTML
            movie.appendChild(heading);
            heading.appendChild(link);
            movie.appendChild(img);
            movie.appendChild(para1);
            section.append(movie);

        };
    };
};

// This example adapted from "Third-party APIs" at https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Client-side_web_APIs/Third_party_APIs
