//using promises
function fetchData(){
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const error = false;
            if(!error){
                resolve('Data has been fetched');
            } else{ 
                reject('Error fetching data');
            }
        }, 2000);
    });
}

fetchData()
    .then(data => console.log(data))
    .catch(error => console.log(error));