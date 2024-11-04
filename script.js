async function generatePlan() {
    const companyInfo = document.getElementById("company-info").value;
    const outputDiv = document.getElementById("output");

    if (!companyInfo) {
        outputDiv.innerHTML = "Please enter company information.";
        return;
    }

    // Display loading message
    outputDiv.innerHTML = "Generating marketing plan...";

    try {
        // Call Hugging Face API
        const response = await fetch("https://api-inference.huggingface.co/models/gpt2", {
            method: "POST",
            headers: {
                Authorization: "Bearer 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", // Your API token
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ inputs: companyInfo })
        });

        const data = await response.json();
        
        // Display the generated text
        outputDiv.innerHTML = data[0].generated_text || "No marketing plan generated.";
    } catch (error) {
        console.error("Error generating plan:", error);
        outputDiv.innerHTML = "An error occurred: " + error.message;
    }
}

// Event listener for the form submission
document.getElementById("plan-form").addEventListener("submit", function(event) {
    event.preventDefault(); // Prevent the form from submitting normally
    generatePlan(); // Call the generatePlan function
});
