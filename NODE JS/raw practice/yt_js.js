
const datas=[
    {name:'kaustubh',age:26 },
    {name:'sachin',age:28 }
]


function getdata(){
    setTimeout(()=>{
        let output='';
        datas.forEach((data,index)=>{
            output+=`<li>${data.name}</li>`;
        });
        document.body.innerHTML=output;
    },1000); 
}

// function createdata(newdata){
//     setTimeout(() => {  
//         datas.push(newdata);
//     }, 2000);
// }

// createdata({name:'ravi',age:28 });
// getdata();

// here, the output will be kaustubh and sachin only, 
// because the createdata function will take 2 seconds 
// to push the new data into the array, 
// but the getdata function will take only 1 second 
// to display the data. So, the new data will not be 
// displayed.
//to solve this problem, we can use callback functions.

//callback function

// function createdata(newdata,callback){
//     setTimeout(() => {  
//         datas.push(newdata);
//         callback();
//     }, 2000);
// }

// createdata({name:'ravi',age:28 },getdata);

//promise

// function createdata(newdata){
//     return new Promise((resolve,reject)=>{
//         setTimeout(() => {  
//             datas.push(newdata);
//             let error=true;
//             if(!error){
//                 resolve();
//             }
//             else{
//                 reject('Error: something went wrong')
//                 }
//             }, 1000);
//     })
// }
// createdata({name:'ravi',age:28 })
// .then(getdata)
// .catch(err=>console.log(err));

//async await

// function createdata(newdata){
//     setTimeout(() => {  
//         datas.push(newdata);
//     }, 1000);
// }

// async function start(){
//     await createdata({name:'ravi',age:28 });
//     getdata();
// }
// start();