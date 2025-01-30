// //fetching data from 2 endpoints without promise.all

// async function fetchData_2endpoints() {
//     try {
//         //fetching data from 2 endpoints
//         const posts = await fetch('https://jsonplaceholder.typicode.com/posts');
//         const postsData = await posts.json();//posts data
//         const comments = await fetch('https://jsonplaceholder.typicode.com/comments');
//         const commentsData = await comments.json();//comments data

//         console.log('First 5 posts:_________________________');
//         postsData.slice(0, 5).forEach(post => {
//             console.log(`title: ${post.title}`);
//             console.log(`body: ${post.body}`);
//             console.log('----------------------');
//         });//logging first 5 posts

//         console.log('First 5 comments:_________________________');
//         commentsData.slice(0, 5).forEach(comment => {
//             console.log(`name: ${comment.name}`);
//             console.log(`email: ${comment.email}`);
//             console.log(`body: ${comment.body}`);
//             console.log('----------------------');
//         });//logging first 5 comments

//     } catch (error) {
//         console.log('Error fetching data');
// }
// }
// fetchData_2endpoints();   


//using promise.all to fetch data from 2 endpoints

async function fetchData_2endpoints_promiseAll() {
    try {
        const [posts, comments] = await Promise.all([
            fetch('https://jsonplaceholder.typicode.com/posts'),
            fetch('https://jsonplaceholder.typicode.com/comments')
        ]);//fetching data from 2 endpoints parellely

        const postsData = await posts.json();//posts data
        const commentsData = await comments.json();//comments data
        console.log('First 5 posts:_________________________');
        postsData.slice(0, 5).forEach(post => {
            console.log(`title: ${post.title}`);
            console.log(`body: ${post.body}`);
            console.log('----------------------');
        });//logging first 5 posts

        console.log('First 5 comments:_________________________');
        commentsData.slice(0, 5).forEach(comment => {
            console.log(`name: ${comment.name}`);
            console.log(`email: ${comment.email}`);
            console.log(`body: ${comment.body}`);
            console.log('----------------------');
        });//logging first 5 comments

    } catch (error) {
        console.log('Error fetching data');
}
}
fetchData_2endpoints_promiseAll();