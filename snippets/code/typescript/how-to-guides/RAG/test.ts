import { createDataset, GalileoCallback, GalileoScorers, getDataset, getLogger, runExperiment } from "galileo";
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';

import { createSupervisorAgent } from './agents/supervisorAgent';

// Dataset name constant
const DATASET_NAME = "langgraph-fsi-unit-test-dataset";

/**
 * This function is used to send input to the multi-agent chatbot.
 * It takes a dataset row, and sends the input value to the agent.
 * 
 * @param {Object} datasetRow - The input object containing the user's question.
 * @returns {Promise<string>} - The response from the LLM.
 */
const sendInputToLlm = async (datasetRow: any): Promise<string> => {
    const galileoLogger = getLogger();
    const supervisorAgent = createSupervisorAgent();
    const galileoCallback = new GalileoCallback(galileoLogger, true, false);

    const chatHistory = [];
    chatHistory.push({ role: "user", content: datasetRow.input });

    // Invoke the supervisor agent with the chat history
    const response = await supervisorAgent.invoke({
        messages: chatHistory
    }, { configurable: { thread_id: "42" }, callbacks: [galileoCallback] });

    const responseContent = response.messages.slice(-1)[0].content;

    return responseContent.toString();
};

describe('Chatbot Galileo Tests', () => {
    beforeAll(async () => {
        // Load environment variables from .env file
        dotenv.config();

        // Verify required environment variables are set
        if (!process.env.GALILEO_PROJECT || !process.env.GALILEO_API_KEY) {
            throw new Error(
                "GALILEO_PROJECT and GALILEO_API_KEY environment variables are required"
            );
        }

        // Check to see if we already have the dataset, if not we can create it.
        let dataset = await getDataset({
            name: DATASET_NAME,
        });

        // If we don't have the dataset, create it with test data
        if (dataset === null) {
            const testData = [
                { input: "What are the cashback rewards offered by the Orbit Credit Card?" },
                { input: "What is my credit score?" },
                { input: "What is the APR for balance transfers on the Orbit Credit Card?" },
                { input: "What credit cards am I eligible for?" },
                { input: "What can I do with my credit score?" },
                { input: "Recommend me a good book." }  // Out-of-domain query
            ];
            dataset = await createDataset(testData, DATASET_NAME);
        }
    }, 600000);

    /**
     * This test will run the dataset against our chatbot app using the Galileo experiments framework.
     * This is designed to show how you can run experiments with a dataset against a real-world application.
     */
    test('should run chatbot experiment with Galileo', async () => {
        // Run the experiment using the dataset
        const experimentResponse = await runExperiment({
            // This name is reused, so each experiment run will get a generated name
            // with the run date and time
            name: "langgraph-fsi-experiment",
            datasetName: DATASET_NAME,
            function: sendInputToLlm,
            metrics: [
                GalileoScorers.ActionAdvancement,
                GalileoScorers.ActionCompletion,
                GalileoScorers.ToolErrorRate,
                GalileoScorers.ToolSelectionQuality,
                GalileoScorers.Correctness,
                GalileoScorers.Completeness
            ],
            projectName: process.env.GALILEO_PROJECT!,
        });

        // Log the experiment response link
        console.log(`Experiment response link: ${experimentResponse.link}`);
    }, 60000); // Increased timeout for API calls
});
