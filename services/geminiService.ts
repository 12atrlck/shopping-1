import { GoogleGenAI } from "@google/genai";
import { Sale } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const generateProductDescription = async (productName: string, category: string): Promise<string> => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: `Write a compelling, short (2 sentences max) marketing description for a product named "${productName}" in the category "${category}". Focus on benefits and quality.`,
    });
    return response.text || "No description generated.";
  } catch (error) {
    console.error("Error generating description:", error);
    return "Could not generate description. Please try again.";
  }
};

export const generateBusinessInsight = async (sales: Sale[]): Promise<string> => {
  try {
    // Summarize sales for the prompt
    const totalRevenue = sales.reduce((acc, curr) => acc + curr.totalAmount, 0);
    const recentSales = sales.slice(-5).map(s => `${s.userName} bought items worth $${s.totalAmount}`).join(", ");

    const prompt = `
      Analyze these sales stats:
      Total Revenue: $${totalRevenue.toFixed(2)}
      Recent Transactions: ${recentSales}
      
      Provide a brief (1 short paragraph) executive summary of the business performance and a suggestion for growth.
      Be professional but concise.
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });
    return response.text || "Analysis unavailable.";
  } catch (error) {
    console.error("Error generating insights:", error);
    return "Could not generate business insights at this time.";
  }
};