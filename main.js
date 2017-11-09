function getAllEvents(){
    fetch("http://joannamarievelasco.com/wordpress/wp-json/wp/v2/events?_embed")
    .then(res=>res.json())
    .then(showEvents);
}

function getAllEventsByTag(id){
    fetch("http://joannamarievelasco.com/wordpress/wp-json/wp/v2/events?_embed&tags="+id)
    .then(res=>res.json())
    .then(showEvents);
}


////tagid
function getSingleEventById(myId){
    console.log(myId);
    fetch("http://joannamarievelasco.com/wordpress/wp-json/wp/v2/events/"+myId+"/?_embed")
    .then(res=>res.json())
    .then(showSingleEvent);
    
}

function getMenu(){
     fetch("http://joannamarievelasco.com/wordpress/wp-json/wp/v2/tags")
    .then(res=>res.json())
    .then(showMenu);
}

function showMenu(tags){
     console.log(tags);
    let lt = document.querySelector("#linkTemplate").content;
    
    tags.forEach(function(tag){
        let clone = lt.cloneNode(true);
    let parent = document.querySelector("#tagmenu");
        clone.querySelector("a").textContent=tag.name;
        clone.querySelector("a").setAttribute("href", "events.html?tagid="+tag.id);
    parent.appendChild(clone);
    });
    
}

function showSingleEvent(json){
    console.log(json);
    document.querySelector("#single h1").textContent=json.title.rendered;
    document.querySelector("#single .price span").textContent=json.acf.ticket_price;
    document.querySelector("#single .details").innerHTML=json.acf.event_info;

    
}

function showEvents(data){
    //console.log(data)
    let list = document.querySelector("#list");
    let template = document.querySelector("#eventTemplate").content;
    
    data.forEach(function(theEvent){
    console.log(theEvent)
    let clone = template.cloneNode(true);
        let title = clone.querySelector("h1");
       let date = clone.querySelector(".date");
        let time = clone.querySelector(".time span");
        let location = clone.querySelector(".location");
        let price = clone.querySelector(".price span");
        let img = clone.querySelector("img");
        let link = clone.querySelector("a.read-more");
       let iframe = clone.querySelector("iframe");
        
        title.textContent = theEvent.title.rendered;
        date.textContent = theEvent.acf.date;
        time.textContent = theEvent.acf.time;
        location.textContent = theEvent.acf.location;
       price.textContent = theEvent.acf.ticket_price;
         //console.log(theEvent._embedded["wp:featuredmedia"][0].media_details.sizes.medium.source_url)
        
        if(theEvent._embedded["wp:featuredmedia"][0].media_details){
        img.setAttribute("src", theEvent._embedded["wp:featuredmedia"][0].media_details.sizes.medium.source_url)
            }
        
        if(theEvent){
        iframe.setAttribute = theEvent.content.rendered;
            }
        //console.log(theEvent.content.rendered)
        
        link.setAttribute("href", "music.html?id="+theEvent.id);
        
        
        list.appendChild(clone);
});

}

let searchParams = new URLSearchParams(window.location.search);
let id = searchParams.get("id");
let tagid = searchParams.get("tagid");
//console.log(id)


getMenu();
if(id){
    getSingleEventById(id);
} 
if(tagid){
    getAllEventsByTag(tagid);

} else {
    getAllEvents();
 

    
getData();
    
    }