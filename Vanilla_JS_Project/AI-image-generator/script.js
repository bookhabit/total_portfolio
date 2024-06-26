const apikey = "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"

const maxImages = 4; 
let selectedImageNumber = null;

// function to generate a random number between min and max
function getRandomNumber(min,max){
    return Math.random(Math.random()*(max-min+1))+min
}

// function to disable the generate button during processing
function disableGenerateButton(){
    document.getElementById("generate").disabled = true;
}

// function to enable the generate button after process
function enableGenerateButton(){
    document.getElementById("generate").disabled = false;
}

// function to clear image grid
function clearImageGrid(){
    const imageGrid = document.getElementById("image-grid")
    imageGrid.innerHTML=""
}

// function to generate images
async function generateImages(input){
    disableGenerateButton()
    clearImageGrid()

    const loading = document.getElementById("loading")
    loading.style.display = "block"

    const imageUrls = []
    for(let i=0;i<maxImages;i++){
        // generate a random number between 1 and 10000 and append it to the prompt
        const randomNumber = getRandomNumber(1,10000)
        const prompt = `${input} ${randomNumber}`
        // we added random number to prompt to create different results
        const response = await fetch(
            "https://api-inference.huggingface.co/models/prompthero/openjourney",
            {
                method:"POST",
                headers:{
                    "Content-Type":"application/json",
                    "Authorization": `Bearer ${apikey}`
                },
                body:JSON.stringify({inputs:prompt}),
            }
        )

        if(!response.ok){
            alert("Failed to generate image!")
        }

        const blob = await response.blob()
        const imageUrl = URL.createObjectURL(blob)
        imageUrls.push(imageUrl)

        const img = document.createElement("img")
        img.src = imageUrl
        img.alt = `art-${i+1}`
        img.onclick = ()=>downdloadImage(imageUrl,i)
        document.getElementById("image-grid").appendChild(img)

        loading.style.display = "none"
        enableGenerateButton()

        // reset selected image number
        selectedImageNumber = null;
    }
}

document.getElementById("generate").addEventListener('click',()=>{
    const input = document.getElementById("user-prompt").value;
    generateImages(input)
})

function downdloadImage(imgUrl,imageNumber){
    const link = document.createElement("a")
    link.href = imgUrl
    link.download = `image-${imageNumber+1}.jpg`
    link.click()
}