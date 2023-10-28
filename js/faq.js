var ul = document.querySelector('#dataLists')

fetch('../data/data.json')
.then(res => res.json())
.then(json => {
    console.log(json);
            let li = ""
            json.map(item => {
                li += `<li data-aos="fade-right"> <b class="mb-5">Q: ${item.question}</b><br><i>A: ${item.answer}</i><hr></li>`
            })
          
            ul.innerHTML = li;
        })
    .catch(err => console.log(err))
