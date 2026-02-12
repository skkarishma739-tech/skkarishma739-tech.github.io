let display = document.getElementById("display");
    let h1 = document.createElement("h1");
    display.appendChild(h1);
    i=0
    function display_f(){
        setInterval(()=>{
            h1.textContent=i;
            i++
        }
    },1000) 
