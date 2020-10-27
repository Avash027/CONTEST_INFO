const plotForm = document.getElementById('plotForm')

plotForm.addEventListener('submit' , (e)=>{
    e.preventDefault()
    const userName = document.getElementById('userName').value
    
    const fetchUrl = '/query?site=codefordata&name='+userName

    fetch(fetchUrl)
    .then((response)=>{
        response.json().then(({rating,date})=>{
            var trace ={
                x:date,
                y:rating,
                name:userName,
                type:'scatter'
            }

            var data = [trace]
            Plotly.newPlot('graph',data)
        })
    })
})