export default (req, res) => {
    var requestOptions = {
        method: 'GET',
        redirect: 'follow'
      };
      
    fetch("https://zenquotes.io/api/random", requestOptions)
        .then(response => response.json())
        .then(result => {
            res.status(200).json({ quote: result });
        })
        .catch(error => console.log('error', error));
}