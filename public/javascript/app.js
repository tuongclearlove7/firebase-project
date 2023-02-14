

const static_privateData = (

        function(){

            // local variables

            const apiData =  [{

                list_knowledge : 'http://localhost:3000/newfeed', 

                createbtn : document.getElementById('newCreate'),

            }];

            return {
        
                get(index){

                    return apiData[index];
                }
            }
        }
)();
 
function app(){

    getKnowledge(renderKnowledge);
    handleCreateForm();

}

app();

function getKnowledge(call){

    fetch(static_privateData.get(0).list_knowledge)
    

    .then(function (response) {

        console.log("FAKE API is running...");

        return response.json();
    })

    .then(call).catch(function (error) {

        var listKnowlegdeBlock = document.querySelector("#list_api");

        let notification = "Hệ thống FAKE API đã tắt!!!";

        let link_imgErr1 = "./image/error1.png";

        console.log(error);

        console.log(notification);

        return listKnowlegdeBlock.innerHTML = `
                <h1 style="font-size:23px;">${error}</h1>
                            <p>${notification}</p>
        <div class="errImg"><img src="${link_imgErr1}" alt=""></div>`;
    })
}

function errorMessage(message) {

    let my_promise = new Promise(function (resolve, reject){

        reject(message);        

    });

    my_promise.then(function (success) {

        console.log(success)

    }).catch(function(err){

        let notification = document.querySelector('#list_api2');

        notification.innerHTML = `<p>${err}</p>`

     });

     return my_promise;
}


function createFeed(data, call){

    var option = {

        method : 'POST',
        headers : {

            'Content-Type' : 'application/json',
        },

        body: JSON.stringify(data),
    }

    fetch(static_privateData.get(0).list_knowledge, option)

        .then(function(response){
            
            console.log(response);
            response.json();

        }).then(call).catch(async function(error){

        
            await errorMessage("Hệ thống đang bảo trì");

    });
}

function renderKnowledge(myKnowledge){

    var listKnowlegdeBlock = document.querySelector("#list_api");


    var html = myKnowledge.map((knowledge) => {


        return `<li class="knowlegdeItem_id_${knowledge.id}">
                <p>${knowledge.name}</p>
                <p>${knowledge.description}</p>
                <button class="deleteFeed" onclick = "handleDeleteKnowlegde(${knowledge.id});">
                Xóa</button>
                </li>`;

    });

    listKnowlegdeBlock.innerHTML = html.join('');
} 

function handleCreateForm(){
    
        var name = document.querySelector('input[name="name"]').value;
        var description = document.querySelector('input[name="description"]').value;
        var formData = {

            name : name,
            description : description
        }

        createFeed(formData, function(){

            getKnowledge(renderKnowledge);
        
    });
}


function handleDeleteKnowlegde(id){

    var option = {

        method : 'DELETE',
        headers : {

            'Content-Type' : 'application/json',
        },
    }

    fetch(static_privateData.get(0).list_knowledge + "/" + id, option)

        .then(function(response){

            console.log(response.url);
            
            response.json();
        })

        .then(function(){

            let knowledgeItem = document.querySelector(".knowlegdeItem_id_" + id);
            
            knowledgeItem.remove();
    });

    console.log(id);
}



