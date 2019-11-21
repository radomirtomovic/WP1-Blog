import '../scss/style.scss';
let nav = [
    {name: 'Home', link: 'index.html'},
    {name: 'Archive', link: 'archive.html'},
    {name: 'Pages', link: 'pages.html'},
    {name: 'Contact', link: 'contact.html'}
];
let navList = document.getElementsByClassName("navbar-nav")[0];
let listElements = "";
for (let i = 0; i < nav.length; i++){
    listElements += `<li class = "nav-item"><a class = "nav-link" href = "${nav[i].link}">${nav[i].name}</a></li>`;
}
navList.innerHTML = listElements;


import $ from 'jquery';