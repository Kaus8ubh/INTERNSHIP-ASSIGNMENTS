//fetdata function with async and await

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

async function fetchDataAsync(){
    try{
        const data = await fetchData();
        console.log(data);
    } catch(error){
        console.log(error);
    }
}

fetchDataAsync();