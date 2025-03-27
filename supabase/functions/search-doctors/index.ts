
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import "https://deno.land/x/xhr@0.1.0/mod.ts";

const TRAVILY_API_KEY = Deno.env.get("TRAVILY_API_KEY") || "";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { specialty, location } = await req.json();
    
    if (!specialty || !location || !location.latitude || !location.longitude) {
      throw new Error("Missing required parameters: specialty and location");
    }
    
    // Format the search query
    const searchQuery = `${specialty} doctors near ${location.latitude},${location.longitude}`;
    console.log(`Searching for: ${searchQuery}`);
    
    // Call Travily API to search for doctors
    const response = await fetch("https://api.travily.dev/search/web", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${TRAVILY_API_KEY}`
      },
      body: JSON.stringify({
        query: searchQuery,
        num_results: 5
      })
    });
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error("Travily API error:", errorText);
      throw new Error(`Travily API error: ${response.status}`);
    }
    
    const data = await response.json();
    
    // Process and extract doctor information from search results
    const doctors = data.results.map(result => {
      // Extract relevant information from search results
      // This is a basic extraction - in a production app, you might use more 
      // sophisticated parsing or a structured API
      return {
        id: Math.random().toString(36).substring(2, 10), // Generate a simple ID
        name: result.title.replace(/Dr\.\s|Doctor\s/, '').split(' - ')[0].trim(),
        specialty: specialty,
        description: result.description,
        address: result.description.match(/\d+\s+[^,]+,\s+[^,]+,\s+[^,]+/) 
                 ? result.description.match(/\d+\s+[^,]+,\s+[^,]+,\s+[^,]+/)[0] 
                 : "Address not available",
        url: result.url,
        distance: "Nearby" // In a production app, you would calculate actual distance
      };
    }).filter(doctor => doctor.name.length > 0);
    
    return new Response(JSON.stringify({ doctors }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error("Error in search-doctors function:", error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
