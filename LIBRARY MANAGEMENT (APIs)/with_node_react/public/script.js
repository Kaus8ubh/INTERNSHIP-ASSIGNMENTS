// Function to fetch and display all books
async function fetchBooks() {
  try {
      const response = await fetch("http://127.0.0.1:3000/books");
  
      const data = await response.json();
      const books = Object.values(data); // Convert to array
      
      const bookList = document.getElementById("book-list");
      bookList.innerHTML = ""; // Clear previous list
      books.forEach(book => {
          const li = document.createElement("li");
          li.textContent = `${book.title} by ${book.author} ` +
                           `(Available: ${book.quantity}) `;
          bookList.appendChild(li);
      });
  } catch (error) {
      document.getElementById("book-list").innerHTML = 
          "<li>Error loading books. Please try again later.</li>";
  }
  document.getElementById("show-books-btn").style.display = "none";
  document.getElementById("hide-books-btn").style.display = "inline-block";
}

// Function to hide the list of books
function hideBooks() {
  let bookList = document.getElementById("book-list");
  bookList.innerHTML = ""; // Clear the list of books
  
  document.getElementById("show-books-btn").style.display = "inline-block";
  document.getElementById("hide-books-btn").style.display = "none";
}

// Function to show the Add Book form
function showAddBookForm() {
  document.getElementById("add-book-form-container").style.display = "block";
  document.getElementById("show-add-form-btn").style.display = "none";
}

// Function to hide the Add Book form
function hideAddBookForm() {
  document.getElementById("add-book-form-container").style.display = "none";
  document.getElementById("show-add-form-btn").style.display = "inline-block";
}

// Function to submit the Add Book form
async function submitAddBook() {
  const title = document.getElementById("book-title").value;
  const author = document.getElementById("book-author").value;
  const quantity = parseInt(document.getElementById("book-quantity").value);
  
  try {
    let response = await fetch("http://127.0.0.1:3000/books", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, author, quantity })
    });
    let data = await response.json();
    alert(`Book Added: ${data.title} by ${data.author}`);

    // Clear form fields
    document.getElementById("book-title").value = "";
    document.getElementById("book-author").value = "";
    document.getElementById("book-quantity").value = "";

    // Hide the add book form after submission
    hideAddBookForm();
  } catch (error) {
    document.getElementById("book-list").innerHTML = 
          "<li>Error while adding a book </li>";
  }
}

// Function to show the Delete Book form
function showDeleteBookForm() {
  document.getElementById("delete-book-form-container").style.display = "block";
}

// Function to hide the Delete Book form
function hideDeleteBookForm() {
  document.getElementById("delete-book-form-container").style.display = "none";
}

//function to delete a book
async function deletebook(){
  const id = document.getElementById("book-id").value;
  try {
    let response = await fetch(`http://127.0.0.1:3000/books/${id}`, {
      method: "DELETE"
    });
    let data = await response.json();
    alert(`Book removed: ${data.message}`);
  } catch (error) {
    console.error("Error deleting book:", error);
  }
}

// function to display all users
async function fetchUsers() {
  try {
    let response = await fetch("http://127.0.0.1:3000/users");
    let users = await response.json();
    users=Object.values(users)
    let userList = document.getElementById("user-list");
    userList.innerHTML = "";
    users.forEach(user => {
      let li = document.createElement("li");
      li.textContent = `${user.name}`;
      userList.appendChild(li);
    });
    
    document.getElementById("show-users-btn").style.display = "none";
    document.getElementById("hide-users-btn").style.display = "inline-block";
  } catch (error) {
    console.error("Error fetching users:", error);
  }
}

// Function to hide the list of users
function hideUsers() {
  let userList = document.getElementById("user-list");
  userList.innerHTML = ""; // Clear the list of users
  document.getElementById("show-users-btn").style.display = "inline-block";
  document.getElementById("hide-users-btn").style.display = "none";
}

// Function to show the Add User form
function showAddUserForm() {
  document.getElementById("add-user-form-container").style.display = "block";
  document.getElementById("show-add-user-form-btn").style.display = "none";
}

// Function to hide the Add User form
function hideAddUserForm() {
  document.getElementById("add-user-form-container").style.display = "none";
  document.getElementById("show-add-user-form-btn").style.display = "inline-block";
}

// Function to submit the Add User form
async function submitAddUser() {
  const name = document.getElementById("user-name").value;
  try {
    let response = await fetch("http://127.0.0.1:3000/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name })
    });
    let data = await response.json();
    alert(`User Added: ${data.name} (ID: ${data.id})`);
    
    document.getElementById("user-name").value = "";
    hideAddUserForm();
  } catch (error) {
    console.error("Error adding user:", error);
  }
}

