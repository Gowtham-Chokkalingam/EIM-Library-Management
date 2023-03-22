const api = "https://mock-api-sever.onrender.com/data";


async function addData(e) {
  
  e.preventDefault();

  let img = document.getElementById("image").value;

  let nam = document.getElementById("name").value;

  let auth = document.getElementById("author").value;

  let genr = document.getElementById("genre").value;

  let edit = document.getElementById("edition").value;

  let publ = document.getElementById("publisher").value;

  let cos = document.getElementById("cost").value;

  let data = {
    id: Date.now() + Math.random() * 100,
    img,
    nam,
    auth,
    genr,
    edit,
    publ,
    cos,
    borrow:false
  };

  console.log(data);

  await fetch(api, {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  });
  location.reload()
}

async function getdata() {
  let res = await fetch(api);
  let data = await res.json();
  
  display(data);
}
getdata();

async function display(data) {
  let cont = document.getElementById("container");
   cont.innerHTML=null

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
    tup.addEventListener("click",()=>{
      openthemodal()
    })

    let update = document.createElement("p");
    update.innerText='edit'
    // update.src ="https://icons.veryicon.com/png/o/miscellaneous/linear-small-icon/edit-246.png";
    // update.style.width = "30px";
    // update.style.height = "30px";
     update.style.cursor = "pointer";
     update.setAttribute("id", "myBtn");
    // update.onclick = () => {
    //   openthemodal();
    // };



    function openthemodal() {
      var modal = document.getElementById("myModal");
      var span = document.getElementsByClassName("close")[0];

      tup.onclick = function () {
        modal.style.display = "block";
      };

      span.onclick = function () {
        modal.style.display = "none";
      };

      window.onclick = function (event) {
        if (event.target == modal) {
          modal.style.display = "none";
        }
      };

    
      let btn=document.getElementById("updatebtn")
      btn.addEventListener("click",(event)=>{
        console.log("hello")
        updateData(event,el.id)
      })
     
    }

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
    tup.append(update);
    tdel.append(delbtn);
    ap.append(timg, tnam, tauth, tgenr, tedit, tpubl, tcos, tup, tdel,tbor);
    cont.append(ap);
  });
}

let deletedata = async (id) => {
  console.log(id);
  await fetch(`${api}/${id}`, {
    method: "DELETE",
  });
  getdata();
};

async function updateData(event,id){
// console.log(event,id)
event.preventDefault()



let img = document.getElementById("uimage").value;

let nam = document.getElementById("uname").value;

let auth = document.getElementById("uauthor").value;

let genr = document.getElementById("ugenre").value;

let edit = document.getElementById("uedition").value;

let publ = document.getElementById("upublisher").value;

let cos = document.getElementById("ucost").value;

let datas={img,nam,auth,genr,edit,publ,cos}
console.log(datas)

await fetch(`${api}/${id}`,{
    method:"PATCH",
    body:JSON.stringify(datas),
    headers:{
        "Content-Type":"application/json"
    }

})
getdata ()

}


