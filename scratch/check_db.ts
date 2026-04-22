import { createClient } from "../lib/supabase/client";

async function diagnose() {
  console.log("--- Starting DB Diagnosis ---");
  try {
    const supabase = createClient();
    const { data: rows, error } = await supabase
      .from("pricing_config")
      .select("*");

    if (error) {
      console.error("Error fetching pricing_config:", error);
      return;
    }

    console.log(`Found ${rows?.length || 0} rows in pricing_config.`);
    rows?.forEach((row) => {
      console.log(`Key: ${row.key}`);
      if (row.key === 'multipliers') {
        console.log("Multipliers Value:", JSON.stringify(row.value, null, 2));
      }
    });

    // Check table structure (if possible via a query)
    const { data: schema, error: schemaError } = await supabase
      .rpc('get_table_schema', { table_name: 'pricing_config' }); 
    // Note: get_table_schema might not exist, but worth a try or just SELECT a row.

  } catch (err) {
    console.error("Diagnostic failed:", err);
  }
}

diagnose();
