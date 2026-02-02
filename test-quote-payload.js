// Test script to simulate the quote form JSON payload
// Run with: node test-quote-payload.js

const sampleFormData = {
    client_name: "Juan Dela Cruz",
    email: "juan@example.com",
    phone: "+63 (917) 123 4567",
    event_date: "2024-12-25",
    event_duration: "Full day (8 hours)",
    venue_name: "Convention Center",
    gear_list: [
        "Audio System",
        "Microphones",
        "Lighting System"
    ],
    event_details: "Corporate event for 200 people with stage setup"
};

console.log("=== QUOTE FORM JSON PAYLOAD TEST ===");
console.log("Content-Type: application/json");
console.log("Method: POST");
console.log("\nPayload:");
console.log(JSON.stringify(sampleFormData, null, 2));

// Test with curl command
console.log("\n=== CURL COMMAND FOR TESTING ===");
const webhookUrl = process.env.VITE_N8N_WEBHOOK_URL || "YOUR_WEBHOOK_URL_HERE";
console.log(`curl -X POST "${webhookUrl}" \\`);
console.log('  -H "Content-Type: application/json" \\');
console.log('  -d \'' + JSON.stringify(sampleFormData) + '\'');

// Test edge cases
console.log("\n=== EDGE CASE TESTS ===");

// Empty gear list
const emptyGearList = { ...sampleFormData, gear_list: [] };
console.log("\nEmpty gear list:");
console.log(JSON.stringify(emptyGearList, null, 2));

// Minimal valid data
const minimalData = {
    client_name: "Test User",
    email: "test@example.com",
    phone: "09171234567",
    event_date: "2024-12-25",
    event_duration: "Half day (4 hours)",
    venue_name: "Test Venue",
    gear_list: ["Audio System"],
    event_details: ""
};
console.log("\nMinimal valid data:");
console.log(JSON.stringify(minimalData, null, 2));
