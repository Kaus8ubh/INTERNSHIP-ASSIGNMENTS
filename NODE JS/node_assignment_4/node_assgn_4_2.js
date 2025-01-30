//fetching data from an API using fetch 
//data saved as object in json format

fetch('https://jsonplaceholder.typicode.com/posts')
    .then(response => response.json())
    .catch(error => console.log('Error fetching data'));

async function getPosts(){
    try{
        const response = await fetch('https://jsonplaceholder.typicode.com/posts');
        const data = await response.json();//data saved as array of abjects
        const first_5_posts = data.slice(0, 5);//first 5 posts
        first_5_posts.forEach(post => {
            console.log(`title: ${post.title}`);
            console.log(`body: ${post.body}`);
            console.log('----------------------');
        });//logging first 5 posts
    } catch(error){
        console.log('Error fetching data');
    }
}

getPosts();