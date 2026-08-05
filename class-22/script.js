// API => Application Programming Interface is a mesenger that allows two systems to communicate and exchange data.

// json placeholder
// json is a formate in which data is store and transfer
// object => js k under data
// json => internet pe travel karne wala data

// JSON.stringify() => js object ko json me convert kar deta hai
// JSON.parse() => json ko js object me convert kar deta hai

fetch("https://jsonplaceholder.typicode.com/users")
  .then(response => response.json())
  .then(data => {
    const usersDiv = document.getElementById("users");

    data.forEach(user => {
      usersDiv.innerHTML += `
        <div>
          <h3>${user.name}</h3>
          <p>Email: ${user.email}</p>
          <p>Phone: ${user.phone}</p>
          <hr>
        </div>
      `;
    });
  });