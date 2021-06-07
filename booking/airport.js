var xhr = new XMLHttpRequest();
var url = 'http://openapi.airport.co.kr/service/rest/AirportParking/airportparkingRT'; /*URL*/
var queryParams = '?' + encodeURIComponent('ServiceKey') + '='+'ico2oslTPt0E4zYjh7R8i0qmTv%2BlK0LFkz3SOjgiQFHxeBqAk6YAwENrVJsxlePVnqaxFALWQOw2YaG7Phuhuw%3D%3D'; /*Service Key*/
queryParams += '&' + encodeURIComponent('serviceKey') + '=' + encodeURIComponent('-'); /**/
queryParams += '&' + encodeURIComponent('schAirportCode') + '=' + encodeURIComponent('GMP'); /**/
xhr.open('GET', url + queryParams);
xhr.onreadystatechange = function () {
    if (this.readyState == 4) {
        alert('Status: '+this.status+'nHeaders: '+JSON.stringify(this.getAllResponseHeaders())+'nBody: '+this.responseText);
    }
};

xhr.send('');