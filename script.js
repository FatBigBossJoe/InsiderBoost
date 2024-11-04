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

        // Check if the response is OK
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();

        // Log the data for debugging
        console.log(data);

        // Check if generated_text exists
        if (data && data[0] && data[0].generated_text) {
            outputDiv.innerHTML = data[0].generated_text;
        } else {
            outputDiv.innerHTML = "No marketing plan generated or response structure changed.";
        }
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
