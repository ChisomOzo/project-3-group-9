$(document).ready(function(){
  $('#executeQueryBtn').click(function(){
      var selectedZipCode = $('#zipCodeSelector').val();
      $.ajax({
          type: "POST",
          url: "/execute_query",
          data: {selectedZipCode: selectedZipCode},
          success: function(response){
              var resultDiv = $("#resultDiv");
              resultDiv.empty();
              if(response.result.length > 0){
                  response.result.forEach(function(row){
                      resultDiv.append('<p>' + row.join(' - ') + '</p>');
                  });
              } else {
                  resultDiv.append('<p>No results found for this zip code.</p>');
              }
          }
      });
  });
});
// Function to fetch data from data.json
async function fetchData() {
  try {
    const response = await fetch('property.json');
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching data:', error);
    return [];
  }
}

// Function to populate dropdowns with unique values
async function populateDropdowns() {
  const data = await fetchData();
  const uniqueZipCodes = [...new Set(data.map(property => property.zipcode))].sort();
  const uniqueBedrooms = [...new Set(data.map(property => property.bedrooms))].sort();

  const zipcodeSelect = document.getElementById('zipcode');
  const bedroomsSelect = document.getElementById('bedrooms');

  uniqueZipCodes.forEach(zip => {
    const option = document.createElement('option');
    option.value = zip;
    option.textContent = zip;
    zipcodeSelect.appendChild(option);
  });

  uniqueBedrooms.forEach(bedrooms => {
    const option = document.createElement('option');
    option.value = bedrooms;
    option.textContent = bedrooms;
    bedroomsSelect.appendChild(option);
  });
}
  
// Function to display search results
async function searchProperties() {
  const zipCode = document.getElementById('zipcode').value;
  const bedrooms = document.getElementById('bedrooms').value;
  const resultsContainer = document.getElementById('results');
  resultsContainer.innerHTML = ''; // Clear previous results

  const data = await fetchData();
  const filteredData = data.filter(property => property.zipcode === zipCode && property.bedrooms === bedrooms);

  


  filteredData.forEach(property => {
    const result = document.createElement('div');
    result.classList.add('result');
    result.textContent = `${property.address}, ${property.city}`;
    result.addEventListener('click', () => displayDetails(property));
    result.addEventListener('mouseover', () => highlightResult(result));
    result.addEventListener('mouseout', () => removeHighlight(result));
    resultsContainer.appendChild(result);
  });
  

}
// Function to highlight result on hover
  function highlightResult(result) {
    result.classList.add('highlight');
  }

  // Function to remove highlight on mouseout
  function removeHighlight(result) {
    result.classList.remove('highlight');
  }

// Function to display property details
function displayDetails(property) {
  const detailsContainer = document.getElementById('details');
  detailsContainer.innerHTML = ''; // Clear previous details

  const details = document.createElement('div');
  details.classList.add('property-details');
  details.innerHTML = `
    <h4>${property.address}</h4>
    <p>Zip Code: ${property.zipcode}</p>
    <p>Price: $ ${property.price}</p>
    <p>Bedrooms: ${property.bedrooms}</p>
    <p>Bathrooms: ${property.bathrooms}</p>
    <p>Last Sale Price: $ ${property.sale_amount}</p>
    `
  ;
  detailsContainer.appendChild(details);
  // Update bar chart with selected property data
  const {sale_amount,price} = property;
  const barChartDiv = document.getElementById('barChart');
  barChartDiv.innerHTML = ''; // Clear previous chart

  const data = [
    {
      type: 'bar',
      x: ['Last Sold Price', 'Current List Price'],
      y: [sale_amount, price],
      name: 'Bar Chart',
      marker: {
        color: 'red' // Change bar color to blue
      }
    },
    {
      type: 'scatter',
      x: ['Last Sold Price', 'Current List Price'],
      y: [sale_amount, price],
      mode: 'lines+markers',
      name: 'Line Chart',
      line: {
        color: 'blue' // Change line color to green
      }
    }
  ];
  let layout ={
    paper_bgcolor:'rgba(0,0,0,0)',
    plot_bgcolor:'rgba(0,0,0,0)',
    barmode: 'group',
    width: barChartDiv.offsetWidth * 1.2, // Set the width based on the container's width
    height: barChartDiv.offsetHeight * 1.2, // Set the height based on the container's height
    yaxis: {
      title: 'Amount in $USD'
    }
  };
  Plotly.newPlot('barChart', data,layout);
  // Display map using Leaflet
  // clear any old map in the container
  var container = L.DomUtil.get('map');
    if(container != null){
    container._leaflet_id = null;
    }
  const {address,latitude, longitude } = property;
  
  const map = L.map('map').setView([latitude, longitude], 13);
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors',
    maxZoom: 18,
  }).addTo(map);
  let marker = L.marker([latitude, longitude],{
      draggable: true,
      title: address
  }).addTo(map);
    // Binding a popup to our marker
    marker.bindPopup(title);
    
}
  // start amenities
  async function searchNearbyPlaces() {
    const zipCode = document.getElementById('zipcode').value;

    try {
      const coordinates = await getCoordinatesFromZIP(zipCode);

      if (coordinates) {
        const nearbyPlaces = await getNearbyPlaces(coordinates.lat, coordinates.lon);

        if (nearbyPlaces) {
          displayResults(nearbyPlaces);
        } else {
          displayErrorMessage('No nearby places found.');
        }
      } else {
        displayErrorMessage('Invalid ZIP code or location not found.');
      }
    } catch (error) {
      console.error('Error:', error);
      displayErrorMessage('Error fetching data. Please try again.');
    }
  }

  async function getCoordinatesFromZIP(zipCode) {
    const response = await fetch(`https://nominatim.openstreetmap.org/search?postalcode=${zipCode}&format=json&limit=1`);
    const data = await response.json();

    if (data.length > 0) {
      return { lat: data[0].lat, lon: data[0].lon };
    } else {
      return null;
    }
  }

  async function getNearbyPlaces(lat, lon) {
    const response = await fetch(`https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=json&radius=1000`);
    const data = await response.json();

    if (data && data.nearby) {
      return data.nearby;
    } else {
      return null;
    }
  }

  function displayResults(nearbyPlaces) {
    const resultsDiv = document.getElementById('amenities');
    resultsDiv.innerHTML = `
      <h3>Nearby Places:</h3>
      <p><strong>Schools, Parks, Restaurants:</strong></p>
      <ul>
        ${nearbyPlaces.map(place => `<li>${place}</li>`).join('')}
      </ul>
    `;
  }

  function displayErrorMessage(message) {
    const resultsDiv = document.getElementById('resultsDiv');
    resultsDiv.innerHTML = `<p>${message}</p>`;
  }
  //  end amenitities


// Populate dropdowns on page load
populateDropdowns();