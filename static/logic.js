
 // Use D3.js to fetch JSON data from Flask endpoint
d3.json('/properties')
    .then(function(data) {
     console.log(data); // Display the fetched data in the browser console
    
     const zipcodesSet = new Set(); // Create a set to store unique zipcodes
     const bedroomsSet = new Set(); // Create a set to store unique bedrooms
    
     // Extract unique zipcodes and bedrooms
    data.forEach(function(property) {
        zipcodesSet.add(property.zipcode);
        bedroomsSet.add(property.bedrooms);
    });
    
     // Convert sets to arrays for iteration
    const zipcodes = Array.from(zipcodesSet).sort((a, b) => a - b);
    const bedrooms = Array.from(bedroomsSet).sort((a, b) => a - b);
    
     // Populate Bedrooms Selector
    const bedroomsSelect = d3.select('#bedrooms');
    bedrooms.forEach(function(bedroom) {
    bedroomsSelect
            .append('option')
            .attr('value', bedroom)
            .text(bedroom);
    });
    
     // Populate Zipcodes Selector
    const zipcodesSelect = d3.select('#zipcodes');
    zipcodes.forEach(function(zipcode) {
        zipcodesSelect
            .append('option')
            .attr('value', zipcode)
            .text(zipcode);
    });
    
     // Perform other actions or event handling with the selectors as needed
})
.catch(function(error) {
     console.log(error); // Handle any errors that occur during the fetch request

});