// Function to show the Delete User form
function showDeleteUserForm() {
  document.getElementById("delete-user-form-container").style.display = "block";
}

// Function to hide the Delete User form
function hideDeleteUserForm() {
  document.getElementById("delete-user-form-container").style.display = "none";
}

// Function to delete a user
async function deleteUser() {
  const id = document.getElementById("user-id").value;
  try {
    let response = await fetch(`http://127.0.0.1:3000/users/${id}`, {
      method: "DELETE"
    });
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    let data = await response.json();
    alert(`User removed: ${data.message}`);
  } catch (error) {
    console.error("Error deleting user:", error);
  }
}

//show allocated books
async function showallocatedbooks() {
  try {
      const response = await fetch("http://127.0.0.1:3000/allocated-books");
      const allocatedBooks = await response.json();
      
      const bookList = document.getElementById("allocated-list");
      bookList.innerHTML = ""; // Clear previous list
      
      allocatedBooks.forEach(book => {
          const li = document.createElement("li");
          const userInfo = book.allocated_to.map(user => {
              const dates = user.from_date ? 
                  `(From: ${user.from_date}${user.to_date ? ` To: ${user.to_date})` : ' - Current)'}` : '';
              return `${user.user_name} ${dates}`;
          }).join(', ');
          
          li.textContent = `${book.book_title} by ${book.book_author} - Allocated to: ${userInfo}`;
          bookList.appendChild(li);
      });

      document.getElementById("shw_allocated_books").style.display = "none";
      document.getElementById("hide-allocated-btn").style.display = "inline-block";
  } catch (error) {
      document.getElementById("allocated-list").innerHTML = 
          "<li>Error loading allocated books. Please try again later.</li>";
  }
}

//hide allocated list
function hideallocatedbooks() {
  let bookList = document.getElementById("allocated-list");
  bookList.innerHTML = ""; // Clear the list of books
  document.getElementById("shw_allocated_books").style.display = "inline-block";
  document.getElementById("hide-allocated-btn").style.display = "none";
}

// Function to show the Allocate Book form
function showAllocateForm() {
  document.getElementById("allocate-form-container").style.display = "block";
}

// Function to hide the Allocate Book form
function hideAllocateBookForm() {
  document.getElementById("allocate-form-container").style.display = "none";
}

// Function to allocate a book to a user
async function allocateBook() {
  const bookId = document.getElementById("allocate-book-id").value.trim();
  const userId = document.getElementById("allocate-user-id").value.trim();
  const fromDate = document.getElementById("allocate_dt").value;
  const toDate = document.getElementById("return_dt").value;

  if (!bookId || !userId || !fromDate || !toDate) {
      alert("Please fill in all fields");
      return;
  }

  if (new Date(fromDate) > new Date(toDate)) {
      alert("Return date must be after allocation date");
      return;
  }

  try {
      const response = await fetch(`http://127.0.0.1:3000/allocate/${bookId}/${userId}`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
              from_date: fromDate,
              to_date: toDate
          })
      });

      const data = await response.json();
      alert(data.message);
      
      document.getElementById("allocate-book-id").value = '';
      document.getElementById("allocate-user-id").value = '';
      document.getElementById("allocate_dt").value = '';
      document.getElementById("return_dt").value = '';
      
      hideAllocateBookForm();
      
      if (document.getElementById("hide-allocated-btn").style.display === "inline-block") {
          showallocatedbooks();
      }

  } catch (error) {
      alert(`Error: ${error.message}`);
      console.error("Error allocating book:", error);
  }
}



// Function to show the Deallocate Book form
function showDeallocateBookForm() {
  document.getElementById("deallocate-form-container").style.display = "block";
}

// Function to hide the Deallocate Book form
function hideDeallocateBookForm() {
  document.getElementById("deallocate-form-container").style.display = "none";
}

// Function to deallocate a book from a user
async function deallocateBook() {
  const bookId = document.getElementById("deallocate-book-id").value.trim();
  const userId = document.getElementById("deallocate-user-id").value.trim();

  // Validate inputs
  if (!bookId || !userId) {
    alert("Please fill in all fields");
    return;
  }

  try {
    const response = await fetch(`http://127.0.0.1:3000/deallocate/${bookId}/${userId}`, {
      method: "POST"
    });

    const data = await response.json();

    alert(`Book deallocated: ${data.message}`);

    document.getElementById("deallocate-book-id").value = '';
    document.getElementById("deallocate-user-id").value = '';

    hideDeallocateBookForm();

  } catch (error) {
    alert(`Error: ${error.message}`); 
  }
}


