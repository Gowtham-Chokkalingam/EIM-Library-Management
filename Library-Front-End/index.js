// const api = "http://localhost:8080/data";
const api = "https://mock-api-sever.onrender.com/data";

let borrowListArry = JSON.parse(localStorage.getItem("borrwedList")) || [];

async function getdata() {
  let res = await fetch(api);
  let data = await res.json();

  display(data);
}
getdata();

async function display(data) {
  let cont = document.getElementById("container");
  let table = document.getElementById("containerTable");

  data.forEach((el) => {
    let ap = document.createElement("tr");
    ap.setAttribute("id", "ap");

    let timg = document.createElement("td");

    let tdimg = document.createElement("img");
    tdimg.src = el.img;
    tdimg.style.width = "50px";
    tdimg.style.height = "50px";
    // console.log(el.img)

    let tnam = document.createElement("td");
    tnam.innerText = el.nam;

    let tauth = document.createElement("td");
    tauth.innerText = el.auth;

    let tgenr = document.createElement("td");
    tgenr.innerText = el.genr;

    let tedit = document.createElement("td");
    tedit.innerText = el.edit;

    let tpubl = document.createElement("td");
    tpubl.innerText = el.publ;

    let tcos = document.createElement("td");
    tcos.innerText = el.cos;

    let tbor = document.createElement("td");
    tbor.innerText = el.borrow;

    let tup = document.createElement("td");

    let borrowBook = document.createElement("p");
    borrowBook.innerText = el.borrow ? "Return" : "Borrow";

    borrowBook.style.cursor = "pointer";
    borrowBook.setAttribute("id", "myBtn");
    borrowBook.onclick = () => {
      console.log("hi");
      borrowBookFun(el);
    };

    let tdel = document.createElement("td");
    let delbtn = document.createElement("img");
    delbtn.src =
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR0aW_ZOhVebLfUpFUSlgk9fNxemGVad-LOVX0RUTojvc6WdvAsuFwYwWDpu8NWAaP1VFM&usqp=CAU";
    delbtn.style.width = "30px";
    delbtn.style.height = "30px";
    delbtn.style.cursor = "pointer";
    delbtn.onclick = () => {
      deletedata(el.id);
    };

    timg.append(tdimg);
    tup.append(borrowBook);
    tdel.append(delbtn);
    ap.append(timg, tnam, tauth, tgenr, tedit, tpubl, tcos, tup);
    table.append(ap);
    cont.append(table);
  });
}

async function borrowBookFun(el) {
  console.log("el:", el);
  let data = { ...el, borrow: !el.borrow };
  console.log("data:", data);

  await fetch(`${api}/${el.id}`, {
    method: "PATCH",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (data.borrow) {
    borrowListArry.push(data);
    localStorage.setItem("borrwedList", JSON.stringify(borrowListArry));
  }

  location.reload();
}