function displayResults() {
    const selectedZipcode = d3.select('#zipcodes').node().value;
    const selectedBedrooms = d3.select('#bedrooms').node().value;

    d3.json('/properties') // Fetch data from Flask endpoint
        .then(function(data) {
            const filteredData = data.filter(property => property.zipcode === selectedZipcode && property.bedrooms === selectedBedrooms);

            const resultsDiv = d3.select('#results');
            resultsDiv.selectAll('*').remove(); // Clear previous results

            filteredData.forEach(property => {
                const divElement = resultsDiv.append('div')
                    .text(`${property.address}, ${property.city}`)
                    .classed('result-item', true)
                    .on('click', () => displayPropertyDetails(property))
                    .style('font-size', 'small')
                    .style('margin-bottom', '12px')
                
                divElement.on('mouseover', () => {
                        divElement.style('background-color', 'lightblue'); // Change to desired highlight color
                        divElement.style('cursor', 'pointer'); // Change mouse pointer to pointer
                    })
                    .on('mouseout', () => {
                        divElement.style('background-color', 'transparent'); // Reset background color
                        divElement.style('cursor', 'initial'); // Reset mouse pointer
                    });
                });
            
        
        })
        .catch(function(error) {
            console.log('Error fetching data:', error);
        });

let myChart = null;


function displayPropertyDetails(property) {
    
    // Select the propertyInfo div using D3
        const propertyInfoDiv = d3.select('#propertyInfo');

        // Clear previous property info
        propertyInfoDiv.html('');
        // Create paragraph elements and append them to propertyInfoDiv
        
        const saleAmountInfo = propertyInfoDiv.append('p').text(`Sale Amount: $ ${property.sale_amount}`);
        const priceInfo = propertyInfoDiv.append('p').text(`Price: $ ${property.price}`);
        const bedroomInfo = propertyInfoDiv.append('p').text(`Bedrooms: ${property.bedrooms}`);
        const bathroom = propertyInfoDiv.append('p').text(`Bathrooms: ${property.bathrooms}`);
        const area = propertyInfoDiv.append('p').text(`Property size(Square-foot): ${property.square_foot}`);
        const lastSale = propertyInfoDiv.append('p').text(`Last Sale Date: ${property.sale_transaction_date}`);
    // create Chart
    const chartDiv = d3.select('#chart');
    const width = chartDiv.node().getBoundingClientRect().width;
    const height = chartDiv.node().getBoundingClientRect().height;

    // Clear previous content in chartDiv
    chartDiv.html('');

    // Create a canvas element within chartDiv and set its size
    const canvasElement = chartDiv.append('canvas')
        .attr('id', 'salePriceChart')
        .attr('width', width)
        .attr('height', height)
        .node();

    // Destroy the existing chart if it exists
    if (myChart) {
        myChart.destroy();
    }

    // Get the 2D context of the canvas
    const ctx = canvasElement.getContext('2d');

    // Create a new Chart.js chart using the canvas context
    myChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Price', 'Sale Amount'],
            datasets: [{
                label: 'Property Info',
                data: [property.price, property.sale_amount],
                backgroundColor: [
                    'rgba(75, 192, 192, 1)',
                    'rgba(255, 159, 64, 1)',
                ],
                borderColor: [
                    'rgba(75, 192, 192, 1)',
                    'rgba(255, 159, 64, 1)',
                ],
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });

    // Adjust the chart size based on the div's dimensions
    myChart.canvas.parentNode.style.width = width + 'px';
    myChart.canvas.parentNode.style.height = height + 'px';
        // 
        // 
    // Fetch  parks data
    d3.json('/parks')
        .then(function(propertyParksData) {
            console.log(propertyParksData)
            // Filter parks based on the selected property's zip code
            const nearbyParks = propertyParksData.filter(park => park.zipcode === property.zipcode).slice(0, 2);

            // Display nearby parks in amenitiesDiv
            const amenitiesDiv = d3.select('#parkList');
            amenitiesDiv.selectAll('*').remove();

            if (nearbyParks.length > 0) {
                nearbyParks.forEach(park => {
                    amenitiesDiv.append('div')
                    
                        
                        const parkName = amenitiesDiv.append('p').text(`Park Name: ${park.park_name}`);
                        const parkRating = amenitiesDiv.append('p').text(`Park Ratings: ${park.park_ratings}`);
                });
            } else {
                amenitiesDiv.append('div')
                    .text('No nearby parks found.');
                    
            }
        })
        .catch(function(error) {
            console.error('Error fetching property parks data:', error);
        });
    // Schools record
    d3.json('/schools')
        .then(function(schoolData) {
            console.log(schoolData)
            // Filter parks based on the selected property's zip code
            const nearbySchools = schoolData.filter(school => school.zipcode === property.zipcode).slice(0, 2);

            // Display nearby parks in amenitiesDiv
            const amenitiesDiv = d3.select('#schoolList');
            amenitiesDiv.selectAll('*').remove();

            if (nearbySchools.length > 0) {
                nearbySchools.forEach(school => {
                    amenitiesDiv.append('div')
                    
                        
                        const schoolName = amenitiesDiv.append('p').text(`School Name: ${school.school_name}`);
                        const schoolRating = amenitiesDiv.append('p').text(`School Ratings: ${school.school_ratings}`);
                });
            } else {
                amenitiesDiv.append('div')
                    .text('No nearby school found.');
                    
            }
        })
        .catch(function(error) {
            console.error('Error fetching school data:', error);
        });
    // Restaurants record
    d3.json('/restaurants')
        .then(function(restuData) {
        console.log(restuData)
        // Filter parks based on the selected property's zip code
        const nearbyRestu = restuData.filter(restaurant => restaurant.zipcode === property.zipcode).slice(0, 1);
    
        // Display nearby parks in amenitiesDiv
        const amenitiesDiv = d3.select('#RestuList');
        amenitiesDiv.selectAll('*').remove();
    
        if (nearbyRestu.length > 0) {
            nearbyRestu.forEach(restaurant => {
                        amenitiesDiv.append('div')
                        
                            
                            const restuName = amenitiesDiv.append('p').text(`Restaurant Name: ${restaurant.rest_name}`);
                            const restuRating = amenitiesDiv.append('p').text(`Restaurant Ratings: ${restaurant.rest_ratings}`);
                    });
                } else {
                    amenitiesDiv.append('div')
                        .text('No nearby Restaurant found.');
                    
                }
            })
            .catch(function(error) {
                console.error('Error fetching Restaurant data:', error);
            });
    //
// Grocery record
d3.json('/grocery')
.then(function(groceryData) {
    console.log(groceryData)
    // Filter grocery based on the selected property's zip code
    const nearbygrocery = groceryData.filter(grocery => grocery.zipcode === property.zipcode).slice(0, 2);

    // Display nearby grocery in amenitiesDiv
    const amenitiesDiv = d3.select('#groceryList');
    amenitiesDiv.selectAll('*').remove();

    if (nearbygrocery.length > 0) {
        nearbygrocery.forEach(grocery => {
            amenitiesDiv.append('div')
            
                
                const groceryName = amenitiesDiv.append('p').text(`Grocery Store Name: ${grocery.grocery_name}`);
                const groceryRating = amenitiesDiv.append('p').text(`Grocery Store Ratings: ${grocery.grocery_ratings}`);
        });
    } else {
        amenitiesDiv.append('div')
            .text('No Grocery Store found.');
        
    }
    })
    .catch(function(error) {
        console.error('Error fetching Grocery Store data:', error);
    }); 
    // 
    // gym record
d3.json('/gyms')
.then(function(gymData) {
    console.log(gymData)
    // Filter gym based on the selected property's zip code
    const nearbygym = gymData.filter(gym => gym.zipcode === property.zipcode).slice(0, 1);

    // Display nearby gym in amenitiesDiv
    const amenitiesDiv = d3.select('#GymList');
    amenitiesDiv.selectAll('*').remove();

    if (nearbygym.length > 0) {
        nearbygym.forEach(gym => {
            amenitiesDiv.append('div')
            
                
                const gymName = amenitiesDiv.append('p').text(`Gym  Name: ${gym.gym_name}`);
                const gymRating = amenitiesDiv.append('p').text(`Gym Ratings: ${gym.gym_ratings}`);
        });
    } else {
        amenitiesDiv.append('div')
            .text('No Gym Store found.');
        
    }
    })
    .catch(function(error) {
        console.error('Error fetching Gym data:', error);
    }); 
    // let map = null;
    var container = L.DomUtil.get('map');
        if(container != null){
        container._leaflet_id = null;
        }
    let latitude = property.latitude;
    let longitude = property.longitude;
        const mapDiv = document.getElementById('map');
            

            const map = L.map('map').setView([latitude, longitude], 13); // Initialize map with the given latitude and longitude
            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map); // Add tile layer (OpenStreetMap)

            const marker = L.marker([latitude, longitude]).addTo(map); // Add marker for the property location
            marker.bindPopup(`Address: ${property.address}<br>Price: $ ${property.price}`)
            .openPopup();
    }
        
}


// Populate Bedrooms Selector and Zipcodes Selector (if needed)
// ...

// Event listeners for changes in selectors
d3.select('#bedrooms').on('change', displayResults);
d3.select('#zipcodes').on('change', displayResults);